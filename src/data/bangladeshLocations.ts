export interface LocationDistrict {
  name: string;
  bnName: string;
  isInsideDhaka?: boolean;
  thanas: string[];
}

export interface LocationDivision {
  name: string;
  bnName: string;
  districts: LocationDistrict[];
}

export const BANGLADESH_LOCATIONS: LocationDivision[] = [
  {
    name: 'Dhaka',
    bnName: 'ঢাকা',
    districts: [
      {
        name: 'Dhaka',
        bnName: 'ঢাকা',
        isInsideDhaka: true,
        thanas: [
          'Uttara (উত্তরা)',
          'Dhanmondi (ধানমন্ডি)',
          'Mirpur (মিরপুর)',
          'Gulshan (গুলশান)',
          'Banani (বনানী)',
          'Mohammadpur (মোহাম্মদপুর)',
          'Badda (বাড্ডা)',
          'Motijheel (মতিঝিল)',
          'Khilgaon (খিলগাঁও)',
          'Malibagh (মালিবাগ)',
          'Rampura (রামপুরা)',
          'Jatrabari (যাত্রাবাড়ী)',
          'Bashundhara R/A (বসুন্ধরা)',
          'Old Dhaka (পুরান ঢাকা / লালবাগ)',
          'Tejgaon (তেজগাঁও)',
          'Farmgate (ফার্মগেট)',
          'Mohakhali (মহাখালী)',
          'Pallabi (পল্লবী)',
          'Kafrul (কাফরুল)',
          'Khilkhet (খিলক্ষেত)',
          'Biman Bandar (বিমানবন্দর)',
          'Cantonment (সেনানিবাস)',
          'Shyamoli / Kallyanpur (শ্যামলী / কল্যাণপুর)',
          'Hazaribagh (হাজারীবাগ)',
          'Kamrangirchar (কামরাঙ্গীরচর)',
          'Demra (ডেমরা)',
          'Savar (সাভার)',
          'Ashulia (আশুলিয়া)',
          'Keraniganj (কেরানীগঞ্জ)',
          'Dhamrai (ধামরাই)',
          'Nawabganj (নবাবগঞ্জ)',
          'Dohar (দোহার)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Gazipur',
        bnName: 'গাজীপুর',
        thanas: [
          'Gazipur Sadar (গাজীপুর সদর)',
          'Tongi (টঙ্গী)',
          'Kaliakair (কালিয়াকৈর)',
          'Sreepur (শ্রীপুর)',
          'Kapasia (কাপাসিয়া)',
          'Kaliganj (কালীগঞ্জ)',
          'Board Bazar (বোর্ড বাজার)',
          'Konabari (কোনাবাড়ী)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Narayanganj',
        bnName: 'নারায়ণগঞ্জ',
        thanas: [
          'Narayanganj Sadar (নারায়ণগঞ্জ সদর)',
          'Fatullah (ফতুল্লা)',
          'Siddhirganj (সিদ্ধিরগঞ্জ)',
          'Bandar (বন্দর)',
          'Sonargaon (সোনারগাঁও)',
          'Rupganj (রূপগঞ্জ)',
          'Araihazar (আড়াইহাজার)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Tangail',
        bnName: 'টাঙ্গাইল',
        thanas: [
          'Tangail Sadar (টাঙ্গাইল সদর)',
          'Mirzapur (মির্জাপুর)',
          'Ghatail (ঘাটাইল)',
          'Kalihati (কালিহাতী)',
          'Sakhipur (সখিপুর)',
          'Madhupur (মধুপুর)',
          'Gopalpur (গোপালপুর)',
          'Delduar (দেলদুয়ার)',
          'Nagarpur (নাগরপুর)',
          'Bhuapur (ভূঞাপুর)',
          'Basail (বাসাইল)',
          'Dhanbari (ধনবাড়ী)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Narsingdi',
        bnName: 'নরসিংদী',
        thanas: [
          'Narsingdi Sadar (নরসিংদী সদর)',
          'Palash (পলাশ)',
          'Shibpur (শিবপুর)',
          'Raipura (রায়পুরা)',
          'Monohardi (মনোহরদী)',
          'Belabo (বেলাবো)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Manikganj',
        bnName: 'মানিকগঞ্জ',
        thanas: [
          'Manikganj Sadar (মানিকগঞ্জ সদর)',
          'Saturia (সাটুরিয়া)',
          'Singair (সিংগাইর)',
          'Shivalaya (শিবালয়)',
          'Harirampur (হরিরামপুর)',
          'Ghior (ঘিওরে)',
          'Daulatpur (দৌলতপুর)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Munshiganj',
        bnName: 'মুন্সীগঞ্জ',
        thanas: [
          'Munshiganj Sadar (মুন্সীগঞ্জ সদর)',
          'Sreenagar (শ্রীনগর)',
          'Sirajdikhan (সিরাজদিখান)',
          'Louhajang (লৌহজং)',
          'Tongibari (টংগিবাড়ী)',
          'Gazaria (গজারিয়া)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Faridpur',
        bnName: 'ফরিদপুর',
        thanas: [
          'Faridpur Sadar (ফরিদপুর সদর)',
          'Boalmari (বোয়ালমারী)',
          'Bhanga (ভাঙ্গা)',
          'Madhukhali (মধুখালী)',
          'Nagarkanda (নগরকান্দা)',
          'Alfadanga (আলফাডাঙ্গা)',
          'Sadarpur (সদরপুর)',
          'Charbhadrasan (চরভদ্রাসন)',
          'Saltha (সালথা)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Gopalganj',
        bnName: 'গোপালগঞ্জ',
        thanas: [
          'Gopalganj Sadar (গোপালগঞ্জ সদর)',
          'Kashiani (কাশিয়ানী)',
          'Kotalipara (কোটালীপাড়া)',
          'Muksudpur (মুকসুদপুর)',
          'Tungipara (টুঙ্গিপাড়া)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Madaripur',
        bnName: 'মাদারীপুর',
        thanas: [
          'Madaripur Sadar (মাদারীপুর সদর)',
          'Shibchar (শিবচর)',
          'Kalkini (কালকিনি)',
          'Rajoir (রাজৈর)',
          'Dasar (ডাসার)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Rajbari',
        bnName: 'রাজবাড়ী',
        thanas: [
          'Rajbari Sadar (রাজবাড়ী সদর)',
          'Pangsha (পাংশা)',
          'Kalukhali (কালুখালী)',
          'Baliakandi (বালিয়াকান্দি)',
          'Goalandaghat (গোয়ালন্দঘাট)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Shariatpur',
        bnName: 'শরীয়তপুর',
        thanas: [
          'Shariatpur Sadar (শরীয়তপুর সদর)',
          'Zajira (জাজিরা)',
          'Naria (নড়িয়া)',
          'Bhedarganj (ভেদরগঞ্জ)',
          'Damudya (ডামুড্যা)',
          'Gosairhat (গোসাইরহাট)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Kishoreganj',
        bnName: 'কিশোরগঞ্জ',
        thanas: [
          'Kishoreganj Sadar (কিশোরগঞ্জ সদর)',
          'Bhairab (ভৈরব)',
          'Bajitpur (বাজিতপুর)',
          'Katiadi (কটিয়াদী)',
          'Karimganj (করিমগঞ্জ)',
          'Kuliarchar (কুলিয়ারচর)',
          'Pakundia (পাকুন্দিয়া)',
          'Hossainpur (হোসেনপুর)',
          'Nikli (নিকলী)',
          'Austagram (অষ্টগ্রাম)',
          'Itna (ইটনা)',
          'Mithamain (মিঠামইন)',
          'Tarail (তাড়াইল)',
          'Other / অন্যান্য'
        ]
      }
    ]
  },
  {
    name: 'Chattogram',
    bnName: 'চট্টগ্রাম',
    districts: [
      {
        name: 'Chattogram',
        bnName: 'চট্টগ্রাম',
        thanas: [
          'Kotwali (কোতোয়ালী)',
          'Panchlaish (পাঁচলাইশ)',
          'Pahartali (পাহাড়তলী)',
          'Halishahar (হালিশহর)',
          'Agrabad / Double Mooring (আগ্রাবাদ / ডবলমুরিং)',
          'Chandgaon (চান্দগাঁও)',
          'Patenga (পতেঙ্গা)',
          'Bakalia (বাকলিয়া)',
          'Khulshi (খুলশী)',
          'Bayazid Bostami (বায়োজিদ বোস্তামী)',
          'Chittagong Port (চট্টগ্রাম বন্দর)',
          'Hathazari (হাটহাজারী)',
          'Sitakunda (সীতাকুণ্ড)',
          'Mirsharai (মীরসরাই)',
          'Patiya (পটিয়া)',
          'Raozan (রাউজান)',
          'Rangunia (রাঙ্গুনিয়া)',
          'Anwara (আনোয়ারা)',
          'Boalkhali (বোয়ালখালী)',
          'Banshkhali (বাঁশখালী)',
          'Chandanaish (চন্দনাইশ)',
          'Satkania (সাতকানিয়া)',
          'Lohagara (লোহাগাড়া)',
          'Karnaphuli (কর্ণফুলী)',
          'Sandwip (সন্দ্বীপ)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Cox\'s Bazar',
        bnName: 'কক্সবাজার',
        thanas: [
          'Cox\'s Bazar Sadar (কক্সবাজার সদর)',
          'Chakaria (চকোরিয়া)',
          'Teknaf (টেকনাফ)',
          'Ukhiya (উখিয়া)',
          'Ramu (রামু)',
          'Maheshkhali (মহেশখালী)',
          'Pekua (পেকুয়া)',
          'Kutubdia (কুতুবদিয়া)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Cumilla',
        bnName: 'কুমিল্লা',
        thanas: [
          'Cumilla Adarsha Sadar (কুমিল্লা আদর্শ সদর)',
          'Cumilla Sadar Dakshin (সদর দক্ষিণ)',
          'Daudkandi (দাউদকান্দি)',
          'Debidwar (দেবিদ্বার)',
          'Chandina (চান্দিনা)',
          'Laksam (লাকসাম)',
          'Muradnagar (মুরাদনগর)',
          'Burichang (বুড়িচং)',
          'Brahmanpara (ব্রাহ্মণপাড়া)',
          'Chauddagram (চৌদ্দগ্রাম)',
          'Barura (বরুড়া)',
          'Homna (হোমনা)',
          'Titas (তিতাস)',
          'Meghna (মেঘনা)',
          'Monoharganj (মনোহরগঞ্জ)',
          'Lalmai (লালমাই)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Feni',
        bnName: 'ফেনী',
        thanas: [
          'Feni Sadar (ফেনী সদর)',
          'Daganbhuiyan (দাগনভূঞা)',
          'Chhagalnaiya (ছাগলনাইয়া)',
          'Sonagazi (সোনাগাজী)',
          'Parshuram (পরশুরাম)',
          'Fulgazi (ফুলগাজী)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Brahmanbaria',
        bnName: 'ব্রাহ্মণবাড়িয়া',
        thanas: [
          'Brahmanbaria Sadar (ব্রাহ্মণবাড়িয়া সদর)',
          'Ashuganj (আশুগঞ্জ)',
          'Sarail (সরাইল)',
          'Kasba (কসবা)',
          'Nabinagar (নবীনগর)',
          'Bancharampur (বাঞ্ছারামপুর)',
          'Akhaura (আখাউড়া)',
          'Nasirnagar (নাসিরনগর)',
          'Bijoynagar (বিজয়নগর)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Noakhali',
        bnName: 'নোয়াখালী',
        thanas: [
          'Noakhali Sadar (নোয়াখালী সদর)',
          'Begumganj / Chowmuhani (বেগমগঞ্জ / চৌমুহনী)',
          'Chatkhil (চাটখিল)',
          'Senbagh (সেনবাগ)',
          'Companiganj (কোম্পানীগঞ্জ)',
          'Hatiya (হাতিয়া)',
          'Subarnachar (সুবর্ণচর)',
          'Kabirhat (কবিরহাট)',
          'Sonaimuri (সোনাইমুড়ী)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Chandpur',
        bnName: 'চাঁদপুর',
        thanas: [
          'Chandpur Sadar (চাঁদপুর সদর)',
          'Hajiganj (হাজীগঞ্জ)',
          'Faridganj (ফরিদগঞ্জ)',
          'Matlab Dakshin (মতলব দক্ষিণ)',
          'Matlab Uttar (মতলব উত্তর)',
          'Shahrasti (শাহরাস্তি)',
          'Kachua (কচুয়া)',
          'Haimchar (হাইমচর)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Lakshmipur',
        bnName: 'লক্ষ্মীপুর',
        thanas: [
          'Lakshmipur Sadar (লক্ষ্মীপুর সদর)',
          'Raipur (রায়পুর)',
          'Ramganj (রামগঞ্জ)',
          'Ramgati (রামগতি)',
          'Kamalnagar (কমলনগর)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Rangamati',
        bnName: 'রাঙ্গামাটি',
        thanas: [
          'Rangamati Sadar (রাঙ্গামাটি সদর)',
          'Kaptai (কাপ্তাই)',
          'Baghaichhari (বাঘাইছড়ি)',
          'Barkal (বরকল)',
          'Langadu (লংগদু)',
          'Rajasthali (রাজস্থলী)',
          'Belaichhari (বিলাইছড়ি)',
          'Juraichhari (জুরাইছড়ি)',
          'Naniarchar (নানিয়ারচর)',
          'Kaukhali (কাউখালী)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Bandarban',
        bnName: 'বান্দরবান',
        thanas: [
          'Bandarban Sadar (বান্দরবান সদর)',
          'Ruma (রুমা)',
          'Thanchi (থানচি)',
          'Lama (লামা)',
          'Ali Kadam (আলীকদম)',
          'Naikhongchhari (নাইক্ষ্যংছড়ি)',
          'Rowangchhari (রোয়াংছড়ি)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Khagrachhari',
        bnName: 'খাগড়াছড়ি',
        thanas: [
          'Khagrachhari Sadar (খাগড়াছড়ি সদর)',
          'Dighinala (দিঘীনালা)',
          'Panchhari (পানছড়ি)',
          'Mahalchhari (মহালছড়ি)',
          'Matiranga (মাটিরাঙ্গা)',
          'Ramgarh (রামগড়)',
          'Manikchhari (মানিকছড়ি)',
          'Lakshmichhari (লক্ষ্মীছড়ি)',
          'Guimara (গুইমারা)',
          'Other / অন্যান্য'
        ]
      }
    ]
  },
  {
    name: 'Sylhet',
    bnName: 'সিলেট',
    districts: [
      {
        name: 'Sylhet',
        bnName: 'সিলেট',
        thanas: [
          'Sylhet Sadar (সিলেট সদর)',
          'Kotwali (কোতোয়ালী)',
          'South Surma (দক্ষিণ সুরমা)',
          'Shah Paran (শাহ পরান)',
          'Beanibazar (বিয়ানীবাজার)',
          'Golapganj (গোলাপগঞ্জ)',
          'Zakiganj (জকিগঞ্জ)',
          'Kanaighat (কানাইঘাট)',
          'Jaintiapur (জৈন্তাপুর)',
          'Gowainghat (গোয়াইনঘাট)',
          'Companiganj (কোম্পানীগঞ্জ)',
          'Fenchuganj (ফেঞ্চুগঞ্জ)',
          'Balaganj (বালাগঞ্জ)',
          'Biswanath (বিশ্বনাথ)',
          'Osmani Nagar (ওসমানী নগর)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Moulvibazar',
        bnName: 'মৌলভীবাজার',
        thanas: [
          'Moulvibazar Sadar (মৌলভীবাজার সদর)',
          'Sreemangal (শ্রীমঙ্গল)',
          'Kamalganj (কমলগঞ্জ)',
          'Kulaura (কুলাউড়া)',
          'Barlekha (বড়লেখা)',
          'Rajnagar (রাজনগর)',
          'Juri (জুড়ী)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Habiganj',
        bnName: 'হবিগঞ্জ',
        thanas: [
          'Habiganj Sadar (হবিগঞ্জ সদর)',
          'Madhabpur (মাধবপুর)',
          'Nabiganj (নবীগঞ্জ)',
          'Bahubal (বাহুবল)',
          'Chunarughat (চুনারুঘাট)',
          'Baniachong (বানিয়াচং)',
          'Ajmiriganj (আজমিরীগঞ্জ)',
          'Lakhai (লাখাই)',
          'Shayestaganj (শায়েস্তাগঞ্জ)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Sunamganj',
        bnName: 'সুনামগঞ্জ',
        thanas: [
          'Sunamganj Sadar (সুনামগঞ্জ সদর)',
          'Chhatak (ছাতক)',
          'Jagannathpur (জগন্নাথপুর)',
          'Derai (দিরাই)',
          'Dowarabazar (দোয়ারাবাজার)',
          'Tahirpur (তাহিরপুর)',
          'Dharampasha (ধরমপাশা)',
          'Jamalganj (জামালগঞ্জ)',
          'Shalla (শাল্লা)',
          'Bishwamvarpur (বিশ্বম্ভরপুর)',
          'South Sunamganj (দক্ষিণ সুনামগঞ্জ)',
          'Madhyanagar (মধ্যনগর)',
          'Other / অন্যান্য'
        ]
      }
    ]
  },
  {
    name: 'Rajshahi',
    bnName: 'রাজশাহী',
    districts: [
      {
        name: 'Rajshahi',
        bnName: 'রাজশাহী',
        thanas: [
          'Boalia (বোয়ালিয়া)',
          'Motihar (মতিহার)',
          'Rajpara (রাজপাড়া)',
          'Shah Makhdum (শাহ মখদুম)',
          'Chandrima (চন্দ্রিমা)',
          'Kashiadanga (কাশিয়াডাঙ্গা)',
          'Katakhali (কাটাখালী)',
          'Paba (পবা)',
          'Godagari (গোদাগাড়ী)',
          'Tanore (তানোর)',
          'Bagmara (বাগমারা)',
          'Charghat (চারঘাট)',
          'Durgapur (দুর্গাপুর)',
          'Puthia (পুঠিয়া)',
          'Bagha (বাঘা)',
          'Mohanpur (মোহনপুর)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Bogura',
        bnName: 'বগুড়া',
        thanas: [
          'Bogura Sadar (বগুড়া সদর)',
          'Sherpur (শেরপুর)',
          'Shajahanpur (শাজাহানপুর)',
          'Dhunat (ধুনট)',
          'Sariakandi (সারিয়াকান্দি)',
          'Gabtali (গাবতলী)',
          'Shibganj (শিবগঞ্জ)',
          'Adamdighi (আদমদিঘী)',
          'Nandigram (নন্দীগ্রাম)',
          'Sonatala (সোনাতলা)',
          'Kahaloo (কাহালু)',
          'Dupchanchia (দুপচাঁচিয়া)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Pabna',
        bnName: 'পাবনা',
        thanas: [
          'Pabna Sadar (পাবনা সদর)',
          'Ishwardi (ঈশ্বরদী)',
          'Sujanagar (সুজানগর)',
          'Santhia (সাঁথিয়া)',
          'Chatmohar (চাটমোহর)',
          'Bera (বেড়া)',
          'Atgharia (আটঘরিয়া)',
          'Faridpur (ফরিদপুর)',
          'Bhangura (ভাঙ্গুড়া)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Sirajganj',
        bnName: 'সিরাজগঞ্জ',
        thanas: [
          'Sirajganj Sadar (সিরাজগঞ্জ সদর)',
          'Shahjadpur (শাহজাদপুর)',
          'Ullapara (উল্লাপাড়া)',
          'Belkuchi (বেলকুচি)',
          'Kazipur (কাজীপুর)',
          'Kamarkhanda (কামারখন্দ)',
          'Raiganj (রায়গঞ্জ)',
          'Tarash (তাড়াশ)',
          'Chauhali (চৌহালী)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Naogaon',
        bnName: 'নওগাঁ',
        thanas: [
          'Naogaon Sadar (নওগাঁ সদর)',
          'Manda (মান্দা)',
          'Mohadevpur (মহাদেবপুর)',
          'Patnitala (পত্নীতলা)',
          'Dhamoirhat (ধামইরহাট)',
          'Badalgachhi (বদলগাছী)',
          'Niamatpur (নিয়ামতপুর)',
          'Sapahar (সাপাহার)',
          'Porsha (পোরশা)',
          'Raninagar (রাণীনগর)',
          'Atrai (আত্রাই)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Natore',
        bnName: 'নাটোর',
        thanas: [
          'Natore Sadar (নাটোর সদর)',
          'Singra (সিংড়া)',
          'Baraigram (বড়াইগ্রাম)',
          'Gurudaspur (গুরুদাসপুর)',
          'Lalpur (লালপুর)',
          'Bagatipara (বাগাতিপাড়া)',
          'Naldanga (নলডাঙ্গা)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Chapainawabganj',
        bnName: 'চাঁপাইনবাবগঞ্জ',
        thanas: [
          'Chapainawabganj Sadar (চাঁপাইনবাবগঞ্জ সদর)',
          'Shibganj (শিবগঞ্জ)',
          'Gomastapur (গোমস্তাপুর)',
          'Nachole (নাচোল)',
          'Bholahat (ভোলাহাট)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Joypurhat',
        bnName: 'জয়পুরহাট',
        thanas: [
          'Joypurhat Sadar (জয়পুরহাট সদর)',
          'Panchbibi (পাঁচবিবি)',
          'Kalai (কালাই)',
          'Khetlal (ক্ষেতলাল)',
          'Akkelpur (আক্কেলপুর)',
          'Other / অন্যান্য'
        ]
      }
    ]
  },
  {
    name: 'Khulna',
    bnName: 'খুলনা',
    districts: [
      {
        name: 'Khulna',
        bnName: 'খুলনা',
        thanas: [
          'Khulna Sadar (খুলনা সদর)',
          'Sonadanga (সোনাডাঙ্গা)',
          'Khalishpur (খালিশপুর)',
          'Daulatpur (দৌলতপুর)',
          'Khan Jahan Ali (খান জাহান আলী)',
          'Harintana (হরিণটানা)',
          'Dumuria (ডুমুরিয়া)',
          'Rupsha (রূপসা)',
          'Paikgachha (পাইকগাছা)',
          'Batiaghata (বটিয়াঘাটা)',
          'Koyra (কয়রা)',
          'Phultala (ফুলতলা)',
          'Dighalia (দিঘলিয়া)',
          'Terokhada (তেরখাদা)',
          'Dacope (দাকোপ)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Jashore',
        bnName: 'যশোর',
        thanas: [
          'Jashore Sadar (যশোর সদর)',
          'Sharsha (শার্শা)',
          'Jhikargachha (ঝিকরগাছা)',
          'Manirampur (মণিরামপুর)',
          'Keshabpur (কেশবপুর)',
          'Abhaynagar (অভয়নগর)',
          'Bagherpara (বাঘারপাড়া)',
          'Chaugachha (চৌগাছা)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Kushtia',
        bnName: 'কুষ্টিয়া',
        thanas: [
          'Kushtia Sadar (কুষ্টিয়া সদর)',
          'Kumarkhali (কুমারখালী)',
          'Mirpur (মিরপুর)',
          'Bheramara (ভেড়ামারা)',
          'Daulatpur (দৌলতপুর)',
          'Khoksa (খোকসা)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Satkhira',
        bnName: 'সাতক্ষীরা',
        thanas: [
          'Satkhira Sadar (সাতক্ষীরা সদর)',
          'Kalaroa (কলারোয়া)',
          'Tala (তালা)',
          'Kaliganj (কালীগঞ্জ)',
          'Shyamnagar (শ্যামনগর)',
          'Assasuni (আশাশুনি)',
          'Debhata (দেবহাটা)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Bagerhat',
        bnName: 'বাগেরহাট',
        thanas: [
          'Bagerhat Sadar (বাগেরহাট সদর)',
          'Mongla (মোংলা)',
          'Morrelganj (মোড়েলগঞ্জ)',
          'Fakirhat (ফকিরহাট)',
          'Rampal (রামপাল)',
          'Kachua (কচুয়া)',
          'Chitalmari (চিতলমারী)',
          'Sarankhola (শরণখোলা)',
          'Mollahat (মোল্লাহাট)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Jhenaidah',
        bnName: 'ঝিনাইদহ',
        thanas: [
          'Jhenaidah Sadar (ঝিনাইদহ সদর)',
          'Kaliganj (কালীগঞ্জ)',
          'Kotchandpur (কোটচাঁদপুর)',
          'Maheshpur (মহেশপুর)',
          'Shailkupa (শৈলকুপা)',
          'Harinakunda (হরিণাকুণ্ডু)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Chuadanga',
        bnName: 'চুয়াডাঙ্গা',
        thanas: [
          'Chuadanga Sadar (চুয়াডাঙ্গা সদর)',
          'Alamdanga (আলমডাঙ্গা)',
          'Damurhuda (দামুড়হুদা)',
          'Jibannagar (জীবননগর)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Magura',
        bnName: 'মাগুরা',
        thanas: [
          'Magura Sadar (মাগুরা সদর)',
          'Sreepur (শ্রীপুর)',
          'Mohammadpur (মহম্মদপুর)',
          'Shalikha (শালিখা)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Meherpur',
        bnName: 'মেহেরপুর',
        thanas: [
          'Meherpur Sadar (মেহেরপুর সদর)',
          'Gangni (গাংনী)',
          'Mujibnagar (মুজিবনগর)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Narail',
        bnName: 'নড়াইল',
        thanas: [
          'Narail Sadar (নড়াইল সদর)',
          'Lohagara (লোহাগড়া)',
          'Kalia (কালিয়া)',
          'Other / অন্যান্য'
        ]
      }
    ]
  },
  {
    name: 'Barishal',
    bnName: 'বরিশাল',
    districts: [
      {
        name: 'Barishal',
        bnName: 'বরিশাল',
        thanas: [
          'Kotwali / Barishal Sadar (কোতোয়ালী / সদর)',
          'Airport (এয়ারপোর্ট)',
          'Bakerganj (বাকেরগঞ্জ)',
          'Babuganj (বাবুগঞ্জ)',
          'Wazirpur (উজিরপুর)',
          'Banaripara (বানারীপাড়া)',
          'Gournadi (গৌরনদী)',
          'Agailjhara (আগৈলঝাড়া)',
          'Mehendiganj (মেহেন্দিগঞ্জ)',
          'Muladi (মুলাদী)',
          'Hizla (হিজলা)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Patuakhali',
        bnName: 'পটুয়াখালী',
        thanas: [
          'Patuakhali Sadar (পটুয়াখালী সদর)',
          'Galachipa (গলাচিপা)',
          'Kalapara / Kuakata (কলাপাড়া / কুয়াকাটা)',
          'Bauphal (বাউফল)',
          'Dumki (দুমকি)',
          'Mirzaganj (মির্জাগঞ্জ)',
          'Dashmina (দশমিনা)',
          'Rangabali (রাঙ্গাবালী)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Bhola',
        bnName: 'ভোলা',
        thanas: [
          'Bhola Sadar (ভোলা সদর)',
          'Lalmohan (লালমোহন)',
          'Char Fasson (চরফ্যাশন)',
          'Borhanuddin (বোরহানউদ্দিন)',
          'Daulatkhan (দৌলতখান)',
          'Tazumuddin (তজুমদ্দিন)',
          'Monpura (মনপুরা)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Pirojpur',
        bnName: 'পিরোজপুর',
        thanas: [
          'Pirojpur Sadar (পিরোজপুর সদর)',
          'Mathbaria (মঠবাড়িয়া)',
          'Bhandaria (ভাণ্ডারিয়া)',
          'Nesarabad / Swarupkati (নেছারাবাদ / স্বরূপকাঠি)',
          'Nazirpur (নাজিরপুর)',
          'Kawkhali (কাউখালী)',
          'Zianagar / Indurkani (ইন্দুরকানী)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Barguna',
        bnName: 'বরগুনা',
        thanas: [
          'Barguna Sadar (বরগুনা সদর)',
          'Amtali (আমতলী)',
          'Patharghata (পাথরঘাটা)',
          'Betagi (বেতাগী)',
          'Bamna (বামনা)',
          'Taltali (তালতলী)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Jhalokati',
        bnName: 'ঝালকাঠি',
        thanas: [
          'Jhalokati Sadar (ঝালকাঠি সদর)',
          'Nalchity (নলছিটি)',
          'Rajapur (রাজাপুর)',
          'Kathalia (কাঠালিয়া)',
          'Other / অন্যান্য'
        ]
      }
    ]
  },
  {
    name: 'Rangpur',
    bnName: 'রংপুর',
    districts: [
      {
        name: 'Rangpur',
        bnName: 'রংপুর',
        thanas: [
          'Kotwali / Rangpur Sadar (কোতোয়ালী / রংপুর সদর)',
          'Tajhat (তাজহাট)',
          'Mahi Ganj (মাহিগঞ্জ)',
          'Haragach (হারাগাছ)',
          'Pirgachha (পীরগাছা)',
          'Mithapukur (মিঠাপুকুর)',
          'Badarganj (বদরগঞ্জ)',
          'Pirganj (পীরগঞ্জ)',
          'Kaunia (কাউনিয়া)',
          'Gangachhara (গঙ্গাচড়া)',
          'Taraganj (তারাগঞ্জ)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Dinajpur',
        bnName: 'দিনাজপুর',
        thanas: [
          'Dinajpur Sadar (দিনাজপুর সদর)',
          'Birganj (বীরগঞ্জ)',
          'Parbatipur (পার্বতীপুর)',
          'Phulbari (ফুলবাড়ী)',
          'Birampur (বিরামপুর)',
          'Bochaganj (বোচাগঞ্জ)',
          'Chirirbandar (চিরিরবন্দর)',
          'Kaharole (কাহারোল)',
          'Khansama (খানসামা)',
          'Ghoraghat (ঘোড়াঘাট)',
          'Hakimpur (হাকিমপুর)',
          'Nababganj (নবাবগঞ্জ)',
          'Birol (বিরল)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Gaibandha',
        bnName: 'গাইবান্ধা',
        thanas: [
          'Gaibandha Sadar (গাইবান্ধা সদর)',
          'Gobindaganj (গোবিন্দগঞ্জ)',
          'Sundarganj (সুন্দরগঞ্জ)',
          'Palashbari (পলাশবাড়ী)',
          'Sadullapur (সাদুল্লাপুর)',
          'Saghata (সাঘাটা)',
          'Phulchhari (ফুলছড়ি)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Kurigram',
        bnName: 'কুড়িগ্রাম',
        thanas: [
          'Kurigram Sadar (কুড়িগ্রাম সদর)',
          'Nageshwari (নাগেশ্বরী)',
          'Bhurungamari (ভুরুঙ্গামারী)',
          'Ulipur (উলিপুর)',
          'Chilmari (চিলমারী)',
          'Rajarhat (রাজারহাট)',
          'Phulbari (ফুলবাড়ী)',
          'Roumari (রৌমারী)',
          'Char Rajibpur (চর রাজিবপুর)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Nilphamari',
        bnName: 'নীলফামারী',
        thanas: [
          'Nilphamari Sadar (নীলফামারী সদর)',
          'Saidpur (সৈয়দপুর)',
          'Jaldhaka (জলঢাকা)',
          'Kishoreganj (কিশোরগঞ্জ)',
          'Domar (ডোমার)',
          'Dimla (ডিমলা)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Thakurgaon',
        bnName: 'ঠাকুরগাঁও',
        thanas: [
          'Thakurgaon Sadar (ঠাকুরগাঁও সদর)',
          'Pirganj (পীরগঞ্জ)',
          'Ranisankail (রাণীশংকৈল)',
          'Haripur (হরিপুর)',
          'Baliadangi (বালিয়াডাঙ্গী)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Panchagarh',
        bnName: 'পঞ্চগড়',
        thanas: [
          'Panchagarh Sadar (পঞ্চগড় সদর)',
          'Tetulia (তেঁতুলিয়া)',
          'Boda (বোদা)',
          'Debiganj (দেবীগঞ্জ)',
          'Atwari (আটোয়ারী)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Lalmonirhat',
        bnName: 'লালমনিরহাট',
        thanas: [
          'Lalmonirhat Sadar (লালমনিরহাট সদর)',
          'Aditmari (আদিতমারী)',
          'Kaliganj (কালীগঞ্জ)',
          'Hatibandha (হাতীবান্ধা)',
          'Patgram (পাটগ্রাম)',
          'Other / অন্যান্য'
        ]
      }
    ]
  },
  {
    name: 'Mymensingh',
    bnName: 'ময়মনসিংহ',
    districts: [
      {
        name: 'Mymensingh',
        bnName: 'ময়মনসিংহ',
        thanas: [
          'Kotwali / Mymensingh Sadar (কোতোয়ালী / সদর)',
          'Muktagachha (মুক্তাগাছা)',
          'Trishal (ত্রিশাল)',
          'Bhaluka (ভালুকা)',
          'Gafargaon (গফরগাঁও)',
          'Ishwarganj (ঈশ্বরগঞ্জ)',
          'Phulpur (ফুলপুর)',
          'Haluaghat (হালুয়াঘাট)',
          'Gouripur (গৌরীপুর)',
          'Dhobaura (ধোবাউড়া)',
          'Nandail (নান্দাইল)',
          'Tara Khanda (তারাকান্দা)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Jamalpur',
        bnName: 'জামালপুর',
        thanas: [
          'Jamalpur Sadar (জামালপুর সদর)',
          'Sarishabari (সরিষাবাড়ী)',
          'Melandaha (মেলান্দহ)',
          'Islampur (ইসলামপুর)',
          'Dewanganj (দেওয়ানগঞ্জ)',
          'Madarganj (মাদারগঞ্জ)',
          'Bakshiganj (বকশীগঞ্জ)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Netrokona',
        bnName: 'নেত্রকোণা',
        thanas: [
          'Netrokona Sadar (নেত্রকোণা সদর)',
          'Kendua (কেন্দুয়া)',
          'Durgapur (দুর্গাপুর)',
          'Mohanganj (মোহনগঞ্জ)',
          'Barhatta (বারহাট্টা)',
          'Kalmakanda (কলমাকান্দা)',
          'Atpara (আটপাড়া)',
          'Madan (মদন)',
          'Khaliajuri (খালিয়াজুরী)',
          'Purbadhala (পূর্বধলা)',
          'Other / অন্যান্য'
        ]
      },
      {
        name: 'Sherpur',
        bnName: 'শেরপুর',
        thanas: [
          'Sherpur Sadar (শেরপুর সদর)',
          'Nalitabari (নালিতাবাড়ী)',
          'Nakla (নকলা)',
          'Sreebardi (শ্রীবরদী)',
          'Jhenaigati (ঝিনাইগাতী)',
          'Other / অন্যান্য'
        ]
      }
    ]
  }
];
