import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Database } from './db.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'arabian_saaj_luxury_secret_jwt_key_2026';

export interface AuthenticatedRequest extends Request {
  adminUser?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface UserAuthenticatedRequest extends Request {
  user?: { id: string; email: string; name: string; phone?: string; role: 'user' };
}

export function generateToken(payload: { id: string; email: string; name: string; phone?: string; role?: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; name: string };
    req.adminUser = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired admin token' });
  }
}

export function userAuthMiddleware(req: UserAuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'User authentication required' });
  }

  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET) as UserAuthenticatedRequest['user'];
    if (decoded?.role !== 'user') return res.status(403).json({ error: 'User access required' });
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired user token' });
  }
}

export async function signupHandler(req: Request, res: Response) {
  try {
    const { name, phone, email, password } = req.body;

    if (!name || !phone || !email || !password) {
      return res.status(400).json({ error: 'Name, phone, email, and password are required' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedName = String(name).trim();
    const normalizedPhone = String(phone).trim();

    if (normalizedName.length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters long' });
    }

    if (normalizedPhone.length < 7) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    if (normalizedEmail.length < 5 || !normalizedEmail.includes('@')) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    if (String(password).length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const existingUser = await Database.findUserByEmail(normalizedEmail);
    const existingAdmin = await Database.findAdminByEmail(normalizedEmail);
    if (existingUser || existingAdmin) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);
    const user = await Database.createUser({
      name: normalizedName,
      phone: normalizedPhone,
      email: normalizedEmail,
      password: hashedPassword
    });

    if (!user) {
      return res.status(409).json({ error: 'This user account already exists' });
    }

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone || normalizedPhone,
        role: user.role || 'user'
      }
    });
  } catch (err: any) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error during signup' });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const account = await Database.findAdminByEmail(normalizedEmail);

    if (!account) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(String(password), account.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken({
      id: account._id,
      email: account.email,
      name: account.name
    });

    return res.json({
      success: true,
      token,
      user: {
        id: account._id,
        email: account.email,
        name: account.name
      }
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error during authentication' });
  }
}

export async function userLoginHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await Database.findUserByEmail(String(email).trim().toLowerCase());
    if (!user || !(await bcrypt.compare(String(password), user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const profile = { id: user._id, email: user.email, name: user.name, phone: user.phone, role: 'user' as const };
    return res.json({ success: true, token: generateToken(profile), user: profile });
  } catch (err) {
    console.error('User login error:', err);
    return res.status(500).json({ error: 'Internal server error during user login' });
  }
}

export function userMeHandler(req: UserAuthenticatedRequest, res: Response) {
  return res.json({ user: req.user });
}

export async function meHandler(req: AuthenticatedRequest, res: Response) {
  if (!req.adminUser) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  return res.json({
    user: req.adminUser
  });
}
