import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IProduct {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  material: string;
  featured: boolean;
  sale: boolean;
  status: 'in_stock' | 'out_of_stock' | 'discontinued';
  popularity: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  _id: string;
  id?: string;
  orderId: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  district?: string;
  area: string;
  note?: string;
  products: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    color: string;
    size: string;
    image: string;
  }[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: string;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface IAdmin {
  _id: string;
  id?: string;
  name: string;
  phone?: string;
  email: string;
  password: string; // hashed
  createdAt: string;
}

export interface IUser {
  _id: string;
  id?: string;
  name: string;
  phone?: string;
  email: string;
  password: string; // hashed
  role: 'user';
  createdAt: string;
}

// ----------------- Mongoose Schemas (Used when MONGODB_URI is provided) -----------------
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  images: [{ type: String }],
  colors: [{ type: String }],
  sizes: [{ type: String }],
  stock: { type: Number, default: 0 },
  material: { type: String, default: 'Premium Chiffon / Nidha' },
  featured: { type: Boolean, default: false },
  sale: { type: Boolean, default: false },
  status: { type: String, default: 'in_stock' },
  popularity: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String },
  area: { type: String, required: true },
  note: { type: String },
  products: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      color: String,
      size: String,
      image: String,
    }
  ],
  subtotal: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const MongoAdmin: mongoose.Model<any> = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export const MongoUser: mongoose.Model<any> = mongoose.models.User || mongoose.model('User', userSchema);
export const MongoProduct: mongoose.Model<any> = mongoose.models.Product || mongoose.model('Product', productSchema);
export const MongoOrder: mongoose.Model<any> = mongoose.models.Order || mongoose.model('Order', orderSchema);

// ----------------- Fallback JSON Store & Unified Store Service -----------------
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

interface DatabaseStore {
  admins: IAdmin[];
  users: IUser[];
  products: IProduct[];
  orders: IOrder[];
}

let isMongoConnected = false;

function ensureDataFile(): DatabaseStore {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DATA_FILE)) {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      return {
        admins: Array.isArray(parsed.admins) ? parsed.admins : [],
        users: Array.isArray(parsed.users) ? parsed.users : [],
        products: Array.isArray(parsed.products) ? parsed.products : [],
        orders: Array.isArray(parsed.orders) ? parsed.orders : []
      };
    } catch {
      // Fallback if file is corrupted
    }
  }

  const initialData: DatabaseStore = {
    admins: [],
    users: [],
    products: [],
    orders: []
  };

  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  return initialData;
}

function saveStore(store: DatabaseStore) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local database store:', err);
  }
}

// Initial seed data with authentic modest fashion products for Arabian Saaj
const INITIAL_PRODUCTS: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Royal Silk Crepe Abaya with Gold Zari Border',
    description: 'Masterfully tailored from imported Dubai Silk Crepe, this majestic flowing abaya features intricate hand-finished antique gold zari embroidery along the neckline, cuffs, and front hem. Designed with discreet inner snap buttons for modest coverage and an effortless silhouette.',
    price: 4950,
    discountPrice: 4250,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585728748178-f0f2f2944208?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Onyx Black', 'Midnight Navy', 'Rich Espresso'],
    sizes: ['52 (Height 5\'0"-5\'2")', '54 (Height 5\'3"-5\'4")', '56 (Height 5\'5"-5\'6")', '58 (Height 5\'7"+)'],
    stock: 24,
    material: 'Premium Dubai Silk Crepe & Gold Metallic Thread',
    featured: true,
    sale: true,
    status: 'in_stock',
    popularity: 98
  },
  {
    name: 'Medina Silk Premium Hijab (Desert Rose)',
    description: 'Crafted from authentic 100% Medina Silk woven in Turkey. Incomparably smooth with a subtle radiant sheen that elevates both everyday and festive modest wear. Non-slip, breathable, and drapes naturally without constant pinning.',
    price: 950,
    discountPrice: 790,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Desert Rose', 'Pearl Cream', 'Sage Olive', 'Dusty Mauve', 'Mocha Brown'],
    sizes: ['Standard (180cm x 75cm)'],
    stock: 65,
    material: '100% Turkish Medina Silk',
    featured: true,
    sale: true,
    status: 'in_stock',
    popularity: 95
  },
  {
    name: 'Emirati Royal Butterfly Borka (Nidha Fabric)',
    description: 'An iconic Middle Eastern silhouette with lavish butterfly batwing drape. Made from genuine Korean Nidha fabric celebrated for its cool touch, zero-transparency, and wrinkle-resistant qualities. Includes matching stretch jersey cuff detailing for easy ablution.',
    price: 4600,
    discountPrice: 3950,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Deep Jet Black', 'Forest Cedar', 'Burgundy Plum'],
    sizes: ['52', '54', '56', '58'],
    stock: 18,
    material: 'Grade-A Korean Nidha Fabric',
    featured: true,
    sale: false,
    status: 'in_stock',
    popularity: 92
  },
  {
    name: 'Breathable Triple-Layered Chiffon Niqab',
    description: 'Designed for ultimate modesty and effortless breathability. Made with ultra-soft Korean Georgette Chiffon that allows effortless airflow while ensuring zero see-through opacity. Features an adjustable back tie ribbon and seamless eye-opening that sits gently on the face without pinching.',
    price: 650,
    discountPrice: 490,
    images: [
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585728748178-f0f2f2944208?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Classic Noir', 'Charcoal Smoke', 'Warm Chocolate'],
    sizes: ['Standard 3-Layer (Front 14" / Back 32")'],
    stock: 50,
    material: 'Korean Georgette Chiffon',
    featured: true,
    sale: true,
    status: 'in_stock',
    popularity: 88
  },
  {
    name: 'Turkish Crinkle Chiffon Scarf - Pearl Dust',
    description: 'Light as air with subtle micro-pleats that add textural depth and eliminate the need for ironing. Drapes with structured elegance and stays secure all day long. Ideal for both hijab styling and drape scarves over modest ensembles.',
    price: 850,
    discountPrice: 650,
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Pearl Dust', 'Caramel Latte', 'Soft Blush', 'Forest Sage'],
    sizes: ['Generous Wrap (190cm x 85cm)'],
    stock: 42,
    material: 'Turkish Micro-Pleated Chiffon',
    featured: false,
    sale: true,
    status: 'in_stock',
    popularity: 84
  },
  {
    name: 'Minimalist Linen Everyday Modest Co-ord Set',
    description: 'A contemporary 2-piece modest outfit consisting of a relaxed calf-length tunic and wide-leg modest trousers. Cut from breathable pre-washed organic linen-cotton blend. Thoughtfully tailored with side pockets, modest side slits, and a clean mandarin collar.',
    price: 3800,
    discountPrice: 3400,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Oatmeal Beige', 'Terracotta Taupe', 'Olive Drab', 'Charcoal'],
    sizes: ['S (Bust 38")', 'M (Bust 42")', 'L (Bust 46")', 'XL (Bust 50")'],
    stock: 20,
    material: '100% Breathable Washed Linen-Cotton',
    featured: true,
    sale: false,
    status: 'in_stock',
    popularity: 90
  },
  {
    name: 'Sultanah Velvet Embellished Kaftan Abaya',
    description: 'An opulent celebratory abaya crafted from heavy micro-velvet with shimmering pearl and crystal sequin arabesque hand-work across the kimono sleeves and lapel. Comes with a matching embellished belt for optional cinching and an inner modesty slip.',
    price: 6800,
    discountPrice: 5900,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Royal Emerald', 'Deep Sapphire', 'Antique Gold Black'],
    sizes: ['52', '54', '56', '58'],
    stock: 12,
    material: 'Micro-Velvet with Crystal & Zari Beadwork',
    featured: true,
    sale: true,
    status: 'in_stock',
    popularity: 96
  },
  {
    name: 'Cashmere-Touch Winter Pashmina Scarf',
    description: 'Wrap yourself in heavenly warmth and sophisticated luxury. Woven from ultra-fine blended cashmere fibers with a delicate eyelash fringe. Substantial yet drapeable, it shields from winter chills while preserving graceful modesty.',
    price: 1350,
    discountPrice: 1100,
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: ['Camel Beige', 'Cashmere Cream', 'Espresso Heather', 'Misty Grey'],
    sizes: ['XL Pashmina (200cm x 75cm)'],
    stock: 35,
    material: 'Fine Grade Cashmere & Wool Blend',
    featured: false,
    sale: false,
    status: 'in_stock',
    popularity: 82
  }
];

export async function initDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri || mongoUri.trim().length === 0) {
    isMongoConnected = false;
    await seedLocalStore();
    console.log('Using local JSON database because MONGODB_URI is not configured.');
    return;
  }

  try {
    console.log('Attempting connection to MongoDB via MONGODB_URI...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 4000 });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB successfully.');
    if (process.env.RESET_CATALOG_AND_ORDERS === 'true') {
      await clearMongoCatalogAndOrders();
    } else {
      await migrateLocalDataToMongo();
    }
    await seedMongoDb();
  } catch (err) {
    isMongoConnected = false;
    await seedLocalStore();
    console.warn(`MongoDB connection failed; using local JSON database instead. ${String(err)}`);
  }
}

async function migrateLocalDataToMongo() {
  const store = ensureDataFile();
  let migrated = 0;

  for (const admin of store.admins) {
    const exists = await (MongoAdmin as any).findOne({ email: admin.email.toLowerCase() });
    if (!exists) {
      await (MongoAdmin as any).create({
        name: admin.name,
        phone: admin.phone,
        email: admin.email.toLowerCase(),
        password: admin.password,
        createdAt: admin.createdAt
      });
      migrated += 1;
    } else if (exists.password !== admin.password) {
      await (MongoAdmin as any).updateOne(
        { email: admin.email.toLowerCase() },
        {
          $set: {
            name: admin.name,
            phone: admin.phone,
            password: admin.password
          }
        }
      );
      migrated += 1;
    }
  }

  for (const user of store.users) {
    const exists = await (MongoUser as any).findOne({ email: user.email.toLowerCase() });
    if (!exists) {
      await (MongoUser as any).create({
        name: user.name,
        phone: user.phone,
        email: user.email.toLowerCase(),
        password: user.password,
        role: user.role,
        createdAt: user.createdAt
      });
      migrated += 1;
    }
  }

  for (const order of store.orders) {
    const exists = await (MongoOrder as any).findOne({ orderId: order.orderId });
    if (!exists) {
      await (MongoOrder as any).create({
        orderId: order.orderId,
        customerName: order.customerName,
        phone: order.phone,
        email: order.email,
        address: order.address,
        city: order.city,
        district: order.district,
        area: order.area,
        note: order.note,
        products: order.products,
        subtotal: order.subtotal,
        deliveryCharge: order.deliveryCharge,
        total: order.total,
        paymentMethod: order.paymentMethod,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      });
      migrated += 1;
    }
  }

  if (migrated > 0) {
    console.log(`✅ Migrated ${migrated} local record(s) to MongoDB.`);
  }
}

async function seedLocalStore() {
  const store = ensureDataFile();

  if (process.env.RESET_CATALOG_AND_ORDERS === 'true') {
    store.products = [];
    store.orders = [];
  }

  if (store.products.length === 0 && process.env.RESET_CATALOG_AND_ORDERS !== 'true') {
    const now = new Date().toISOString();
    store.products = INITIAL_PRODUCTS.map((product, index) => ({
      ...product,
      _id: `prod_seed_${index + 1}`,
      createdAt: now,
      updatedAt: now
    }));
  }

  // Admin seed
  const adminEmail = process.env.ADMIN_EMAIL || 'kepten290@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || '455014As';
  const existingAdmin = store.admins.find(a => a.email.toLowerCase() === adminEmail.toLowerCase());

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    store.admins.push({
      _id: 'admin_1',
      name: 'Arabian Saaj Administrator',
      email: adminEmail,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    });
  }

  saveStore(store);
}

async function seedMongoDb() {
  try {
    await cleanupDemoMongoData();

    const adminEmail = process.env.ADMIN_EMAIL || 'kepten290@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || '455014As';
    const adminExists = await (MongoAdmin as any).findOne({ email: adminEmail });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await (MongoAdmin as any).create({
        name: 'Arabian Saaj Administrator',
        email: adminEmail,
        password: hashedPassword
      });
      console.log('Seeded Mongo Admin user.');
    }

  } catch (err) {
    console.error('Error during Mongo seeding:', err);
  }
}

async function clearMongoCatalogAndOrders() {
  const products = await (MongoProduct as any).deleteMany({});
  const orders = await (MongoOrder as any).deleteMany({});
  const users = await (MongoUser as any).deleteMany({});
  console.log(`🧹 Reset MongoDB catalog, orders, and users: ${products.deletedCount || 0} product(s), ${orders.deletedCount || 0} order(s), ${users.deletedCount || 0} user(s) removed.`);
}

async function cleanupDemoMongoData() {
  const removedOrders = await (MongoOrder as any).deleteMany({
    orderId: { $in: ['AS-2026-1082', 'AS-2026-1083'] }
  });
  const removedUsers = await (MongoUser as any).deleteMany({
    email: {
      $in: ['tasnim.sultana@example.com', 'fatima.n@example.com'],
      $regex: /^(tasnim\.sultana|fatima\.n)@example\.com$/i
    }
  });
  const removedTestUsers = await (MongoUser as any).deleteMany({
    email: { $regex: /^signup-check-.*@example\.com$/i }
  });

  const removed =
    (removedOrders.deletedCount || 0) +
    (removedUsers.deletedCount || 0) +
    (removedTestUsers.deletedCount || 0);
  if (removed > 0) {
    console.log(`🧹 Removed ${removed} demo MongoDB record(s).`);
  }
}

// ----------------- Data Access Service (Handles Mongo or Store transparently) -----------------
export const Database = {
  // PRODUCTS
  async getProducts(filter: { search?: string; sort?: string; featured?: boolean; sale?: boolean } = {}) {
    if (isMongoConnected) {
      const query: any = {};
      if (filter.featured) query.featured = true;
      if (filter.sale) query.sale = true;
      if (filter.search) {
        query.$or = [
          { name: { $regex: filter.search, $options: 'i' } },
          { description: { $regex: filter.search, $options: 'i' } },
          { material: { $regex: filter.search, $options: 'i' } }
        ];
      }
      let q = (MongoProduct as any).find(query);
      if (filter.sort === 'price_asc') q = q.sort({ price: 1 });
      else if (filter.sort === 'price_desc') q = q.sort({ price: -1 });
      else if (filter.sort === 'popular') q = q.sort({ popularity: -1 });
      else q = q.sort({ createdAt: -1 });

      const prods = await q.exec();
      return prods.map((p: any) => ({ ...p.toObject(), _id: p._id.toString() }));
    }

    const store = ensureDataFile();
    let result = [...store.products];

    if (filter.featured) {
      result = result.filter(p => p.featured);
    }
    if (filter.sale) {
      result = result.filter(p => p.sale);
    }
    if (filter.search && filter.search.trim()) {
      const s = filter.search.toLowerCase().trim();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          (p.material && p.material.toLowerCase().includes(s))
      );
    }

    if (filter.sort === 'price_asc') {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (filter.sort === 'price_desc') {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (filter.sort === 'popular') {
      result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  },

  async getProductById(id: string) {
    if (isMongoConnected) {
      try {
        const p = await (MongoProduct as any).findById(id);
        return p ? { ...p.toObject(), _id: p._id.toString() } : null;
      } catch {
        return null;
      }
    }
    const store = ensureDataFile();
    return store.products.find(p => p._id === id || p.id === id) || null;
  },

  async createProduct(productData: Partial<IProduct>) {
    if (isMongoConnected) {
      const created = await (MongoProduct as any).create(productData);
      return { ...created.toObject(), _id: created._id.toString() };
    }

    const store = ensureDataFile();
    const now = new Date().toISOString();
    const newProduct: IProduct = {
      _id: `prod_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: productData.name || 'Untitled Product',
      description: productData.description || '',
      price: Number(productData.price) || 0,
      discountPrice: productData.discountPrice ? Number(productData.discountPrice) : undefined,
      images: Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images
        : ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'],
      colors: Array.isArray(productData.colors) && productData.colors.length > 0 ? productData.colors : ['Classic Noir'],
      sizes: Array.isArray(productData.sizes) && productData.sizes.length > 0 ? productData.sizes : ['Standard'],
      stock: productData.stock !== undefined ? Number(productData.stock) : 10,
      material: productData.material || 'Premium Silk & Chiffon',
      featured: Boolean(productData.featured),
      sale: Boolean(productData.sale),
      status: (productData.status as any) || 'in_stock',
      popularity: productData.popularity || 50,
      createdAt: now,
      updatedAt: now
    };

    store.products.unshift(newProduct);
    saveStore(store);
    return newProduct;
  },

  async updateProduct(id: string, updateData: Partial<IProduct>) {
    if (isMongoConnected) {
      try {
        const updated = await (MongoProduct as any).findByIdAndUpdate(
          id,
          { ...updateData, updatedAt: new Date() },
          { new: true }
        );
        return updated ? { ...updated.toObject(), _id: updated._id.toString() } : null;
      } catch {
        return null;
      }
    }

    const store = ensureDataFile();
    const index = store.products.findIndex(p => p._id === id || p.id === id);
    if (index === -1) return null;

    const existing = store.products[index];
    const updated: IProduct = {
      ...existing,
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    store.products[index] = updated;
    saveStore(store);
    return updated;
  },

  async deleteProduct(id: string) {
    if (isMongoConnected) {
      try {
        const res = await (MongoProduct as any).findByIdAndDelete(id);
        return !!res;
      } catch {
        return false;
      }
    }

    const store = ensureDataFile();
    const initialLen = store.products.length;
    store.products = store.products.filter(p => p._id !== id && p.id !== id);
    saveStore(store);
    return store.products.length < initialLen;
  },

  // ORDERS
  async getOrders(filter: { status?: string; search?: string } = {}) {
    if (isMongoConnected) {
      const query: any = {};
      if (filter.status && filter.status !== 'all') {
        query.status = filter.status;
      }
      if (filter.search) {
        query.$or = [
          { orderId: { $regex: filter.search, $options: 'i' } },
          { customerName: { $regex: filter.search, $options: 'i' } },
          { phone: { $regex: filter.search, $options: 'i' } },
          { email: { $regex: filter.search, $options: 'i' } }
        ];
      }
      const ords = await (MongoOrder as any).find(query).sort({ createdAt: -1 }).exec();
      return ords.map((o: any) => ({ ...o.toObject(), _id: o._id.toString() }));
    }

    const store = ensureDataFile();
    let result = [...store.orders];

    if (filter.status && filter.status !== 'all') {
      result = result.filter(o => o.status === filter.status);
    }

    if (filter.search && filter.search.trim()) {
      const s = filter.search.toLowerCase().trim();
      result = result.filter(
        o =>
          o.orderId.toLowerCase().includes(s) ||
          o.customerName.toLowerCase().includes(s) ||
          o.phone.toLowerCase().includes(s) ||
          Boolean(o.email?.toLowerCase().includes(s))
      );
    }

    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  },

  async getOrderById(idOrOrderId: string) {
    if (isMongoConnected) {
      try {
        let o = await (MongoOrder as any).findOne({ $or: [{ _id: idOrOrderId }, { orderId: idOrOrderId }] });
        return o ? { ...o.toObject(), _id: o._id.toString() } : null;
      } catch {
        return null;
      }
    }

    const store = ensureDataFile();
    return store.orders.find(o => o._id === idOrOrderId || o.orderId === idOrOrderId) || null;
  },

  async createOrder(orderInput: {
    customerName: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    district?: string;
    area: string;
    note?: string;
    products: {
      productId: string;
      name: string;
      price: number;
      quantity: number;
      color: string;
      size: string;
      image: string;
    }[];
    deliveryCharge: number;
    paymentMethod?: string;
  }) {
    // Generate order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `AS-2026-${randomSuffix}`;

    const subtotal = orderInput.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryCharge = orderInput.deliveryCharge ?? 70;
    const total = subtotal + deliveryCharge;
    const now = new Date().toISOString();

    // Stock decrement logic
    for (const item of orderInput.products) {
      try {
        const prod = await this.getProductById(item.productId);
        if (prod && prod.stock >= item.quantity) {
          await this.updateProduct(prod._id, {
            stock: Math.max(0, prod.stock - item.quantity),
            popularity: (prod.popularity || 0) + item.quantity * 2
          });
        }
      } catch (err) {
        console.error('Failed to update product stock:', err);
      }
    }

    if (isMongoConnected) {
      const created = await (MongoOrder as any).create({
        orderId,
        customerName: orderInput.customerName,
        phone: orderInput.phone,
        email: orderInput.email || '',
        address: orderInput.address,
        city: orderInput.city,
        district: orderInput.district || '',
        area: orderInput.area,
        note: orderInput.note || '',
        products: orderInput.products,
        subtotal,
        deliveryCharge,
        total,
        paymentMethod: orderInput.paymentMethod || 'Cash on Delivery',
        status: 'Pending'
      });
      return { ...created.toObject(), _id: created._id.toString() };
    }

    const store = ensureDataFile();
    const newOrder: IOrder = {
      _id: `ord_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      orderId,
      customerName: orderInput.customerName,
      phone: orderInput.phone,
      email: orderInput.email,
      address: orderInput.address,
      city: orderInput.city,
      district: orderInput.district,
      area: orderInput.area,
      note: orderInput.note,
      products: orderInput.products,
      subtotal,
      deliveryCharge,
      total,
      paymentMethod: orderInput.paymentMethod || 'Cash on Delivery',
      status: 'Pending',
      createdAt: now,
      updatedAt: now
    };

    store.orders.unshift(newOrder);
    saveStore(store);
    return newOrder;
  },

  async updateOrderStatus(idOrOrderId: string, status: IOrder['status']) {
    if (isMongoConnected) {
      try {
        const updated = await (MongoOrder as any).findOneAndUpdate(
          { $or: [{ _id: idOrOrderId }, { orderId: idOrOrderId }] },
          { status, updatedAt: new Date() },
          { new: true }
        );
        return updated ? { ...updated.toObject(), _id: updated._id.toString() } : null;
      } catch {
        return null;
      }
    }

    const store = ensureDataFile();
    const index = store.orders.findIndex(o => o._id === idOrOrderId || o.orderId === idOrOrderId);
    if (index === -1) return null;

    store.orders[index].status = status;
    store.orders[index].updatedAt = new Date().toISOString();
    saveStore(store);
    return store.orders[index];
  },

  async deleteOrder(idOrOrderId: string) {
    if (isMongoConnected) {
      try {
        const res = await (MongoOrder as any).findOneAndDelete({
          $or: [{ _id: idOrOrderId }, { orderId: idOrOrderId }]
        });
        return !!res;
      } catch {
        return false;
      }
    }

    const store = ensureDataFile();
    const initialLen = store.orders.length;
    store.orders = store.orders.filter(o => o._id !== idOrOrderId && o.orderId !== idOrOrderId);
    saveStore(store);
    return store.orders.length < initialLen;
  },

  // STATS
  async getStats() {
    const products = await this.getProducts();
    const orders = await this.getOrders();

    const totalProducts = products.length;
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const completedOrders = orders.filter(o => o.status === 'Delivered').length;
    const totalSales = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    return {
      totalProducts,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalSales
    };
  },

  // AUTH
  async createAdmin(adminData: { name: string; email: string; password: string; phone?: string }) {
    const email = adminData.email.trim().toLowerCase();
    const name = adminData.name.trim();
    const phone = adminData.phone?.trim();

    if (isMongoConnected) {
      try {
        const existing = await (MongoAdmin as any).findOne({ email });
        if (existing) {
          return null;
        }

        const created = await (MongoAdmin as any).create({
          name,
          phone,
          email,
          password: adminData.password
        });
        return { ...created.toObject(), _id: created._id.toString() };
      } catch {
        return null;
      }
    }

    const store = ensureDataFile();
    const existing = store.admins.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return null;
    }

    const newAdmin: IAdmin = {
      _id: `admin_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name,
      phone,
      email,
      password: adminData.password,
      createdAt: new Date().toISOString()
    };

    store.admins.push(newAdmin);
    saveStore(store);
    return newAdmin;
  },

  async createUser(userData: { name: string; email: string; password: string; phone?: string }) {
    const email = userData.email.trim().toLowerCase();
    const name = userData.name.trim();
    const phone = userData.phone?.trim();

    if (isMongoConnected) {
      try {
        const existing = await (MongoUser as any).findOne({ email });
        if (existing) {
          return null;
        }

        const created = await (MongoUser as any).create({
          name,
          phone,
          email,
          password: userData.password,
          role: 'user'
        });
        return { ...created.toObject(), _id: created._id.toString() };
      } catch {
        return null;
      }
    }

    const store = ensureDataFile();
    const existing = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return null;
    }

    const newUser: IUser = {
      _id: `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name,
      phone,
      email,
      password: userData.password,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    store.users.push(newUser);
    saveStore(store);
    return newUser;
  },

  async findAdminByEmail(email: string) {
    if (isMongoConnected) {
      try {
        const adm = await (MongoAdmin as any).findOne({ email: email.toLowerCase() });
        return adm ? { ...adm.toObject(), _id: adm._id.toString() } : null;
      } catch {
        return null;
      }
    }

    const store = ensureDataFile();
    return store.admins.find(a => a.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async findUserByEmail(email: string) {
    if (isMongoConnected) {
      try {
        const user = await (MongoUser as any).findOne({ email: email.toLowerCase() });
        return user ? { ...user.toObject(), _id: user._id.toString() } : null;
      } catch {
        return null;
      }
    }

    const store = ensureDataFile();
    return store.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }
};
