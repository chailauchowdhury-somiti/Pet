import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Stethoscope,
  ArrowRight,
  Play,
  Check,
  Menu,
  X,
  ChevronDown,
  Search,
  Calendar,
  Clock,
  ShieldCheck,
  Star,
  PawPrint,
  Home,
  BookOpen,
  User,
  ShoppingBasket,
  Plus,
  Minus,
  Trash2,
  Filter,
  Sparkles,
  PhoneCall,
  Video,
  CheckCircle2,
  MessageCircle,
  MapPin,
  ExternalLink
} from 'lucide-react';

// Image assets generated for PetMama
const HERO_PETS_IMG = '/src/assets/images/hero_pets_1791085248853.jpg';
const ADOPT_PUPPY_IMG = '/src/assets/images/pet_adoption_1_1791085259919.jpg';
const ADOPT_CAT_IMG = '/src/assets/images/pet_adoption_2_1791085270639.jpg';
const SHOP_FOOD_IMG = '/src/assets/images/shop_pet_food_1791085280577.jpg';

// Story journey & Info Page image assets (Authentic Bangladeshi Local Context)
const STORY_LONELY_IMG = '/src/assets/images/story_lonely_bd_v2_1791091461419.jpg';
const STORY_STRUGGLE_IMG = '/src/assets/images/story_struggle_bd_1791089930587.jpg';
const STORY_KINDNESS_IMG = '/src/assets/images/story_kindness_bd_1791089943441.jpg';
const STORY_RESCUE_IMG = '/src/assets/images/story_rescue_bd_1791089954595.jpg';
const STORY_HOPE_IMG = '/src/assets/images/story_hope_bd_1791089966659.jpg';
const APP_DOWNLOAD_PUPPY_IMG = '/src/assets/images/app_download_puppy_bd_1791091449139.jpg';
const PET_TRANSFER_CARE_IMG = '/src/assets/images/pet_transfer_care_1791094224683.jpg';
const VET_CARE_PLAN_IMG = '/src/assets/images/veterinarian_care_plan_1791094239960.jpg';

// Types
type ActiveTab =
  | 'home'
  | 'story'
  | 'how-it-works'
  | 'pet-care'
  | 'pet-care-plan'
  | 'welfare'
  | 'stories'
  | 'about'
  | 'contact'
  | 'shop'
  | 'adopt'
  | 'doctor';

interface CartItem {
  id: string;
  name: string;
  category: string;
  priceTK: number;
  quantity: number;
  image: string;
  rating: number;
}

interface ShopProduct {
  id: string;
  name: string;
  category: 'Dog' | 'Cat' | 'Rabbit' | 'Fish' | 'Toys' | 'Apparel' | 'Medicine';
  priceTK: number;
  image: string;
  rating: number;
  description: string;
  badge?: string;
}

interface AdoptionPost {
  id: string;
  title: string;
  petName: string;
  type: 'Dog' | 'Cat' | 'Rabbit' | 'Bird';
  postType: 'free' | 'paid';
  priceTK: number;
  age: string;
  breed: string;
  gender: string;
  location: string;
  image: string;
  healthStatus: string;
  description: string;
  guardianName: string;
  phone: string;
  postedDate: string;
}

interface PetProfile {
  id: string;
  name: string;
  breed: string;
  type: 'dog' | 'cat';
  age: string;
  gender: string;
  location: string;
  image: string;
  personality: string[];
  medicalHistory: string;
}

interface VetDoctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  availability: string;
  experience: string;
  type: 'Telehealth' | 'In-Clinic' | 'Home Visit';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  
  // Interactive Drawers / Modals
  const [shopDrawerOpen, setShopDrawerOpen] = useState(false);
  const [adoptDrawerOpen, setAdoptDrawerOpen] = useState(false);
  const [vetModalOpen, setVetModalOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);

  // Shop state
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 's1',
      name: 'Royal Canin Adult Dry Dog Food (1.2kg)',
      category: 'Dog',
      priceTK: 1450,
      quantity: 1,
      image: SHOP_FOOD_IMG,
      rating: 4.9
    }
  ]);
  const [shopCategoryFilter, setShopCategoryFilter] = useState<'All' | 'Dog' | 'Cat' | 'Rabbit' | 'Fish' | 'Toys' | 'Apparel' | 'Medicine'>('All');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderSuccessModalOpen, setOrderSuccessModalOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: 'Anika Chowdhury',
    phone: '01712345678',
    address: 'House 42, Road 11, Banani, Dhaka',
    paymentMethod: 'Cash on Delivery' as 'Cash on Delivery' | 'bKash' | 'Nagad'
  });
  const [lastOrderDetails, setLastOrderDetails] = useState<{ id: string; totalTK: number; date: string } | null>(null);

  // Adoption & Rehoming Feed state
  const [adoptionPosts, setAdoptionPosts] = useState<AdoptionPost[]>([
    {
      id: 'post-1',
      title: 'Rescued Local Puppy Looking for a Loving Family',
      petName: 'Barnaby',
      type: 'Dog',
      postType: 'free',
      priceTK: 0,
      age: '3 Months',
      breed: 'Local Street Rescue',
      gender: 'Male',
      location: 'Dhanmondi, Dhaka',
      image: ADOPT_PUPPY_IMG,
      healthStatus: 'First Rabies Shot Done · Dewormed',
      description: 'Barnaby was rescued from a rainy street corner. He is gentle, energetic, kid-friendly, and looking for a loving home.',
      guardianName: 'Ayesha Rahman',
      phone: '01711223344',
      postedDate: '2 hours ago'
    },
    {
      id: 'post-2',
      title: 'Gentle Ginger Tabby Kitten (Free Adoption)',
      petName: 'Nala',
      type: 'Cat',
      postType: 'free',
      priceTK: 0,
      age: '2 Months',
      breed: 'Domestic Short Hair',
      gender: 'Female',
      location: 'Uttara, Dhaka',
      image: ADOPT_CAT_IMG,
      healthStatus: 'Litter Trained · Health Checked',
      description: 'Super affectionate ginger kitten. Loves cuddling and playing with wool balls. Free for a caring indoor family.',
      guardianName: 'Tanvir Hossain',
      phone: '01899887766',
      postedDate: 'Yesterday'
    },
    {
      id: 'post-3',
      title: 'Healthy Netherland Dwarf Bunny Pair for Rehoming',
      petName: 'Snowflake & Fluffy',
      type: 'Rabbit',
      postType: 'paid',
      priceTK: 2200,
      age: '5 Months',
      breed: 'Netherland Dwarf Rabbit',
      gender: 'Pair (Male & Female)',
      location: 'Mirpur, Dhaka',
      image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=600',
      healthStatus: 'Dewormed · Hay Trained',
      description: 'Rehoming due to relocation. Both bunnies are calm, accustomed to human handling, and love eating timothy hay.',
      guardianName: 'Sadia Islam',
      phone: '01922334455',
      postedDate: '1 day ago'
    },
    {
      id: 'post-4',
      title: 'Purebred Persian Male Kitten (Vaccinated)',
      petName: 'Simba',
      type: 'Cat',
      postType: 'paid',
      priceTK: 6500,
      age: '3.5 Months',
      breed: 'Doll Face Persian',
      gender: 'Male',
      location: 'GEC Circle, Chittagong',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
      healthStatus: 'FVRCP Vaccinated · Litter Box Trained',
      description: 'Fluffy white Persian kitten with bright blue eyes. Very gentle and healthy. Rehoming fee includes starter food pack.',
      guardianName: 'Mahir Chowdhury',
      phone: '01655443322',
      postedDate: '3 days ago'
    }
  ]);
  const [feedTypeFilter, setFeedTypeFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [petTypeFilter, setPetTypeFilter] = useState<'all' | 'Dog' | 'Cat' | 'Rabbit' | 'Bird'>('all');
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [inquirePost, setInquirePost] = useState<AdoptionPost | null>(null);

  // Post Pet Form State
  const [newPost, setNewPost] = useState({
    title: '',
    petName: '',
    type: 'Dog' as 'Dog' | 'Cat' | 'Rabbit' | 'Bird',
    postType: 'free' as 'free' | 'paid',
    priceTK: 0,
    age: '3 Months',
    breed: 'Local Cross',
    gender: 'Male',
    location: 'Dhaka',
    phone: '01712345678',
    description: ''
  });

  // Pet Care Plan Vaccine Toggle State
  const [includeVaccination, setIncludeVaccination] = useState(false);

  // Adoption state
  const [selectedPet, setSelectedPet] = useState<PetProfile | null>(null);
  const [adoptFilter, setAdoptFilter] = useState<'all' | 'dog' | 'cat'>('all');
  const [adoptSubmitted, setAdoptSubmitted] = useState(false);

  // Vet Booking state
  const [selectedVet, setSelectedVet] = useState<VetDoctor | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-10-05');
  const [bookingTime, setBookingTime] = useState('10:30 AM');
  const [bookingPetName, setBookingPetName] = useState('Luna');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);

  const copyCouponCode = () => {
    navigator.clipboard.writeText('WELCOME15');
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 2500);
  };

  // Sample Shop Items in BDT / TK
  const shopProducts: ShopProduct[] = [
    {
      id: 's1',
      name: 'Royal Canin Adult Dry Dog Food (1.2kg)',
      category: 'Dog',
      priceTK: 1450,
      image: SHOP_FOOD_IMG,
      rating: 4.9,
      description: 'High-protein balanced formula for adult dogs with omega-3 fatty acids.',
      badge: 'Best Seller'
    },
    {
      id: 's2',
      name: 'Durable Rubber Spike Chew & Dental Toy',
      category: 'Dog',
      priceTK: 380,
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600',
      rating: 4.8,
      description: 'Relieves anxiety, massages gums, and cleans teeth while playing.'
    },
    {
      id: 's3',
      name: 'Waterproof Padded Winter Dog Jacket',
      category: 'Dog',
      priceTK: 850,
      image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
      description: 'Cozy fleece lining with reflective safety stripes for night walks.'
    },
    {
      id: 's4',
      name: 'Whiskas Wet Cat Food Pouches (Pack of 12)',
      category: 'Cat',
      priceTK: 1150,
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
      rating: 5.0,
      description: 'Delicious ocean fish in gravy for healthy fur and strong digestion.',
      badge: 'Popular'
    },
    {
      id: 's5',
      name: 'Interactive Catnip Feather Teaser Wand',
      category: 'Cat',
      priceTK: 350,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
      rating: 4.7,
      description: 'Flexible wand with natural feathers and bell for endless agility fun.'
    },
    {
      id: 's6',
      name: 'Ultra Odor-Control Clumping Cat Litter (5L)',
      category: 'Cat',
      priceTK: 680,
      image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=600',
      rating: 4.8,
      description: '99% dust-free bentonite clay with instant quick-clumping action.'
    },
    {
      id: 's7',
      name: 'Premium Sun-Cured Timothy Hay (1kg)',
      category: 'Rabbit',
      priceTK: 550,
      image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
      description: 'High-fiber essential hay for rabbits (khorgosh), guinea pigs & hamsters.',
      badge: 'Essential'
    },
    {
      id: 's8',
      name: 'Organic Alfalfa & Veggie Khorgosh Pellets',
      category: 'Rabbit',
      priceTK: 420,
      image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=600',
      rating: 4.8,
      description: 'Fortified with Vitamin C and essential minerals for young bunnies.'
    },
    {
      id: 's9',
      name: 'TetraMin Tropical Fish Flake Meal (100g)',
      category: 'Fish',
      priceTK: 320,
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
      description: 'Clear-water bio-active formula for all aquarium fish species.'
    },
    {
      id: 's10',
      name: 'Goldfish Color Enhancing Granule Pellets (200g)',
      category: 'Fish',
      priceTK: 480,
      image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=600',
      rating: 4.7,
      description: 'Spirulina-enriched sinking granules for vibrant fish scales.'
    },
    {
      id: 's11',
      name: 'Interactive Squeaky Plush Pet Toy Set',
      category: 'Toys',
      priceTK: 280,
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600',
      rating: 4.8,
      description: 'Soft washable squeaky plush set for dogs and cats.'
    },
    {
      id: 's12',
      name: 'Soft Knitted Pet Fleece Sweater',
      category: 'Apparel',
      priceTK: 520,
      image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
      description: 'Breathable, stretchable winter sweater for dogs, cats, and rabbits.'
    },
    {
      id: 's13',
      name: 'Multivitamin & Calcium Syrup for Pets (200ml)',
      category: 'Medicine',
      priceTK: 420,
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
      description: 'Promotes bone growth, shiny fur, and strong immune defense.'
    }
  ];

  // Sample Adoption Pets
  const petsForAdoption: PetProfile[] = [
    {
      id: 'p1',
      name: 'Barnaby',
      breed: 'Australian Shepherd Mix',
      type: 'dog',
      age: '5 months',
      gender: 'Male',
      location: 'San Francisco, CA',
      image: ADOPT_PUPPY_IMG,
      personality: ['Playful', 'Groomed', 'Kid-friendly', 'Vaccinated'],
      medicalHistory: 'Up to date on all shots, neutered, chip registered.'
    },
    {
      id: 'p2',
      name: 'Milo & Cleo',
      breed: 'Ginger Tabby',
      type: 'cat',
      age: '1 year',
      gender: 'Female',
      location: 'Oakland, CA',
      image: ADOPT_CAT_IMG,
      personality: ['Affectionate', 'Purr machine', 'Indoor', 'Loves cuddles'],
      medicalHistory: 'Vet checked, health certificate available.'
    },
    {
      id: 'p3',
      name: 'Rosie',
      breed: 'Golden Retriever',
      type: 'dog',
      age: '2 years',
      gender: 'Female',
      location: 'San Jose, CA',
      image: HERO_PETS_IMG,
      personality: ['Gentle', 'Leash trained', 'Social', 'Great with cats'],
      medicalHistory: 'Fully health screened, microchipped.'
    }
  ];

  // Sample Vet Doctors
  const vetDoctors: VetDoctor[] = [
    {
      id: 'v1',
      name: 'Dr. Sarah Jenkins, DVM',
      specialty: 'Feline & Canine Preventive Health',
      rating: 4.9,
      reviewsCount: 128,
      availability: 'Today at 2:00 PM',
      experience: '12 yrs exp.',
      type: 'Telehealth'
    },
    {
      id: 'v2',
      name: 'Dr. Aris Vance, VMD',
      specialty: 'Veterinary Dermatology & Nutrition',
      rating: 5.0,
      reviewsCount: 94,
      availability: 'Tomorrow at 10:30 AM',
      experience: '8 yrs exp.',
      type: 'In-Clinic'
    },
    {
      id: 'v3',
      name: 'Dr. Maya Lin, DVM',
      specialty: 'Holistic Care & Urgent Consults',
      rating: 4.9,
      reviewsCount: 210,
      availability: 'Today at 4:15 PM',
      experience: '15 yrs exp.',
      type: 'Home Visit'
    }
  ];

  const cartTotalTK = cart.reduce((sum, item) => sum + item.priceTK * item.quantity, 0);

  const addToCart = (product: ShopProduct) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setShopDrawerOpen(true);
  };

  const buyNowProduct = (product: ShopProduct) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCheckoutModalOpen(true);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.petName || !newPost.phone) return;
    const created: AdoptionPost = {
      id: `post-${Date.now()}`,
      title: newPost.title,
      petName: newPost.petName,
      type: newPost.type,
      postType: newPost.postType,
      priceTK: newPost.postType === 'free' ? 0 : Number(newPost.priceTK) || 500,
      age: newPost.age || '3 Months',
      breed: newPost.breed || 'Cross Breed',
      gender: newPost.gender,
      location: newPost.location || 'Dhaka',
      image: newPost.type === 'Dog' ? ADOPT_PUPPY_IMG : newPost.type === 'Cat' ? ADOPT_CAT_IMG : 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=600',
      healthStatus: 'Health Checked · Dewormed',
      description: newPost.description || 'Looking for a kind and caring family.',
      guardianName: 'Community Member',
      phone: newPost.phone,
      postedDate: 'Just now'
    };
    setAdoptionPosts([created, ...adoptionPosts]);
    setCreatePostModalOpen(false);
    setNewPost({
      title: '',
      petName: '',
      type: 'Dog',
      postType: 'free',
      priceTK: 0,
      age: '3 Months',
      breed: 'Local Cross',
      gender: 'Male',
      location: 'Dhaka',
      phone: '01712345678',
      description: ''
    });
    alert('🎉 Your Pet Adoption / Rehoming Post is now live on PetMama!');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `PETMAMA-BD-${Math.floor(10000 + Math.random() * 90000)}`;
    setLastOrderDetails({
      id: orderId,
      totalTK: cartTotalTK,
      date: new Date().toLocaleDateString('en-GB')
    });
    setCart([]);
    setCheckoutModalOpen(false);
    setShopDrawerOpen(false);
    setOrderSuccessModalOpen(true);
  };

  const navigateTo = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="petmama-page">
      {/* Subtle paper grain overlay */}
      <div className="grain" aria-hidden="true"></div>

      {/* 1. SITE HEADER */}
      <header className="site-header">
        <div className="brand" onClick={() => navigateTo('home')}>
          <div className="brand-mark">
            <PawPrint className="w-5 h-5 fill-current" />
          </div>
          <span className="brand-name">
            Pet<span>Mama</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={`desktop-nav ${mobileMenuOpen ? 'is-open' : ''}`}>
          <a
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => navigateTo('home')}
          >
            Home
          </a>
          <a
            className={activeTab === 'pet-care' || activeTab === 'pet-care-plan' ? 'active' : ''}
            onClick={() => navigateTo('pet-care')}
          >
            Pet Care
          </a>
          <a
            className={activeTab === 'how-it-works' ? 'active' : ''}
            onClick={() => navigateTo('how-it-works')}
          >
            How It Works
          </a>
          <a
            className={activeTab === 'welfare' ? 'active' : ''}
            onClick={() => navigateTo('welfare')}
          >
            Animal Welfare
          </a>
          <a
            className={activeTab === 'about' ? 'active' : ''}
            onClick={() => navigateTo('about')}
          >
            About Us
          </a>
        </nav>

        {/* Right Header Actions */}
        <div className="header-actions flex items-center gap-3">
          <button
            className="header-cta desktop-only cursor-pointer"
            onClick={() => navigateTo('contact')}
          >
            Contact Us
          </button>

          {/* Mobile menu toggle button */}
          <button
            className="menu-toggle cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT PAGE CONDITION */}
      {activeTab === 'story' ? (
        /* 1. DEDICATED PAGE: OUR STORY */
        <main className="our-story-full-page max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-12">
            <div className="eyebrow text-[var(--coral-deep)] mb-3 uppercase tracking-wider text-xs font-bold">
              OUR MISSION & HEART
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight mb-6">
              “Every animal deserves <br />
              <em className="text-[var(--coral-deep)]">to be cared for.”</em>
            </h1>
            <p className="text-base md:text-xl text-[var(--muted-ink)] leading-relaxed font-medium mb-6">
              Not every pet has a home, and many street animals live every day without enough food, medical care, shelter, or human kindness.
            </p>
            <div className="p-6 md:p-8 bg-[var(--paper-deep)] border border-[var(--line)] rounded-[24px] text-sm md:text-base text-[var(--ink)] leading-relaxed font-medium space-y-4 shadow-xs">
              <p>
                There are animals that become sick or injured but never receive treatment. Some are chased away simply because they have nowhere to go. Some spend their entire lives searching for food and safety.
              </p>
              <p className="font-semibold text-[var(--ink)]">
                But their lives still have value. Every animal deserves:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Food 🍖', 'Treatment 🩺', 'Safety 🛡️', 'Care ❤️', 'Protection 🏠', 'Love ✨'].map((value, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 bg-white text-[var(--ink)] font-bold text-xs rounded-full border border-[var(--line)] shadow-2xs">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="my-12 p-8 md:p-12 bg-white border border-[var(--line)] rounded-[28px] shadow-sm">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-bold text-[var(--sage-deep)] tracking-widest uppercase">OUR VISION</span>
              <h2 className="text-3xl md:text-4xl font-bold font-editorial text-[var(--ink)]">
                “We want to connect care with the animals who need it.”
              </h2>
              <p className="text-sm md:text-base text-[var(--muted-ink)] leading-relaxed">
                This platform is built to help create a bridge between animals in need and people who genuinely care about them. Whether it's feeding a neighborhood stray, funding medical care, providing foster shelter, or adopting responsibly.
              </p>
            </div>
          </div>

          {/* 5-Stage Emotional Journey Full Cards */}
          <div className="space-y-12 my-12">
            {/* Stage 1: Loneliness */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white border border-[var(--line)] rounded-[24px] p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-[var(--paper-deep)] text-[var(--coral-deep)] text-xs font-bold rounded-full">
                  STAGE 01 — LONELINESS
                </span>
                <h2 className="text-2xl md:text-4xl font-bold font-editorial text-[var(--ink)]">
                  “Not every pet has a home.”
                </h2>
                <p className="text-sm md:text-base text-[var(--muted-ink)] leading-relaxed">
                  Behind every street animal is a life that deserves care, respect, and warmth. Thousands wander quietly hoping for a kind word, shelter, or a warm meal.
                </p>
              </div>
              <div className="overflow-hidden rounded-[20px] border border-[var(--line)] aspect-[16/10]">
                <img src={STORY_LONELY_IMG} alt="A lonely street dog" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Stage 2: Struggle */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white border border-[var(--line)] rounded-[24px] p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
              <div className="lg:order-2 space-y-4">
                <span className="px-3 py-1 bg-[var(--paper-deep)] text-[var(--coral-deep)] text-xs font-bold rounded-full">
                  STAGE 02 — STRUGGLE
                </span>
                <h2 className="text-2xl md:text-4xl font-bold font-editorial text-[var(--ink)]">
                  “Some suffer silently.”
                </h2>
                <p className="text-sm md:text-base text-[var(--muted-ink)] leading-relaxed">
                  Many animals endure quiet pain from untreated injuries or hunger, simply because nobody was there to notice them.
                </p>
              </div>
              <div className="lg:order-1 overflow-hidden rounded-[20px] border border-[var(--line)] aspect-[16/10]">
                <img src={STORY_STRUGGLE_IMG} alt="A stray cat resting" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Stage 3: Kindness */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white border border-[var(--line)] rounded-[24px] p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-[var(--paper-deep)] text-[var(--coral-deep)] text-xs font-bold rounded-full">
                  STAGE 03 — KINDNESS
                </span>
                <h2 className="text-2xl md:text-4xl font-bold font-editorial text-[var(--ink)]">
                  “Someone can make a difference.”
                </h2>
                <p className="text-sm md:text-base text-[var(--muted-ink)] leading-relaxed">
                  One person's small action—giving food, supporting treatment, offering temporary shelter, or showing kindness—can change an animal's life.
                </p>
              </div>
              <div className="overflow-hidden rounded-[20px] border border-[var(--line)] aspect-[16/10]">
                <img src={STORY_KINDNESS_IMG} alt="Person feeding a street dog" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Stage 4: Care */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white border border-[var(--line)] rounded-[24px] p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
              <div className="lg:order-2 space-y-4">
                <span className="px-3 py-1 bg-[var(--paper-deep)] text-[var(--coral-deep)] text-xs font-bold rounded-full">
                  STAGE 04 — CARE
                </span>
                <h2 className="text-2xl md:text-4xl font-bold font-editorial text-[var(--ink)]">
                  “From the street to a safer life.”
                </h2>
                <p className="text-sm md:text-base text-[var(--muted-ink)] leading-relaxed">
                  Connecting helpless animals with caring guardians through foster care, treatment sponsorships, and responsible adoption networks.
                </p>
              </div>
              <div className="lg:order-1 overflow-hidden rounded-[20px] border border-[var(--line)] aspect-[16/10]">
                <img src={STORY_RESCUE_IMG} alt="Volunteer holding a rescued kitten" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Stage 5: Hope */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white border border-[var(--line)] rounded-[24px] p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-[var(--paper-deep)] text-[var(--coral-deep)] text-xs font-bold rounded-full">
                  STAGE 05 — HOPE
                </span>
                <h2 className="text-2xl md:text-4xl font-bold font-editorial text-[var(--ink)]">
                  “Every animal deserves a chance.”
                </h2>
                <p className="text-sm md:text-base text-[var(--muted-ink)] leading-relaxed">
                  Every animal deserves to be seen, helped, cared for, and loved in a safe home environment.
                </p>
              </div>
              <div className="overflow-hidden rounded-[20px] border border-[var(--line)] aspect-[16/10]">
                <img src={STORY_HOPE_IMG} alt="Rescued pets happy at home" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>

          {/* Final Statement Banner */}
          <div className="mt-16 p-10 md:p-16 bg-gradient-to-br from-[#F6F0E6] via-[#FAF6EF] to-[#EBE4D8] text-[var(--ink)] rounded-[32px] text-center relative overflow-hidden border border-[var(--line)] shadow-xl">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#DF765F] text-white flex items-center justify-center shadow-md">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <h2 className="text-3xl md:text-5xl font-editorial font-bold leading-tight text-[var(--ink)]">
                “Because every animal deserves to be seen, cared for, and loved.”
              </h2>
              <p className="text-sm md:text-base text-[var(--muted-ink)] max-w-xl mx-auto leading-relaxed font-medium">
                Thank you for being part of this journey. Together, we can ensure that no helpless animal's life remains invisible.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => navigateTo('how-it-works')}
                  className="px-8 py-4 bg-[#DF765F] hover:bg-[#c9624b] text-white font-bold rounded-full text-sm transition-all shadow-md cursor-pointer"
                >
                  Learn How It Works
                </button>
              </div>
            </div>
          </div>
        </main>
      ) : activeTab === 'how-it-works' ? (
        /* 2. DEDICATED PAGE: HOW IT WORKS */
        <main className="how-it-works-full-page max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight mb-6">
              How PetMama <br />
              <em className="text-[var(--coral-deep)]">Works for Every Animal.</em>
            </h1>
            <p className="text-base md:text-xl text-[var(--muted-ink)] leading-relaxed font-medium">
              We make caring for your pets and supporting street animals wonderfully simple, transparent, and continuous.
            </p>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            {/* Step 01 */}
            <div className="bg-white border border-[var(--line)] rounded-[24px] p-8 space-y-4 shadow-xs relative">
              <div className="w-12 h-12 rounded-2xl bg-[var(--sage)] text-[var(--ink)] font-bold text-lg flex items-center justify-center">
                01
              </div>
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">Discover</h3>
              <p className="text-sm text-[var(--muted-ink)] leading-relaxed">
                Learn about pets, proper animal nutrition, preventive health, welfare initiatives, and available care services through the platform.
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-white border border-[var(--line)] rounded-[24px] p-8 space-y-4 shadow-xs relative">
              <div className="w-12 h-12 rounded-2xl bg-[var(--coral)] text-[var(--ink)] font-bold text-lg flex items-center justify-center">
                02
              </div>
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">Choose the Right Care</h3>
              <p className="text-sm text-[var(--muted-ink)] leading-relaxed">
                Explore suitable care options depending on your pet's age, breed, and health needs—or sponsor care for a street animal in need.
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-white border border-[var(--line)] rounded-[24px] p-8 space-y-4 shadow-xs relative">
              <div className="w-12 h-12 rounded-2xl bg-[var(--lavender)] text-[var(--ink)] font-bold text-lg flex items-center justify-center">
                03
              </div>
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">Pet Care Plan</h3>
              <p className="text-sm text-[var(--muted-ink)] leading-relaxed">
                Activate a Pet Care Plan that provides regular check-ups, dedicated veterinarian oversight, timely vaccination support, and medicine discounts.
              </p>
            </div>
          </div>

          {/* FEATURE SECTION: THE PLAN BELONGS TO THE PET */}
          <div className="my-16 bg-gradient-to-br from-[#F6F0E6] via-[#FAF6EF] to-[#EBE4D8] text-[var(--ink)] rounded-[32px] p-8 md:p-14 border border-[var(--line)] shadow-xl space-y-10">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold font-editorial leading-tight text-[var(--ink)]">
                “The plan follows the pet — <br className="hidden md:inline" />
                <span className="text-[#DF765F]">not the owner.”</span>
              </h2>
              <p className="text-sm md:text-base text-[var(--muted-ink)] leading-relaxed font-medium">
                When someone purchases a Pet Care Plan, the subscription is attached to the <strong>specific pet's profile</strong>, not simply to the human user's account.
              </p>
            </div>

            {/* Example Transfer Scenario Box */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/80 border border-[var(--line)] p-6 md:p-8 rounded-[24px] shadow-xs">
              <div className="space-y-4 text-[var(--ink)]">
                <h4 className="text-lg font-bold text-[var(--ink)] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#DF765F]" /> How Ownership Transfer Works:
                </h4>
                <div className="space-y-3 text-xs md:text-sm">
                  <div className="p-3 bg-[var(--paper-deep)] rounded-xl border border-[var(--line)]">
                    <strong>1. Original Setup:</strong> Owner A purchases a 6-Month Pet Care Plan for Max.
                  </div>
                  <div className="p-3 bg-[var(--paper-deep)] rounded-xl border border-[var(--line)]">
                    <strong>2. Ownership Change:</strong> After 2 months, Max is responsibly transferred to Owner B.
                  </div>
                  <div className="p-3 bg-[#DF765F]/15 rounded-xl border border-[#DF765F]/30 text-[var(--ink)] font-medium">
                    <strong>3. Uninterrupted Benefits:</strong> Max carries the remaining 4 months of the active Pet Care Plan to Owner B! The plan does not restart, and Max's vaccination history and treatment records remain attached to his profile.
                  </div>
                </div>
              </div>

              {/* Transfer Diagram Visual Illustration */}
              <div className="bg-white border border-[var(--line)] p-6 rounded-[20px] text-center space-y-6 shadow-2xs">
                <div className="text-xs font-bold uppercase text-[#DF765F] tracking-wider">
                  VISUAL TRANSFER FLOW
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-[var(--ink)]">
                  <div className="p-3 bg-[var(--paper-deep)] rounded-xl w-full md:w-auto border border-[var(--line)]">
                    Owner A <br /><span className="text-[10px] text-[var(--muted-ink)] font-normal">Original Parent</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#DF765F] shrink-0 rotate-90 md:rotate-0" />
                  <div className="p-3 bg-[#DF765F] text-white rounded-xl w-full md:w-auto font-extrabold shadow-md">
                    Pet: Max <br /><span className="text-[10px] text-white/90 font-normal">Care Plan Attached</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#DF765F] shrink-0 rotate-90 md:rotate-0" />
                  <div className="p-3 bg-[var(--paper-deep)] rounded-xl w-full md:w-auto border border-[var(--line)]">
                    Owner B <br /><span className="text-[10px] text-[var(--muted-ink)] font-normal">New Parent</span>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--muted-ink)] italic">
                  Care journey continues seamlessly without interruption.
                </p>
              </div>
            </div>

            {/* Transfer Photo */}
            <div className="overflow-hidden rounded-[24px] border border-[var(--line)] aspect-[21/9]">
              <img src={PET_TRANSFER_CARE_IMG} alt="Pet care plan transfer between owners" className="w-full h-full object-cover" />
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => navigateTo('pet-care-plan')}
                className="px-8 py-4 bg-[#DF765F] hover:bg-[#c9624b] text-white font-bold rounded-full text-sm transition-all cursor-pointer shadow-md"
              >
                Explore Pet Care Plan Options →
              </button>
            </div>
          </div>
        </main>
      ) : activeTab === 'pet-care' ? (
        /* 3. DEDICATED PAGE: PET CARE OVERVIEW */
        <main className="pet-care-full-page max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight mb-6">
              Complete Health Care <br />
              <em className="text-[var(--lavender-deep)]">for Your Pet.</em>
            </h1>
            <p className="text-base md:text-xl text-[var(--muted-ink)] leading-relaxed font-medium">
              Access telehealth consultations, preventive health guidance, and continuous care plans tailored for dogs and cats.
            </p>
          </div>

          {/* Service Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            <div className="p-8 bg-white border border-[var(--line)] rounded-[24px] space-y-4 shadow-xs">
              <Stethoscope className="w-8 h-8 text-[var(--lavender-deep)]" />
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">Telehealth & Consults</h3>
              <p className="text-xs md:text-sm text-[var(--muted-ink)] leading-relaxed">
                Connect online with licensed veterinarians for urgent symptoms, behavior questions, or quarterly health checks.
              </p>
            </div>

            <div className="p-8 bg-white border border-[var(--line)] rounded-[24px] space-y-4 shadow-xs">
              <ShieldCheck className="w-8 h-8 text-[var(--sage-deep)]" />
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">Preventive Wellness</h3>
              <p className="text-xs md:text-sm text-[var(--muted-ink)] leading-relaxed">
                Vaccination schedules, parasite protection, and customized nutrition plans for every stage of your pet's life.
              </p>
            </div>

            <div className="p-8 bg-white border border-[var(--line)] rounded-[24px] space-y-4 shadow-xs">
              <Heart className="w-8 h-8 text-[var(--coral-deep)]" />
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">Welfare & Rescue Support</h3>
              <p className="text-xs md:text-sm text-[var(--muted-ink)] leading-relaxed">
                Sponsor medical treatment and rehabilitation care for street animals in your local neighborhood.
              </p>
            </div>
          </div>

          {/* Callout Banner to Pet Care Plan */}
          <div className="my-12 p-8 md:p-12 bg-[var(--paper-deep)] border border-[var(--line)] rounded-[28px] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <h3 className="text-2xl md:text-4xl font-bold font-editorial text-[var(--ink)]">
                Looking for continuous, twice-weekly check-ups?
              </h3>
              <p className="text-xs md:text-sm text-[var(--muted-ink)] leading-relaxed">
                Our Pet Care Plan attaches directly to your pet profile, offering dedicated vet oversight, medicine discounts, and transferable plan coverage.
              </p>
            </div>
            <button
              onClick={() => navigateTo('pet-care-plan')}
              className="px-8 py-4 bg-[var(--ink)] text-white font-bold text-xs md:text-sm rounded-full hover:bg-[#304740] transition-all shrink-0 cursor-pointer shadow-md"
            >
              View Pet Care Plan Details →
            </button>
          </div>
        </main>
      ) : activeTab === 'pet-care-plan' ? (
        /* 4. DEDICATED PAGE: PET CARE PLAN */
        <main className="pet-care-plan-full-page max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
            <button
              onClick={() => navigateTo('pet-care')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--muted-ink)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              Pet Care Overview
            </button>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-12">
            <div className="eyebrow text-[var(--coral-deep)] mb-3 uppercase tracking-wider text-xs font-bold">
              SUBSCRIPTION CARE MODEL
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight mb-6">
              “Care that stays <br />
              <em className="text-[var(--coral-deep)]">with your pet.”</em>
            </h1>
            <p className="text-base md:text-xl text-[var(--muted-ink)] leading-relaxed font-medium">
              Designed to make regular pet care easier, continuous, and consistent throughout your pet's life journey.
            </p>
          </div>

          {/* 8 Plan Benefits Grid */}
          <div className="space-y-6 my-12">
            <h2 className="text-2xl md:text-3xl font-bold font-editorial text-[var(--ink)]">
              Comprehensive Care Benefits Included:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Benefit 1 */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[20px] space-y-3 shadow-2xs hover:border-[var(--coral-deep)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--coral)] text-[var(--ink)] flex items-center justify-center font-bold">
                  🩺
                </div>
                <h4 className="font-bold text-base text-[var(--ink)]">Dedicated Veterinarian</h4>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  A licensed veterinarian is assigned to your pet during the active plan period for regular guidance.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[20px] space-y-3 shadow-2xs hover:border-[var(--coral-deep)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--sage)] text-[var(--ink)] flex items-center justify-center font-bold">
                  🏠
                </div>
                <h4 className="font-bold text-base text-[var(--ink)]">Twice-Weekly Check-ups</h4>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Regular check-ups twice every week according to the selected plan and service availability.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[20px] space-y-3 shadow-2xs hover:border-[var(--coral-deep)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--lavender)] text-[var(--ink)] flex items-center justify-center font-bold">
                  💉
                </div>
                <h4 className="font-bold text-base text-[var(--ink)]">Vaccination Support</h4>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Scheduled vaccinations are tracked so essential vaccines are never forgotten.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[20px] space-y-3 shadow-2xs hover:border-[var(--coral-deep)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--paper-deep)] text-[var(--ink)] flex items-center justify-center font-bold">
                  💊
                </div>
                <h4 className="font-bold text-base text-[var(--ink)]">Medicine Benefits</h4>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Receive special discounts and priority access on eligible prescribed medicines.
                </p>
              </div>

              {/* Benefit 5 */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[20px] space-y-3 shadow-2xs hover:border-[var(--coral-deep)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--sage)] text-[var(--ink)] flex items-center justify-center font-bold">
                  🍖
                </div>
                <h4 className="font-bold text-base text-[var(--ink)]">Pet Food Benefits</h4>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Enjoy exclusive discounts on eligible organic pet food and therapeutic diets.
                </p>
              </div>

              {/* Benefit 6 */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[20px] space-y-3 shadow-2xs hover:border-[var(--coral-deep)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--coral)] text-[var(--ink)] flex items-center justify-center font-bold">
                  📋
                </div>
                <h4 className="font-bold text-base text-[var(--ink)]">Personalized Care</h4>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Care recommendations consider your pet's age, breed, weight, and care history.
                </p>
              </div>

              {/* Benefit 7 */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[20px] space-y-3 shadow-2xs hover:border-[var(--coral-deep)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--lavender)] text-[var(--ink)] flex items-center justify-center font-bold">
                  📊
                </div>
                <h4 className="font-bold text-base text-[var(--ink)]">Health History</h4>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Vaccination, treatment, and medical records stay securely connected to the pet profile.
                </p>
              </div>

              {/* Benefit 8 */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[20px] space-y-3 shadow-2xs hover:border-[var(--coral-deep)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--paper-deep)] text-[var(--ink)] flex items-center justify-center font-bold">
                  ❤️
                </div>
                <h4 className="font-bold text-base text-[var(--ink)]">Continuous Care</h4>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Consistent, lifelong wellness support rather than one-off emergency interventions.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Vaccination Included Toggle Card */}
          <div className="my-12 p-6 md:p-8 bg-gradient-to-br from-[#FAF6EF] via-white to-[#F5EFE6] border-2 border-[var(--coral-deep)] rounded-[28px] shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[var(--coral-deep)] text-white text-xs font-extrabold rounded-full uppercase tracking-wider">
                    VACCINATION COVERAGE OPTION
                  </span>
                  <span className="text-xs font-bold text-[var(--coral-deep)]">+ ৳300 TK / Month</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-editorial text-[var(--ink)]">
                  Include Full Vaccination & Booster Plan?
                </h3>
                <p className="text-xs md:text-sm text-[var(--muted-ink)] max-w-2xl leading-relaxed">
                  Base Pet Care Plan is <strong>৳499 TK / month</strong>. Toggle vaccination ON to add full annual rabies, core vaccines, boosters, and official digital vet certificates for just <strong>+৳300 TK / month</strong> (Total: <strong>৳799 TK / month</strong>).
                </p>
              </div>

              {/* Toggle Switch Button */}
              <button
                onClick={() => setIncludeVaccination(!includeVaccination)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-full font-bold text-sm transition-all shadow-md shrink-0 cursor-pointer ${
                  includeVaccination
                    ? 'bg-[#DF765F] text-white ring-4 ring-[#DF765F]/20'
                    : 'bg-[var(--paper-deep)] text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--sage)]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${includeVaccination ? 'translate-x-1' : ''}`} />
                <span>{includeVaccination ? '✓ Vaccination Included (৳799 TK/mo)' : '＋ Add Vaccination (+৳300 TK/mo)'}</span>
              </button>
            </div>

            {/* Included Vaccines Breakdown Panel */}
            {includeVaccination && (
              <div className="pt-4 border-t border-[var(--line)] animate-fadeIn">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-3 flex items-center gap-2">
                  💉 Included Vaccines & Booster Schedule:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 bg-white border border-[var(--line)] rounded-xl space-y-1 shadow-2xs">
                    <div className="font-extrabold text-[var(--coral-deep)]">1. Rabies Core Vaccine</div>
                    <p className="text-[var(--muted-ink)] leading-normal">Full 1-dose annual rabies protection against viral infection.</p>
                  </div>
                  <div className="p-3.5 bg-white border border-[var(--line)] rounded-xl space-y-1 shadow-2xs">
                    <div className="font-extrabold text-[var(--sage-deep)]">2. DHPP / FVRCP Core 7-in-1</div>
                    <p className="text-[var(--muted-ink)] leading-normal">Covers Canine Distemper, Parvovirus, Hepatitis & Feline Calicivirus.</p>
                  </div>
                  <div className="p-3.5 bg-white border border-[var(--line)] rounded-xl space-y-1 shadow-2xs">
                    <div className="font-extrabold text-[var(--lavender-deep)]">3. Annual Booster Shots</div>
                    <p className="text-[var(--muted-ink)] leading-normal">Automated schedule reminders & booster shots administered by assigned vet.</p>
                  </div>
                  <div className="p-3.5 bg-white border border-[var(--line)] rounded-xl space-y-1 shadow-2xs">
                    <div className="font-extrabold text-[var(--ink)]">4. Digital Health Certificate</div>
                    <p className="text-[var(--muted-ink)] leading-normal">Permanent digital vaccination record linked directly to pet's profile.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Plan Duration Comparison */}
          <div className="my-16 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold font-editorial text-[var(--ink)]">
              Select Plan Duration
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Monthly', base: 499, withVac: 799, discount: 'Standard' },
                { name: '3 Months', base: 1350, withVac: 2250, discount: 'Save 10%' },
                { name: '6 Months', base: 2500, withVac: 4200, discount: 'Save 15% · Most Popular' },
                { name: '12 Months', base: 4500, withVac: 7800, discount: 'Save 25%' }
              ].map((plan, i) => {
                const finalPrice = includeVaccination ? plan.withVac : plan.base;
                return (
                  <div key={i} className={`p-6 bg-white border rounded-[24px] flex flex-col justify-between space-y-6 ${i === 2 ? 'border-2 border-[var(--coral-deep)] shadow-md relative' : 'border-[var(--line)] shadow-xs'}`}>
                    {i === 2 && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[var(--coral-deep)] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold font-editorial text-[var(--ink)]">{plan.name} Plan</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-[var(--paper-deep)] text-[var(--coral-deep)] rounded-full">
                          {plan.discount}
                        </span>
                      </div>
                      <div className="text-3xl font-extrabold text-[var(--ink)]">
                        ৳{finalPrice.toLocaleString()} <span className="text-xs font-normal text-[var(--muted-ink)]">TK</span>
                      </div>
                      <p className="text-[11px] text-[var(--muted-ink)]">
                        {includeVaccination ? 'Includes twice-weekly checkups + Full Vaccination Plan' : 'Includes twice-weekly checkups & vet oversight'}
                      </p>
                      <ul className="space-y-2 text-xs text-[var(--muted-ink)] pt-2 border-t border-[var(--line)]">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[var(--sage-deep)] shrink-0" /> Assigned Dedicated Vet</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[var(--sage-deep)] shrink-0" /> 2 Check-ups / Week</li>
                        <li className="flex items-center gap-1.5 font-semibold text-[var(--ink)]">
                          <Check className="w-3.5 h-3.5 text-[var(--coral-deep)] shrink-0" />
                          {includeVaccination ? '💉 Rabies + Core Vaccines Included' : 'Vaccine Tracking & Reminders'}
                        </li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[var(--sage-deep)] shrink-0" /> Food & Medicine Discounts</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[var(--sage-deep)] shrink-0" /> Transferable to New Owner</li>
                      </ul>
                    </div>

                    <button
                      onClick={() => alert(`🎉 Subscribed to ${plan.name} Pet Care Plan (৳${finalPrice} TK)!`)}
                      className="w-full primary-button py-3 text-xs cursor-pointer"
                    >
                      Subscribe {plan.name} (৳{finalPrice} TK)
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[var(--muted-ink)] italic text-center pt-4">
              * Note: Vaccination coverage includes Rabies, DHPP/FVRCP core vaccines, and annual booster shots.
            </p>
          </div>
        </main>
      ) : activeTab === 'welfare' ? (
        /* 5. DEDICATED PAGE: ANIMAL WELFARE */
        <main className="welfare-full-page max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-12">
            <div className="eyebrow text-[var(--coral-deep)] mb-3 uppercase tracking-wider text-xs font-bold">
              COMMUNITY ANIMAL PROTECTION
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight mb-6">
              Animal Welfare & <br />
              <em className="text-[var(--coral-deep)]">Street Animal Care.</em>
            </h1>
            <p className="text-base md:text-xl text-[var(--muted-ink)] leading-relaxed font-medium">
              Every street animal deserves safety, clean water, medical treatment, and human compassion.
            </p>
          </div>

          {/* Reality & Problems Section */}
          <div className="my-10 p-8 bg-white border border-[var(--line)] rounded-[28px] space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-editorial text-[var(--ink)]">
              Challenges Faced by Street Animals
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-[var(--ink)]">
              {[
                '🌧️ Lack of shelter',
                '🍖 Lack of food',
                '💧 Lack of clean water',
                '🩺 Untreated illness',
                '💔 Abandonment',
                '🐾 Injuries',
                '🚫 Being chased away',
                '🤝 Lack of human care'
              ].map((problem, i) => (
                <div key={i} className="p-3.5 bg-[var(--paper-deep)] rounded-xl border border-[var(--line)] text-center">
                  {problem}
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Section: Small Acts of Care */}
          <div className="my-16 space-y-8">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold text-[var(--coral-deep)] uppercase tracking-wider">HOPE IN ACTION</span>
              <h2 className="text-3xl md:text-5xl font-bold font-editorial text-[var(--ink)]">
                “Small acts of care can change a life.”
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feed */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[24px] space-y-3 shadow-2xs">
                <div className="text-2xl">🍲</div>
                <h3 className="text-xl font-bold font-editorial text-[var(--ink)]">Feed</h3>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Provide nutritious food and clean water for local neighborhood stray dogs and cats.
                </p>
              </div>

              {/* Care */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[24px] space-y-3 shadow-2xs">
                <div className="text-2xl">❤️</div>
                <h3 className="text-xl font-bold font-editorial text-[var(--ink)]">Care</h3>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Provide basic attention, gentle human interaction, and warmth in your area.
                </p>
              </div>

              {/* Treat */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[24px] space-y-3 shadow-2xs">
                <div className="text-2xl">🩺</div>
                <h3 className="text-xl font-bold font-editorial text-[var(--ink)]">Treat</h3>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Help animals receive proper veterinary treatment, antibiotics, and vaccinations.
                </p>
              </div>

              {/* Protect */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[24px] space-y-3 shadow-2xs">
                <div className="text-2xl">🛡️</div>
                <h3 className="text-xl font-bold font-editorial text-[var(--ink)]">Protect</h3>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Help keep vulnerable, elderly, or young animals safe from harsh weather or harm.
                </p>
              </div>

              {/* Foster */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[24px] space-y-3 shadow-2xs">
                <div className="text-2xl">🏠</div>
                <h3 className="text-xl font-bold font-editorial text-[var(--ink)]">Foster</h3>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Offer temporary shelter and recovery space while a permanent home is arranged.
                </p>
              </div>

              {/* Adopt Responsibly */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[24px] space-y-3 shadow-2xs">
                <div className="text-2xl">✨</div>
                <h3 className="text-xl font-bold font-editorial text-[var(--ink)]">Adopt Responsibly</h3>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Open your home and give a rescued animal a permanent, safe, and loving family.
                </p>
              </div>
            </div>
          </div>
        </main>
      ) : activeTab === 'stories' ? (
        /* 6. DEDICATED PAGE: STORIES */
        <main className="stories-full-page max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-12">
            <div className="eyebrow text-[var(--sage-deep)] mb-3 uppercase tracking-wider text-xs font-bold">
              REAL TRANSFORMATIONS
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight mb-6">
              Stories of <br />
              <em className="text-[var(--sage-deep)]">Hope & Healing.</em>
            </h1>
            <p className="text-base md:text-xl text-[var(--muted-ink)] leading-relaxed font-medium">
              Read how small acts of compassion transformed the lives of street animals.
            </p>
          </div>

          {/* Story Cards List */}
          <div className="space-y-12 my-12">
            {/* Story 1 */}
            <div className="bg-white border border-[var(--line)] rounded-[28px] p-6 md:p-10 space-y-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 pb-4 border-b border-[var(--line)]">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold font-editorial text-[var(--ink)]">
                    “From a roadside corner to a safe home.”
                  </h2>
                  <p className="text-xs text-[var(--muted-ink)]">Animal: Shadow (Local Street Dog) · Location: Dhaka, Bangladesh</p>
                </div>
                <span className="px-3 py-1 bg-[var(--sage)] text-[var(--ink)] font-bold text-xs rounded-full self-start md:self-auto">
                  Adopted & Thriving
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
                <div className="p-4 bg-[var(--paper-deep)] rounded-2xl space-y-2">
                  <h4 className="font-bold text-[var(--coral-deep)] uppercase text-[10px] tracking-wider">Before</h4>
                  <p className="text-[var(--ink)]">Found hungry, shivering, and ignored on a busy street corner without food or shelter.</p>
                </div>

                <div className="p-4 bg-[var(--paper-deep)] rounded-2xl space-y-2">
                  <h4 className="font-bold text-[var(--lavender-deep)] uppercase text-[10px] tracking-wider">Care Received</h4>
                  <p className="text-[var(--ink)]">Nutritious meals, full veterinary health screening, vaccinations, and 3 weeks of foster care.</p>
                </div>

                <div className="p-4 bg-[var(--sage)]/30 rounded-2xl space-y-2">
                  <h4 className="font-bold text-[var(--sage-deep)] uppercase text-[10px] tracking-wider">Current Condition</h4>
                  <p className="text-[var(--ink)] font-medium">Energetic, fully vaccinated, and happily living with a loving adoptive family.</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[20px] aspect-[21/9]">
                <img src={STORY_HOPE_IMG} alt="Rescued dog at home" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white border border-[var(--line)] rounded-[28px] p-6 md:p-10 space-y-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 pb-4 border-b border-[var(--line)]">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold font-editorial text-[var(--ink)]">
                    “A quiet alley kitten finds a warm lap.”
                  </h2>
                  <p className="text-xs text-[var(--muted-ink)]">Animal: Milo (Ginger Tabby) · Location: Chittagong, Bangladesh</p>
                </div>
                <span className="px-3 py-1 bg-[var(--coral)] text-[var(--ink)] font-bold text-xs rounded-full self-start md:self-auto">
                  Rescued & Loved
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
                <div className="p-4 bg-[var(--paper-deep)] rounded-2xl space-y-2">
                  <h4 className="font-bold text-[var(--coral-deep)] uppercase text-[10px] tracking-wider">Before</h4>
                  <p className="text-[var(--ink)]">Weak, cold, and searching for shelter during heavy monsoon rainstorms.</p>
                </div>

                <div className="p-4 bg-[var(--paper-deep)] rounded-2xl space-y-2">
                  <h4 className="font-bold text-[var(--lavender-deep)] uppercase text-[10px] tracking-wider">Care Received</h4>
                  <p className="text-[var(--ink)]">Antibiotic treatment, high-protein nutrition, warm indoor shelter, and gentle care.</p>
                </div>

                <div className="p-4 bg-[var(--sage)]/30 rounded-2xl space-y-2">
                  <h4 className="font-bold text-[var(--sage-deep)] uppercase text-[10px] tracking-wider">Current Condition</h4>
                  <p className="text-[var(--ink)] font-medium">Playful, healthy, and enjoying daily cuddles as an adored indoor pet.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emotional Reflection Banner */}
          <div className="p-10 bg-[var(--paper-deep)] border border-[var(--line)] rounded-[28px] text-center space-y-3">
            <h3 className="text-2xl md:text-4xl font-bold font-editorial text-[var(--ink)]">
              “Someone cared. And that changed everything.”
            </h3>
          </div>
        </main>
      ) : activeTab === 'about' ? (
        /* 7. DEDICATED PAGE: ABOUT US */
        <main className="about-full-page max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-12">
            <div className="eyebrow text-[var(--coral-deep)] mb-3 uppercase tracking-wider text-xs font-bold">
              ABOUT PETMAMA
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight mb-6">
              A Home for Care, <br />
              <em className="text-[var(--coral-deep)]">Trust & Compassion.</em>
            </h1>
            <p className="text-base md:text-xl text-[var(--muted-ink)] leading-relaxed font-medium">
              Building a compassionate ecosystem where every pet receives proper health care and every street animal is protected.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="p-8 bg-white border border-[var(--line)] rounded-[28px] space-y-4 shadow-xs">
              <span className="text-xs font-bold text-[var(--coral-deep)] tracking-widest uppercase">OUR MISSION</span>
              <h2 className="text-2xl md:text-3xl font-bold font-editorial text-[var(--ink)]">Our Mission</h2>
              <p className="text-sm md:text-base text-[var(--muted-ink)] leading-relaxed">
                To make responsible pet care easier and help more animals receive the care, safety, and compassion they deserve.
              </p>
            </div>

            <div className="p-8 bg-white border border-[var(--line)] rounded-[28px] space-y-4 shadow-xs">
              <span className="text-xs font-bold text-[var(--sage-deep)] tracking-widest uppercase">OUR VISION</span>
              <h2 className="text-2xl md:text-3xl font-bold font-editorial text-[var(--ink)]">Our Vision</h2>
              <p className="text-sm md:text-base text-[var(--muted-ink)] leading-relaxed">
                A world where no animal is ignored simply because it has no home or owner.
              </p>
            </div>
          </div>

          {/* What We Believe */}
          <div className="p-8 md:p-12 bg-white border border-[var(--line)] rounded-[28px] space-y-6 my-12">
            <h2 className="text-2xl md:text-3xl font-bold font-editorial text-[var(--ink)]">What We Believe</h2>
            <div className="space-y-4 text-sm md:text-base text-[var(--ink)]">
              {[
                'Every animal deserves care.',
                'Every pet deserves proper health support.',
                'Every act of kindness matters.',
                'Responsible pet ownership should be easier.',
                "An animal's care should not stop when ownership changes."
              ].map((belief, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-[var(--paper-deep)] rounded-2xl font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-[var(--coral-deep)] shrink-0" />
                  <span>{belief}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warm Caregiver Photo */}
          <div className="overflow-hidden rounded-[28px] border border-[var(--line)] aspect-[21/9]">
            <img src={VET_CARE_PLAN_IMG} alt="Veterinarian caring for a pet" className="w-full h-full object-cover" />
          </div>
        </main>
      ) : activeTab === 'contact' ? (
        /* 8. DEDICATED PAGE: CONTACT US */
        <main className="contact-full-page max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-12">
            <div className="eyebrow text-[var(--coral-deep)] mb-3 uppercase tracking-wider text-xs font-bold">
              GET IN TOUCH
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight mb-6">
              Contact Us <br />
              <em className="text-[var(--coral-deep)]">We're Here to Help.</em>
            </h1>
            <p className="text-base md:text-xl text-[var(--muted-ink)] leading-relaxed font-medium">
              Have questions about Pet Care Plans, adoption inquiries, or animal welfare support? Reach out to us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-12">
            {/* Contact Form */}
            <div className="p-8 bg-white border border-[var(--line)] rounded-[28px] space-y-6 shadow-xs">
              <h2 className="text-2xl font-bold font-editorial text-[var(--ink)]">Send Us a Message</h2>

              {!adoptSubmitted ? (
                <form onSubmit={(e) => { e.preventDefault(); setAdoptSubmitted(true); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Maya Parent"
                      className="w-full p-3 bg-[var(--paper)] border border-[var(--line)] rounded-xl text-xs focus:outline-none focus:border-[var(--coral-deep)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="maya@example.com"
                      className="w-full p-3 bg-[var(--paper)] border border-[var(--line)] rounded-xl text-xs focus:outline-none focus:border-[var(--coral-deep)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pet Care Plan Inquiry / Welfare Support"
                      className="w-full p-3 bg-[var(--paper)] border border-[var(--line)] rounded-xl text-xs focus:outline-none focus:border-[var(--coral-deep)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--ink)] mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your message here..."
                      className="w-full p-3 bg-[var(--paper)] border border-[var(--line)] rounded-xl text-xs focus:outline-none focus:border-[var(--coral-deep)]"
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full primary-button py-3 text-xs cursor-pointer">
                    Submit Message
                  </button>
                </form>
              ) : (
                <div className="p-6 bg-[var(--sage)] rounded-2xl space-y-2 text-[var(--ink)]">
                  <h4 className="font-bold text-base">Message Received!</h4>
                  <p className="text-xs">Thank you for reaching out. The PetMama care team will respond to your email within 24 hours.</p>
                  <button
                    onClick={() => setAdoptSubmitted(false)}
                    className="text-xs font-bold text-[var(--coral-deep)] underline pt-2 block cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>

            {/* Contact Placeholders */}
            <div className="space-y-6">
              <div className="p-8 bg-[var(--paper-deep)] border border-[var(--line)] rounded-[28px] space-y-6">
                <h3 className="text-xl font-bold font-editorial text-[var(--ink)]">Contact Information</h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--coral)] flex items-center justify-center font-bold">📧</div>
                    <div>
                      <div className="font-bold text-[var(--ink)]">Email</div>
                      <div className="text-[var(--muted-ink)]">support@petmama.org</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--sage)] flex items-center justify-center font-bold">📞</div>
                    <div>
                      <div className="font-bold text-[var(--ink)]">Phone</div>
                      <div className="text-[var(--muted-ink)]">+880 1700-000000 / +1 (800) 555-PETMAMA</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--lavender)] flex items-center justify-center font-bold">📍</div>
                    <div>
                      <div className="font-bold text-[var(--ink)]">Location</div>
                      <div className="text-[var(--muted-ink)]">Banani, Dhaka, Bangladesh / Global Network</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--line)] space-y-2">
                  <div className="font-bold text-xs text-[var(--ink)]">Social Media</div>
                  <div className="flex gap-2 text-xs font-semibold text-[var(--coral-deep)]">
                    <a href="#facebook" onClick={(e) => e.preventDefault()} className="hover:underline">Facebook</a> ·
                    <a href="#instagram" onClick={(e) => e.preventDefault()} className="hover:underline">Instagram</a> ·
                    <a href="#twitter" onClick={(e) => e.preventDefault()} className="hover:underline">Twitter/X</a> ·
                    <a href="#linkedin" onClick={(e) => e.preventDefault()} className="hover:underline">LinkedIn</a>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[24px] border border-[var(--line)] aspect-[16/9]">
                <img src={VET_CARE_PLAN_IMG} alt="Subtle pet care" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </main>
      ) : activeTab === 'shop' ? (
        /* 9. DEDICATED PAGE: SHOP */
        <main className="shop-full-page max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-8">
            <div className="eyebrow text-[var(--sage-deep)] mb-3 uppercase tracking-wider text-xs font-bold">
              EVERYDAY ESSENTIALS SHOP
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight mb-4">
              Care Essentials for <br />
              <em className="text-[var(--sage-deep)]">Happy, Healthy Pets.</em>
            </h1>
            <p className="text-base md:text-lg text-[var(--muted-ink)] leading-relaxed font-medium">
              Explore organic food, interactive toys, comfortable pet apparel, and essential vet-approved medicines.
            </p>
          </div>

          {/* 15% OFF One-Time Coupon Code Banner */}
          <div className="my-8 p-6 md:p-8 bg-[var(--sage)]/50 border border-[var(--sage-deep)]/40 rounded-[28px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 bg-[var(--coral-deep)] text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
                SPECIAL WELCOME OFFER
              </span>
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">
                Get 15% OFF Your First Order!
              </h3>
              <p className="text-xs text-[var(--muted-ink)]">
                Use our one-time welcome coupon code at checkout to enjoy 15% off all pet food, toys, clothing & medicines.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="px-4 py-2.5 bg-white border-2 border-dashed border-[var(--sage-deep)] rounded-xl text-sm font-extrabold text-[var(--ink)] tracking-widest uppercase">
                WELCOME15
              </div>
              <button
                onClick={copyCouponCode}
                className="px-5 py-2.5 bg-[var(--ink)] text-white font-bold text-xs rounded-xl hover:bg-[#304740] transition-colors cursor-pointer"
              >
                {couponCopied ? '✓ Coupon Copied!' : 'Copy Coupon Code'}
              </button>
            </div>
          </div>

          {/* Category Filter Pills Bar */}
          <div className="my-8 space-y-4">
            <h2 className="text-xl font-bold font-editorial text-[var(--ink)]">
              Filter by Category:
            </h2>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'All', label: '🐾 All Products' },
                { id: 'Dog', label: '🐶 Dogs' },
                { id: 'Cat', label: '🐱 Cats' },
                { id: 'Rabbit', label: '🐰 Rabbits (Khorgosh)' },
                { id: 'Fish', label: '🐟 Fish Food' },
                { id: 'Toys', label: '🎾 Toys' },
                { id: 'Apparel', label: '👕 Pet Clothes' },
                { id: 'Medicine', label: '🩺 Medicines' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setShopCategoryFilter(cat.id as any)}
                  className={`px-4 py-2 text-xs font-extrabold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    shopCategoryFilter === cat.id
                      ? 'bg-[var(--ink)] text-white shadow-md'
                      : 'bg-white border border-[var(--line)] text-[var(--muted-ink)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Shop Products Grid */}
          <div className="my-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">
                {shopCategoryFilter === 'All' ? 'All Pet Essentials' : `${shopCategoryFilter} Products`}
              </h3>
              <span className="text-xs text-[var(--muted-ink)] font-bold">
                Showing {shopProducts.filter(p => shopCategoryFilter === 'All' || p.category === shopCategoryFilter).length} items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopProducts
                .filter(p => shopCategoryFilter === 'All' || p.category === shopCategoryFilter)
                .map((product) => (
                  <div key={product.id} className="bg-white border border-[var(--line)] rounded-[24px] p-5 space-y-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--paper-deep)] relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        {product.badge && (
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#DF765F] text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 bg-[var(--paper-deep)] text-[var(--ink)] text-[10px] font-bold rounded-full uppercase">
                            {product.category}
                          </span>
                          <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                            <Star className="w-3.5 h-3.5 fill-amber-400" /> {product.rating}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-[var(--ink)] mt-1.5">{product.name}</h4>
                        <p className="text-xs text-[var(--muted-ink)] mt-1 leading-relaxed">{product.description}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--line)] space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-extrabold text-[var(--ink)]">
                          ৳{product.priceTK.toLocaleString()} <span className="text-xs font-normal text-[var(--muted-ink)]">TK</span>
                        </div>
                        <span className="text-[10px] font-bold text-[var(--sage-deep)] bg-[var(--sage)]/30 px-2 py-0.5 rounded-full">
                          In Stock
                        </span>
                      </div>

                      {/* Interactive Buy Now & Add to Cart Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => addToCart(product)}
                          className="px-3 py-2.5 bg-[var(--paper-deep)] hover:bg-[var(--line)] text-[var(--ink)] font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add to Cart
                        </button>

                        <button
                          onClick={() => buyNowProduct(product)}
                          className="px-3 py-2.5 bg-[#DF765F] hover:bg-[#c9624b] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          Buy Now ⚡
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      ) : activeTab === 'adopt' ? (
        /* 10. DEDICATED PAGE: ADOPT & REHOMING FEED */
        <main className="adopt-full-page max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>

            {/* Post Pet Button */}
            <button
              onClick={() => setCreatePostModalOpen(true)}
              className="px-5 py-2.5 bg-[#DF765F] hover:bg-[#c9624b] text-white font-bold text-xs rounded-full shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Post a Pet (Free or For Sale)
            </button>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-8">
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight mb-4">
              Explore Pet Adoption <br />
              <em className="text-[var(--coral-deep)]">& Rehoming Feed.</em>
            </h1>
            <p className="text-base md:text-lg text-[var(--muted-ink)] leading-relaxed font-medium">
              Browse verified posts for free rescued pet adoption, or view pet rehoming listings from caring community members across Bangladesh.
            </p>
          </div>

          {/* Feed Filter Controls */}
          <div className="my-8 p-6 bg-white border border-[var(--line)] rounded-[28px] shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
              {/* Filter 1: Free vs Paid */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[var(--muted-ink)] uppercase tracking-wider block">Listing Type:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFeedTypeFilter('all')}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      feedTypeFilter === 'all'
                        ? 'bg-[var(--ink)] text-white shadow-xs'
                        : 'bg-[var(--paper-deep)] text-[var(--muted-ink)] hover:text-[var(--ink)]'
                    }`}
                  >
                    🐾 All Posts ({adoptionPosts.length})
                  </button>

                  <button
                    onClick={() => setFeedTypeFilter('free')}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      feedTypeFilter === 'free'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    🎁 Free Adoption ({adoptionPosts.filter(p => p.postType === 'free').length})
                  </button>

                  <button
                    onClick={() => setFeedTypeFilter('paid')}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      feedTypeFilter === 'paid'
                        ? 'bg-[#DF765F] text-white shadow-xs'
                        : 'bg-amber-50 text-amber-900 border border-amber-200'
                    }`}
                  >
                    🏷️ For Sale / Rehoming Fee ({adoptionPosts.filter(p => p.postType === 'paid').length})
                  </button>
                </div>
              </div>

              {/* Filter 2: Pet Species */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[var(--muted-ink)] uppercase tracking-wider block">Pet Category:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(['all', 'Dog', 'Cat', 'Rabbit', 'Bird'] as const).map((petType) => (
                    <button
                      key={petType}
                      onClick={() => setPetTypeFilter(petType)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-full cursor-pointer ${
                        petTypeFilter === petType
                          ? 'bg-[var(--coral-deep)] text-white'
                          : 'bg-[var(--paper-deep)] text-[var(--muted-ink)]'
                      }`}
                    >
                      {petType === 'all' ? 'All Species' : petType}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feed Posts Grid */}
          <div className="my-8 space-y-6">
            <h2 className="text-2xl font-bold font-editorial text-[var(--ink)] flex items-center justify-between">
              <span>Community Feed Posts</span>
              <span className="text-xs font-normal text-[var(--muted-ink)]">
                Showing {adoptionPosts.filter(p => (feedTypeFilter === 'all' || p.postType === feedTypeFilter) && (petTypeFilter === 'all' || p.type === petTypeFilter)).length} posts
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adoptionPosts
                .filter(p => (feedTypeFilter === 'all' || p.postType === feedTypeFilter) && (petTypeFilter === 'all' || p.type === petTypeFilter))
                .map((post) => (
                  <div key={post.id} className="bg-white border border-[var(--line)] rounded-[24px] p-5 space-y-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--paper-deep)] relative">
                        <img src={post.image} alt={post.petName} className="w-full h-full object-cover" />
                        
                        {/* Free vs Paid Price Badge */}
                        <div className="absolute top-3 left-3">
                          {post.postType === 'free' ? (
                            <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-extrabold rounded-full uppercase tracking-wider shadow-md">
                              🎁 FREE ADOPTION
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-[#24332F] text-amber-300 border border-amber-300/40 text-[10px] font-extrabold rounded-full uppercase tracking-wider shadow-md">
                              🏷️ FOR SALE — ৳{post.priceTK.toLocaleString()} TK
                            </span>
                          )}
                        </div>

                        <span className="absolute bottom-3 right-3 px-2.5 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold rounded-full">
                          📍 {post.location}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-xl font-editorial text-[var(--ink)]">{post.petName}</h3>
                          <span className="px-2.5 py-0.5 bg-[var(--sage)] text-[var(--ink)] text-[10px] font-bold rounded-full">
                            {post.type.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--muted-ink)] font-medium mt-0.5">
                          {post.breed} · {post.age} · {post.gender}
                        </p>
                        <h4 className="font-bold text-sm text-[var(--ink)] mt-2 leading-snug">{post.title}</h4>
                        <p className="text-xs text-[var(--muted-ink)] mt-1 line-clamp-2 leading-relaxed">{post.description}</p>
                      </div>

                      <div className="p-3 bg-[var(--paper-deep)] rounded-xl text-xs space-y-1">
                        <div className="text-[10px] font-bold text-[var(--coral-deep)] uppercase tracking-wider">Health & Status</div>
                        <div className="font-medium text-[var(--ink)]">{post.healthStatus}</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--line)] space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[var(--muted-ink)]">
                        <span>By {post.guardianName}</span>
                        <span>{post.postedDate}</span>
                      </div>

                      <button
                        onClick={() => setInquirePost(post)}
                        className="w-full primary-button py-2.5 text-xs font-bold cursor-pointer"
                      >
                        Contact Guardian / Inquire →
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      ) : activeTab === 'doctor' ? (
        /* 11. DEDICATED PAGE: DOCTOR */
        <main className="doctor-full-page max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-12">
            <div className="eyebrow text-[var(--lavender-deep)] mb-3 uppercase tracking-wider text-xs font-bold">
              VETERINARY CARE POLICY
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight mb-6">
              How Doctor Care Works <br />
              <em className="text-[var(--lavender-deep)]">at PetMama.</em>
            </h1>
            <p className="text-base md:text-xl text-[var(--muted-ink)] leading-relaxed font-medium">
              We provide licensed telehealth consultations, in-clinic physicals, and emergency care with absolute equality.
            </p>
          </div>

          {/* CRITICAL EQUALITY STATEMENT BOX */}
          <div className="my-10 p-8 md:p-12 bg-gradient-to-br from-[#1C2926] via-[#24332F] to-[#172320] text-white rounded-[32px] border border-[var(--line)] shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--coral)] text-[var(--ink)] flex items-center justify-center font-bold text-xl">
                🩺
              </div>
              <span className="px-3.5 py-1.5 bg-[#DF765F] text-[var(--ink)] font-bold text-xs rounded-full uppercase tracking-wider">
                OUR CORE VETERINARY PLEDGE
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold font-editorial text-white leading-tight">
              “Equal Medical Treatment for <br className="hidden md:inline" />
              <span className="text-[#DF765F]">Street Pets & Home Pets.”</span>
            </h2>

            <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-[24px] text-sm md:text-base text-slate-200 leading-relaxed font-medium space-y-4">
              <p>
                <strong>At PetMama, there is ZERO difference in medical treatment, medication quality, diagnostic precision, or veterinary compassion between a street pet and a regular home pet.</strong>
              </p>
              <p>
                Whether it is a rescued neighborhood street puppy suffering from an injury or an indoor pet receiving quarterly check-ups, our licensed doctors provide the exact same high-standard veterinary care, surgical procedures, sterile antibiotics, and rehabilitation support.
              </p>
              <p className="text-[#DF765F] font-bold text-base pt-2 border-t border-white/15">
                Every animal's life is valued with equal dignity, respect, and love.
              </p>
            </div>
          </div>

          {/* How Our Doctor Services Work */}
          <div className="my-12 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-editorial text-[var(--ink)]">
              Our Doctor Care Services:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-[var(--line)] rounded-[24px] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[var(--lavender)] text-[var(--ink)] font-bold flex items-center justify-center text-sm">
                  01
                </div>
                <h3 className="text-xl font-bold font-editorial text-[var(--ink)]">Telehealth Consults</h3>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Instant online video consultations with experienced veterinarians for symptoms, diet advice, or skin questions.
                </p>
              </div>

              <div className="p-6 bg-white border border-[var(--line)] rounded-[24px] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[var(--sage)] text-[var(--ink)] font-bold flex items-center justify-center text-sm">
                  02
                </div>
                <h3 className="text-xl font-bold font-editorial text-[var(--ink)]">In-Clinic & Home Visits</h3>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  In-person physical check-ups, vaccinations, blood tests, and minor surgical procedures.
                </p>
              </div>

              <div className="p-6 bg-white border border-[var(--line)] rounded-[24px] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[var(--coral)] text-[var(--ink)] font-bold flex items-center justify-center text-sm">
                  03
                </div>
                <h3 className="text-xl font-bold font-editorial text-[var(--ink)]">Street Rescue Care</h3>
                <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
                  Emergency rescue treatment, leg casts, wound debridement, and deworming for street animals.
                </p>
              </div>
            </div>
          </div>

          {/* Doctor Team List */}
          <div className="my-16 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-editorial text-[var(--ink)]">
              Meet Our Partner Veterinarians:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vetDoctors.map((doc) => (
                <div key={doc.id} className="bg-white border border-[var(--line)] rounded-[24px] p-6 space-y-4 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[var(--lavender)] text-[var(--ink)] text-[10px] font-bold rounded-full">
                      {doc.type}
                    </span>
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {doc.rating} ({doc.reviewsCount})
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-editorial text-[var(--ink)]">{doc.name}</h3>
                    <p className="text-xs text-[var(--muted-ink)] mt-0.5">{doc.specialty} · {doc.experience}</p>
                  </div>

                  <p className="text-xs text-[var(--ink)] font-medium">Availability: {doc.availability}</p>

                  <div className="p-2.5 bg-[var(--paper-deep)] rounded-xl text-center text-xs font-semibold text-[var(--muted-ink)]">
                    🩺 Licensed Partner Veterinarian
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : (
        /* MAIN LANDING PAGE VIEW */
        <>
          {/* 2. HERO SECTION */}
          <section id="hero" className="hero">
            <div className="hero-copy">
              <h1>
                One happy home <br />
                <em>for everything.</em>
              </h1>

              <p className="hero-description">
                From the first hello to every little check-in, we make caring for your pet feel wonderfully easy.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => navigateTo('pet-care')}
                >
                  Explore Services <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Social proof trust row */}
              <div className="trust-row">
                <div className="avatar-stack">
                  <div className="avatar avatar-one">
                    <img src={ADOPT_PUPPY_IMG} alt="Rescued puppy" />
                  </div>
                  <div className="avatar avatar-two">
                    <img src={ADOPT_CAT_IMG} alt="Rescued cat" />
                  </div>
                  <div className="avatar avatar-three">
                    <img src={APP_DOWNLOAD_PUPPY_IMG} alt="Street puppy" />
                  </div>
                  <div className="avatar avatar-four">+4k</div>
                </div>
                <div>
                  <strong>4,800+ happy pets</strong> cared for & loved this month.
                </div>
              </div>
            </div>

            {/* Hero Visual Composition */}
            <div className="hero-visual">
              <div className="visual-sun"></div>

              {/* Leaves floating decoration */}
              <div className="visual-leaf leaf-one">🍃</div>
              <div className="visual-leaf leaf-two">🌿</div>

              {/* Floating note badge 1 */}
              <div className="floating-note note-top">
                <ShieldCheck className="w-4 h-4" />
                <span>Vet Verified Care</span>
              </div>

              {/* Main Organic Shaped Hero Image */}
              <div className="hero-image-wrap">
                <img
                  src={HERO_PETS_IMG}
                  alt="Golden retriever puppy and ginger cat sitting happily in cozy living room"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating note badge 2 */}
              <div className="floating-note note-bottom">
                <span className="note-heart">♥</span>
                <span>Loved by 12,000+ owners</span>
              </div>

              {/* Circular Sticker Badge */}
              <div className="visual-sticker">
                <div>
                  99.4% <br />
                  <span>happy tails</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. SERVICE SECTION */}
          <section id="services" className="service-section">
            <div className="section-intro">
              <div>
                <h2>
                  One happy home <br />
                  <em>for everything.</em>
                </h2>
              </div>
              <p>
                From the first hello to every little check-in, we make caring for your pet feel wonderfully easy.
              </p>
            </div>

            {/* 3 Service Cards Grid */}
            <div className="service-grid">
              {/* Card 1: Shop */}
              <div
                className="service-card mint cursor-pointer"
                onClick={() => navigateTo('shop')}
              >
                <div className="card-topline">
                  <span>01</span>
                  <div className="card-arrow">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="service-icon">
                  <ShoppingBag className="w-6 h-6 text-[var(--ink)]" />
                </div>

                <div className="service-copy">
                  <div className="service-eyebrow">EVERYDAY ESSENTIALS</div>
                  <h3>Shop</h3>
                  <p>
                    Thoughtful food, toys, apparel, and medicines—picked for happy, healthy days.
                  </p>
                </div>

                <div className="service-bottom">
                  <span className="service-badge">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> 15% OFF coupon inside
                  </span>
                  <button>
                    Browse the shop <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 2: Adopt */}
              <div
                className="service-card coral cursor-pointer"
                onClick={() => navigateTo('adopt')}
              >
                <div className="card-topline">
                  <span>02</span>
                  <div className="card-arrow">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="service-icon">
                  <Heart className="w-6 h-6 text-[var(--ink)]" />
                </div>

                <div className="service-copy">
                  <div className="service-eyebrow">FIND YOUR MATCH</div>
                  <h3>Adopt</h3>
                  <p>
                    Learn how adoption works and meet rescued pets looking for their loving person.
                  </p>
                </div>

                <div className="service-bottom">
                  <span className="service-badge">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> 2,400+ pets waiting
                  </span>
                  <button>
                    How adoption works <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 3: Pet Care Plan */}
              <div
                className="service-card lavender cursor-pointer"
                onClick={() => navigateTo('pet-care-plan')}
              >
                <div className="card-topline">
                  <span>03</span>
                  <div className="card-arrow">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="service-icon">
                  <Stethoscope className="w-6 h-6 text-[var(--ink)]" />
                </div>

                <div className="service-copy">
                  <div className="service-eyebrow">CONTINUOUS PET CARE</div>
                  <h3>Pet Care Plan</h3>
                  <p>
                    Dedicated staff & veterinarian support for every pet, regular twice-weekly checkups, health history, and continuous care.
                  </p>
                </div>

                <div className="service-bottom">
                  <span className="service-badge">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Dedicated staff & doctor for every pet
                  </span>
                  <button>
                    Explore Pet Care Plan <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 4. EMOTIONAL APP DOWNLOAD SECTION */}
          <section className="app-download-section max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] my-16">
            <div className="bg-gradient-to-br from-[#F6F0E6] via-[#FAF6EF] to-[#EBE4D8] text-[var(--ink)] rounded-[32px] p-8 md:p-14 border border-[var(--line)] shadow-xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Decorative soft glowing background circle */}
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#DF765F]/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Left Column: Split-Color Headline & Official Store Download Badges */}
              <div className="space-y-8 z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-editorial leading-[1.2] tracking-tight">
                  <span className="text-[var(--ink)] font-editorial">“I'm hungry... </span>
                  <br className="hidden sm:inline" />
                  <span className="text-[#DF765F] font-editorial">Can you help me find a warm meal or home?”</span>
                </h2>

                {/* Official Store Download Badges & Buttons */}
                <div className="pt-2">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Official Google Play Store Badge Button */}
                    <button
                      onClick={() => alert('PetMama Android App download started!')}
                      className="flex items-center gap-3.5 bg-black hover:bg-neutral-900 border border-neutral-800 px-5.5 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl group cursor-pointer"
                    >
                      {/* Accurate Official Google Play Multi-Color Triangle SVG */}
                      <svg className="w-8 h-8 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 512 512">
                        <path fill="#2196F3" d="M32.05 18.01c-3.1 3.51-4.88 8.79-4.88 15.54v444.9c0 6.75 1.78 12.03 4.88 15.54l1.32 1.25 248.86-248.86V245.1L33.37 16.76l-1.32 1.25z"/>
                        <path fill="#4CAF50" d="M282.23 269.28l82.3-85.3L75.18 15.71c-17.49-9.85-32.62-8.67-41.81 1.05l248.86 252.52z"/>
                        <path fill="#F44336" d="M282.23 242.72L33.37 495.24c9.19 9.72 24.32 10.9 41.81 1.05l289.35-168.27-82.3-85.3z"/>
                        <path fill="#FFC107" d="M364.53 328.02l-82.3-82.92v-2.38l82.3-82.92 1.95 1.12 97.43 55.35c27.84 15.82 27.84 41.74 0 57.57l-97.43 55.35-1.95 1.12z"/>
                      </svg>
                      <div className="text-left leading-tight">
                        <div className="text-[10px] text-white/90 uppercase font-semibold tracking-[0.14em]">GET IT ON</div>
                        <div className="text-lg font-bold text-white tracking-tight font-sans">Google Play</div>
                      </div>
                    </button>

                    {/* Official Apple App Store Badge Button */}
                    <button
                      onClick={() => alert('PetMama iOS App Store link opened!')}
                      className="flex items-center gap-3.5 bg-black hover:bg-neutral-900 border border-neutral-800 px-5.5 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl group cursor-pointer"
                    >
                      <svg className="w-8 h-8 shrink-0 fill-current text-white transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.9 18.39,7.14 19.5,8.19C19.41,8.25 17.5,9.37 17.52,11.83C17.55,14.78 20.09,15.77 20.12,15.78C20.09,15.86 19.7,17.21 18.71,19.5M15.8,5.17C16.5,4.32 16.97,3.13 16.84,1.94C15.8,2 14.54,2.65 13.79,3.52C13.12,4.38 12.54,5.6 12.71,6.78C13.87,6.87 15.09,6.02 15.8,5.17Z" />
                      </svg>
                      <div className="text-left leading-tight">
                        <div className="text-[10px] text-white/90 uppercase font-semibold tracking-[0.14em]">Download on the</div>
                        <div className="text-lg font-bold text-white tracking-tight font-sans">App Store</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Authentic Emotional Local Street Puppy Photo */}
              <div className="relative z-10">
                <div className="relative p-2 bg-white rounded-[30px] border border-[var(--line)] shadow-xl">
                  <div className="relative overflow-hidden rounded-[24px] aspect-[4/3] group">
                    <img
                      src={APP_DOWNLOAD_PUPPY_IMG}
                      alt="A cute local street puppy looking up with hopeful eyes"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* SITE FOOTER */}
      <footer className="site-footer">
        <div className="footer-brand" onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="brand-mark">
            <PawPrint className="w-4 h-4 fill-current" />
          </div>
          <span className="brand-name">
            Pet<span>Mama</span>
          </span>
        </div>

        <div className="footer-note text-xs text-[var(--muted-ink)] font-medium">
          A product of Cygnor Labs · © 2026 PetMama. All rights reserved.
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="bottom-nav" aria-label="Mobile Bottom Menu">
        <button
          className={`bottom-nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => navigateTo('home')}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'story' ? 'active' : ''}`}
          onClick={() => navigateTo('story')}
        >
          <PawPrint className="w-4 h-4" />
          <span>Story</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'how-it-works' ? 'active' : ''}`}
          onClick={() => navigateTo('how-it-works')}
        >
          <Sparkles className="w-4 h-4" />
          <span>Works</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'pet-care' || activeTab === 'pet-care-plan' ? 'active' : ''}`}
          onClick={() => navigateTo('pet-care')}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Care</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => navigateTo('contact')}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Contact</span>
        </button>
      </nav>

      {/* FLOATING CHATBOT-STYLE CART WIDGET (FIXED BOTTOM RIGHT) */}
      <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 animate-fadeIn">
        <button
          onClick={() => setShopDrawerOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-[#FAF6EF] hover:bg-white text-[var(--ink)] rounded-full shadow-2xl border border-[var(--line)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          aria-label="View Shopping Cart"
          title="Open Shopping Cart"
        >
          <ShoppingBag className="w-5 h-5 text-[var(--ink)] group-hover:scale-110 transition-transform" />
          <span className="w-6 h-6 rounded-full bg-[#DF765F] text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </button>
      </div>

      {/* ================= MODALS & DRAWERS ================= */}

      {/* VIDEO MODAL ("See how it works") */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[var(--paper)] border border-[var(--line)] rounded-[24px] p-6 shadow-2xl overflow-hidden">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[var(--muted-ink)] hover:text-[var(--ink)] bg-[var(--paper-deep)] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[var(--coral-deep)] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> PetMama Story
            </div>
            <h3 className="text-2xl font-bold font-editorial mb-3 text-[var(--ink)]">
              How PetMama Cares for Your Companion
            </h3>

            <div className="relative aspect-video bg-[#24332f] rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white p-6 my-4 shadow-inner">
              <div className="w-16 h-16 rounded-full bg-[var(--coral)] flex items-center justify-center text-[var(--ink)] mb-4 cursor-pointer hover:scale-110 transition-transform shadow-lg">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
              <p className="text-sm font-medium text-slate-200 text-center max-w-md">
                "We created PetMama so every pet parent has one peaceful place for vet guidance, healthy organic nutrition, and heartwarming adoption."
              </p>
              <span className="text-xs text-[var(--coral)] mt-2 font-semibold">— Dr. Sarah Jenkins, Chief Vet Officer</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--line)] text-xs text-[var(--muted-ink)]">
              <span>Duration: 1 min 45 sec</span>
              <button
                className="px-4 py-2 bg-[var(--ink)] text-white font-bold rounded-full text-xs hover:bg-[#304740]"
                onClick={() => setVideoModalOpen(false)}
              >
                Got it, thank you!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHOP DRAWER / MODAL */}
      {shopDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-[var(--paper)] h-full overflow-y-auto p-6 shadow-2xl flex flex-col border-l border-[var(--line)] animate-slideLeft">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[var(--ink)]" />
                <h3 className="font-bold text-lg text-[var(--ink)]">PetMama Shop Basket</h3>
              </div>
              <button
                onClick={() => setShopDrawerOpen(false)}
                className="p-1.5 text-[var(--muted-ink)] hover:text-[var(--ink)] bg-[var(--paper-deep)] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-2 my-4 overflow-x-auto pb-1 scrollbar-none">
              {(['All', 'Dog', 'Cat', 'Rabbit', 'Fish', 'Toys', 'Apparel', 'Medicine'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setShopCategoryFilter(cat as any)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    shopCategoryFilter === cat
                      ? 'bg-[var(--ink)] text-white shadow-sm'
                      : 'bg-[var(--paper-deep)] text-[var(--muted-ink)] hover:text-[var(--ink)]'
                  }`}
                >
                  {cat === 'All' ? '🐾 All' : cat}
                </button>
              ))}
            </div>

            {/* Catalog Grid */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--coral-deep)]">Featured Items</h4>
              {shopProducts
                .filter(p => shopCategoryFilter === 'All' || p.category === shopCategoryFilter)
                .slice(0, 6)
                .map((product) => (
                  <div
                    key={product.id}
                    className="p-3 bg-white border border-[var(--line)] rounded-[18px] flex gap-3 items-center hover:border-[var(--sage-deep)] transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-xl bg-[var(--paper-deep)] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--sage-deep)] uppercase">
                        <span>{product.category}</span>
                        <span>·</span>
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                      <h5 className="font-bold text-xs text-[var(--ink)] truncate">{product.name}</h5>
                      <div className="font-extrabold text-xs text-[var(--ink)] mt-0.5">৳{product.priceTK.toLocaleString()} TK</div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-[var(--sage)] hover:bg-[var(--sage-deep)] text-[var(--ink)] rounded-full transition-colors flex-shrink-0 cursor-pointer"
                      title="Add to Basket"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>

            {/* Cart Items List */}
            <div className="mt-auto pt-4 border-t border-[var(--line)] bg-[var(--paper-deep)] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-[var(--ink)] flex items-center gap-1.5">
                  <ShoppingBasket className="w-4 h-4" /> Your Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
                </span>
                <span className="text-xs text-[var(--sage-deep)] font-bold">Fast BD Delivery</span>
              </div>

              {cart.length === 0 ? (
                <p className="text-xs text-[var(--muted-ink)] text-center py-4">Your basket is currently empty.</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto mb-3 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-[var(--line)]">
                      <span className="font-medium text-[var(--ink)] truncate max-w-[150px]">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateCartQty(item.id, -1)} className="p-1 hover:bg-[var(--paper-deep)] rounded cursor-pointer">
                          <Minus className="w-3 h-3 text-[var(--muted-ink)]" />
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button onClick={() => updateCartQty(item.id, 1)} className="p-1 hover:bg-[var(--paper-deep)] rounded cursor-pointer">
                          <Plus className="w-3 h-3 text-[var(--muted-ink)]" />
                        </button>
                        <span className="font-extrabold text-[var(--ink)] min-w-[65px] text-right">৳{(item.priceTK * item.quantity).toLocaleString()} TK</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 ml-1 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between font-extrabold text-base text-[var(--ink)] my-2">
                <span>Subtotal</span>
                <span>৳{cartTotalTK.toLocaleString()} TK</span>
              </div>

              <button
                disabled={cart.length === 0}
                className="w-full primary-button py-3 text-sm rounded-xl mt-1 disabled:opacity-50 cursor-pointer"
                onClick={() => { setShopDrawerOpen(false); setCheckoutModalOpen(true); }}
              >
                Proceed to Checkout (৳{cartTotalTK.toLocaleString()} TK) →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADOPTION DRAWER / MODAL */}
      {adoptDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-[var(--paper)] border border-[var(--line)] rounded-[24px] p-6 shadow-2xl overflow-y-auto flex flex-col">
            <button
              onClick={() => { setAdoptDrawerOpen(false); setSelectedPet(null); setAdoptSubmitted(false); }}
              className="absolute top-4 right-4 p-2 text-[var(--muted-ink)] hover:text-[var(--ink)] bg-[var(--paper-deep)] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="eyebrow text-[var(--coral-deep)] mb-1">
              <Heart className="w-4 h-4 fill-current inline mr-1" /> FIND YOUR MATCH
            </div>
            <h3 className="text-2xl font-bold font-editorial text-[var(--ink)] mb-4">
              Meet Pets Waiting for a Loving Home
            </h3>

            {/* Filter buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setAdoptFilter('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-full ${adoptFilter === 'all' ? 'bg-[var(--ink)] text-white' : 'bg-[var(--paper-deep)] text-[var(--muted-ink)]'}`}
              >
                All Pets (2,400+)
              </button>
              <button
                onClick={() => setAdoptFilter('dog')}
                className={`px-3 py-1.5 text-xs font-bold rounded-full ${adoptFilter === 'dog' ? 'bg-[var(--coral-deep)] text-white' : 'bg-[var(--paper-deep)] text-[var(--muted-ink)]'}`}
              >
                Dogs 🐶
              </button>
              <button
                onClick={() => setAdoptFilter('cat')}
                className={`px-3 py-1.5 text-xs font-bold rounded-full ${adoptFilter === 'cat' ? 'bg-[var(--sage-deep)] text-white' : 'bg-[var(--paper-deep)] text-[var(--muted-ink)]'}`}
              >
                Cats 🐱
              </button>
            </div>

            {/* Pet Cards List */}
            {!selectedPet ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                {petsForAdoption
                  .filter(p => adoptFilter === 'all' || p.type === adoptFilter)
                  .map((pet) => (
                    <div
                      key={pet.id}
                      className="bg-white p-4 border border-[var(--line)] rounded-2xl flex gap-4 items-center hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedPet(pet)}
                    >
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-20 h-20 object-cover rounded-xl bg-[var(--paper-deep)]"
                      />
                      <div>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--coral-deep)]">
                          <MapPin className="w-3 h-3" /> {pet.location}
                        </div>
                        <h4 className="font-bold text-base text-[var(--ink)]">{pet.name}</h4>
                        <p className="text-xs text-[var(--muted-ink)]">{pet.breed} · {pet.age}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {pet.personality.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-[var(--paper-deep)] text-[10px] font-semibold text-[var(--ink)] rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              /* Pet Detail & Application Form */
              <div className="bg-white p-6 border border-[var(--line)] rounded-2xl">
                <button
                  onClick={() => setSelectedPet(null)}
                  className="text-xs font-bold text-[var(--coral-deep)] mb-4 inline-flex items-center gap-1 hover:underline"
                >
                  ← Back to all pets
                </button>

                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={selectedPet.image}
                    alt={selectedPet.name}
                    className="w-full md:w-48 h-48 object-cover rounded-2xl"
                  />
                  <div>
                    <h4 className="text-2xl font-bold font-editorial text-[var(--ink)]">{selectedPet.name}</h4>
                    <p className="text-xs text-[var(--muted-ink)] mb-2">{selectedPet.breed} · {selectedPet.age} · {selectedPet.gender}</p>
                    <p className="text-xs text-[var(--ink)] mb-3">📍 {selectedPet.location}</p>

                    <div className="space-y-1 text-xs text-[var(--muted-ink)] mb-4">
                      <div><strong>Health:</strong> {selectedPet.medicalHistory}</div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {selectedPet.personality.map((p, i) => (
                        <span key={i} className="px-2.5 py-1 bg-[var(--coral)] text-[var(--ink)] text-xs font-semibold rounded-full">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {!adoptSubmitted ? (
                  <div className="mt-6 pt-4 border-t border-[var(--line)]">
                    <h5 className="font-bold text-sm text-[var(--ink)] mb-2">Submit Interest Application</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        defaultValue="Maya Parent"
                        className="p-2.5 text-xs bg-[var(--paper)] border border-[var(--line)] rounded-xl focus:outline-none"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        defaultValue="maya@petmama.com"
                        className="p-2.5 text-xs bg-[var(--paper)] border border-[var(--line)] rounded-xl focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => setAdoptSubmitted(true)}
                      className="w-full primary-button py-3 text-xs"
                    >
                      Send Match Application to Shelter
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 p-4 bg-[var(--sage)] rounded-xl flex items-center gap-3 text-[var(--ink)]">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-[var(--sage-deep)]" />
                    <div>
                      <h6 className="font-bold text-xs">Application Received!</h6>
                      <p className="text-[11px]">The partner shelter will contact you within 24 hours to schedule a cozy meet-and-greet with {selectedPet.name}.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VET / DOCTOR BOOKING MODAL */}
      {vetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl max-h-[90vh] bg-[var(--paper)] border border-[var(--line)] rounded-[24px] p-6 shadow-2xl overflow-y-auto">
            <button
              onClick={() => { setVetModalOpen(false); setSelectedVet(null); setBookingSuccess(false); }}
              className="absolute top-4 right-4 p-2 text-[var(--muted-ink)] hover:text-[var(--ink)] bg-[var(--paper-deep)] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="eyebrow text-[var(--lavender-deep)] mb-1">
              <Stethoscope className="w-4 h-4 inline mr-1" /> CARE, MADE SIMPLE
            </div>
            <h3 className="text-2xl font-bold font-editorial text-[var(--ink)] mb-4">
              Book Trusted Veterinary Telehealth & Care
            </h3>

            {!selectedVet ? (
              <div className="space-y-3">
                <p className="text-xs text-[var(--muted-ink)]">Choose a licensed veterinarian available for online consultation or home visits:</p>
                {vetDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="p-4 bg-white border border-[var(--line)] rounded-2xl flex items-center justify-between hover:border-[var(--lavender-deep)] transition-all cursor-pointer"
                    onClick={() => setSelectedVet(doctor)}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-[var(--lavender)] text-[var(--ink)] text-[10px] font-bold rounded-full">
                          {doctor.type}
                        </span>
                        <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400" /> {doctor.rating} ({doctor.reviewsCount})
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[var(--ink)]">{doctor.name}</h4>
                      <p className="text-xs text-[var(--muted-ink)]">{doctor.specialty} · {doctor.experience}</p>
                    </div>

                    <button className="px-3 py-1.5 bg-[var(--ink)] text-white text-xs font-bold rounded-full hover:bg-[#304740]">
                      Book {doctor.availability.split(' ')[0]}
                    </button>
                  </div>
                ))}
              </div>
            ) : !bookingSuccess ? (
              <div className="bg-white p-5 border border-[var(--line)] rounded-2xl">
                <button
                  onClick={() => setSelectedVet(null)}
                  className="text-xs font-bold text-[var(--coral-deep)] mb-3 block"
                >
                  ← Choose another doctor
                </button>

                <h4 className="font-bold text-base text-[var(--ink)] mb-1">{selectedVet.name}</h4>
                <p className="text-xs text-[var(--muted-ink)] mb-4">{selectedVet.specialty} ({selectedVet.type})</p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-[var(--ink)] mb-1">Select Pet Profile</label>
                    <select
                      value={bookingPetName}
                      onChange={(e) => setBookingPetName(e.target.value)}
                      className="w-full p-2.5 bg-[var(--paper)] border border-[var(--line)] rounded-xl font-medium"
                    >
                      <option value="Luna">Luna (Golden Retriever - 2 yrs)</option>
                      <option value="Milo">Milo (Ginger Tabby - 1 yr)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[var(--ink)] mb-1">Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full p-2.5 bg-[var(--paper)] border border-[var(--line)] rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[var(--ink)] mb-1">Time Slot</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full p-2.5 bg-[var(--paper)] border border-[var(--line)] rounded-xl"
                      >
                        <option value="10:30 AM">10:30 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:15 PM">04:15 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[var(--ink)] mb-1">Reason for Visit / Symptoms</label>
                    <textarea
                      placeholder="e.g. Routine wellness checkup, diet questions, or skin consultation..."
                      className="w-full p-2.5 bg-[var(--paper)] border border-[var(--line)] rounded-xl h-20 text-xs"
                      defaultValue="Routine quarterly checkup & seasonal coat review."
                    ></textarea>
                  </div>

                  <button
                    onClick={() => setBookingSuccess(true)}
                    className="w-full primary-button py-3 text-xs mt-2"
                  >
                    Confirm Telehealth Appointment ($45.00)
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[var(--lavender)] p-6 rounded-2xl text-[var(--ink)] text-center">
                <CheckCircle2 className="w-10 h-10 mx-auto text-[var(--ink)] mb-2" />
                <h4 className="font-bold text-lg font-editorial mb-1">Appointment Confirmed!</h4>
                <p className="text-xs mb-4">
                  We sent a calendar link and video call invitation for <strong>{bookingPetName}</strong> on <strong>{bookingDate} at {bookingTime}</strong> with {selectedVet.name}.
                </p>
                <button
                  onClick={() => setVetModalOpen(false)}
                  className="primary-button text-xs py-2 px-6"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MAYA'S PET PARENT DASHBOARD DRAWER */}
      {profileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[var(--paper)] h-full overflow-y-auto p-6 shadow-2xl flex flex-col border-l border-[var(--line)]">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--coral-deep)] text-white font-bold flex items-center justify-center text-xs">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--ink)]">Maya's Pet Sanctuary</h4>
                  <p className="text-[10px] text-[var(--muted-ink)]">Pet Parent Member since 2024</p>
                </div>
              </div>
              <button
                onClick={() => setProfileDrawerOpen(false)}
                className="p-1.5 text-[var(--muted-ink)] hover:text-[var(--ink)] bg-[var(--paper-deep)] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 my-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--coral-deep)]">My Registered Pets</h5>

              <div className="p-3 bg-white border border-[var(--line)] rounded-2xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[var(--sage)] overflow-hidden">
                  <img src={HERO_PETS_IMG} alt="Luna" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h6 className="font-bold text-xs text-[var(--ink)]">Luna</h6>
                  <p className="text-[11px] text-[var(--muted-ink)]">Golden Retriever · 2 yrs</p>
                  <span className="text-[10px] text-[var(--sage-deep)] font-semibold">Vaccines up to date</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-[var(--line)] rounded-2xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[var(--coral)] overflow-hidden">
                  <img src={ADOPT_CAT_IMG} alt="Milo" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h6 className="font-bold text-xs text-[var(--ink)]">Milo</h6>
                  <p className="text-[11px] text-[var(--muted-ink)]">Ginger Tabby · 1 yr</p>
                  <span className="text-[10px] text-[var(--coral-deep)] font-semibold">Next checkup: Oct 15</span>
                </div>
              </div>

              <div className="p-4 bg-[var(--paper-deep)] rounded-2xl space-y-2 text-xs">
                <div className="font-bold text-[var(--ink)]">Recent Orders & Subscriptions</div>
                <div className="flex justify-between text-[11px] text-[var(--muted-ink)]">
                  <span>Organic Salmon Kibble (Monthly)</span>
                  <span className="text-[var(--sage-deep)] font-bold">Active ($34.99)</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-[var(--line)]">
              <button
                className="w-full primary-button py-2.5 text-xs cursor-pointer"
                onClick={() => { setProfileDrawerOpen(false); setVetModalOpen(true); }}
              >
                Schedule Vet Consultation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHOP CHECKOUT MODAL */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[var(--paper)] border border-[var(--line)] rounded-[28px] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[var(--muted-ink)] hover:text-[var(--ink)] bg-[var(--paper-deep)] rounded-full cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="eyebrow text-[var(--sage-deep)] mb-1">
              <ShoppingBag className="w-4 h-4 inline mr-1" /> FAST DELIVERY BD
            </div>
            <h3 className="text-2xl font-bold font-editorial text-[var(--ink)] mb-4">
              Complete Your Order
            </h3>

            {/* Order Items Summary */}
            <div className="p-4 bg-white border border-[var(--line)] rounded-2xl mb-5 space-y-2 text-xs">
              <div className="font-bold text-[var(--ink)] pb-2 border-b border-[var(--line)] flex justify-between">
                <span>Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <span className="text-[var(--coral-deep)] font-extrabold">Total: ৳{cartTotalTK.toLocaleString()} TK</span>
              </div>
              <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-[11px] text-[var(--muted-ink)]">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-bold text-[var(--ink)]">৳{(item.priceTK * item.quantity).toLocaleString()} TK</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[var(--ink)] mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                  placeholder="e.g. Anika Chowdhury"
                  className="w-full p-3 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl font-medium focus:outline-none focus:border-[var(--coral-deep)]"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--ink)] mb-1">Contact Mobile Number (BD)</label>
                <input
                  type="tel"
                  required
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  placeholder="017XXXXXXXX"
                  className="w-full p-3 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl font-medium focus:outline-none focus:border-[var(--coral-deep)]"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--ink)] mb-1">Full Shipping Address</label>
                <textarea
                  required
                  rows={2}
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  placeholder="House No, Road No, Area, City"
                  className="w-full p-3 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl font-medium focus:outline-none focus:border-[var(--coral-deep)]"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-[var(--ink)] mb-1.5">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Cash on Delivery', 'bKash', 'Nagad'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: method })}
                      className={`p-3 rounded-xl border text-center font-bold text-[11px] transition-all cursor-pointer ${
                        checkoutForm.paymentMethod === method
                          ? 'border-[var(--coral-deep)] bg-[var(--coral)]/20 text-[var(--ink)] ring-2 ring-[var(--coral-deep)]/30'
                          : 'border-[var(--line)] bg-white text-[var(--muted-ink)] hover:bg-[var(--paper-deep)]'
                      }`}
                    >
                      {method === 'bKash' ? '💖 bKash' : method === 'Nagad' ? '🟠 Nagad' : '💵 COD'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full primary-button py-3.5 text-sm font-bold shadow-md cursor-pointer"
                >
                  Confirm Order — Pay ৳{cartTotalTK.toLocaleString()} TK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORDER SUCCESS CONFIRMATION MODAL */}
      {orderSuccessModalOpen && lastOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[var(--paper)] border border-[var(--line)] rounded-[28px] p-6 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-2xl shadow-inner">
              ✓
            </div>

            <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">
              Order Confirmed! 🎉
            </h3>

            <p className="text-xs text-[var(--muted-ink)] leading-relaxed">
              Thank you for ordering with PetMama! Your care items are being packed and will arrive at your address within 24-48 hours.
            </p>

            <div className="p-4 bg-white border border-[var(--line)] rounded-2xl text-xs space-y-2 text-left">
              <div className="flex justify-between text-[var(--muted-ink)]">
                <span>Order Reference:</span>
                <span className="font-mono font-bold text-[var(--ink)]">{lastOrderDetails.id}</span>
              </div>
              <div className="flex justify-between text-[var(--muted-ink)]">
                <span>Total Amount:</span>
                <span className="font-bold text-[var(--coral-deep)]">৳{lastOrderDetails.totalTK.toLocaleString()} TK</span>
              </div>
              <div className="flex justify-between text-[var(--muted-ink)]">
                <span>Payment Method:</span>
                <span className="font-bold text-[var(--ink)]">{checkoutForm.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[var(--muted-ink)]">
                <span>Deliver To:</span>
                <span className="font-medium text-[var(--ink)] truncate max-w-[180px]">{checkoutForm.address}</span>
              </div>
            </div>

            <button
              onClick={() => setOrderSuccessModalOpen(false)}
              className="w-full primary-button py-3 text-xs font-bold cursor-pointer"
            >
              Back to PetMama
            </button>
          </div>
        </div>
      )}

      {/* CREATE POST MODAL (Post a Pet for Adoption or Sale) */}
      {createPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[var(--paper)] border border-[var(--line)] rounded-[28px] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setCreatePostModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[var(--muted-ink)] hover:text-[var(--ink)] bg-[var(--paper-deep)] rounded-full cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="eyebrow text-[var(--coral-deep)] mb-1">
              <PawPrint className="w-4 h-4 inline mr-1" /> COMMUNITY BOARD
            </div>
            <h3 className="text-2xl font-bold font-editorial text-[var(--ink)] mb-4">
              Post a Pet for Adoption or Sale
            </h3>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              {/* Post Type Selector */}
              <div>
                <label className="block font-bold text-[var(--ink)] mb-1.5">Listing Category</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewPost({ ...newPost, postType: 'free', priceTK: 0 })}
                    className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      newPost.postType === 'free'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/30'
                        : 'border-[var(--line)] bg-white text-[var(--muted-ink)]'
                    }`}
                  >
                    🎁 Free Adoption (৳0 TK)
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewPost({ ...newPost, postType: 'paid', priceTK: 2500 })}
                    className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      newPost.postType === 'paid'
                        ? 'border-[var(--coral-deep)] bg-[var(--coral)]/20 text-[var(--ink)] ring-2 ring-[var(--coral-deep)]/30'
                        : 'border-[var(--line)] bg-white text-[var(--muted-ink)]'
                    }`}
                  >
                    🏷️ For Sale / Rehoming Fee
                  </button>
                </div>
              </div>

              {/* Price TK if Paid */}
              {newPost.postType === 'paid' && (
                <div className="animate-fadeIn">
                  <label className="block font-bold text-[var(--ink)] mb-1">Selling Price / Rehoming Fee (৳ TK)</label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={newPost.priceTK}
                    onChange={(e) => setNewPost({ ...newPost, priceTK: Number(e.target.value) })}
                    placeholder="e.g. 3500"
                    className="w-full p-3 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl font-bold text-sm focus:outline-none focus:border-[var(--coral-deep)]"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">Post Headline Title</label>
                  <input
                    type="text"
                    required
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="e.g. Playful Persian Kitten for Rehoming"
                    className="w-full p-3 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">Pet Name</label>
                  <input
                    type="text"
                    required
                    value={newPost.petName}
                    onChange={(e) => setNewPost({ ...newPost, petName: e.target.value })}
                    placeholder="e.g. Simba"
                    className="w-full p-3 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">Pet Species</label>
                  <select
                    value={newPost.type}
                    onChange={(e) => setNewPost({ ...newPost, type: e.target.value as any })}
                    className="w-full p-3 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl font-medium"
                  >
                    <option value="Dog">Dog 🐶</option>
                    <option value="Cat">Cat 🐱</option>
                    <option value="Rabbit">Rabbit (Khorgosh) 🐰</option>
                    <option value="Bird">Bird 🦜</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">Age</label>
                  <input
                    type="text"
                    value={newPost.age}
                    onChange={(e) => setNewPost({ ...newPost, age: e.target.value })}
                    placeholder="e.g. 3 Months"
                    className="w-full p-3 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">Breed</label>
                  <input
                    type="text"
                    value={newPost.breed}
                    onChange={(e) => setNewPost({ ...newPost, breed: e.target.value })}
                    placeholder="e.g. Local Cross / Persian"
                    className="w-full p-3 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">Location / Area</label>
                  <input
                    type="text"
                    required
                    value={newPost.location}
                    onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className="w-full p-3 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">Contact Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={newPost.phone}
                    onChange={(e) => setNewPost({ ...newPost, phone: e.target.value })}
                    placeholder="017XXXXXXXX"
                    className="w-full p-3 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[var(--ink)] mb-1">Description & Health Details</label>
                <textarea
                  rows={3}
                  value={newPost.description}
                  onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                  placeholder="Provide health status, vaccination status, behavior traits, and reason for rehoming..."
                  className="w-full p-3 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full primary-button py-3.5 text-xs font-bold cursor-pointer"
              >
                Publish Pet Listing →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* INQUIRE / BUY PET MODAL */}
      {inquirePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[var(--paper)] border border-[var(--line)] rounded-[28px] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setInquirePost(null)}
              className="absolute top-4 right-4 p-2 text-[var(--muted-ink)] hover:text-[var(--ink)] bg-[var(--paper-deep)] rounded-full cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img src={inquirePost.image} alt={inquirePost.petName} className="w-20 h-20 object-cover rounded-2xl bg-[var(--paper-deep)]" />
              <div>
                <span className="px-2.5 py-0.5 bg-[var(--sage)] text-[var(--ink)] text-[10px] font-bold rounded-full">
                  {inquirePost.type.toUpperCase()}
                </span>
                <h3 className="text-2xl font-bold font-editorial text-[var(--ink)] mt-1">{inquirePost.petName}</h3>
                <p className="text-xs text-[var(--muted-ink)]">{inquirePost.breed} · {inquirePost.age}</p>
                <div className="mt-1">
                  {inquirePost.postType === 'free' ? (
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      🎁 Free Adoption (৳0 TK)
                    </span>
                  ) : (
                    <span className="text-xs font-extrabold text-[var(--coral-deep)] bg-[var(--coral)]/20 px-2.5 py-0.5 rounded-full">
                      🏷️ For Sale — ৳{inquirePost.priceTK.toLocaleString()} TK
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-[var(--line)] rounded-2xl space-y-2 text-xs mb-4">
              <div><strong>Headline:</strong> {inquirePost.title}</div>
              <div><strong>Location:</strong> 📍 {inquirePost.location}</div>
              <div><strong>Health Status:</strong> 🩺 {inquirePost.healthStatus}</div>
              <div><strong>Description:</strong> {inquirePost.description}</div>
            </div>

            {/* Guardian Contact Info */}
            <div className="p-4 bg-[var(--paper-deep)] rounded-2xl space-y-3 text-xs mb-4">
              <div className="font-bold text-[var(--ink)]">Guardian Contact Details:</div>
              <div className="flex items-center justify-between">
                <span>Name: <strong>{inquirePost.guardianName}</strong></span>
                <a
                  href={`tel:${inquirePost.phone}`}
                  className="px-3 py-1.5 bg-[var(--ink)] text-white font-bold rounded-lg hover:bg-[#304740] inline-flex items-center gap-1 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Call {inquirePost.phone}
                </a>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`🎉 Your inquiry for ${inquirePost.petName} was sent directly to ${inquirePost.guardianName}! They will contact you shortly.`);
                setInquirePost(null);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-[var(--ink)] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  defaultValue="Maya Parent"
                  className="w-full p-2.5 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--ink)] mb-1">Your Phone / Mobile</label>
                <input
                  type="tel"
                  required
                  defaultValue="01712345678"
                  className="w-full p-2.5 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--ink)] mb-1">Message to Guardian</label>
                <textarea
                  rows={2}
                  defaultValue={inquirePost.postType === 'free' ? `Hi ${inquirePost.guardianName}, I would love to adopt ${inquirePost.petName} and provide a safe indoor home.` : `Hi ${inquirePost.guardianName}, I am interested in purchasing/rehoming ${inquirePost.petName} for ৳${inquirePost.priceTK} TK.`}
                  className="w-full p-2.5 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl"
                ></textarea>
              </div>

              <button type="submit" className="w-full primary-button py-3 text-xs font-bold cursor-pointer">
                Send Direct Message to Guardian
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
