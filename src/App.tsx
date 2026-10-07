import React, { useState, useEffect } from 'react';
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
  ExternalLink,
  MoreVertical,
  Pin,
  Edit3,
  Bookmark,
  EyeOff,
  Flag,
  Camera,
  Image as ImageIcon,
  ChevronUp,
  Tag,
  Copy,
  Percent,
  Quote,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Settings,
  LogOut,
  UserPlus,
  UserCheck,
  MessageSquare,
  Share2
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
  | 'explore'
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
  | 'doctor'
  | 'privacy'
  | 'terms'
  | 'return-policy'
  | 'profile'
  | 'product-detail';

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
  postType: 'free' | 'paid' | 'exchange';
  priceTK: number;
  exchangeWith?: string;
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
  isVerified?: boolean;
}

interface ExplorePost {
  id: string;
  authorName: string;
  authorAvatar: string;
  isVerified?: boolean;
  location: string;
  timeAgo: string;
  needBadge: 'Need Food' | 'Need a Home' | 'Lost Pet' | 'Need Vet' | 'Urgent Care' | 'Food Offered';
  petType: 'Dog' | 'Cat' | 'Rabbit' | 'Bird';
  vaccinated: 'Yes' | 'No';
  age: string;
  description: string;
  image: string;
  offeredFoodCount: number;
  offeredFoodAvatars: string[];
  hasUserOfferedFood?: boolean;
  appliedAdoptCount: number;
  hasUserAppliedAdopt?: boolean;
  isFoodClosed: boolean;
  isAdopted: boolean;
  isOwner?: boolean;
  isPinned?: boolean;
  isSaved?: boolean;
  likesCount: number;
  isLiked?: boolean;
  commentsCount: number;
  commentsList: { id: string; user: string; text: string; timeAgo: string }[];
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

  // User Profile & Authentication State (Matching User Requested UI)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default false so user can test sign-up/login flow
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [authNameInput, setAuthNameInput] = useState('Rahim Ahmed');
  const [authEmailInput, setAuthEmailInput] = useState('rahim@gmail.com');
  const [authPasswordInput, setAuthPasswordInput] = useState('petmama123');
  const [authError, setAuthError] = useState('');
  const [authToast, setAuthToast] = useState('');

  // User Profile Info matching the screenshot
  const [userProfile, setUserProfile] = useState({
    name: 'Rahim Ahmed',
    handle: '@rahim_pets',
    location: 'Banani, Mohakhali',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300', // Professional friendly portrait
    badge: 'Premium Pet Parent',
    bio: 'Caring for Bruno & Bella. Passionate about animal rescue in Dhaka.',
    myPetsCount: 2,
    petsFeedCount: 5,
    vetVisitsCount: 12,
    isFollowing: false
  });

  // Profile Active Sub-Tab: 'posts' | 'pets'
  const [profileSubTab, setProfileSubTab] = useState<'posts' | 'pets'>('posts');
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Cart Animation & Interaction State
  const cartButtonRef = React.useRef<HTMLButtonElement>(null);
  const [cartBouncing, setCartBouncing] = useState(false);
  const [flyingParticles, setFlyingParticles] = useState<{ id: string; startX: number; startY: number; deltaX: number; deltaY: number; image: string }[]>([]);
  const [addedProductIds, setAddedProductIds] = useState<{ [id: string]: boolean }>({});

  // Authentic Shop Rolling Shutter Opening Intro State (দোকানের শাটার এফেক্ট)
  const [shutterActive, setShutterActive] = useState(true);
  const [shutterRolling, setShutterRolling] = useState(false);

  useEffect(() => {
    // 0.6s gentle initial delay showing closed shutter
    const rollTimer = setTimeout(() => {
      setShutterRolling(true);
    }, 600);

    // 5 to 6 sec (5.6s) duration as requested until shutter fully opens and vanishes
    const vanishTimer = setTimeout(() => {
      setShutterActive(false);
    }, 5600);

    return () => {
      clearTimeout(rollTimer);
      clearTimeout(vanishTimer);
    };
  }, []);

  // Explore Street & Stray Pet Community Feed State
  const [explorePosts, setExplorePosts] = useState<ExplorePost[]>([
    {
      id: 'explore-1',
      authorName: 'Sarah Jenkins',
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      isVerified: true,
      location: 'Banani, Block D',
      timeAgo: '2 hrs ago',
      needBadge: 'Need Food',
      petType: 'Dog',
      vaccinated: 'Yes',
      age: '4 Months',
      description: 'Our neighborhood stray dog Bella just gave birth to 4 healthy puppies under the porch! 🐶💛 We urgently need puppy starter kibble & wet food packs for the nursing mother.',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800',
      offeredFoodCount: 7,
      offeredFoodAvatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
      ],
      appliedAdoptCount: 3,
      isFoodClosed: false,
      isAdopted: false,
      isOwner: true, // Post owner: displays "Offer Close" and "Adopted" buttons as shown in Image 3!
      likesCount: 42,
      isLiked: false,
      commentsCount: 14,
      commentsList: [
        { id: 'c1', user: 'Tanvir Ahmed', text: 'I can send 2kg Royal Canin Puppy kibble by courier today!', timeAgo: '1 hr ago' },
        { id: 'c2', user: 'Nusrat Jahan', text: 'Would love to adopt one of the puppies once weaning is complete.', timeAgo: '30 mins ago' }
      ]
    },
    {
      id: 'explore-2',
      authorName: 'Arif Chowdhury',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      isVerified: true,
      location: 'Uttara, Sector 4',
      timeAgo: '5 hrs ago',
      needBadge: 'Need a Home',
      petType: 'Cat',
      vaccinated: 'Yes',
      age: '2 Months',
      description: 'Rescued this cute ginger kitten from torrential rain near Sector 4 park. Litter trained, energetic and looking for a warm indoor family.',
      image: ADOPT_CAT_IMG,
      offeredFoodCount: 4,
      offeredFoodAvatars: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
      ],
      appliedAdoptCount: 5,
      isFoodClosed: false,
      isAdopted: false,
      isOwner: false,
      likesCount: 28,
      isLiked: true,
      commentsCount: 8,
      commentsList: [
        { id: 'c3', user: 'Rana Khan', text: 'So adorable! Sent an adoption request.', timeAgo: '2 hrs ago' }
      ]
    },
    {
      id: 'explore-3',
      authorName: 'Sadia Islam',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      isVerified: true,
      location: 'Dhanmondi, Road 8A',
      timeAgo: '1 day ago',
      needBadge: 'Food Offered',
      petType: 'Dog',
      vaccinated: 'Yes',
      age: '1 Year',
      description: 'Neighborhood street dog Tommy has found a loving permanent home with our community volunteer! Thanks to everyone who offered food and support.',
      image: ADOPT_PUPPY_IMG,
      offeredFoodCount: 12,
      offeredFoodAvatars: [],
      appliedAdoptCount: 8,
      isFoodClosed: true, // Closed state as shown in Image 2!
      isAdopted: true,   // Closed state as shown in Image 2!
      isOwner: false,
      likesCount: 96,
      isLiked: true,
      commentsCount: 22,
      commentsList: []
    }
  ]);

  const [expandedCommentPostId, setExpandedCommentPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [confirmCloseFoodPostId, setConfirmCloseFoodPostId] = useState<string | null>(null);
  const [confirmAdoptedPostId, setConfirmAdoptedPostId] = useState<string | null>(null);
  const [offerFoodModalPost, setOfferFoodModalPost] = useState<ExplorePost | null>(null);
  const [foodOfferMethod, setFoodOfferMethod] = useState<'own' | 'store'>('own');
  const [createExplorePostModalOpen, setCreateExplorePostModalOpen] = useState(false);
  const [activePostMenuId, setActivePostMenuId] = useState<string | null>(null);
  const [hiddenPostIds, setHiddenPostIds] = useState<string[]>([]);
  const [editPostModal, setEditPostModal] = useState<ExplorePost | null>(null);
  const [reportPostModal, setReportPostModal] = useState<ExplorePost | null>(null);
  const [reportReason, setReportReason] = useState<string>('Inappropriate Content or Language');

  // Explore Post Daily Limit & Feedback State
  const [authPromptModalOpen, setAuthPromptModalOpen] = useState<boolean>(false);
  const [dailyLimitError, setDailyLimitError] = useState<string | null>(null);
  const [postSuccessMsg, setPostSuccessMsg] = useState<string | null>(null);

  const photoInputRef = React.useRef<HTMLInputElement>(null);
  const [registeredPetsList, setRegisteredPetsList] = useState<string[]>(['None', 'Luna (Golden Retriever)', 'Milo (Ginger Tabby)']);
  const [newExplorePost, setNewExplorePost] = useState({
    authorName: 'Anika Chowdhury',
    location: 'Banani, Mohakhali',
    needBadge: 'Need Food' as 'Need Food' | 'Need a Home' | 'Lost Pet' | 'Need Vet',
    registeredPet: 'None',
    description: '',
    photos: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800'
    ] as string[],
    petType: 'Dog' as 'Dog' | 'Cat' | 'Rabbit' | 'Bird',
    vaccinated: 'Yes' as 'Yes' | 'No',
    age: '3 Months'
  });

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
  const [shopCategoryFilter, setShopCategoryFilter] = useState<'All' | 'Food' | 'Cloths' | 'Dog' | 'Cat' | 'Rabbit' | 'Fish' | 'Toys' | 'Apparel' | 'Medicine'>('All');
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [modalQty, setModalQty] = useState<number>(1);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderSuccessModalOpen, setOrderSuccessModalOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: 'Anika Chowdhury',
    phone: '01712345678',
    address: 'House 42, Road 11, Banani, Dhaka',
    paymentMethod: 'Cash on Delivery' as 'Cash on Delivery' | 'bKash' | 'Nagad'
  });
  const [lastOrderDetails, setLastOrderDetails] = useState<{ id: string; totalTK: number; date: string } | null>(null);

  // User Profile Modal & Pet Ownership Transfer State
  const [selectedUserProfile, setSelectedUserProfile] = useState<{
    name: string;
    handle: string;
    location: string;
    bio: string;
    avatar: string;
    posts: ExplorePost[];
  } | null>(null);

  const [transferPetModalOpen, setTransferPetModalOpen] = useState(false);
  const [petToTransfer, setPetToTransfer] = useState<MyRegisteredPet | null>(null);
  const [transferTargetUsername, setTransferTargetUsername] = useState('');

  // Adoption & Rehoming Feed state
  const [adoptionPosts, setAdoptionPosts] = useState<AdoptionPost[]>([
    {
      id: 'post-1',
      title: 'Purebred Persian Male Kitten (Doll Face)',
      petName: 'Simba',
      type: 'Cat',
      postType: 'paid',
      priceTK: 6500,
      age: '3.5 Months',
      breed: 'Doll Face Persian',
      gender: 'Male',
      location: 'GEC Circle, Chittagong',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
      healthStatus: 'FVRCP Vaccinated · Potty Trained',
      description: 'Fluffy white Persian kitten with crystal blue eyes. Extremely affectionate, playful, and vaccinated.',
      guardianName: 'Mahir Chowdhury',
      phone: '01655443322',
      postedDate: '2 hours ago',
      isVerified: true
    },
    {
      id: 'post-2',
      title: 'Golden Retriever Pure Puppy (KCI Lineage)',
      petName: 'Rocky',
      type: 'Dog',
      postType: 'paid',
      priceTK: 18500,
      age: '2.5 Months',
      breed: 'Golden Retriever',
      gender: 'Male',
      location: 'Banani, Dhaka',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600',
      healthStatus: 'Dewormed · Parvo 1st Shot Done',
      description: 'Championship lineage Golden Retriever puppy. Active, joyful, and highly trainable. Health booklet provided.',
      guardianName: 'Tanvir Hossain',
      phone: '01899887766',
      postedDate: '5 hours ago',
      isVerified: true
    },
    {
      id: 'post-3',
      title: 'British Shorthair Lilac Cat (Exchange Available)',
      petName: 'Luna',
      type: 'Cat',
      postType: 'exchange',
      exchangeWith: 'Persian Kitten or Golden Retriever Puppy',
      priceTK: 0,
      age: '10 Months',
      breed: 'British Shorthair',
      gender: 'Female',
      location: 'Dhanmondi, Dhaka',
      image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=600',
      healthStatus: 'Fully Vaccinated · Microchipped',
      description: 'Calm and royal lilac British Shorthair female. Looking to exchange with verified pet lover for a Persian pair or friendly pup.',
      guardianName: 'Ayesha Rahman',
      phone: '01711223344',
      postedDate: 'Yesterday',
      isVerified: true
    },
    {
      id: 'post-4',
      title: 'Netherland Dwarf Bunny Pair for Rehoming',
      petName: 'Snowflake & Fluffy',
      type: 'Rabbit',
      postType: 'paid',
      priceTK: 2200,
      age: '5 Months',
      breed: 'Netherland Dwarf',
      gender: 'Pair (Male & Female)',
      location: 'Mirpur, Dhaka',
      image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=600',
      healthStatus: 'Dewormed · Timothy Hay Trained',
      description: 'Healthy and docile bunny pair. Rehoming due to relocation. Cage and starter feed pack included.',
      guardianName: 'Sadia Islam',
      phone: '01922334455',
      postedDate: '1 day ago',
      isVerified: true
    },
    {
      id: 'post-5',
      title: 'Sun Conure Exotic Parakeet (Hand-Tamed)',
      petName: 'Mango',
      type: 'Bird',
      postType: 'exchange',
      exchangeWith: 'Cockatiel Pair or Large Aviary Setup',
      priceTK: 0,
      age: '8 Months',
      breed: 'Sun Conure',
      gender: 'DNA Male',
      location: 'Bashundhara, Dhaka',
      image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&q=80&w=600',
      healthStatus: 'Wing-Feather Groomed · Vet Checked',
      description: 'Bright and vocally cheerful Sun Conure. Hand-fed and sits on shoulders. Open for exchange with bird lovers.',
      guardianName: 'Rafiqul Alam',
      phone: '01511224466',
      postedDate: '2 days ago',
      isVerified: true
    },
    {
      id: 'post-6',
      title: 'Rescued Local Deshi Puppy (Free Adoption)',
      petName: 'Barnaby',
      type: 'Dog',
      postType: 'free',
      priceTK: 0,
      age: '3 Months',
      breed: 'Deshi Indie Rescue',
      gender: 'Male',
      location: 'Uttara, Dhaka',
      image: ADOPT_PUPPY_IMG,
      healthStatus: 'Rabies Shot Done · Dewormed',
      description: 'Barnaby is loving, intelligent, and looking for an indoor home that will cherish him unconditionally.',
      guardianName: 'Maya Parent',
      phone: '01712345678',
      postedDate: '3 days ago',
      isVerified: true
    }
  ]);
  const [feedTypeFilter, setFeedTypeFilter] = useState<'all' | 'sale' | 'exchange' | 'free'>('all');
  const [petTypeFilter, setPetTypeFilter] = useState<'all' | 'Dog' | 'Cat' | 'Rabbit' | 'Bird'>('all');
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [inquirePost, setInquirePost] = useState<AdoptionPost | null>(null);
  const [sellPetPhotos, setSellPetPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600'
  ]);
  const sellPetPhotoInputRef = React.useRef<HTMLInputElement>(null);
  const [petCircleSuccessMsg, setPetCircleSuccessMsg] = useState<string>('');
  const [appliedPetCircleIds, setAppliedPetCircleIds] = useState<string[]>([]);

  // Post a Pet Modal Tab State ('from_my_pets' | 'add_manually')
  const [postPetActiveTab, setPostPetActiveTab] = useState<'from_my_pets' | 'add_manually'>('from_my_pets');

  // User's Registered Pets for "From My Pets" tab (Image 3)
  interface MyRegisteredPet {
    id: string;
    name: string;
    breed: string;
    age: string;
    image: string;
    type: 'Dog' | 'Cat' | 'Bird' | 'Other';
    gender: 'Male' | 'Female';
    vaccinationStatus: 'Vaccinated' | 'No / Pending';
    subscriptionMonths?: string;
  }

  const [myPetsList, setMyPetsList] = useState<MyRegisteredPet[]>([
    {
      id: 'mypet-1',
      name: 'Bruno',
      breed: 'Retriever',
      age: '2 yrs',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600',
      type: 'Dog',
      gender: 'Male',
      vaccinationStatus: 'Vaccinated',
      subscriptionMonths: '8 Months'
    },
    {
      id: 'mypet-2',
      name: 'Cleo',
      breed: 'Persian',
      age: '5 mos',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
      type: 'Cat',
      gender: 'Female',
      vaccinationStatus: 'Vaccinated',
      subscriptionMonths: '6 Months'
    }
  ]);
  const [selectedMyPetId, setSelectedMyPetId] = useState<string>('mypet-1');

  // Form states for "From My Pets"
  const [fromMyPetsLocation, setFromMyPetsLocation] = useState<string>('Banani, Block C, Dhaka');
  const [fromMyPetsPricing, setFromMyPetsPricing] = useState<'Paid' | 'Free'>('Paid');
  const [fromMyPetsPrice, setFromMyPetsPrice] = useState<string>('0.00');
  const [fromMyPetsDescription, setFromMyPetsDescription] = useState<string>('');

  // Form states for "Add Manually" (Image 4)
  const [manualPetName, setManualPetName] = useState<string>('Charlie');
  const [manualPetCategory, setManualPetCategory] = useState<'Dog' | 'Cat' | 'Bird' | 'Other'>('Dog');
  const [manualPetAge, setManualPetAge] = useState<string>('1 year');
  const [manualPetSex, setManualPetSex] = useState<'Male' | 'Female'>('Male');
  const [manualPetCareSub, setManualPetCareSub] = useState<string>('8 Months');
  const [manualVaccination, setManualVaccination] = useState<'Vaccinated' | 'No / Pending'>('Vaccinated');
  const [manualTemperamentInput, setManualTemperamentInput] = useState<string>('Playful & Gentle');
  const [manualSelectedTraits, setManualSelectedTraits] = useState<string[]>(['Friendly', 'Playful']);
  const [manualPricing, setManualPricing] = useState<'Paid' | 'Free'>('Paid');
  const [manualPrice, setManualPrice] = useState<string>('0.00');
  const [manualLocation, setManualLocation] = useState<string>('Banani, Block C, Dhaka');

  // Quick selectable traits matching Image 4
  const availableTraits = ['Friendly', 'Playful', 'Calm', 'Kid Friendly', 'House Trained'];

  // Post Pet Form State (fallback / backward compat)
  const [newPost, setNewPost] = useState({
    title: '',
    petName: '',
    type: 'Dog' as 'Dog' | 'Cat' | 'Rabbit' | 'Bird',
    postType: 'paid' as 'free' | 'paid' | 'exchange',
    priceTK: 3500,
    exchangeWith: '',
    age: '3 Months',
    breed: '',
    gender: 'Male',
    location: 'Gulshan-2, Dhaka',
    phone: '01712345678',
    guardianName: '',
    healthStatus: 'Vaccinated & Dewormed',
    description: ''
  });

  // Pet Care Plan State (matching Image 3)
  const [includeVaccination, setIncludeVaccination] = useState(true);
  const [carePlanMonths, setCarePlanMonths] = useState<number>(1);
  const [selectedCarePlanPetId, setSelectedCarePlanPetId] = useState<string>('none');
  const [carePlanSubscribedSuccess, setCarePlanSubscribedSuccess] = useState(false);

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
  const [homeFeaturedFilter, setHomeFeaturedFilter] = useState<'All' | 'Food' | 'Cloths' | 'Medicine'>('All');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [copiedOfferCoupon, setCopiedOfferCoupon] = useState<string | null>(null);

  const copyOfferCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedOfferCoupon(code);
    setTimeout(() => setCopiedOfferCoupon(null), 2500);
  };

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
      id: 's12b',
      name: 'Padded Reflective Weather-Proof Harness & Leash Set',
      category: 'Apparel',
      priceTK: 680,
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
      description: 'Comfortable, escape-proof chest harness for safe walking and daily wear.'
    },
    {
      id: 's13',
      name: 'Multivitamin & Calcium Syrup for Pets (200ml)',
      category: 'Medicine',
      priceTK: 420,
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
      description: 'Promotes bone growth, shiny fur, and strong immune defense.'
    },
    {
      id: 's13b',
      name: 'Flea & Tick Spot-On Pipette Drops (Pack of 3)',
      category: 'Medicine',
      priceTK: 590,
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600',
      rating: 4.8,
      description: 'Fast-acting veterinary preventative protection against external parasites.'
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
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const checkDailyPostLimit = (): boolean => {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastPostDate = localStorage.getItem('petmama_last_post_date');
    return lastPostDate === todayStr;
  };

  const publishFinalExplorePost = (authorName: string, avatarUrl: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    localStorage.setItem('petmama_last_post_date', todayStr);

    const primaryImage = newExplorePost.photos.length > 0 
      ? newExplorePost.photos[0] 
      : 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800';

    const createdPost: ExplorePost = {
      id: `explore-${Date.now()}`,
      authorName,
      authorAvatar: avatarUrl,
      isVerified: !authorName.startsWith('Anonymous'),
      location: newExplorePost.location,
      timeAgo: 'Just now',
      needBadge: newExplorePost.needBadge,
      petType: newExplorePost.petType,
      vaccinated: newExplorePost.vaccinated,
      age: newExplorePost.age,
      description: newExplorePost.description,
      image: primaryImage,
      offeredFoodCount: 0,
      offeredFoodAvatars: [],
      appliedAdoptCount: 0,
      isFoodClosed: false,
      isAdopted: false,
      isOwner: true,
      likesCount: 1,
      isLiked: true,
      commentsCount: 0,
      commentsList: []
    };

    setExplorePosts(prev => [createdPost, ...prev]);
    setCreateExplorePostModalOpen(false);
    setAuthPromptModalOpen(false);
    setDailyLimitError(null);
    setPostSuccessMsg(`🎉 Your post has been published as ${authorName}! (Limit: 1 post per day)`);
    setTimeout(() => setPostSuccessMsg(null), 6000);

    setNewExplorePost({
      authorName: 'Anika Chowdhury',
      location: 'Banani, Mohakhali',
      needBadge: 'Need Food',
      registeredPet: 'None',
      description: '',
      photos: [
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800'
      ],
      petType: 'Dog',
      vaccinated: 'Yes',
      age: '3 Months'
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setNewExplorePost(prev => ({
              ...prev,
              photos: [...prev.photos, event.target!.result as string]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemovePhoto = (index: number) => {
    setNewExplorePost(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleCreateExplorePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExplorePost.description.trim()) return;

    if (checkDailyPostLimit()) {
      setDailyLimitError('You have already published a post today! You can only post 1 time per day. Please try again tomorrow.');
      return;
    }

    if (isLoggedIn) {
      publishFinalExplorePost(newExplorePost.authorName || 'Anika Chowdhury', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200');
    } else {
      setAuthPromptModalOpen(true);
    }
  };

  const handlePostAnonymous = () => {
    if (checkDailyPostLimit()) {
      setDailyLimitError('You have already published a post today! You can only post 1 time per day. Please try again tomorrow.');
      return;
    }
    const currentAnonNum = localStorage.getItem('petmama_anon_num') || '1';
    if (!localStorage.getItem('petmama_anon_num')) {
      localStorage.setItem('petmama_anon_num', '1');
    }
    const anonName = `Anonymous ${currentAnonNum}`;
    publishFinalExplorePost(anonName, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100');
  };

  const handlePostLoggedIn = () => {
    if (checkDailyPostLimit()) {
      setDailyLimitError('You have already published a post today! You can only post 1 time per day. Please try again tomorrow.');
      return;
    }
    setIsLoggedIn(true);
    publishFinalExplorePost(newExplorePost.authorName || 'Anika Chowdhury', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200');
  };

  const handleConfirmCloseFood = (postId: string) => {
    setExplorePosts(prev => prev.map(p => p.id === postId ? { ...p, isFoodClosed: true } : p));
    setConfirmCloseFoodPostId(null);
  };

  const handleConfirmAdopted = (postId: string) => {
    setExplorePosts(prev => prev.map(p => p.id === postId ? { ...p, isAdopted: true, isFoodClosed: true } : p));
    setConfirmAdoptedPostId(null);
  };

  const toggleLikeExplorePost = (postId: string) => {
    setExplorePosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;
    setExplorePosts(prev => prev.map(p => {
      if (p.id === postId) {
        const updatedComments = [
          ...p.commentsList,
          { id: `c-${Date.now()}`, user: 'Anika Chowdhury', text: newCommentText.trim(), timeAgo: 'Just now' }
        ];
        return {
          ...p,
          commentsCount: updatedComments.length,
          commentsList: updatedComments
        };
      }
      return p;
    }));
    setNewCommentText('');
  };

  const handleSponsorFood = (postId: string, product: ShopProduct) => {
    addToCart(product);
    setExplorePosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          offeredFoodCount: p.offeredFoodCount + 1,
          hasUserOfferedFood: true,
          offeredFoodAvatars: [
            ...p.offeredFoodAvatars,
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
          ]
        };
      }
      return p;
    }));
    setOfferFoodModalPost(null);
  };

  const handleContinueFoodOffer = () => {
    if (!offerFoodModalPost) return;

    if (foodOfferMethod === 'own') {
      // 1. My Own Food selected -> increment offeredFoodCount by 1 and mark hasUserOfferedFood
      setExplorePosts(prev => prev.map(p => {
        if (p.id === offerFoodModalPost.id) {
          return {
            ...p,
            offeredFoodCount: p.offeredFoodCount + 1,
            hasUserOfferedFood: true,
            offeredFoodAvatars: [
              ...p.offeredFoodAvatars,
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
            ]
          };
        }
        return p;
      }));
      setPostSuccessMsg(`🎉 Thank you! You offered food for ${offerFoodModalPost.authorName}'s rescue in ${offerFoodModalPost.location}! Button is now updated to "Food Offered ✓".`);
      setTimeout(() => setPostSuccessMsg(null), 6000);
      setOfferFoodModalPost(null);
    } else {
      // 2. Buy from Food Store selected -> mark offered and navigate to Shop section
      const petType = offerFoodModalPost.petType;
      const targetPostId = offerFoodModalPost.id;
      setExplorePosts(prev => prev.map(p => p.id === targetPostId ? { ...p, hasUserOfferedFood: true } : p));
      setOfferFoodModalPost(null);
      navigateTo('shop');
      selectShopSubcategory(petType === 'Cat' ? 'Cat' : petType === 'Dog' ? 'Dog' : 'All');
      setPostSuccessMsg(`🛍️ Navigated to PetMama Shop! Select food packs to order & deliver for ${offerFoodModalPost.authorName}'s rescue in ${offerFoodModalPost.location}. Button is marked "Food Offered ✓".`);
      setTimeout(() => setPostSuccessMsg(null), 6000);
    }
  };

  const handleApplyAdoptExplore = (post: ExplorePost) => {
    if (post.hasUserAppliedAdopt) return;
    setExplorePosts(prev => prev.map(p => {
      if (p.id === post.id) {
        return {
          ...p,
          appliedAdoptCount: p.appliedAdoptCount + 1,
          hasUserAppliedAdopt: true
        };
      }
      return p;
    }));
    setPostSuccessMsg(`🎉 Thank you! Your adoption application for ${post.authorName}'s rescue post has been submitted. The button is now marked as "Adopt Applied"!`);
    setTimeout(() => setPostSuccessMsg(null), 6000);
  };

  const togglePinPost = (postId: string) => {
    setExplorePosts(prev => prev.map(p => p.id === postId ? { ...p, isPinned: !p.isPinned } : p));
    setActivePostMenuId(null);
  };

  const toggleSavePost = (postId: string) => {
    setExplorePosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isSaved = !p.isSaved;
        alert(isSaved ? 'Post saved to your bookmarks!' : 'Post removed from saved bookmarks.');
        return { ...p, isSaved };
      }
      return p;
    }));
    setActivePostMenuId(null);
  };

  const handleHidePost = (postId: string) => {
    setHiddenPostIds(prev => [...prev, postId]);
    setActivePostMenuId(null);
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setExplorePosts(prev => prev.filter(p => p.id !== postId));
    }
    setActivePostMenuId(null);
  };

  const handleSaveEditPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPostModal) return;
    setExplorePosts(prev => prev.map(p => p.id === editPostModal.id ? editPostModal : p));
    setEditPostModal(null);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reporting. Our community moderation team will review this post within 12 hours.');
    setReportPostModal(null);
  };

  const isProductInFilter = (product: ShopProduct, filter: string) => {
    if (filter === 'All') return true;
    if (filter === 'Food') {
      return ['Dog', 'Cat', 'Rabbit', 'Fish'].includes(product.category) ||
        product.name.toLowerCase().includes('food') ||
        product.name.toLowerCase().includes('treat') ||
        product.name.toLowerCase().includes('hay') ||
        product.name.toLowerCase().includes('jerky') ||
        product.name.toLowerCase().includes('granules');
    }
    if (filter === 'Cloths' || filter === 'Apparel') {
      return product.category === 'Apparel' || product.name.toLowerCase().includes('clothes') || product.name.toLowerCase().includes('sweater') || product.name.toLowerCase().includes('harness');
    }
    if (filter === 'Medicine') {
      return product.category === 'Medicine' || product.name.toLowerCase().includes('supplement') || product.name.toLowerCase().includes('treatment') || product.name.toLowerCase().includes('syrup') || product.name.toLowerCase().includes('drops');
    }
    return product.category === filter;
  };

  const selectShopSubcategory = (cat: 'All' | 'Food' | 'Cloths' | 'Dog' | 'Cat' | 'Rabbit' | 'Fish' | 'Toys' | 'Apparel' | 'Medicine') => {
    setShopCategoryFilter(cat);
    setActiveTab('shop');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: ShopProduct, e?: React.MouseEvent) => {
    // 1. Add item to cart state
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // 2. Show '✓ Added!' on product button temporarily (1.5 seconds)
    setAddedProductIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProductIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);

    // 3. Trigger Flying Particle toward Header Cart Button
    if (e && cartButtonRef.current) {
      const btnRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const cartRect = cartButtonRef.current.getBoundingClientRect();

      const startX = btnRect.left + btnRect.width / 2 - 20;
      const startY = btnRect.top + btnRect.height / 2 - 20;
      const targetX = cartRect.left + cartRect.width / 2 - 20;
      const targetY = cartRect.top + cartRect.height / 2 - 20;

      const deltaX = targetX - startX;
      const deltaY = targetY - startY;

      const particleId = `particle-${Date.now()}-${Math.random()}`;
      setFlyingParticles(prev => [
        ...prev,
        { id: particleId, startX, startY, deltaX, deltaY, image: product.image }
      ]);

      // Remove particle when animation ends (650ms)
      setTimeout(() => {
        setFlyingParticles(prev => prev.filter(p => p.id !== particleId));
      }, 650);

      // Wiggle Cart Button when particle arrives at 450ms
      setTimeout(() => {
        setCartBouncing(true);
        setTimeout(() => setCartBouncing(false), 550);
      }, 450);
    } else {
      setCartBouncing(true);
      setTimeout(() => setCartBouncing(false), 550);
    }
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
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleGoogleAuth = () => {
    setIsLoggedIn(true);
    setAuthModalOpen(false);
    setUserProfile(prev => ({
      ...prev,
      name: 'Rahim Ahmed',
      handle: '@rahim_pets'
    }));
    setAuthToast('🎉 Successfully signed in with Google! Welcome to PetMama.');
    setTimeout(() => setAuthToast(''), 5000);
    navigateTo('profile');
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'signup' && !authNameInput.trim()) {
      setAuthError('Please enter your full name');
      return;
    }
    if (!authEmailInput.trim() || !authPasswordInput.trim()) {
      setAuthError('Please enter email and password');
      return;
    }
    setIsLoggedIn(true);
    setAuthModalOpen(false);
    setAuthError('');
    if (authMode === 'signup' && authNameInput.trim()) {
      setUserProfile(prev => ({
        ...prev,
        name: authNameInput.trim(),
        handle: `@${authNameInput.trim().toLowerCase().replace(/\s+/g, '_')}`
      }));
    }
    setAuthToast(`🎉 Welcome ${authNameInput.split(' ')[0]}! You are now logged in.`);
    setTimeout(() => setAuthToast(''), 5000);
    navigateTo('profile');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSettingsModalOpen(false);
    setAuthToast('You have been logged out.');
    setTimeout(() => setAuthToast(''), 4000);
    navigateTo('home');
  };

  const handleSellPetPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSellPetPhotos(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeSellPetPhoto = (idx: number) => {
    setSellPetPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const detectSellPetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setNewPost(prev => ({ ...prev, location: 'Gulshan-2, Dhaka (GPS Detected)' }));
        },
        () => {
          setNewPost(prev => ({ ...prev, location: 'Dhanmondi, Dhaka (Auto)' }));
        }
      );
    } else {
      setNewPost(prev => ({ ...prev, location: 'Banani, Dhaka' }));
    }
  };

  // Close modals on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShopDrawerOpen(false);
        setCreatePostModalOpen(false);
        setInquirePost(null);
        setOfferFoodModalPost(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();

    let created: AdoptionPost;

    if (postPetActiveTab === 'from_my_pets') {
      const selectedPet = myPetsList.find(p => p.id === selectedMyPetId) || myPetsList[0];
      if (!selectedPet) {
        alert('⚠️ Please select a pet or add one.');
        return;
      }

      const parsedPrice = fromMyPetsPricing === 'Paid' ? parseFloat(fromMyPetsPrice) || 3500 : 0;

      created = {
        id: `post-${Date.now()}`,
        title: `${selectedPet.name} — ${selectedPet.breed}`,
        petName: selectedPet.name,
        type: selectedPet.type === 'Other' ? 'Dog' : selectedPet.type,
        postType: fromMyPetsPricing === 'Paid' ? 'paid' : 'free',
        priceTK: parsedPrice,
        age: selectedPet.age,
        breed: selectedPet.breed,
        gender: selectedPet.gender,
        location: fromMyPetsLocation || 'Banani, Block C, Dhaka',
        image: selectedPet.image,
        healthStatus: `${selectedPet.vaccinationStatus} · Care: ${selectedPet.subscriptionMonths || '6 Months'}`,
        description: fromMyPetsDescription || `${selectedPet.name} is a healthy, well-socialized pet looking for a loving home or buyer.`,
        guardianName: 'Verified Member',
        phone: '01712345678',
        postedDate: 'Just now',
        isVerified: true
      };
    } else {
      // Add Manually Submission
      if (!manualPetName.trim()) {
        alert('⚠️ Pet Name is required.');
        return;
      }

      const primaryImg = sellPetPhotos.length > 0 
        ? sellPetPhotos[0]
        : manualPetCategory === 'Dog'
          ? ADOPT_PUPPY_IMG
          : manualPetCategory === 'Cat'
            ? ADOPT_CAT_IMG
            : 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600';

      const parsedPrice = manualPricing === 'Paid' ? parseFloat(manualPrice) || 3500 : 0;
      const traitsStr = manualSelectedTraits.length > 0 ? manualSelectedTraits.join(', ') : manualTemperamentInput;

      created = {
        id: `post-${Date.now()}`,
        title: `${manualPetName} — ${manualPetCategory}`,
        petName: manualPetName,
        type: manualPetCategory === 'Other' ? 'Dog' : manualPetCategory,
        postType: manualPricing === 'Paid' ? 'paid' : 'free',
        priceTK: parsedPrice,
        age: manualPetAge || '1 year',
        breed: `${manualPetCategory} · ${manualPetSex}`,
        gender: manualPetSex,
        location: manualLocation || 'Banani, Block C, Dhaka',
        image: primaryImg,
        healthStatus: `${manualVaccination} · Traits: ${traitsStr || 'Friendly'}`,
        description: `Care Plan: ${manualPetCareSub}. Traits: ${traitsStr}. Healthy and ready for pet circle.`,
        guardianName: 'Verified Guardian',
        phone: '01712345678',
        postedDate: 'Just now',
        isVerified: true
      };

      // Also register this new pet into user's myPetsList for future convenience
      const newMyPet: MyRegisteredPet = {
        id: `mypet-${Date.now()}`,
        name: manualPetName,
        breed: `${manualPetCategory} · ${manualPetSex}`,
        age: manualPetAge || '1 year',
        image: primaryImg,
        type: manualPetCategory,
        gender: manualPetSex,
        vaccinationStatus: manualVaccination,
        subscriptionMonths: manualPetCareSub
      };
      setMyPetsList(prev => [...prev, newMyPet]);
      setSelectedMyPetId(newMyPet.id);
    }

    setAdoptionPosts(prev => [created, ...prev]);
    setCreatePostModalOpen(false);
    setPetCircleSuccessMsg(`🎉 Your pet "${created.petName}" has been successfully published to Pet Circle!`);
    setTimeout(() => setPetCircleSuccessMsg(''), 7000);
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
    <div className="petmama-page relative">
      {/* AUTHENTIC SHOP ROLLING SHUTTER INTRO ANIMATION (দোকানের শাটার খোলার এফেক্ট - CLEAN NO TEXT) */}
      {shutterActive && (
        <div
          className={`fixed inset-0 z-[999999] pointer-events-auto flex flex-col justify-between overflow-hidden ${
            shutterRolling ? 'animate-shutter-container' : ''
          }`}
          style={{ backgroundColor: 'rgba(20, 10, 7, 0.45)' }}
        >
          {/* Top Shop Shutter Hood Housing Box (Clean Metallic - No Text) */}
          <div className="shutter-top-hood h-12 sm:h-16 w-full relative z-30 flex items-center justify-end px-4 sm:px-8 border-b-4 border-[#24110b]">
            {/* Subtle Skip Button */}
            <button
              onClick={() => setShutterActive(false)}
              className="px-3 py-1 bg-black/40 hover:bg-black/70 border border-white/20 text-white/90 font-bold text-[11px] rounded-full cursor-pointer transition-all shadow-md"
            >
              Skip ✕
            </button>
          </div>

          {/* Center Mechanical Shutter Surface (Rises upwards like a real shop rolling shutter) */}
          <div className="flex-1 w-full relative overflow-hidden flex">
            {/* Left Vertical Guide Rail */}
            <div className="w-3 sm:w-6 h-full shutter-side-rail shrink-0 z-20"></div>

            {/* Rolling Slatted Curtain (Clean Slats - No Text) */}
            <div className="flex-1 h-full relative overflow-hidden">
              <div
                className={`w-full h-full shutter-slats-bg relative flex flex-col justify-end shadow-2xl ${
                  shutterRolling ? 'animate-shutter-open' : ''
                }`}
              >
                {/* Bottom Heavy Iron Rail with Realistic Steel Lock Plates (Matching Uploaded Image) */}
                <div className="shutter-bottom-bar h-14 sm:h-16 w-full relative z-20 flex items-center justify-between px-8 sm:px-24 shadow-2xl">
                  {/* Left Lock Plate */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full shutter-lock-plate flex items-center justify-center shadow-lg">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700 shadow-inner"></div>
                    </div>
                  </div>

                  {/* Center Metal Pull Grip Plate */}
                  <div className="w-24 sm:w-36 h-2 rounded-full bg-gradient-to-r from-[#4a261a] via-[#8c543f] to-[#4a261a] border border-[#2b140d] shadow-sm"></div>

                  {/* Right Lock Plate */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full shutter-lock-plate flex items-center justify-center shadow-lg">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700 shadow-inner"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Vertical Guide Rail */}
            <div className="w-3 sm:w-6 h-full shutter-side-rail shrink-0 z-20"></div>
          </div>
        </div>
      )}

      {/* Subtle paper grain overlay */}
      <div className="grain" aria-hidden="true"></div>

      {/* Flying Cart Item Particles Overlay */}
      {flyingParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed z-[9999] pointer-events-none animate-fly-to-cart"
          style={{
            left: `${particle.startX}px`,
            top: `${particle.startY}px`,
            '--delta-x': `${particle.deltaX}px`,
            '--delta-y': `${particle.deltaY}px`
          } as React.CSSProperties}
        >
          <div className="w-10 h-10 rounded-full bg-white border-2 border-[var(--coral-deep)] p-0.5 shadow-2xl flex items-center justify-center overflow-hidden">
            <img src={particle.image} alt="Adding product" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
      ))}

      {/* 1. FIXED TOP SITE HEADER */}
      <div className="fixed top-0 left-0 right-0 w-full z-[1000] bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[var(--line)]/80 shadow-xs">
        <header className="site-header">
          <div className="brand" onClick={() => navigateTo('home')}>
            <div className="brand-mark">
              <PawPrint className="w-5 h-5 fill-current" />
            </div>
            <span className="brand-name">
              Pet<span>Mama</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className={`desktop-nav ${mobileMenuOpen ? 'is-open' : ''}`}>
            <a
              className={activeTab === 'home' ? 'active' : ''}
              onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
            >
              Home
            </a>

            <a
              className={activeTab === 'explore' ? 'active font-bold text-[#006978]' : ''}
              onClick={() => { navigateTo('explore'); setMobileMenuOpen(false); }}
            >
              Explore
            </a>

            {/* Shop Navigation Link with Subcategory Hover Dropdown Menu */}
            <div className="shop-dropdown-container">
              <span
                className={`shop-dropdown-trigger ${activeTab === 'shop' ? 'active text-[#006978] font-bold' : ''}`}
                onClick={() => { selectShopSubcategory('All'); setMobileMenuOpen(false); }}
              >
                Shop <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </span>

              {/* Spacious 3-Column Hover Dropdown Menu: Food, Cloths, Medicine */}
              <div className="shop-dropdown-menu">
                <div className="px-2 pt-1 pb-3 flex items-center justify-between border-b border-[var(--line)]/60 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006978]"></span>
                    <span className="text-xs font-extrabold text-[var(--ink)] uppercase tracking-wider">
                      Shop Categories
                    </span>
                  </div>
                  <button
                    onClick={() => selectShopSubcategory('All')}
                    className="text-xs font-bold text-[#006978] hover:underline cursor-pointer"
                  >
                    Browse Entire Catalog →
                  </button>
                </div>

                {/* 3 Side-By-Side ("pasa pasi") Category Cards: Food, Cloths, Medicine */}
                <div className="grid grid-cols-3 gap-4 py-1">
                  {/* 1. FOOD */}
                  <div
                    onClick={() => selectShopSubcategory('Food')}
                    className="p-5 rounded-2xl bg-[#F8FAF9] hover:bg-[#E8F6F6] border border-[#E5EAE8] hover:border-[#006978] transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group shadow-2xs hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-3xl mb-3 shadow-2xs group-hover:scale-110 group-hover:border-[#006978]/30 transition-all">
                      🍖
                    </div>
                    <h4 className="font-extrabold text-base text-[var(--ink)] group-hover:text-[#006978] transition-colors">
                      Food
                    </h4>
                  </div>

                  {/* 2. CLOTHS */}
                  <div
                    onClick={() => selectShopSubcategory('Cloths')}
                    className="p-5 rounded-2xl bg-[#F8FAF9] hover:bg-[#E8F6F6] border border-[#E5EAE8] hover:border-[#006978] transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group shadow-2xs hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-3xl mb-3 shadow-2xs group-hover:scale-110 group-hover:border-[#006978]/30 transition-all">
                      👕
                    </div>
                    <h4 className="font-extrabold text-base text-[var(--ink)] group-hover:text-[#006978] transition-colors">
                      Cloths
                    </h4>
                  </div>

                  {/* 3. MEDICINE */}
                  <div
                    onClick={() => selectShopSubcategory('Medicine')}
                    className="p-5 rounded-2xl bg-[#F8FAF9] hover:bg-[#E8F6F6] border border-[#E5EAE8] hover:border-[#006978] transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group shadow-2xs hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-3xl mb-3 shadow-2xs group-hover:scale-110 group-hover:border-[#006978]/30 transition-all">
                      🩺
                    </div>
                    <h4 className="font-extrabold text-base text-[var(--ink)] group-hover:text-[#006978] transition-colors">
                      Medicine
                    </h4>
                  </div>
                </div>

                {/* Bottom View All Link Bar */}
                <div
                  className="mt-4 p-3 bg-[#F0FDFA] hover:bg-[#006978] text-[#006978] hover:text-white rounded-xl text-center font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#CCFBF1]"
                  onClick={() => selectShopSubcategory('All')}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>View All Products in PetMama Shop →</span>
                </div>
              </div>
            </div>

            <a
              className={activeTab === 'adopt' ? 'active font-bold text-[#006978]' : ''}
              onClick={() => { navigateTo('adopt'); setMobileMenuOpen(false); }}
            >
              Pet Circle
            </a>

            <a
              className={activeTab === 'pet-care-plan' ? 'active' : ''}
              onClick={() => { navigateTo('pet-care-plan'); setMobileMenuOpen(false); }}
            >
              Care Plan
            </a>

            <a
              className={activeTab === 'contact' ? 'active font-bold text-[#006978]' : ''}
              onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
            >
              Contact Us
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions flex items-center gap-3">
            {/* Interactive Cart Button */}
            <button
              ref={cartButtonRef}
              onClick={() => setShopDrawerOpen(true)}
              className={`px-4 py-2.5 bg-white border border-[var(--line)] hover:border-[var(--coral-deep)] text-[var(--ink)] font-extrabold text-xs rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2 relative ${
                cartBouncing ? 'animate-cart-bounce bg-amber-100/90 border-amber-400 text-amber-900 shadow-xl' : ''
              }`}
              title="Open Shopping Cart Drawer"
            >
              <ShoppingBag className={`w-4 h-4 transition-transform ${cartBouncing ? 'scale-125 text-amber-600' : 'text-[var(--coral-deep)]'}`} />
              <span className="hidden sm:inline">Cart</span>
              <span className={`px-2 py-0.5 bg-[var(--coral-deep)] text-white text-[11px] font-bold rounded-full transition-transform ${cartBouncing ? 'scale-125 bg-amber-600 shadow-md' : ''}`}>
                {cartCount}
              </span>
            </button>

            {/* Contact Us Button */}
            <button
              className="header-cta desktop-only cursor-pointer"
              onClick={() => navigateTo('contact')}
            >
              Contact Us
            </button>

            {/* Profile Avatar Button (Beside Contact Us as requested) */}
            <button
              onClick={() => {
                if (isLoggedIn) {
                  navigateTo('profile');
                } else {
                  setAuthModalOpen(true);
                }
              }}
              className={`flex items-center gap-2 p-1 pl-1 pr-3 rounded-full border transition-all cursor-pointer shadow-2xs hover:shadow-md ${
                activeTab === 'profile'
                  ? 'bg-[#E0F2F1] border-[#006978] ring-2 ring-[#006978]/30'
                  : 'bg-white hover:bg-slate-50 border-[var(--line)]'
              }`}
              title={isLoggedIn ? `Profile: ${userProfile.name}` : "Sign In / Sign Up to PetMama"}
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 ring-2 ring-[#006978]/30 shrink-0">
                {isLoggedIn ? (
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-600">
                    <User className="w-4 h-4" />
                  </div>
                )}
                {isLoggedIn && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1.5 ring-white"></span>
                )}
              </div>
              <span className="text-xs font-bold text-[var(--ink)] hidden md:inline">
                {isLoggedIn ? userProfile.name.split(' ')[0] : 'Sign In'}
              </span>
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
      </div>

      {/* Spacer div so page content starts below the 80px fixed navbar */}
      <div className="h-20" aria-hidden="true" />

      {/* MAIN CONTENT PAGE CONDITION */}
      {activeTab === 'product-detail' && selectedProduct ? (
        /* STANDALONE PRODUCT DETAILS PAGE (MATCHING REFERENCE UI) */
        <main className="product-detail-full-page max-w-[950px] mx-auto px-4 py-8 animate-fadeIn space-y-8">
          {/* Back to Shop Breadcrumb */}
          <div>
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer shadow-2xs"
            >
              ← Back to Shop
            </button>
          </div>

          <div className="bg-white border border-[var(--line)] rounded-[28px] p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left: Thumbnails Column + Main Image */}
              <div className="md:col-span-6 flex gap-3 items-start">
                {/* Thumbnail Column */}
                <div className="flex flex-col gap-2.5 w-16 shrink-0">
                  {[selectedProduct.image, ...shopProducts.filter(p => p.id !== selectedProduct.id).slice(0, 3).map(p => p.image)].map((imgUrl, idx) => (
                    <div 
                      key={idx}
                      className="aspect-square rounded-xl overflow-hidden bg-slate-100 border-2 border-slate-200 hover:border-[#006978] cursor-pointer transition-all shadow-2xs"
                    >
                      <img src={imgUrl} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Main Product Image */}
                <div className="flex-1 aspect-[4/3] sm:aspect-square rounded-[22px] overflow-hidden bg-[var(--paper-deep)] border border-slate-200 relative shadow-inner">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.badge && (
                    <span className="absolute top-3.5 left-3.5 px-3.5 py-1 bg-[#006978] text-white font-extrabold text-[10px] rounded-full uppercase tracking-wider shadow-md">
                      {selectedProduct.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Info & Actions */}
              <div className="md:col-span-6 space-y-4">
                {/* Ratings */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                  <div className="flex items-center text-amber-400">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-slate-800 font-extrabold">{selectedProduct.rating || '5.0'}</span>
                </div>

                <h1 className="text-base sm:text-lg font-extrabold text-[var(--ink)] leading-snug">
                  {selectedProduct.name}
                </h1>

                <div className="text-2xl font-black text-[var(--ink)]">
                  ৳{selectedProduct.priceTK.toLocaleString()} <span className="text-xs font-bold text-slate-400">TK</span>
                </div>

                {/* Action Buttons: Add to Cart, Buy it now, Favorite */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={(e) => {
                      for(let i=0; i<modalQty; i++) {
                        addToCart(selectedProduct, e);
                      }
                      setAuthToast(`✓ Added ${modalQty}x ${selectedProduct.name} to cart!`);
                      setTimeout(() => setAuthToast(''), 4000);
                    }}
                    className="flex-1 py-3 px-5 bg-white hover:bg-[#E0F2F1] text-[#006978] border-2 border-[#006978] font-bold text-xs rounded-full shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      for(let i=0; i<modalQty; i++) {
                        buyNowProduct(selectedProduct);
                      }
                    }}
                    className="flex-1 py-3 px-5 bg-[#FF6B6B] hover:bg-[#fa5252] text-white font-bold text-xs rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center"
                  >
                    <span>Buy it now</span>
                  </button>

                  <button
                    onClick={() => {
                      setAuthToast(`♥ Added to your wishlist!`);
                      setTimeout(() => setAuthToast(''), 3000);
                    }}
                    className="w-11 h-11 rounded-full border-2 border-slate-200 hover:border-[#FF6B6B] text-slate-400 hover:text-[#FF6B6B] flex items-center justify-center transition-colors cursor-pointer bg-white shadow-2xs shrink-0"
                    title="Wishlist"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Quantity selector */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quantity:</span>
                  <div className="inline-flex items-center bg-[#F1F5F9] border border-slate-200 rounded-xl p-1">
                    <button
                      onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 flex items-center justify-center font-bold text-slate-800 shadow-2xs cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-extrabold text-xs text-[var(--ink)]">
                      {modalQty}
                    </span>
                    <button
                      onClick={() => setModalQty(modalQty + 1)}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 flex items-center justify-center font-bold text-slate-800 shadow-2xs cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Colour options */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-700">
                    Colour: <span className="font-extrabold text-[var(--ink)]">Natural / Signature</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white shadow-sm cursor-pointer" />
                    <div className="w-7 h-7 rounded-full bg-[#006978] border-2 border-white shadow-sm cursor-pointer ring-2 ring-[#006978] flex items-center justify-center text-white text-[10px]">✓</div>
                    <div className="w-7 h-7 rounded-full bg-[#FF6B6B] border-2 border-white shadow-sm cursor-pointer" />
                    <div className="w-7 h-7 rounded-full bg-amber-200 border-2 border-white shadow-sm cursor-pointer" />
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600 pt-1">
                  <span>📅</span>
                  <span>Delivery in 2–6 Hours (Express Delivery across Bangladesh)</span>
                </div>

                {/* Description */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold text-[var(--ink)] uppercase tracking-wider">Description:</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {selectedProduct.description} Crafted with premium ingredients and verified quality standards for maximum satisfaction and pet wellbeing.
                  </p>
                  <span className="text-[11px] font-bold text-[#006978] hover:underline cursor-pointer inline-block">See full description</span>
                </div>

                {/* Store / Seller info */}
                <div className="flex items-center justify-between p-3.5 bg-[#F8FAFC] rounded-2xl border border-slate-200 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#006978] text-white flex items-center justify-center font-black text-sm shadow-sm">
                      PM
                    </div>
                    <div>
                      <h5 className="font-extrabold text-xs text-[var(--ink)]">PetMama Official Store</h5>
                      <p className="text-[10px] text-slate-500 font-medium">35,000+ followers</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-[11px] font-bold rounded-full shadow-2xs cursor-pointer">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* REVIEWS & SIMILAR ITEMS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left: Reviews (col-span-6) */}
            <div className="md:col-span-6 bg-white border border-[var(--line)] rounded-[28px] p-6 space-y-5 shadow-xs">
              <h3 className="text-base font-extrabold text-[var(--ink)]">Reviews</h3>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-black text-[var(--ink)]">4.6</div>
                <div className="flex items-center text-amber-400 text-sm">★★★★★</div>
                <span className="text-xs text-slate-500 font-medium">(124 reviews)</span>
              </div>

              {/* Review Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                <span className="px-3 py-1 bg-slate-900 text-white font-bold text-[11px] rounded-full cursor-pointer">All (124)</span>
                <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-full cursor-pointer">Photos (33)</span>
                <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-full cursor-pointer">★★★★★ (98)</span>
                <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-full cursor-pointer">★★★★☆ (22)</span>
              </div>

              {/* Review Items */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-rose-200 text-rose-800 font-bold text-xs flex items-center justify-center">LB</div>
                      <span className="font-extrabold text-xs text-[var(--ink)]">Lori Barnett</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">02 May</span>
                  </div>
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <p className="text-xs text-slate-600 font-medium">Amazing quality! My pet absolutely loved it and delivery was super fast.</p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-sky-200 text-sky-800 font-bold text-xs flex items-center justify-center">PD</div>
                      <span className="font-extrabold text-xs text-[var(--ink)]">Phillip Douglas</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">29 April</span>
                  </div>
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <p className="text-xs text-slate-600 font-medium">Authentic product guarantee is real. Very satisfied with the purchase.</p>
                </div>
              </div>
            </div>

            {/* Right: Similar Items / Suggested Products (col-span-6) */}
            <div className="md:col-span-6 bg-white border border-[var(--line)] rounded-[28px] p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-extrabold text-[var(--ink)]">Similar items:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {shopProducts
                  .filter(p => p.id !== selectedProduct.id)
                  .slice(0, 4)
                  .map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setSelectedProduct(prod);
                        setModalQty(1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-[#F8FAFC] border border-slate-200 rounded-[20px] p-3 space-y-2.5 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white relative border border-slate-200">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <h4 className="font-bold text-xs text-[var(--ink)] line-clamp-1 group-hover:text-[#006978] transition-colors">{prod.name}</h4>
                      </div>
                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-200">
                        <span className="text-xs font-black text-[var(--ink)]">
                          ৳{prod.priceTK.toLocaleString()} <span className="text-[9px] text-slate-400">TK</span>
                        </span>
                        <span className="text-[9px] font-bold text-[#006978] bg-[#E0F2F1] px-2 py-0.5 rounded-full">
                          View
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
      ) : activeTab === 'explore' ? (
        /* EXPLORE COMMUNITY POSTS FEED PAGE (MATCHING screenshot 1, 2, 3) */
        <main className="explore-feed-page max-w-[820px] mx-auto px-4 md:px-6 py-8 animate-fadeIn">
          {/* Breadcrumb & Top Bar */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-white px-4 py-2 rounded-full border border-[var(--line)] shadow-2xs cursor-pointer"
            >
              ← Back to Home
            </button>

            <button
              onClick={() => { setDailyLimitError(null); setCreateExplorePostModalOpen(true); }}
              className="px-5 py-2.5 bg-[#006978] hover:bg-[#00525e] text-white font-bold text-xs rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Post
            </button>
          </div>

          {/* Success Banner if post published */}
          {postSuccessMsg && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 font-bold text-xs shadow-sm flex items-center justify-between gap-3 animate-fadeIn">
              <span>{postSuccessMsg}</span>
              <button onClick={() => setPostSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-950 font-bold cursor-pointer">✕</button>
            </div>
          )}

          {/* Explore Feed Posts List */}
          <div className="space-y-8">
            {explorePosts
              .filter(p => !hiddenPostIds.includes(p.id))
              .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
              .map((post) => (
              <div
                key={post.id}
                className="bg-white border border-[var(--line)] rounded-[28px] p-5 md:p-7 shadow-sm hover:shadow-md transition-shadow space-y-5 relative"
              >
                {/* 1. Author Header Row */}
                <div className="flex items-center justify-between gap-3 relative">
                  <div 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => {
                      setSelectedUserProfile({
                        name: post.authorName,
                        handle: `@${post.authorName.toLowerCase().replace(/\s+/g, '_')}`,
                        location: post.location,
                        bio: `Passionate animal rescuer & pet parent in ${post.location}.`,
                        avatar: post.authorAvatar,
                        posts: explorePosts.filter(p => p.authorName === post.authorName)
                      });
                    }}
                  >
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[var(--line)] shadow-2xs group-hover:border-[#006978] transition-colors"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-base text-[var(--ink)] group-hover:text-[#006978] transition-colors">{post.authorName}</h3>
                        {post.isPinned && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-extrabold text-[10px] rounded-full flex items-center gap-0.5 border border-amber-300">
                            <Pin className="w-3 h-3 fill-amber-700 text-amber-700" /> Pinned
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--muted-ink)] font-medium mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#006978]" />
                        <span>{post.location} · {post.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Need Badge (Top Right) */}
                    <span
                      className={`px-3.5 py-1.5 text-xs font-extrabold rounded-full flex items-center gap-1.5 ${
                        post.needBadge === 'Need Food'
                          ? 'bg-[#FFF0EB] text-[#E65A3C] border border-[#FFD0C7]'
                          : post.needBadge === 'Need a Home'
                          ? 'bg-[#E8F6F6] text-[#0E7490] border border-[#A5F3FC]'
                          : 'bg-[#EBF8F2] text-[#15803D] border border-[#BBF7D0]'
                      }`}
                    >
                      {post.needBadge === 'Need Food' && '🍧 Need Food'}
                      {post.needBadge === 'Need a Home' && '🏠 Need a Home'}
                      {post.needBadge === 'Food Offered' && '✨ Food Offered'}
                    </span>

                    {/* 3-Dot Ellipsis Action Menu Button */}
                    <div className="relative">
                      <button
                        onClick={() => setActivePostMenuId(activePostMenuId === post.id ? null : post.id)}
                        className="p-2 text-[var(--muted-ink)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)] rounded-full transition-colors cursor-pointer"
                        title="Post Options"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Floating Dropdown Menu */}
                      {activePostMenuId === post.id && (
                        <div className="absolute right-0 top-10 w-48 bg-white border border-[var(--line)] rounded-2xl p-1.5 shadow-2xl z-50 animate-fadeIn space-y-1 text-xs">
                          {post.isOwner ? (
                            /* MENU OPTIONS FOR OWN POST (Edit, Delete, Pin) */
                            <>
                              <button
                                onClick={() => togglePinPost(post.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-[var(--ink)] hover:bg-[var(--paper-deep)] rounded-xl font-bold transition-colors cursor-pointer text-left"
                              >
                                <Pin className="w-4 h-4 text-amber-600 shrink-0" />
                                <span>{post.isPinned ? 'Unpin Post' : 'Pin Post'}</span>
                              </button>
                              <button
                                onClick={() => { setEditPostModal(post); setActivePostMenuId(null); }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-[var(--ink)] hover:bg-[var(--paper-deep)] rounded-xl font-bold transition-colors cursor-pointer text-left"
                              >
                                <Edit3 className="w-4 h-4 text-[#006978] shrink-0" />
                                <span>Edit Post</span>
                              </button>
                              <div className="my-1 border-t border-[var(--line)]" />
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition-colors cursor-pointer text-left"
                              >
                                <Trash2 className="w-4 h-4 text-rose-600 shrink-0" />
                                <span>Delete Post</span>
                              </button>
                            </>
                          ) : (
                            /* MENU OPTIONS FOR OTHER USER POSTS (Pin, Save, Hide, Report) */
                            <>
                              <button
                                onClick={() => togglePinPost(post.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-[var(--ink)] hover:bg-[var(--paper-deep)] rounded-xl font-bold transition-colors cursor-pointer text-left"
                              >
                                <Pin className="w-4 h-4 text-amber-600 shrink-0" />
                                <span>{post.isPinned ? 'Unpin Post' : 'Pin Post'}</span>
                              </button>
                              <button
                                onClick={() => toggleSavePost(post.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-[var(--ink)] hover:bg-[var(--paper-deep)] rounded-xl font-bold transition-colors cursor-pointer text-left"
                              >
                                <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-emerald-600 text-emerald-600' : 'text-emerald-600'} shrink-0`} />
                                <span>{post.isSaved ? 'Saved in Bookmarks' : 'Save Post'}</span>
                              </button>
                              <button
                                onClick={() => handleHidePost(post.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-[var(--ink)] hover:bg-[var(--paper-deep)] rounded-xl font-bold transition-colors cursor-pointer text-left"
                              >
                                <EyeOff className="w-4 h-4 text-slate-500 shrink-0" />
                                <span>Hide Post</span>
                              </button>
                              <div className="my-1 border-t border-[var(--line)]" />
                              <button
                                onClick={() => { setReportPostModal(post); setActivePostMenuId(null); }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition-colors cursor-pointer text-left"
                              >
                                <Flag className="w-4 h-4 text-rose-600 shrink-0" />
                                <span>Report Post</span>
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Pet Metadata Attribute Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-[#006978] text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-2xs">
                    <PawPrint className="w-3.5 h-3.5" /> {post.petType}
                  </span>
                  <span className="px-3 py-1 bg-[#E8F8F0] text-[#059669] border border-[#A7F3D0] text-xs font-bold rounded-full flex items-center gap-1">
                    💉 {post.vaccinated === 'Yes' ? 'Vaccinated' : 'Unvaccinated'}
                  </span>
                  <span className="px-3 py-1 bg-[#FFEDD5] text-[#C2410C] text-xs font-bold rounded-full flex items-center gap-1">
                    📅 {post.age}
                  </span>
                </div>

                {/* 3. Description Text */}
                <p className="text-sm md:text-base text-[var(--ink)] leading-relaxed font-medium">
                  {post.description}
                </p>

                {/* 4. High-Res Pet Image */}
                <div className="overflow-hidden rounded-[20px] border border-[var(--line)] aspect-[16/10] bg-[var(--paper-deep)]">
                  <img
                    src={post.image}
                    alt="Street or rescued pet"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 5. Contribution & Application Status Pill Bar */}
                <div className="p-3 bg-[#F8FAF9] rounded-[20px] border border-[var(--line)]/60 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-[var(--ink)]">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2 overflow-hidden">
                      {post.offeredFoodAvatars.map((av, idx) => (
                        <img key={idx} src={av} alt="Supporter" className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" />
                      ))}
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#006978] text-white text-[10px] font-extrabold ring-2 ring-white">
                        +{post.offeredFoodCount}
                      </span>
                    </div>
                    <span>{post.offeredFoodCount} offered food</span>
                  </div>

                  <div className="px-3.5 py-1.5 bg-white border border-[var(--line)] rounded-full text-xs font-bold text-[var(--ink)] shadow-2xs flex items-center gap-1.5">
                    <PawPrint className="w-3.5 h-3.5 text-[#006978]" />
                    <span>{post.appliedAdoptCount} applied to adopt</span>
                  </div>
                </div>

                {/* 6. Action Buttons Bar (Matching Image 1, 2, 3) */}
                <div className="pt-1">
                  {post.isFoodClosed && post.isAdopted ? (
                    /* STATE 1: CLOSED STATE (Image 2) */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        disabled
                        className="py-3.5 px-4 bg-[#F1F5F9] text-[#94A3B8] font-semibold text-xs rounded-full cursor-not-allowed flex items-center justify-center gap-2 border border-slate-200"
                      >
                        🍧 No more food accepted
                      </button>
                      <button
                        disabled
                        className="py-3.5 px-4 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] font-bold text-xs rounded-full flex items-center justify-center gap-2"
                      >
                        <PawPrint className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                        <span>Pet has found a home</span>
                      </button>
                    </div>
                  ) : post.isOwner ? (
                    /* STATE 2: OWNER MANAGEMENT CONTROLS (Image 3) */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => setConfirmCloseFoodPostId(post.id)}
                        className="py-3.5 px-4 bg-[#E0F2F1] hover:bg-[#B2DFDB] border-2 border-[#006978] text-[#006978] font-bold text-xs rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
                      >
                        🍧 Offer Close
                      </button>
                      <button
                        onClick={() => setConfirmAdoptedPostId(post.id)}
                        className="py-3.5 px-4 bg-[#E0F2F1] hover:bg-[#B2DFDB] border-2 border-[#006978] text-[#006978] font-bold text-xs rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
                      >
                        <PawPrint className="w-4 h-4" />
                        <span>Adopted</span>
                      </button>
                    </div>
                  ) : (
                    /* STATE 3: PUBLIC ACTION BUTTONS (Image 1) */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* 1. OFFER FOOD BUTTON */}
                      {post.isFoodClosed ? (
                        <button
                          disabled
                          className="py-3.5 px-4 bg-[#F1F5F9] text-[#94A3B8] font-semibold text-xs rounded-full cursor-not-allowed flex items-center justify-center gap-2 border border-slate-200"
                        >
                          🍧 Food Supply Full
                        </button>
                      ) : post.hasUserOfferedFood ? (
                        <button
                          disabled
                          className="py-3.5 px-4 bg-emerald-50 text-emerald-800 border-2 border-emerald-400 font-extrabold text-xs rounded-full flex items-center justify-center gap-2 shadow-2xs cursor-default transition-all"
                          title="You have already offered food for this rescue post"
                        >
                          <Check className="w-4 h-4 stroke-[3] text-emerald-600" />
                          <span>Food Offered ✓</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => { setOfferFoodModalPost(post); setFoodOfferMethod('own'); }}
                          className="py-3.5 px-4 bg-[#006978] hover:bg-[#00525e] text-white font-bold text-xs rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                        >
                          🍧 Offer Food
                        </button>
                      )}

                      {/* 2. ADOPT BUTTON */}
                      {post.isAdopted ? (
                        <button
                          disabled
                          className="py-3.5 px-4 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] font-bold text-xs rounded-full flex items-center justify-center gap-2 cursor-not-allowed"
                        >
                          <PawPrint className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                          <span>Pet has found a home</span>
                        </button>
                      ) : post.hasUserAppliedAdopt ? (
                        <button
                          disabled
                          className="py-3.5 px-4 bg-teal-50 text-[#006978] border-2 border-[#006978] font-extrabold text-xs rounded-full flex items-center justify-center shadow-2xs cursor-default transition-all"
                          title="You have already submitted an adoption application for this pet"
                        >
                          <span>Adopt Applied</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApplyAdoptExplore(post)}
                          className="py-3.5 px-4 bg-white border-2 border-[#006978] text-[#006978] hover:bg-[#F0FDFA] font-bold text-xs rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
                        >
                          <PawPrint className="w-4 h-4" />
                          <span>Adopt</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* 7. Bottom Social Engagement Bar */}
                <div className="pt-3 border-t border-[var(--line)]/60 flex items-center justify-between text-xs font-bold text-[var(--muted-ink)]">
                  <button
                    onClick={() => toggleLikeExplorePost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      post.isLiked ? 'text-[#006978] font-extrabold' : 'hover:text-[var(--ink)]'
                    }`}
                  >
                    <PawPrint className={`w-4 h-4 ${post.isLiked ? 'fill-[#006978]' : ''}`} />
                    <span>{post.likesCount}</span>
                  </button>

                  <button
                    onClick={() => setExpandedCommentPostId(expandedCommentPostId === post.id ? null : post.id)}
                    className="flex items-center gap-1.5 hover:text-[var(--ink)] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.commentsCount} Comments</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Post link copied to clipboard!');
                    }}
                    className="flex items-center gap-1 hover:text-[var(--ink)] transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

                {/* 8. Expanded Inline Comments Box */}
                {expandedCommentPostId === post.id && (
                  <div className="pt-4 border-t border-[var(--line)]/60 space-y-3 bg-[#F9FBFA] p-4 rounded-[20px]">
                    <h4 className="text-xs font-extrabold text-[var(--ink)] uppercase tracking-wider">
                      Community Comments ({post.commentsList.length}):
                    </h4>

                    {post.commentsList.length === 0 ? (
                      <p className="text-xs text-[var(--muted-ink)] italic">No comments yet. Be the first to offer encouragement or food!</p>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {post.commentsList.map(c => (
                          <div key={c.id} className="p-2.5 bg-white border border-[var(--line)] rounded-xl text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[var(--ink)]">{c.user}</span>
                              <span className="text-[10px] text-[var(--muted-ink)]">{c.timeAgo}</span>
                            </div>
                            <p className="text-[var(--muted-ink)]">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* New Comment Input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Write a supportive comment or food offer..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                        className="flex-1 px-3.5 py-2 text-xs bg-white border border-[var(--line)] rounded-xl focus:outline-none focus:border-[#006978]"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="px-4 py-2 bg-[#006978] hover:bg-[#00525e] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      ) : activeTab === 'story' ? (
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
            <div className="eyebrow text-[#006978] mb-3 uppercase tracking-wider text-xs font-bold">
              OUR MISSION & HEART
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight mb-6">
              “Every animal deserves <br />
              <em className="text-[#006978]">to be cared for.”</em>
            </h1>
            <p className="text-base md:text-xl text-[var(--muted-ink)] leading-relaxed font-medium mb-6">
              Not every pet has a home, and many street animals live every day without enough food, medical care, shelter, or human kindness.
            </p>
            <div className="p-6 md:p-8 bg-[#F4EFE6] border border-[#E7E1D4] rounded-[24px] text-sm md:text-base text-[var(--ink)] leading-relaxed font-medium space-y-4 shadow-xs">
              <p className="text-slate-700">
                There are animals that become sick or injured but never receive treatment. Some are chased away simply because they have nowhere to go. Some spend their entire lives searching for food and safety.
              </p>
              <p className="font-bold text-slate-900 pt-1">
                But their lives still have value. Every animal deserves:
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {[
                  { label: 'Food', icon: '🍖' },
                  { label: 'Treatment', icon: '🩺' },
                  { label: 'Safety', icon: '🛡️' },
                  { label: 'Care', icon: '💖' },
                  { label: 'Protection', icon: '🏠' },
                  { label: 'Love', icon: '✨' }
                ].map((item, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white text-slate-800 font-bold text-xs rounded-full border border-slate-200/80 shadow-2xs inline-flex items-center gap-1.5">
                    <span>{item.label}</span>
                    <span>{item.icon}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="my-12 p-8 md:p-12 bg-white border border-[var(--line)] rounded-[28px] shadow-sm">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-bold text-[#006978] tracking-widest uppercase">OUR VISION</span>
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
                <span className="px-4 py-1.5 bg-[#EAE6DD] text-[#006978] text-xs font-extrabold rounded-full tracking-wider uppercase inline-block">
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
                <span className="px-4 py-1.5 bg-[#EAE6DD] text-[#006978] text-xs font-extrabold rounded-full tracking-wider uppercase inline-block">
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
                <span className="px-4 py-1.5 bg-[#EAE6DD] text-[#006978] text-xs font-extrabold rounded-full tracking-wider uppercase inline-block">
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
                <span className="px-4 py-1.5 bg-[#EAE6DD] text-[#006978] text-xs font-extrabold rounded-full tracking-wider uppercase inline-block">
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
                <span className="px-4 py-1.5 bg-[#EAE6DD] text-[#006978] text-xs font-extrabold rounded-full tracking-wider uppercase inline-block">
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
              <div className="w-16 h-16 mx-auto rounded-full bg-[#006978] text-white flex items-center justify-center shadow-md">
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
                  className="px-8 py-4 bg-[#006978] hover:bg-[#00525e] text-white font-bold rounded-full text-sm transition-all shadow-md cursor-pointer"
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
                <span className="text-[#006978]">not the owner.”</span>
              </h2>
              <p className="text-sm md:text-base text-[var(--muted-ink)] leading-relaxed font-medium">
                When someone purchases a Pet Care Plan, the subscription is attached to the <strong>specific pet's profile</strong>, not simply to the human user's account.
              </p>
            </div>

            {/* Example Transfer Scenario Box */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/80 border border-[var(--line)] p-6 md:p-8 rounded-[24px] shadow-xs">
              <div className="space-y-4 text-[var(--ink)]">
                <h4 className="text-lg font-bold text-[var(--ink)] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#006978]" /> How Ownership Transfer Works:
                </h4>
                <div className="space-y-3 text-xs md:text-sm">
                  <div className="p-3 bg-[var(--paper-deep)] rounded-xl border border-[var(--line)]">
                    <strong>1. Original Setup:</strong> Owner A purchases a 6-Month Pet Care Plan for Max.
                  </div>
                  <div className="p-3 bg-[var(--paper-deep)] rounded-xl border border-[var(--line)]">
                    <strong>2. Ownership Change:</strong> After 2 months, Max is responsibly transferred to Owner B.
                  </div>
                  <div className="p-3 bg-[#006978]/10 rounded-xl border border-[#006978]/25 text-[var(--ink)] font-medium">
                    <strong>3. Uninterrupted Benefits:</strong> Max carries the remaining 4 months of the active Pet Care Plan to Owner B! The plan does not restart, and Max's vaccination history and treatment records remain attached to his profile.
                  </div>
                </div>
              </div>

              {/* Transfer Diagram Visual Illustration */}
              <div className="bg-white border border-[var(--line)] p-6 rounded-[20px] text-center space-y-6 shadow-2xs">
                <div className="text-xs font-bold uppercase text-[#006978] tracking-wider">
                  VISUAL TRANSFER FLOW
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-[var(--ink)]">
                  <div className="p-3 bg-[var(--paper-deep)] rounded-xl w-full md:w-auto border border-[var(--line)]">
                    Owner A <br /><span className="text-[10px] text-[var(--muted-ink)] font-normal">Original Parent</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#006978] shrink-0 rotate-90 md:rotate-0" />
                  <div className="p-3 bg-[#006978] text-white rounded-xl w-full md:w-auto font-extrabold shadow-md">
                    Pet: Max <br /><span className="text-[10px] text-white/90 font-normal">Care Plan Attached</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#006978] shrink-0 rotate-90 md:rotate-0" />
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
                className="px-8 py-4 bg-[#006978] hover:bg-[#00525e] text-white font-bold rounded-full text-sm transition-all cursor-pointer shadow-md"
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
        /* 4. DEDICATED PAGE: PET CARE PLAN (EXACTLY MATCHING Image 3) */
        <main className="pet-care-plan-full-page max-w-[480px] mx-auto px-4 py-6 sm:py-8 animate-fadeIn">
          {/* Header with circular back button and title */}
          <div className="flex items-center gap-3.5 mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-[#006978] flex items-center justify-center text-slate-700 hover:text-[#006978] shadow-2xs transition-all cursor-pointer"
              aria-label="Back to Home"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
              Pet Care Plan
            </h1>
          </div>

          {/* SINGLE CONSOLIDATED PLAN CARD (EXACTLY 1 CARD AS REQUESTED) */}
          <div className="rounded-[28px] border-2 border-[#006978] bg-white p-5 sm:p-7 shadow-sm space-y-5">
            {/* 1. Header: Plan Title & Monthly Price */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-[#111827]">
                  Pet Care
                </h3>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                  Monthly Plan
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-medium text-slate-400 block">
                  Standard rate
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#006978]">
                  ৳{includeVaccination ? 999 : 699} <span className="text-xs font-bold text-slate-500">/mo</span>
                </span>
              </div>
            </div>

            {/* 2. Select Pet Dropdown */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#111827]">Select Pet</span>
                <button
                  type="button"
                  onClick={() => {
                    setCreatePostModalOpen(true);
                    setPostPetActiveTab('from_my_pets');
                  }}
                  className="font-bold text-[#006978] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Pet</span>
                </button>
              </div>

              <div className="relative">
                <select
                  value={selectedCarePlanPetId}
                  onChange={(e) => setSelectedCarePlanPetId(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-bold text-slate-800 appearance-none focus:outline-hidden focus:border-[#006978] cursor-pointer pl-11 shadow-2xs"
                >
                  <option value="none">Select Registered Pet (Optional)</option>
                  {myPetsList.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name} ({pet.breed})
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#006978] text-white flex items-center justify-center pointer-events-none">
                  <PawPrint className="w-3.5 h-3.5 fill-white" />
                </div>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 3. Features Checklist */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              {[
                'Unlimited 24/7 video vet consultations',
                'Annual full vaccination & booster shots',
                'Free deworming & preventive care',
                'Physical in-clinic checkups included',
                'Exclusive store discounts & free delivery'
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-[#E0F2F1] text-[#006978] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* 4. Include Vaccination Toggle Row inside Card */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E0F2F1] text-[#006978] flex items-center justify-center text-lg">
                  💉
                </div>
                <div>
                  <span className="text-sm font-bold text-[#111827] block">
                    Include Vaccination
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {includeVaccination ? '+300 BDT/mo included in plan' : 'Basic coverage without vaccines'}
                  </span>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setIncludeVaccination(!includeVaccination)}
                className={`w-13 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                  includeVaccination ? 'bg-[#006978]' : 'bg-slate-200'
                }`}
                aria-label="Toggle vaccination coverage"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    includeVaccination ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 5. Plan Duration Section inside Card */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#111827]">
                  Plan Duration
                </span>

                {/* Stepper with - / Month / + */}
                <div className="flex items-center gap-2 bg-[#F1F5F9] rounded-2xl px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setCarePlanMonths(Math.max(1, carePlanMonths - 1))}
                    className="w-6 h-6 rounded-full bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-extrabold text-xs text-[#111827] min-w-[55px] text-center">
                    {carePlanMonths} Mo{carePlanMonths > 1 ? 's' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCarePlanMonths(Math.min(12, carePlanMonths + 1))}
                    className="w-6 h-6 rounded-full bg-[#006978] text-white hover:bg-[#00525e] flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Quick Select Pills */}
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 3, 6, 12].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setCarePlanMonths(m)}
                    className={`py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                      carePlanMonths === m
                        ? 'border-2 border-[#006978] bg-[#E0F2F1]/60 text-[#006978]'
                        : 'border border-slate-200 bg-[#F8FAFC] text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {m} Mo
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Total Payable Row inside Card */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Payable ({carePlanMonths} Mo):
              </span>
              <span className="text-lg font-extrabold text-[#006978]">
                ৳{((includeVaccination ? 999 : 699) * carePlanMonths).toLocaleString()} BDT
              </span>
            </div>

            {/* 7. SUBSCRIBE BUTTON (EXACTLY AS REQUESTED: ONLY "Subscribe" TEXT!) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setCarePlanSubscribedSuccess(true)}
                className="w-full py-4 bg-[#006978] hover:bg-[#00525e] text-white font-extrabold text-base rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center tracking-wide"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Minimal Support Contact Link below Card */}
          <div className="mt-4 text-center">
            <span className="text-xs text-slate-400">
              Have questions? Call Vet Support:{' '}
              <a href="tel:01712345678" className="font-bold text-[#006978] hover:underline">
                01712345678
              </a>
            </span>
          </div>

          {/* Success Modal upon Subscribing */}
          {carePlanSubscribedSuccess && (
            <div className="fixed inset-0 z-[10060] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
              <div className="relative w-full max-w-sm bg-white rounded-[32px] p-6 text-center space-y-4 shadow-2xl animate-slideUp border border-slate-100">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-3xl shadow-inner">
                  ✓
                </div>
                <h3 className="text-2xl font-extrabold text-[#111827]">
                  Subscription Activated!
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Congratulations! Your <strong>Pet Care Plan</strong> ({carePlanMonths} Month{carePlanMonths > 1 ? 's' : ''}) has been successfully activated for <strong>৳{(includeVaccination ? 999 : 699) * carePlanMonths} BDT</strong>.
                </p>
                <div className="p-3 bg-[#F0FDFA] rounded-2xl border border-[#CCFBF1] text-xs font-bold text-[#006978]">
                  {includeVaccination ? '💉 Annual Full Vaccination & Boosters Included' : '🩺 24/7 Vet Consultations & Wellness Included'}
                </div>
                <button
                  type="button"
                  onClick={() => setCarePlanSubscribedSuccess(false)}
                  className="w-full py-3.5 bg-[#006978] hover:bg-[#00525e] text-white font-extrabold text-sm rounded-full shadow-md cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
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
                { id: 'Food', label: '🍖 Food' },
                { id: 'Cloths', label: '👕 Cloths' },
                { id: 'Medicine', label: '🩺 Medicine' },
                { id: 'Dog', label: '🐶 Dogs' },
                { id: 'Cat', label: '🐱 Cats' },
                { id: 'Rabbit', label: '🐰 Rabbits (Khorgosh)' },
                { id: 'Fish', label: '🐟 Fish Food' },
                { id: 'Toys', label: '🎾 Toys' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setShopCategoryFilter(cat.id as any)}
                  className={`px-4 py-2 text-xs font-extrabold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    shopCategoryFilter === cat.id
                      ? 'bg-[#006978] text-white shadow-md'
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
                {shopCategoryFilter === 'All'
                  ? 'All Pet Essentials'
                  : shopCategoryFilter === 'Food'
                  ? 'Food & Nutrition Products'
                  : shopCategoryFilter === 'Cloths' || shopCategoryFilter === 'Apparel'
                  ? 'Pet Cloths & Wearables'
                  : `${shopCategoryFilter} Products`}
              </h3>
              <span className="text-xs text-[var(--muted-ink)] font-bold">
                Showing {shopProducts.filter(p => isProductInFilter(p, shopCategoryFilter)).length} items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopProducts
                .filter(p => isProductInFilter(p, shopCategoryFilter))
                .map((product) => (
                  <div key={product.id} className="bg-white border border-[var(--line)] rounded-[24px] p-5 space-y-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div 
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalQty(1);
                        setActiveTab('product-detail');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="space-y-3 cursor-pointer group"
                    >
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--paper-deep)] relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        {product.badge && (
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#006978] text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
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
                        <h4 className="font-bold text-base text-[var(--ink)] mt-1.5 group-hover:text-[#006978] transition-colors">{product.name}</h4>
                        <p className="text-xs text-[var(--muted-ink)] mt-1 leading-relaxed line-clamp-2">{product.description}</p>
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
                          onClick={(e) => addToCart(product, e)}
                          className={`px-3 py-2.5 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            addedProductIds[product.id]
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-[var(--paper-deep)] hover:bg-[var(--line)] text-[var(--ink)]'
                          }`}
                        >
                          {addedProductIds[product.id] ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => buyNowProduct(product)}
                          className="px-3 py-2.5 bg-[#006978] hover:bg-[#00525e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      ) : activeTab === 'adopt' ? (
        /* 10. DEDICATED PAGE: PET CIRCLE (PREMIUM PET EXCHANGE & SELL MARKETPLACE) */
        <main className="adopt-full-page max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2.5 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          {/* Success Notification if Pet was published */}
          {petCircleSuccessMsg && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-bold flex items-center justify-between shadow-xs animate-fadeIn">
              <div className="flex items-center gap-2">
                <span>{petCircleSuccessMsg}</span>
              </div>
              <button onClick={() => setPetCircleSuccessMsg('')} className="text-emerald-700 hover:text-emerald-950 font-extrabold text-base cursor-pointer">
                ✕
              </button>
            </div>
          )}

          {/* Page Hero Header - Premium Exchange & Sell */}
          <div className="max-w-3xl mb-8 space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold font-editorial text-[var(--ink)] leading-tight">
              Pet Circle <br />
              <em className="text-[#006978]">Premium Pet Exchange & Sell Marketplace.</em>
            </h1>
            <p className="text-base md:text-lg text-[var(--muted-ink)] leading-relaxed font-medium">
              A trusted, verified network for genuine pet lovers to buy, sell, and exchange premium pets safely across Bangladesh. Connect directly with verified owners with full health transparency.
            </p>
          </div>

          {/* Feed Filter Controls */}
          <div className="my-8 p-6 bg-white border border-[var(--line)] rounded-[28px] shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
              {/* Filter 1: Listing Type */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[var(--muted-ink)] uppercase tracking-wider block">Market Category:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFeedTypeFilter('all')}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      feedTypeFilter === 'all'
                        ? 'bg-[var(--ink)] text-white shadow-xs'
                        : 'bg-[var(--paper-deep)] text-[var(--muted-ink)] hover:text-[var(--ink)]'
                    }`}
                  >
                    🐾 All Listings ({adoptionPosts.length})
                  </button>

                  <button
                    onClick={() => setFeedTypeFilter('sale')}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      feedTypeFilter === 'sale'
                        ? 'bg-[#006978] text-white shadow-xs'
                        : 'bg-[#E0F2F1] text-[#006978] border border-[#80CBC4]'
                    }`}
                  >
                    🏷️ For Sale ({adoptionPosts.filter(p => p.postType === 'paid').length})
                  </button>

                  <button
                    onClick={() => setFeedTypeFilter('exchange')}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      feedTypeFilter === 'exchange'
                        ? 'bg-indigo-700 text-white shadow-xs'
                        : 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                    }`}
                  >
                    🔄 For Exchange ({adoptionPosts.filter(p => p.postType === 'exchange').length})
                  </button>

                  <button
                    onClick={() => setFeedTypeFilter('free')}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      feedTypeFilter === 'free'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    🎁 Rehoming ({adoptionPosts.filter(p => p.postType === 'free').length})
                  </button>
                </div>
              </div>

              {/* Filter 2: Pet Species */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[var(--muted-ink)] uppercase tracking-wider block">Pet Species:</span>
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

          {/* Side-by-side Cards Grid ("pasa pari card") */}
          <div className="my-8 space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-2xl font-bold font-editorial text-[var(--ink)]">
                Featured Circle Pets
              </h2>
              <button
                onClick={() => setCreatePostModalOpen(true)}
                className="px-5 py-2.5 bg-[#006978] hover:bg-[#00525e] text-white font-extrabold text-xs sm:text-sm rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Post Pet</span>
              </button>
            </div>

            {/* Responsive Side-by-Side Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {adoptionPosts
                .filter(p => (
                  (feedTypeFilter === 'all') ||
                  (feedTypeFilter === 'sale' && p.postType === 'paid') ||
                  (feedTypeFilter === 'exchange' && p.postType === 'exchange') ||
                  (feedTypeFilter === 'free' && p.postType === 'free')
                ) && (petTypeFilter === 'all' || p.type === petTypeFilter))
                .map((post) => (
                  <div
                    key={post.id}
                    className="bg-white border border-[#E7EBE9] rounded-[28px] p-4 space-y-3.5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      {/* Pet Photo Container with Location pill at bottom left (matching Image 1) */}
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--paper-deep)] relative">
                        <img
                          src={post.image}
                          alt={post.petName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Bottom Left Location Pill */}
                        <span className="absolute bottom-2.5 left-2.5 px-3 py-1 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold rounded-full flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-white fill-white" />
                          <span>{post.location.split(',')[0]}</span>
                        </span>
                      </div>

                      {/* Pet Information */}
                      <div className="space-y-1.5">
                        {/* Age • Gender */}
                        <div className="text-xs font-bold text-amber-600">
                          {post.age} • {post.gender}
                        </div>

                        {/* Personality / Trait Pills (matching Image 1) */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {(post.type === 'Dog'
                            ? ['Calm', 'Quiet', 'Kid Friendly']
                            : post.type === 'Cat'
                            ? ['Gentle', 'Quiet', 'Indoor']
                            : ['Friendly', 'Healthy', 'Active']
                          ).map((trait) => (
                            <span
                              key={trait}
                              className="px-2.5 py-1 bg-[#F1F5F9] text-slate-700 text-[11px] font-semibold rounded-lg"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>

                        {/* Pet Name */}
                        <h3 className="font-extrabold text-lg text-slate-900 leading-snug pt-1">
                          {post.petName}
                        </h3>

                        {/* Subtitle: Breed • Vaccinated */}
                        <p className="text-xs text-slate-500 font-medium">
                          {post.breed} • {post.healthStatus.toLowerCase().includes('vaccinated') ? 'Vaccinated' : 'Health Checked'}
                        </p>

                        {/* Adoption / Price Row (matching Image 1) */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            {post.postType === 'free' ? 'ADOPTION' : post.postType === 'paid' ? 'SALE' : 'EXCHANGE'}
                          </span>
                          <span className="text-lg font-extrabold text-[#006978]">
                            {post.postType === 'free' ? 'Free' : post.postType === 'paid' ? `৳${post.priceTK.toLocaleString()} TK` : 'Exchange'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Single Full-Width Rounded Button (matching Image 1) */}
                    <div className="pt-2">
                      {appliedPetCircleIds.includes(post.id) ? (
                        <button
                          disabled
                          className="w-full py-3 bg-emerald-50 text-emerald-800 border-2 border-emerald-400 font-bold text-sm rounded-full flex items-center justify-center cursor-default shadow-2xs"
                          title="You have already submitted an adoption request for this pet"
                        >
                          <span>Adopt Applied</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setInquirePost(post)}
                          className="w-full py-3 bg-[#006978] hover:bg-[#00525e] text-white font-bold text-sm rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center"
                        >
                          Adopt
                        </button>
                      )}
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
              <span className="px-3.5 py-1.5 bg-[#006978] text-white font-bold text-xs rounded-full uppercase tracking-wider">
                OUR CORE VETERINARY PLEDGE
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold font-editorial text-white leading-tight">
              “Equal Medical Treatment for <br className="hidden md:inline" />
              <span className="text-[#80CBC4]">Street Pets & Home Pets.”</span>
            </h2>

            <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-[24px] text-sm md:text-base text-slate-200 leading-relaxed font-medium space-y-4">
              <p>
                <strong>At PetMama, there is ZERO difference in medical treatment, medication quality, diagnostic precision, or veterinary compassion between a street pet and a regular home pet.</strong>
              </p>
              <p>
                Whether it is a rescued neighborhood street puppy suffering from an injury or an indoor pet receiving quarterly check-ups, our licensed doctors provide the exact same high-standard veterinary care, surgical procedures, sterile antibiotics, and rehabilitation support.
              </p>
              <p className="text-[#80CBC4] font-bold text-base pt-2 border-t border-white/15">
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
      ) : activeTab === 'privacy' ? (
        /* 12. DEDICATED PAGE: PRIVACY POLICY */
        <main className="privacy-full-page max-w-[1000px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          <div className="max-w-3xl mb-10">
            <h1 className="text-3xl md:text-5xl font-bold font-editorial text-[var(--ink)] leading-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-xs text-[var(--muted-ink)] font-medium">
              Last updated: October 2026 · PetMama Bangladesh
            </p>
          </div>

          <div className="bg-white border border-[var(--line)] rounded-[28px] p-6 sm:p-10 space-y-6 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <div className="space-y-2">
              <h2 className="text-lg font-bold font-editorial text-[var(--ink)]">1. Information We Collect</h2>
              <p>
                At PetMama, we collect personal information necessary to deliver seamless veterinary care, pet food deliveries, and verified community adoption connections. This includes your name, contact phone number, delivery address, email, and your registered pet details (breed, age, health records).
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold font-editorial text-[var(--ink)]">2. How We Use Your Information</h2>
              <p>
                Your data is used strictly to fulfill shop orders, schedule and conduct telehealth video consultations with licensed partner veterinarians, manage your Pet Care Plan subscriptions, and facilitate peer-to-peer inquiries in Pet Circle. We do not sell your personal data to third-party advertisers.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold font-editorial text-[var(--ink)]">3. Data Security & Pet Records</h2>
              <p>
                All medical consultations, vaccination history, and payment transactions (via bKash, Nagad, or credit/debit cards) are encrypted and secured under industry-standard protocols.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold font-editorial text-[var(--ink)]">4. Your Rights & Contact</h2>
              <p>
                You may request a copy of your personal data, update your pet health records, or delete your account at any time by contacting our privacy officer at <strong>privacy@petmama.com</strong> or calling <strong>+880 1712-345678</strong>.
              </p>
            </div>
          </div>
        </main>
      ) : activeTab === 'terms' ? (
        /* 13. DEDICATED PAGE: TERMS & CONDITIONS */
        <main className="terms-full-page max-w-[1000px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          <div className="max-w-3xl mb-10">
            <h1 className="text-3xl md:text-5xl font-bold font-editorial text-[var(--ink)] leading-tight mb-4">
              Terms & Conditions
            </h1>
            <p className="text-xs text-[var(--muted-ink)] font-medium">
              Effective Date: October 2026 · Cygnor Labs & PetMama Platform
            </p>
          </div>

          <div className="bg-white border border-[var(--line)] rounded-[28px] p-6 sm:p-10 space-y-6 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <div className="space-y-2">
              <h2 className="text-lg font-bold font-editorial text-[var(--ink)]">1. Acceptance of Terms</h2>
              <p>
                By accessing and using PetMama website and mobile services, you agree to comply with these terms, governing pet product purchases, adoption matchmaking, veterinary telehealth services, and monthly care subscriptions.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold font-editorial text-[var(--ink)]">2. Pet Care Plan Subscriptions</h2>
              <p>
                Pet Care Plans provide ongoing video vet access, covered vaccination services, and store benefits. Subscriptions are billed per your selected duration (1, 3, 6, or 12 months). Plans may be transferred to a new verified guardian upon rehoming through Pet Circle.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold font-editorial text-[var(--ink)]">3. Pet Circle Community Conduct</h2>
              <p>
                Pet Circle is strictly reserved for genuine pet owners and verified adoptions. Commercial breeding, unverified claims, mistreatment, or unlawful pet trading are strictly prohibited and will result in immediate identity blacklisting and reporting to animal welfare authorities.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold font-editorial text-[var(--ink)]">4. Veterinary Advice Disclaimer</h2>
              <p>
                Video consultations provide professional veterinary guidance based on visual observation. In cases of critical emergency or trauma, pet guardians are advised to proceed immediately to an emergency 24/7 veterinary clinic.
              </p>
            </div>
          </div>
        </main>
      ) : activeTab === 'return-policy' ? (
        /* 14. DEDICATED PAGE: RETURN & REFUND POLICY */
        <main className="return-policy-full-page max-w-[1000px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>
          </div>

          <div className="max-w-3xl mb-10">
            <h1 className="text-3xl md:text-5xl font-bold font-editorial text-[var(--ink)] leading-tight mb-4">
              Return & Refund Policy
            </h1>
            <p className="text-xs text-[var(--muted-ink)] font-medium">
              Transparent, Hassle-Free Returns · PetMama Shop
            </p>
          </div>

          <div className="bg-white border border-[var(--line)] rounded-[28px] p-6 sm:p-10 space-y-6 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <div className="space-y-2">
              <h2 className="text-lg font-bold font-editorial text-[var(--ink)]">1. 7-Day Easy Returns on Shop Products</h2>
              <p>
                If you receive an incorrect, damaged, or expired item (food pack, accessory, toy, or apparel), you may request a free return or instant replacement within <strong>7 days of delivery</strong>.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold font-editorial text-[var(--ink)]">2. Return Conditions</h2>
              <p>
                • Pet food, treats, and supplements must remain unopened with the factory seal intact.
                <br />
                • Apparel items (sweaters, raincoats, harnesses) may be returned if unworn and in original tags.
                <br />
                • Prescription medications requiring cold-chain temperature control cannot be returned once delivered for pet safety reasons.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold font-editorial text-[var(--ink)]">3. Fast Refund Process</h2>
              <p>
                Once your return is inspected and collected by our rider, refunds are processed within <strong>24 to 48 hours</strong> directly to your original payment method (bKash, Nagad, or card account).
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold font-editorial text-[var(--ink)]">4. How to Request a Return</h2>
              <p>
                Simply message us on WhatsApp or call our support line at <strong>+880 1712-345678</strong> with your order ID and a photo of the item. Our team will arrange free pickup from your doorstep.
              </p>
            </div>
          </div>
        </main>
      ) : activeTab === 'profile' ? (
        /* 15. DEDICATED PROFILE PAGE (MATCHING USER SCREENSHOT) */
        <main className="profile-full-page max-w-[620px] mx-auto px-[18px] md:px-[25px] py-10 animate-fadeIn">
          {/* Back to Home Breadcrumb */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--coral-deep)] hover:underline bg-[var(--paper-deep)] px-4 py-2 rounded-full border border-[var(--line)] cursor-pointer"
            >
              ← Back to Home
            </button>

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full border border-red-200 cursor-pointer transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
          </div>

          {/* Profile Header Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold font-editorial text-[var(--ink)] tracking-tight">
              Profile
            </h1>
          </div>

          {/* User Name, Handle, Location & Settings Icon */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight font-editorial">
                {userProfile.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#006978] shrink-0" />
                <span>{userProfile.handle} • {userProfile.location}</span>
              </p>
            </div>

            {/* Settings Gear Button */}
            <button
              onClick={() => setSettingsModalOpen(true)}
              className="w-11 h-11 rounded-full bg-[#E0F2F1] hover:bg-[#b2dfdb] text-[#006978] flex items-center justify-center transition-all shadow-2xs cursor-pointer hover:rotate-45"
              title="Edit Profile Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* User Hero Card (Matching Screenshot) */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-5 sm:p-7 shadow-xs space-y-6">
            {/* Avatar & Bio Row */}
            <div className="flex items-start gap-4">
              {/* Avatar with Verified Teal Checkmark Badge */}
              <div className="relative shrink-0">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-20 h-20 sm:w-22 sm:h-22 rounded-full object-cover ring-3 ring-[#006978]/20 shadow-md"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#006978] text-white flex items-center justify-center ring-2 ring-white shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              {/* Badge & Bio */}
              <div className="space-y-2 flex-1 pt-1">
                <span className="px-3 py-1 bg-[#FEF3C7] text-[#92400E] font-extrabold text-xs rounded-full inline-flex items-center gap-1.5 border border-[#FDE68A]">
                  <span>🏅</span>
                  <span>{userProfile.badge}</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {userProfile.bio}
                </p>
              </div>
            </div>

            {/* 3 Metric Stat Cards (2 My Pets, 5 Pets Feed, 12 Vet Visits) */}
            <div className="grid grid-cols-3 gap-3">
              {/* Card 1: My Pets (Soft Blue) */}
              <div 
                onClick={() => setProfileSubTab('pets')}
                className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-2xl p-3 sm:p-4 text-center cursor-pointer hover:shadow-xs transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-black text-[#1E40AF]">
                  {userProfile.myPetsCount}
                </div>
                <div className="text-[11px] sm:text-xs font-extrabold text-[#3B82F6] mt-0.5">
                  My Pets
                </div>
              </div>

              {/* Card 2: Pets Feed (Soft Orange/Peach) */}
              <div 
                onClick={() => setProfileSubTab('posts')}
                className="bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl p-3 sm:p-4 text-center cursor-pointer hover:shadow-xs transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-black text-[#92400E]">
                  {userProfile.petsFeedCount}
                </div>
                <div className="text-[11px] sm:text-xs font-extrabold text-[#D97706] mt-0.5">
                  Pets Feed
                </div>
              </div>

              {/* Card 3: Vet Visits (Soft Mint/Teal) */}
              <div 
                onClick={() => navigateTo('pet-care-plan')}
                className="bg-[#E0F2F1] border border-[#B2DFDB] rounded-2xl p-3 sm:p-4 text-center cursor-pointer hover:shadow-xs transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-black text-[#004D40]">
                  {userProfile.vetVisitsCount}
                </div>
                <div className="text-[11px] sm:text-xs font-extrabold text-[#006978] mt-0.5">
                  Vet Visits
                </div>
              </div>
            </div>
          </div>

          {/* Segmented Tabs Switcher: [ My Posts ] | [ My Pets ] */}
          <div className="bg-[#F1F5F9] p-1.5 rounded-full flex items-center my-6 border border-slate-200">
            <button
              onClick={() => setProfileSubTab('posts')}
              className={`flex-1 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all cursor-pointer text-center ${
                profileSubTab === 'posts'
                  ? 'bg-[#006978] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[var(--ink)]'
              }`}
            >
              My Posts
            </button>
            <button
              onClick={() => setProfileSubTab('pets')}
              className={`flex-1 py-2.5 rounded-full font-extrabold text-xs sm:text-sm transition-all cursor-pointer text-center ${
                profileSubTab === 'pets'
                  ? 'bg-[#006978] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[var(--ink)]'
              }`}
            >
              My Pets
            </button>
          </div>

          {/* SUB-TAB 1: MY POSTS (MATCHING EXACT SCREENSHOT CARD) */}
          {profileSubTab === 'posts' && (
            <div className="space-y-6">
              {/* Primary Published Post Card from Screenshot */}
              <div className="bg-white border border-slate-200 rounded-[28px] p-5 sm:p-6 space-y-4 shadow-xs">
                {/* Author Info & Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
                      alt="Sarah Jenkins"
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-2xs"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-sm text-[var(--ink)]">
                          Sarah Jenkins
                        </h4>
                        <div className="w-4 h-4 rounded-full bg-[#006978] text-white flex items-center justify-center text-[9px]">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        📍 Banani, Block D, 2 hrs ago
                      </p>
                    </div>
                  </div>

                  {/* Top Right Need Badge */}
                  <span className="px-3 py-1 bg-[#E0F2F1] text-[#006978] border border-[#B2DFDB] font-extrabold text-[11px] rounded-full inline-flex items-center gap-1">
                    <span>🏠</span>
                    <span>Need a Home</span>
                  </span>
                </div>

                {/* Tags Row: [ Cat ] [ Yes ] [ 4 Months ] */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-[#006978] text-white text-[11px] font-bold rounded-full flex items-center gap-1">
                    <PawPrint className="w-3 h-3 fill-current" /> Cat
                  </span>
                  <span className="px-3 py-1 bg-[#E0F2F1] text-[#006978] text-[11px] font-bold rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" /> Yes
                  </span>
                  <span className="px-3 py-1 bg-[#FEF3C7] text-[#92400E] text-[11px] font-bold rounded-full flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> 4 Months
                  </span>
                </div>

                {/* Description Text */}
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  Our neighborhood stray dog Bella just gave birth to 4 healthy puppies under the porch! 🐶💛 We urgently need puppy starter kibble & wet food packs for the nursing mother.
                </p>

                {/* Rescue Photo */}
                <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800"
                    alt="Mother dog with puppies"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Status Stack Bar: 7 offered food & 3 applied to adopt */}
                <div className="p-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" className="w-6 h-6 rounded-full border border-white object-cover" alt="User" />
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" className="w-6 h-6 rounded-full border border-white object-cover" alt="User" />
                      <div className="w-6 h-6 rounded-full bg-[#006978] text-white text-[10px] font-bold flex items-center justify-center border border-white">
                        +5
                      </div>
                    </div>
                    <span className="font-extrabold text-slate-700">7 offered food</span>
                  </div>

                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 font-extrabold text-xs rounded-full shadow-2xs inline-flex items-center gap-1.5">
                    <PawPrint className="w-3.5 h-3.5 text-[#006978]" />
                    <span>3 applied to adopt</span>
                  </span>
                </div>

                {/* Action Buttons: [ Offer Close ] [ Adopted ] */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => alert('Food offering for this rescue post has been marked as closed.')}
                    className="py-3 px-4 bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#E11D48] border border-[#FECDD3] rounded-2xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>⛔</span>
                    <span>Offer Close</span>
                  </button>

                  <button
                    onClick={() => alert('Congratulations! Post has been updated to Adopted status.')}
                    className="py-3 px-4 bg-[#FFF7ED] hover:bg-[#FFEDD5] text-[#EA580C] border border-[#FED7AA] rounded-2xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <PawPrint className="w-3.5 h-3.5 fill-current" />
                    <span>Adopted</span>
                  </button>
                </div>

                {/* Footer Social Stats */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-slate-600">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> 42
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <MessageCircle className="w-4 h-4 text-[#006978]" /> 14
                    </span>
                  </div>
                  <button 
                    onClick={() => alert('Post link copied to clipboard!')}
                    className="hover:text-[var(--ink)] cursor-pointer flex items-center gap-1"
                  >
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: MY PETS */}
          {profileSubTab === 'pets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-[var(--ink)]">
                  Registered Companions ({myPetsList.length})
                </h3>
                <button
                  onClick={() => {
                    navigateTo('adopt');
                    setCreatePostModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-[#006978] hover:bg-[#00525e] text-white font-extrabold text-xs rounded-full cursor-pointer shadow-2xs"
                >
                  + Add New Pet
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myPetsList.map((pet) => (
                  <div key={pet.id} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 relative">
                      <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-black/60 backdrop-blur-sm text-white font-bold text-[10px] rounded-full">
                        {pet.type}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-base text-[var(--ink)]">{pet.name}</h4>
                      <p className="text-xs text-slate-500">{pet.breed} · {pet.age}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {pet.vaccinationStatus}
                      </span>
                      <span className="text-[#006978] font-bold">
                        Care: {pet.subscriptionMonths}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setPetToTransfer(pet);
                        setTransferPetModalOpen(true);
                      }}
                      className="w-full mt-2 py-2 bg-[#006978] hover:bg-[#00525e] text-white font-bold text-xs rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Transfer Ownership</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      ) : (
        /* MAIN LANDING PAGE VIEW */
        <>
          {/* 2. HERO SECTION */}
          <section id="hero" className="hero">
            <div className="hero-copy">
              <h1>
                All your pet needs, <br />
                <em>delivered with love.</em>
              </h1>

              <p className="hero-description">
                Shop authentic organic pet food, interactive toys, warm pet clothes (kapor), and veterinary care plans across Bangladesh.
              </p>

              <div className="hero-actions flex flex-wrap items-center gap-3">
                <button
                  className="primary-button"
                  onClick={() => navigateTo('explore')}
                >
                  Explore <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <button
                  className="px-6 py-3.5 bg-white border border-[var(--line)] hover:bg-[var(--paper-deep)] text-[var(--ink)] font-bold text-xs rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2"
                  onClick={() => navigateTo('pet-care-plan')}
                >
                  Pet Care Plan
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

              {/* Main Organic Shaped Hero Image */}
              <div className="hero-image-wrap">
                <img
                  src={HERO_PETS_IMG}
                  alt="Golden retriever puppy and ginger cat sitting happily in cozy living room"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>

          {/* 2. FEATURED PRODUCTS SECTION (ABOVE "One happy home for everything") */}
          <section className="featured-products-section max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] my-14 sm:my-18">
            <div className="mb-8">
              <div className="space-y-2 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[var(--ink)]">
                  Featured Products
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted-ink)] font-medium">
                  Hand-picked nutrition, cozy apparel, and vet-approved wellness items loved by pets across Bangladesh.
                </p>
              </div>
            </div>

            {/* Featured Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {shopProducts
                .slice(0, 4)
                .map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-[#E7EBE9] hover:border-[#006978]/40 rounded-[24px] p-3.5 sm:p-4 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 group"
                  >
                    <div 
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalQty(1);
                        setActiveTab('product-detail');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="space-y-3 cursor-pointer group"
                    >
                      {/* Product Image Container */}
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--paper-deep)] relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Product Name */}
                      <div>
                        <h3 className="font-extrabold text-sm text-[var(--ink)] line-clamp-1 group-hover:text-[#006978] transition-colors">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 mt-3 space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-base font-extrabold text-[#006978]">
                          ৳{product.priceTK.toLocaleString()} <span className="text-xs font-bold text-slate-400">TK</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => addToCart(product, e)}
                          className={`px-3 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs ${
                            addedProductIds[product.id]
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[var(--paper-deep)] hover:bg-[#E0F2F1] text-[var(--ink)] hover:text-[#006978]'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{addedProductIds[product.id] ? 'Added' : 'Add'}</span>
                        </button>

                        <button
                          onClick={() => buyNowProduct(product)}
                          className="px-3 py-2 bg-[#006978] hover:bg-[#00525e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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

              {/* Card 2: Pet Circle */}
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
                  <div className="service-eyebrow">PREMIUM EXCHANGE & SELL</div>
                  <h3>Pet Circle</h3>
                  <p>
                    Verified community marketplace to safely buy, sell, or exchange premium pets with trusted owners.
                  </p>
                </div>

                <div className="service-bottom">
                  <span className="service-badge">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Verified owners only
                  </span>
                  <button>
                    Explore Pet Circle <ArrowRight className="w-3.5 h-3.5" />
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

          {/* 4. EXCLUSIVE SPECIAL OFFERS & DISCOUNTS SECTION (NICHE "One happy home for everything") */}
          <section className="offers-section max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] my-14 sm:my-18">
            <div className="p-6 sm:p-10 rounded-[32px] bg-gradient-to-br from-[#006978] to-[#004d57] text-white shadow-xl relative overflow-hidden space-y-8">
              {/* Background decorative ambient glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

              {/* Section Header */}
              <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-white">
                    Special Product Offers
                  </h2>
                  <p className="text-xs sm:text-sm text-teal-100/90 max-w-xl font-medium">
                    Enjoy massive seasonal discounts on authentic pet food, warm winter apparel, and essential health medicines.
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('shop')}
                  className="px-5 py-2.5 bg-white text-[#006978] hover:bg-teal-50 font-extrabold text-xs rounded-full shadow-md transition-all cursor-pointer flex items-center gap-1.5 self-start md:self-auto shrink-0"
                >
                  <span>Browse All in Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 3 Product Offer Cards with Image & Offer Price */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Offer 1: Royal Canin Food (30% OFF) */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[28px] p-5 sm:p-6 space-y-4 flex flex-col justify-between hover:bg-white/15 transition-all shadow-md group">
                  <div className="space-y-3.5">
                    {/* Product Image */}
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/20 relative shadow-inner">
                      <img
                        src={SHOP_FOOD_IMG}
                        alt="Royal Canin Adult Dry Dog Food"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-amber-950 font-black text-xs rounded-full uppercase tracking-wider shadow-sm">
                        30% OFF
                      </span>
                    </div>

                    {/* Product Name */}
                    <div>
                      <h3 className="text-lg font-extrabold text-white leading-snug">
                        Royal Canin Adult Dry Dog Food (1.2kg)
                      </h3>
                      <p className="text-xs text-teal-100/80 mt-1">
                        High-protein formula with essential omega-3 fatty acids for adult dogs.
                      </p>
                    </div>
                  </div>

                  {/* Pricing & Action */}
                  <div className="pt-3 border-t border-white/15 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div className="space-x-2">
                        <span className="text-xl font-black text-amber-300">
                          ৳1,015 <span className="text-xs font-bold text-teal-100">TK</span>
                        </span>
                        <span className="text-xs font-semibold text-teal-200 line-through">
                          ৳1,450 TK
                        </span>
                      </div>
                      <span className="text-[11px] font-extrabold text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-400/30">
                        Save ৳435
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        const product = shopProducts.find(p => p.id === 's1') || shopProducts[0];
                        buyNowProduct(product);
                      }}
                      className="w-full py-3 bg-white text-[#006978] hover:bg-teal-50 font-extrabold text-xs rounded-xl transition-colors cursor-pointer text-center shadow-sm"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* Offer 2: Winter Dog Jacket (25% OFF) */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[28px] p-5 sm:p-6 space-y-4 flex flex-col justify-between hover:bg-white/15 transition-all shadow-md group">
                  <div className="space-y-3.5">
                    {/* Product Image */}
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/20 relative shadow-inner">
                      <img
                        src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=600"
                        alt="Waterproof Padded Winter Dog Jacket"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-pink-300 text-pink-950 font-black text-xs rounded-full uppercase tracking-wider shadow-sm">
                        25% OFF
                      </span>
                    </div>

                    {/* Product Name */}
                    <div>
                      <h3 className="text-lg font-extrabold text-white leading-snug">
                        Waterproof Padded Winter Dog Jacket
                      </h3>
                      <p className="text-xs text-teal-100/80 mt-1">
                        Warm fleece lining with reflective night safety stripes for dogs.
                      </p>
                    </div>
                  </div>

                  {/* Pricing & Action */}
                  <div className="pt-3 border-t border-white/15 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div className="space-x-2">
                        <span className="text-xl font-black text-pink-200">
                          ৳635 <span className="text-xs font-bold text-teal-100">TK</span>
                        </span>
                        <span className="text-xs font-semibold text-teal-200 line-through">
                          ৳850 TK
                        </span>
                      </div>
                      <span className="text-[11px] font-extrabold text-pink-200 bg-pink-950/40 px-2 py-0.5 rounded-md border border-pink-400/30">
                        Save ৳215
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        const product = shopProducts.find(p => p.id === 's3') || shopProducts[2];
                        buyNowProduct(product);
                      }}
                      className="w-full py-3 bg-white text-[#006978] hover:bg-teal-50 font-extrabold text-xs rounded-xl transition-colors cursor-pointer text-center shadow-sm"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* Offer 3: Healthcare Syrup & Medicine (20% OFF) */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[28px] p-5 sm:p-6 space-y-4 flex flex-col justify-between hover:bg-white/15 transition-all shadow-md group">
                  <div className="space-y-3.5">
                    {/* Product Image */}
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/20 relative shadow-inner">
                      <img
                        src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600"
                        alt="Vet-Approved Multi-Vitamin & Calcium Syrup"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-300 text-emerald-950 font-black text-xs rounded-full uppercase tracking-wider shadow-sm">
                        20% OFF
                      </span>
                    </div>

                    {/* Product Name */}
                    <div>
                      <h3 className="text-lg font-extrabold text-white leading-snug">
                        Vet Multi-Vitamin & Calcium Syrup
                      </h3>
                      <p className="text-xs text-teal-100/80 mt-1">
                        Veterinary-approved dietary supplement for strong bones, immunity & fur.
                      </p>
                    </div>
                  </div>

                  {/* Pricing & Action */}
                  <div className="pt-3 border-t border-white/15 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div className="space-x-2">
                        <span className="text-xl font-black text-emerald-300">
                          ৳380 <span className="text-xs font-bold text-teal-100">TK</span>
                        </span>
                        <span className="text-xs font-semibold text-teal-200 line-through">
                          ৳480 TK
                        </span>
                      </div>
                      <span className="text-[11px] font-extrabold text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-400/30">
                        Save ৳100
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        const product = shopProducts.find(p => p.category === 'Medicine') || shopProducts[0];
                        buyNowProduct(product);
                      }}
                      className="w-full py-3 bg-white text-[#006978] hover:bg-teal-50 font-extrabold text-xs rounded-xl transition-colors cursor-pointer text-center shadow-sm"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. OUR PRODUCTS & PET CARE PLAN DETAILED BREAKDOWN ("our products r oi our products er moddhe ki ki thakbe, pet care plan er moddhe ki ki thakbe") */}
          <section className="breakdown-section max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] my-14 sm:my-18">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[var(--ink)]">
                Our Products & Pet Care Plan
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted-ink)] font-medium leading-relaxed">
                Everything you need to raise a thriving, joyful companion under one trusted roof.
              </p>
            </div>

            {/* 2-Column Split Showcase: Products Catalog vs Care Plan Coverage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Column 1: What is in PetMama Shop (Our Products) */}
              <div className="bg-white border-2 border-slate-200 rounded-[28px] p-6 sm:p-8 space-y-6 shadow-sm hover:border-[#006978]/40 transition-all flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#E0F2F1] text-[#006978] flex items-center justify-center text-2xl shadow-2xs">
                        🛍️
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-[var(--ink)]">
                          PetMama Shop Catalog
                        </h3>
                        <span className="text-xs font-bold text-slate-400">
                          100% Genuine & Express Delivery
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-extrabold text-xs rounded-full">
                      500+ Items
                    </span>
                  </div>

                  {/* 4 Shop Category Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Item 1: Food */}
                    <div className="p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🍖</span>
                        <h4 className="font-extrabold text-xs text-[var(--ink)]">Nutrition & Food</h4>
                      </div>
                      <p className="text-[11px] text-[var(--muted-ink)] leading-relaxed">
                        Royal Canin, dry kibbles, wet pouches, organic timothy hay, & fish flakes.
                      </p>
                    </div>

                    {/* Item 2: Cloths */}
                    <div className="p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">👕</span>
                        <h4 className="font-extrabold text-xs text-[var(--ink)]">Apparel & Cloths</h4>
                      </div>
                      <p className="text-[11px] text-[var(--muted-ink)] leading-relaxed">
                        Knitted winter fleece sweaters, raincoats, padded harnesses & walking leashes.
                      </p>
                    </div>

                    {/* Item 3: Medicine */}
                    <div className="p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🩺</span>
                        <h4 className="font-extrabold text-xs text-[var(--ink)]">Pharmacy & Meds</h4>
                      </div>
                      <p className="text-[11px] text-[var(--muted-ink)] leading-relaxed">
                        Multivitamins, calcium syrups, tick/flea sprays, ear drops, & first aid care.
                      </p>
                    </div>

                    {/* Item 4: Toys & Lifestyle */}
                    <div className="p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🎾</span>
                        <h4 className="font-extrabold text-xs text-[var(--ink)]">Toys & Lifestyle</h4>
                      </div>
                      <p className="text-[11px] text-[var(--muted-ink)] leading-relaxed">
                        Dental chew ropes, interactive catnip scratchers, puzzle balls & litter.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-medium">
                    Same-day delivery across Dhaka
                  </div>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="px-5 py-3 bg-[#006978] hover:bg-[#00525e] text-white font-extrabold text-xs rounded-full shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Browse Shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Column 2: What is in Pet Care Plan */}
              <div className="bg-white border-2 border-[#006978] rounded-[28px] p-6 sm:p-8 space-y-6 shadow-md flex flex-col justify-between relative overflow-hidden">
                {/* Subtle decorative badge */}
                <div className="absolute top-0 right-0 bg-[#006978] text-white text-[10px] font-black px-4 py-1 rounded-bl-2xl uppercase tracking-wider">
                  MOST POPULAR
                </div>

                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#E0F2F1] text-[#006978] flex items-center justify-center text-2xl shadow-2xs">
                        🛡️
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-[var(--ink)]">
                          Pet Care Plan Membership
                        </h3>
                        <span className="text-xs font-bold text-[#006978]">
                          Starting from ৳699 /month
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Care Plan Benefit Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Feature 1: 24/7 Vet */}
                    <div className="p-3.5 bg-[#F0FDFA] border border-[#CCFBF1] rounded-2xl space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🩺</span>
                        <h4 className="font-extrabold text-xs text-[#006978]">24/7 Video Vet Access</h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Unlimited instant video consultations with licensed vets anytime from home.
                      </p>
                    </div>

                    {/* Feature 2: Vaccinations */}
                    <div className="p-3.5 bg-[#F0FDFA] border border-[#CCFBF1] rounded-2xl space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">💉</span>
                        <h4 className="font-extrabold text-xs text-[#006978]">Annual Full Vaccination</h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Rabies, DHPPi, FVRCP & routine booster shots scheduled and administered.
                      </p>
                    </div>

                    {/* Feature 3: Routine Checkups */}
                    <div className="p-3.5 bg-[#F0FDFA] border border-[#CCFBF1] rounded-2xl space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🏥</span>
                        <h4 className="font-extrabold text-xs text-[#006978]">Clinic & Home Screenings</h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Physical checkups, dental inspections, weight tracking, & deworming.
                      </p>
                    </div>

                    {/* Feature 4: Store Discounts */}
                    <div className="p-3.5 bg-[#F0FDFA] border border-[#CCFBF1] rounded-2xl space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🎁</span>
                        <h4 className="font-extrabold text-xs text-[#006978]">10% Off Shop & Free Delivery</h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        VIP discounts on all food, apparel & toys with prioritized doorstep delivery.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-medium">
                    Cancel or transfer anytime
                  </div>
                  <button
                    onClick={() => navigateTo('pet-care-plan')}
                    className="px-5 py-3 bg-[#006978] hover:bg-[#00525e] text-white font-extrabold text-xs rounded-full shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Plan & Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 6. PET PARENT REVIEWS / TESTIMONIALS SECTION ("r er por hocche review") */}
          <section className="reviews-section max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] my-14 sm:my-18">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[var(--ink)]">
                  Loved by Pets, Trusted by Parents
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted-ink)] font-medium max-w-xl">
                  Real experiences from compassionate pet owners enjoying veterinary care, quality foods, and verified adoptions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
                  ].map((avatar, idx) => (
                    <img
                      key={idx}
                      src={avatar}
                      alt="Pet parent"
                      className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-2xs"
                    />
                  ))}
                </div>
                <span className="text-xs font-extrabold text-[#006978]">
                  +3,400 Families
                </span>
              </div>
            </div>

            {/* 3 Detailed Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Review 1 */}
              <div className="bg-white border border-[#E5EAE8] rounded-[26px] p-6 space-y-4 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">
                      2 days ago
                    </span>
                  </div>

                  <Quote className="w-8 h-8 text-[#006978]/20" />

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    “Simba developed sudden coughing at 11 PM. Within 7 minutes, Dr. Kabir was on video call guiding us on immediate relief and dosage. Next morning the prescribed medicine arrived at our Banani home. Absolute lifesaver!”
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
                    alt="Farhana Rahman"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-extrabold text-xs text-[var(--ink)]">
                      Farhana Rahman
                    </h4>
                    <span className="text-[11px] text-slate-400 block">
                      Mom of Simba (Golden Retriever) · Dhaka
                    </span>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-white border border-[#E5EAE8] rounded-[26px] p-6 space-y-4 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">
                      1 week ago
                    </span>
                  </div>

                  <Quote className="w-8 h-8 text-[#006978]/20" />

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    “I regularly order Royal Canin Persian food and clumping litter from PetMama Shop. Everything is 100% genuine with long expiry dates, packed safely, and delivered the same afternoon. The knitted fleece sweater fits Bella perfectly!”
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
                    alt="Tanvir Ahmed"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-extrabold text-xs text-[var(--ink)]">
                      Tanvir Ahmed
                    </h4>
                    <span className="text-[11px] text-slate-400 block">
                      Dad of Bella & Oreo (Persian Cats) · Dhanmondi
                    </span>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-white border border-[#E5EAE8] rounded-[26px] p-6 space-y-4 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">
                      2 weeks ago
                    </span>
                  </div>

                  <Quote className="w-8 h-8 text-[#006978]/20" />

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    “We adopted our puppy through Pet Circle with verified health documents, then instantly enrolled him in the Pet Care Plan. The monthly subscription saves us thousands of taka compared to one-off clinic fees. Highly recommend!”
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
                    alt="Maisha Chowdhury"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-extrabold text-xs text-[var(--ink)]">
                      Maisha Chowdhury
                    </h4>
                    <span className="text-[11px] text-slate-400 block">
                      Guardian of Cooper (Beagle) · Chittagong
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ) SECTION ("r er pore hocche faq section rakho") */}
          <section className="faq-section max-w-[960px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] my-14 sm:my-18">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[var(--ink)]">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted-ink)] font-medium">
                Everything you need to know about our products, veterinary care plans, deliveries, and payment methods.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {[
                {
                  q: 'How does the Pet Care Plan monthly subscription work?',
                  a: 'The Pet Care Plan is an all-in-one health membership for your dog, cat, or rabbit. For a transparent monthly fee (৳699/mo standard or ৳999/mo with full vaccinations), you receive unlimited 24/7 video vet appointments, routine preventative care, discounts on store products, and comprehensive health monitoring.'
                },
                {
                  q: 'Are veterinary consultations and vaccinations truly included in the monthly fee?',
                  a: 'Yes! With the Pet Care Plan, you can connect with registered veterinarians as often as needed without per-consultation fees. If you choose the "Include Vaccination" option, all core annual vaccinations (such as Rabies, DHPPi for dogs, or FVRCP for cats) and booster shots are covered.'
                },
                {
                  q: 'What products do you sell in the PetMama Shop and how fast is delivery?',
                  a: 'We stock 100% genuine pet food (dry kibbles, wet pouches, organic hay), seasonal apparel & accessories, veterinary medicines, supplements, grooming supplies, and interactive toys. Inside Dhaka, delivery takes 2 to 6 hours for express orders, and 24 to 48 hours for other districts across Bangladesh.'
                },
                {
                  q: 'What payment methods are supported in Bangladesh?',
                  a: 'We accept all major Bangladeshi payment methods including bKash, Nagad, Rocket, Visa/Mastercard, internet banking, and Cash on Delivery (COD) for shop orders.'
                },
                {
                  q: 'Can I exchange or adopt pets safely through Pet Circle?',
                  a: 'Absolutely. Pet Circle is a community network specifically designed to stop pet trafficking and unverified trading. Every listing requires verified guardian contact info, pet vaccination/health status, and genuine photos. Direct communication between guardians ensures transparent and safe adoptions.'
                },
                {
                  q: 'Can I cancel or transfer the Pet Care Plan if I rehome my pet?',
                  a: 'Yes! The Pet Care Plan is fully transferable to any new verified guardian when rehoming through Pet Circle, or you can cancel your monthly renewal anytime without penalty.'
                }
              ].map((faq, index) => {
                const isOpen = faqOpenIndex === index;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-[#006978] bg-[#F0FDFA]/40 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-extrabold text-sm sm:text-base text-[var(--ink)]">
                        {faq.q}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen ? 'bg-[#006978] text-white rotate-180' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn border-t border-[#CCFBF1]/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. EMOTIONAL APP DOWNLOAD SECTION */}
          <section className="app-download-section max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] my-16">
            <div className="bg-gradient-to-br from-[#F6F0E6] via-[#FAF6EF] to-[#EBE4D8] text-[var(--ink)] rounded-[32px] p-8 md:p-14 border border-[var(--line)] shadow-xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Decorative soft glowing background circle */}
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#006978]/15 rounded-full blur-3xl pointer-events-none"></div>

              {/* Left Column: Split-Color Headline & Official Store Download Badges */}
              <div className="space-y-8 z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-editorial leading-[1.2] tracking-tight">
                  <span className="text-[var(--ink)] font-editorial">“I'm hungry... </span>
                  <br className="hidden sm:inline" />
                  <span className="text-[#006978] font-editorial">Can you help me find a warm meal or home?”</span>
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

      {/* COMPREHENSIVE SITE FOOTER CARD (UNIFIED LOCATION, SOCIALS & PAGE LINKS) */}
      {activeTab !== 'explore' && (
        <footer className="site-footer-wrapper max-w-[1240px] mx-auto px-[18px] md:px-[25px] lg:px-[40px] my-14 sm:my-20 text-[var(--ink)]">
          <div className="bg-white border-2 border-slate-200 rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden space-y-12">
            {/* Background soft ambient accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E0F2F1]/50 rounded-full blur-3xl pointer-events-none" />

            {/* TOP SECTION: Physical Location & Social Community Hub */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Col: Location Info & Hours */}
              <div className="lg:col-span-7 space-y-5">
                <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[var(--ink)] leading-tight">
                  Visit PetMama Care Hub in Dhaka
                </h2>

                <p className="text-xs sm:text-sm text-[var(--muted-ink)] leading-relaxed font-medium max-w-xl">
                  Drop by our physical flagship center in Banani for premium pet nutrition tastings, product sizing, emergency vet assistance, or in-person community adoptions.
                </p>

                {/* Location Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl space-y-1">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-[#006978]">
                      <MapPin className="w-4 h-4" /> Address
                    </div>
                    <p className="text-xs font-bold text-[var(--ink)]">
                      House 42, Road 11, Block D, Banani
                    </p>
                    <span className="text-[11px] text-slate-500 block">Dhaka-1213, Bangladesh</span>
                  </div>

                  <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl space-y-1">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-[#006978]">
                      <Clock className="w-4 h-4" /> Hub Hours
                    </div>
                    <p className="text-xs font-bold text-[var(--ink)]">
                      Open 7 Days a Week
                    </p>
                    <span className="text-[11px] text-slate-500 block">9:00 AM – 10:00 PM (Daily)</span>
                  </div>

                  <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl space-y-1">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-[#006978]">
                      <PhoneCall className="w-4 h-4" /> Hotlines
                    </div>
                    <p className="text-xs font-bold text-[var(--ink)]">
                      +880 1712-345678
                    </p>
                    <span className="text-[11px] text-slate-500 block">+880 9612-PETMAMA (24/7 Helpline)</span>
                  </div>

                  <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl space-y-1">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-[#006978]">
                      <Mail className="w-4 h-4" /> Email & Support
                    </div>
                    <p className="text-xs font-bold text-[var(--ink)]">
                      care@petmama.com
                    </p>
                    <span className="text-[11px] text-slate-500 block">support@petmama.com</span>
                  </div>
                </div>
              </div>

              {/* Right Col: Social Connects & Action Box */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#006978] to-[#004d57] text-white p-6 sm:p-8 rounded-[28px] shadow-md space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold font-editorial text-white">
                    Connect with our Pet Parent Community
                  </h3>
                  <p className="text-xs text-teal-100/90 leading-relaxed font-medium">
                    Join 50,000+ passionate pet guardians sharing tips, real-time rescue alerts, and daily fur joy across our active social channels.
                  </p>
                </div>

                {/* Social Channel Badges */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-bold transition-all text-white"
                  >
                    <Facebook className="w-4 h-4 text-blue-300" />
                    <span>Facebook</span>
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-bold transition-all text-white"
                  >
                    <Instagram className="w-4 h-4 text-pink-300" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-bold transition-all text-white"
                  >
                    <Youtube className="w-4 h-4 text-red-400" />
                    <span>YouTube</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-bold transition-all text-white"
                  >
                    <Linkedin className="w-4 h-4 text-blue-200" />
                    <span>LinkedIn</span>
                  </a>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => navigateTo('contact')}
                    className="w-full py-3 bg-white text-[#006978] hover:bg-teal-50 font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                  >
                    Open Contact Page →
                  </button>
                </div>
              </div>
            </div>

            {/* MIDDLE SECTION: Multi-Column Links Grid */}
            <div className="relative z-10 pt-10 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
              {/* Col 1: Brand & Social */}
              <div className="lg:col-span-2 space-y-4">
                <div
                  className="footer-brand inline-flex items-center gap-2.5 cursor-pointer"
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  <div className="brand-mark">
                    <PawPrint className="w-4 h-4 fill-current" />
                  </div>
                  <span className="brand-name">
                    Pet<span>Mama</span>
                  </span>
                </div>

                <p className="text-xs text-[var(--muted-ink)] leading-relaxed font-medium max-w-sm">
                  All your pet needs, delivered with love. Building Bangladesh's most trusted ecosystem for authentic food, verified adoption, and veterinary health care.
                </p>

                {/* Social Connect Icons */}
                <div className="flex items-center gap-2.5 pt-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-slate-200 hover:border-[#006978] hover:text-[#006978] flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-slate-200 hover:border-[#006978] hover:text-[#006978] flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-slate-200 hover:border-[#006978] hover:text-[#006978] flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
                    title="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[#F8FAFC] border border-slate-200 hover:border-[#006978] hover:text-[#006978] flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/8801712345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Col 2: Company & Story Pages */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-[var(--ink)] uppercase tracking-wider">
                  Company & Story
                </h4>
                <ul className="space-y-2.5 text-sm font-medium text-slate-700">
                  <li>
                    <button
                      onClick={() => navigateTo('about')}
                      className="hover:text-[#006978] hover:underline cursor-pointer text-left transition-colors"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo('story')}
                      className="hover:text-[#006978] hover:underline cursor-pointer text-left transition-colors"
                    >
                      Our Story
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo('contact')}
                      className="hover:text-[#006978] hover:underline cursor-pointer text-left transition-colors"
                    >
                      Contact Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo('doctor')}
                      className="hover:text-[#006978] hover:underline cursor-pointer text-left transition-colors"
                    >
                      Partner Veterinarians
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 3: Services & Shop */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-[var(--ink)] uppercase tracking-wider">
                  Everyday Services
                </h4>
                <ul className="space-y-2.5 text-sm font-medium text-slate-700">
                  <li>
                    <button
                      onClick={() => navigateTo('shop')}
                      className="hover:text-[#006978] hover:underline cursor-pointer text-left transition-colors"
                    >
                      PetMama Shop
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo('adopt')}
                      className="hover:text-[#006978] hover:underline cursor-pointer text-left transition-colors"
                    >
                      Pet Circle (Exchange & Buy)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo('pet-care-plan')}
                      className="hover:text-[#006978] hover:underline cursor-pointer text-left transition-colors"
                    >
                      Pet Care Plan (৳699 /mo)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo('explore')}
                      className="hover:text-[#006978] hover:underline cursor-pointer text-left transition-colors"
                    >
                      Explore Stray Care Feed
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 4: Legal & Policy Pages (Only place for legal links) */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-[var(--ink)] uppercase tracking-wider">
                  Legal & Policies
                </h4>
                <ul className="space-y-2.5 text-sm font-medium text-slate-700">
                  <li>
                    <button
                      onClick={() => navigateTo('privacy')}
                      className="hover:text-[#006978] hover:underline cursor-pointer text-left transition-colors font-semibold text-[#006978]"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo('terms')}
                      className="hover:text-[#006978] hover:underline cursor-pointer text-left transition-colors font-semibold text-[#006978]"
                    >
                      Terms & Conditions
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo('return-policy')}
                      className="hover:text-[#006978] hover:underline cursor-pointer text-left transition-colors font-semibold text-[#006978]"
                    >
                      Return & Refund Policy
                    </button>
                  </li>
                  <li className="text-xs text-slate-500 pt-1 flex items-center gap-1">
                    <span>📍</span>
                    <span>Banani, Block D, Dhaka</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* BOTTOM SECTION: Copyright & Region Only (No Duplicate Legal Links) */}
            <div className="relative z-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-ink)] font-medium">
              <div>
                A product of Cygnor Labs · © 2026 PetMama Bangladesh. All rights reserved.
              </div>

              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <span>Serving Pets Across Bangladesh:</span>
                <span className="text-[#006978] font-bold">Dhaka · Chittagong · Sylhet · Khulna</span>
              </div>
            </div>
          </div>
        </footer>
      )}

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

      {/* SHOPPING CART DRAWER / MODAL (ONLY ADDED PRODUCTS AS REQUESTED) */}
      {shopDrawerOpen && (
        <div className="fixed inset-0 z-[10050] flex justify-end animate-fadeIn">
          {/* Clickable Backdrop Outside - Cancels popup when clicked */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer transition-opacity"
            onClick={() => setShopDrawerOpen(false)}
            title="Click anywhere outside to close cart"
          />

          <div 
            className="relative w-full max-w-md bg-[var(--paper)] h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between border-l border-[var(--line)] animate-slideLeft z-10 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Cart Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E0F2F1] text-[#006978] flex items-center justify-center shadow-2xs">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[var(--ink)] leading-none">Your Cart</h3>
                    <span className="text-xs font-semibold text-[var(--muted-ink)]">
                      {cart.reduce((a, b) => a + b.quantity, 0)} {cart.reduce((a, b) => a + b.quantity, 0) === 1 ? 'item' : 'items'} selected
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShopDrawerOpen(false)}
                  className="p-2 text-[var(--muted-ink)] hover:text-[var(--ink)] bg-[var(--paper-deep)] hover:bg-slate-200 rounded-full cursor-pointer transition-colors"
                  title="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Added Products List */}
              <div className="py-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--paper-deep)] flex items-center justify-center text-slate-400 mx-auto">
                      <ShoppingBasket className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-base text-[var(--ink)]">Your Cart is Empty</h4>
                      <p className="text-xs text-[var(--muted-ink)] max-w-xs mx-auto">
                        You haven't added any products to your cart yet. Browse our store for authentic nutrition, cozy apparel, and wellness care.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShopDrawerOpen(false);
                        navigateTo('shop');
                      }}
                      className="px-5 py-2.5 bg-[#006978] hover:bg-[#00525e] text-white font-extrabold text-xs rounded-full shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Explore PetMama Shop</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 bg-white border border-[var(--line)] hover:border-[#006978]/40 rounded-2xl shadow-xs transition-all flex gap-3.5 items-center justify-between"
                      >
                        {/* Product Thumbnail */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[var(--paper-deep)] flex-shrink-0 border border-slate-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details & Controls */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-extrabold text-xs sm:text-sm text-[var(--ink)] line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-xs font-bold text-[#006978]">
                            ৳{item.priceTK.toLocaleString()} TK
                          </div>

                          {/* Quantity Increase / Decrease Controls */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="inline-flex items-center bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl p-0.5">
                              <button
                                onClick={() => updateCartQty(item.id, -1)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white hover:bg-slate-100 text-[var(--ink)] transition-colors shadow-2xs cursor-pointer"
                                title="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>

                              <span className="w-8 text-center font-extrabold text-xs text-[var(--ink)]">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => updateCartQty(item.id, 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white hover:bg-slate-100 text-[var(--ink)] transition-colors shadow-2xs cursor-pointer"
                                title="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <span className="font-black text-sm text-[var(--ink)]">
                                ৳{(item.priceTK * item.quantity).toLocaleString()} <span className="text-[10px] font-bold text-slate-400">TK</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Checkout & Summary Footer */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-[var(--line)] bg-[var(--paper-deep)] rounded-2xl p-4 mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>Delivery in Dhaka & BD:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Express 2–6 Hours
                  </span>
                </div>

                <div className="flex items-baseline justify-between border-t border-slate-200/80 pt-2.5">
                  <span className="font-bold text-sm text-[var(--ink)]">Total Amount</span>
                  <span className="font-black text-xl text-[#006978]">
                    ৳{cartTotalTK.toLocaleString()} <span className="text-xs font-bold text-slate-500">TK</span>
                  </span>
                </div>

                <button
                  className="w-full py-3.5 bg-[#006978] hover:bg-[#00525e] text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  onClick={() => { setShopDrawerOpen(false); setCheckoutModalOpen(true); }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setShopDrawerOpen(false);
                    navigateTo('shop');
                  }}
                  className="w-full py-2 bg-transparent text-xs font-bold text-[var(--muted-ink)] hover:text-[var(--ink)] text-center cursor-pointer transition-colors"
                >
                  + Add more products from Shop
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADOPTION DRAWER / MODAL */}
      {adoptDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
          onClick={() => { setAdoptDrawerOpen(false); setSelectedPet(null); setAdoptSubmitted(false); }}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] bg-[var(--paper)] border border-[var(--line)] rounded-[24px] p-6 shadow-2xl overflow-y-auto flex flex-col cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
          onClick={() => { setVetModalOpen(false); setSelectedVet(null); setBookingSuccess(false); }}
        >
          <div 
            className="relative w-full max-w-xl max-h-[90vh] bg-[var(--paper)] border border-[var(--line)] rounded-[24px] p-6 shadow-2xl overflow-y-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
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
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs cursor-pointer"
          onClick={() => setProfileDrawerOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-[var(--paper)] h-full overflow-y-auto p-6 shadow-2xl flex flex-col border-l border-[var(--line)] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn cursor-pointer"
          onClick={() => setCheckoutModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-[var(--paper)] border border-[var(--line)] rounded-[28px] p-6 shadow-2xl overflow-y-auto max-h-[90vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
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

      {/* POST A PET MODAL (Pet Circle: "From My Pets" & "Add Manually" matching Image 3 & 4) */}
      {createPostModalOpen && (
        <div className="fixed inset-0 z-[10050] flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          {/* Clickable Backdrop Outside */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer transition-opacity"
            onClick={() => setCreatePostModalOpen(false)}
            title="Click outside to cancel"
          />

          <div
            className="relative w-full max-w-[440px] bg-white rounded-[32px] p-5 sm:p-6 shadow-2xl overflow-y-auto max-h-[92vh] z-10 animate-slideUp cursor-default border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top rounded drag indicator */}
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-3" aria-hidden="true" />

            {/* Header: Title "Post a Pet" & Round Close Button */}
            <div className="flex items-center justify-between pb-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
                Post a Pet
              </h2>
              <button
                onClick={() => setCreatePostModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Segmented Top Switch / Tabs: From My Pets vs Add Manually */}
            <div className="p-1 bg-[#F1F5F9] rounded-full flex items-center mb-5">
              <button
                type="button"
                onClick={() => setPostPetActiveTab('from_my_pets')}
                className={`flex-1 py-2.5 px-3 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  postPetActiveTab === 'from_my_pets'
                    ? 'bg-[#006978] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PawPrint className="w-3.5 h-3.5" />
                <span>From My Pets</span>
              </button>

              <button
                type="button"
                onClick={() => setPostPetActiveTab('add_manually')}
                className={`flex-1 py-2.5 px-3 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  postPetActiveTab === 'add_manually'
                    ? 'bg-[#006978] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Add Manually</span>
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              {/* TAB 1: FROM MY PETS (Image 3) */}
              {postPetActiveTab === 'from_my_pets' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* SELECT PET Header & Add Pet link */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        SELECT PET
                      </span>
                      <button
                        type="button"
                        onClick={() => setPostPetActiveTab('add_manually')}
                        className="text-xs font-bold text-[#006978] hover:underline cursor-pointer flex items-center gap-0.5"
                      >
                        Add Pet
                      </button>
                    </div>

                    {/* Pet Cards List (Bruno, Cleo, etc.) */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {myPetsList.map((pet) => {
                        const isSelected = selectedMyPetId === pet.id;
                        return (
                          <div
                            key={pet.id}
                            onClick={() => setSelectedMyPetId(pet.id)}
                            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2.5 relative ${
                              isSelected
                                ? 'border-[#006978] bg-[#F0FDFA] shadow-xs'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <img
                              src={pet.image}
                              alt={pet.name}
                              className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-xs text-slate-900 truncate">
                                {pet.name}
                              </h4>
                              <p className="text-[10px] text-slate-500 truncate">
                                {pet.breed} • {pet.age}
                              </p>
                            </div>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-[#006978] text-white flex items-center justify-center flex-shrink-0">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* PICKUP LOCATION with Auto-detect */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        PICKUP LOCATION
                      </span>
                      <button
                        type="button"
                        onClick={() => setFromMyPetsLocation('Banani, Block C, Dhaka')}
                        className="text-xs font-bold text-[#006978] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        🎯 Auto-detect
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl">
                      <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs truncate">
                        <MapPin className="w-4 h-4 text-[#006978] flex-shrink-0" />
                        <input
                          type="text"
                          value={fromMyPetsLocation}
                          onChange={(e) => setFromMyPetsLocation(e.target.value)}
                          className="bg-transparent border-0 focus:outline-none w-full font-medium text-xs text-slate-800"
                          placeholder="Banani, Block C, Dhaka"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newLoc = prompt('Enter Pickup Location:', fromMyPetsLocation);
                          if (newLoc) setFromMyPetsLocation(newLoc);
                        }}
                        className="text-[11px] text-slate-400 font-bold hover:text-slate-700 ml-2 cursor-pointer flex-shrink-0"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  {/* PRICING OPTION: Paid vs Free */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      PRICING OPTION
                    </span>
                    <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                      <button
                        type="button"
                        onClick={() => setFromMyPetsPricing('Paid')}
                        className={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center gap-2.5 transition-all cursor-pointer ${
                          fromMyPetsPricing === 'Paid'
                            ? 'border-[#006978] bg-[#F0FDFA] text-slate-900'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          fromMyPetsPricing === 'Paid' ? 'border-[#006978]' : 'border-slate-300'
                        }`}>
                          {fromMyPetsPricing === 'Paid' && <div className="w-2 h-2 rounded-full bg-[#006978]" />}
                        </div>
                        <span>Paid</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFromMyPetsPricing('Free')}
                        className={`p-3 rounded-2xl border font-bold text-xs flex items-center gap-2.5 transition-all cursor-pointer ${
                          fromMyPetsPricing === 'Free'
                            ? 'border-[#006978] bg-[#F0FDFA] text-slate-900'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          fromMyPetsPricing === 'Free' ? 'border-[#006978]' : 'border-slate-300'
                        }`}>
                          {fromMyPetsPricing === 'Free' && <div className="w-2 h-2 rounded-full bg-[#006978]" />}
                        </div>
                        <span>Free</span>
                      </button>
                    </div>

                    {/* Price Input Row */}
                    {fromMyPetsPricing === 'Paid' && (
                      <div className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl">
                        <div className="flex items-center gap-2 text-slate-800 font-bold text-xs flex-1">
                          <span className="text-[#006978] font-black text-sm">৳</span>
                          <input
                            type="text"
                            value={fromMyPetsPrice}
                            onChange={(e) => setFromMyPetsPrice(e.target.value)}
                            placeholder="0.00"
                            className="bg-transparent border-0 focus:outline-none w-full font-bold text-xs text-slate-900"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-400">BDT</span>
                      </div>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        DESCRIPTION
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        rows={3}
                        maxLength={300}
                        value={fromMyPetsDescription}
                        onChange={(e) => setFromMyPetsDescription(e.target.value)}
                        placeholder="Write details about your pet here (optional)..."
                        className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#006978] resize-none"
                      />
                      <div className="text-right text-[10px] text-slate-400 font-medium mt-1">
                        {fromMyPetsDescription.length}/300
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ADD MANUALLY (Image 4) */}
              {postPetActiveTab === 'add_manually' && (
                <div className="space-y-3.5 animate-fadeIn">
                  {/* PET PHOTOS (Up to 5 photos) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        PET PHOTOS
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Up to 5 photos
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                      {/* + Add Photo Slot */}
                      <button
                        type="button"
                        onClick={() => sellPetPhotoInputRef.current?.click()}
                        className="w-20 h-20 rounded-2xl border-2 border-dashed border-[#006978]/40 bg-[#F0FDFA] flex flex-col items-center justify-center gap-1 text-[#006978] hover:bg-[#E6F7F7] transition-colors cursor-pointer flex-shrink-0"
                      >
                        <Camera className="w-5 h-5" />
                        <span className="text-[10px] font-extrabold">+ Add</span>
                      </button>

                      <input
                        ref={sellPetPhotoInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleSellPetPhotoUpload}
                        className="hidden"
                      />

                      {/* Uploaded Slot with Cover badge */}
                      {sellPetPhotos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 flex-shrink-0 group"
                        >
                          <img src={photo} alt="Pet" className="w-full h-full object-cover" />
                          {idx === 0 && (
                            <span className="absolute bottom-1 left-1.5 px-2 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold rounded-md">
                              Cover
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeSellPetPhoto(idx)}
                            className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      {/* Empty Placeholder Slot (Slot 2/3) */}
                      {sellPetPhotos.length < 2 && (
                        <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-200 bg-[#F8FAFC] flex flex-col items-center justify-center gap-1 text-slate-300 flex-shrink-0">
                          <ImageIcon className="w-5 h-5" />
                          <span className="text-[9px] font-bold">Slot {sellPetPhotos.length + 2}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PET NAME (Required) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        PET NAME
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Required</span>
                    </div>
                    <input
                      type="text"
                      required
                      value={manualPetName}
                      onChange={(e) => setManualPetName(e.target.value)}
                      placeholder="Charlie"
                      className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#006978]"
                    />
                  </div>

                  {/* PET CATEGORY */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      PET CATEGORY
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {(['Dog', 'Cat', 'Bird', 'Other'] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setManualPetCategory(cat)}
                          className={`py-2 px-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-center ${
                            manualPetCategory === cat
                              ? 'border-[#006978] bg-[#F0FDFA] text-[#006978]'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AGE & SEX */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        AGE
                      </span>
                      <input
                        type="text"
                        value={manualPetAge}
                        onChange={(e) => setManualPetAge(e.target.value)}
                        placeholder="1 year"
                        className="w-full p-2.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        SEX
                      </span>
                      <div className="p-1 bg-[#F1F5F9] rounded-2xl flex items-center h-[42px]">
                        <button
                          type="button"
                          onClick={() => setManualPetSex('Male')}
                          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            manualPetSex === 'Male'
                              ? 'bg-white text-[#006978] shadow-xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Male
                        </button>
                        <button
                          type="button"
                          onClick={() => setManualPetSex('Female')}
                          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            manualPetSex === 'Female'
                              ? 'bg-white text-[#006978] shadow-xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Female
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* PET CARE (SUBSCRIPTION) */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      PET CARE (SUBSCRIPTION)
                    </span>
                    <div className="flex items-center gap-2 p-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl">
                      <Clock className="w-4 h-4 text-[#006978] flex-shrink-0" />
                      <input
                        type="text"
                        value={manualPetCareSub}
                        onChange={(e) => setManualPetCareSub(e.target.value)}
                        placeholder="8 Months"
                        className="bg-transparent border-0 focus:outline-none w-full text-xs font-semibold text-slate-800"
                      />
                    </div>
                  </div>

                  {/* VACCINATION STATUS */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      VACCINATION STATUS
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setManualVaccination('Vaccinated')}
                        className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          manualVaccination === 'Vaccinated'
                            ? 'border-[#006978] bg-[#F0FDFA] text-slate-900'
                            : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          manualVaccination === 'Vaccinated' ? 'border-[#006978]' : 'border-slate-300'
                        }`}>
                          {manualVaccination === 'Vaccinated' && <div className="w-2 h-2 rounded-full bg-[#006978]" />}
                        </div>
                        <span>Vaccinated</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setManualVaccination('No / Pending')}
                        className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          manualVaccination === 'No / Pending'
                            ? 'border-[#006978] bg-[#F0FDFA] text-slate-900'
                            : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          manualVaccination === 'No / Pending' ? 'border-[#006978]' : 'border-slate-300'
                        }`}>
                          {manualVaccination === 'No / Pending' && <div className="w-2 h-2 rounded-full bg-[#006978]" />}
                        </div>
                        <span>No / Pending</span>
                      </button>
                    </div>
                  </div>

                  {/* TEMPERAMENT & TRAITS */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      TEMPERAMENT & TRAITS
                    </span>
                    <input
                      type="text"
                      value={manualTemperamentInput}
                      onChange={(e) => setManualTemperamentInput(e.target.value)}
                      placeholder="Type custom traits..."
                      className="w-full p-2.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 mb-2 focus:outline-none"
                    />
                    <div className="flex flex-wrap gap-1.5">
                      {availableTraits.map((trait) => {
                        const isSelected = manualSelectedTraits.includes(trait);
                        return (
                          <button
                            key={trait}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setManualSelectedTraits(prev => prev.filter(t => t !== trait));
                              } else {
                                setManualSelectedTraits(prev => [...prev, trait]);
                              }
                            }}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#006978] text-white shadow-2xs'
                                : 'bg-[#F1F5F9] text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {trait}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* PRICING OPTION */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      PRICING OPTION
                    </span>
                    <div className="grid grid-cols-2 gap-2.5 mb-2">
                      <button
                        type="button"
                        onClick={() => setManualPricing('Paid')}
                        className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          manualPricing === 'Paid'
                            ? 'border-[#006978] bg-[#F0FDFA] text-slate-900'
                            : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          manualPricing === 'Paid' ? 'border-[#006978]' : 'border-slate-300'
                        }`}>
                          {manualPricing === 'Paid' && <div className="w-2 h-2 rounded-full bg-[#006978]" />}
                        </div>
                        <span>Paid</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setManualPricing('Free')}
                        className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          manualPricing === 'Free'
                            ? 'border-[#006978] bg-[#F0FDFA] text-slate-900'
                            : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          manualPricing === 'Free' ? 'border-[#006978]' : 'border-slate-300'
                        }`}>
                          {manualPricing === 'Free' && <div className="w-2 h-2 rounded-full bg-[#006978]" />}
                        </div>
                        <span>Free</span>
                      </button>
                    </div>

                    {manualPricing === 'Paid' && (
                      <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl">
                        <div className="flex items-center gap-2 text-slate-800 font-bold text-xs flex-1">
                          <span className="text-[#006978] font-black text-sm">৳</span>
                          <input
                            type="text"
                            value={manualPrice}
                            onChange={(e) => setManualPrice(e.target.value)}
                            placeholder="0.00"
                            className="bg-transparent border-0 focus:outline-none w-full font-bold text-xs text-slate-900"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-400">BDT</span>
                      </div>
                    )}
                  </div>

                  {/* PICKUP LOCATION with Auto-detect */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        PICKUP LOCATION
                      </span>
                      <button
                        type="button"
                        onClick={() => setManualLocation('Banani, Block C, Dhaka')}
                        className="text-xs font-bold text-[#006978] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        🎯 Auto-detect
                      </button>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl">
                      <MapPin className="w-4 h-4 text-[#006978] flex-shrink-0" />
                      <input
                        type="text"
                        value={manualLocation}
                        onChange={(e) => setManualLocation(e.target.value)}
                        placeholder="Banani, Block C, Dhaka"
                        className="bg-transparent border-0 focus:outline-none w-full text-xs font-semibold text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Main Action Button: POST (Exact styling matching Image 3 and 4) */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#006978] hover:bg-[#00525e] text-white font-extrabold text-sm sm:text-base rounded-full transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer text-center"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INQUIRE / BUY PET MODAL (Opened from Pet Circle "Adopt" button) */}
      {inquirePost && (
        <div className="fixed inset-0 z-[10050] flex items-center justify-center p-3 md:p-4 animate-fadeIn">
          {/* Clickable Backdrop Outside */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer transition-opacity"
            onClick={() => setInquirePost(null)}
            title="Click outside to cancel"
          />

          <div
            className="relative w-full max-w-lg bg-[var(--paper)] border border-[var(--line)] rounded-[28px] p-6 shadow-2xl overflow-y-auto max-h-[90vh] z-10 animate-slideUp cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
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
                  ) : inquirePost.postType === 'exchange' ? (
                    <span className="text-xs font-extrabold text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                      🔄 For Exchange
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
              {inquirePost.postType === 'exchange' && inquirePost.exchangeWith && (
                <div><strong>Desired Exchange:</strong> 🔄 {inquirePost.exchangeWith}</div>
              )}
              <div><strong>Health Status:</strong> 🩺 {inquirePost.healthStatus}</div>
              <div><strong>Description:</strong> {inquirePost.description}</div>
            </div>

            {/* Guardian Contact Info */}
            <div className="p-4 bg-[var(--paper-deep)] rounded-2xl space-y-3 text-xs mb-4">
              <div className="font-bold text-[var(--ink)] flex items-center justify-between">
                <span>Verified Guardian Details:</span>
                <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full">Identity Verified</span>
              </div>
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
                setAppliedPetCircleIds(prev => [...prev, inquirePost.id]);
                alert(`🎉 Your adoption request for ${inquirePost.petName} was sent directly to verified guardian ${inquirePost.guardianName}! They will contact you shortly.`);
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
                  defaultValue={
                    inquirePost.postType === 'free'
                      ? `Hi ${inquirePost.guardianName}, I would love to adopt ${inquirePost.petName} and provide a safe indoor home.`
                      : inquirePost.postType === 'exchange'
                      ? `Hi ${inquirePost.guardianName}, I am interested in exchanging for ${inquirePost.petName}. I have a healthy pet match for you.`
                      : `Hi ${inquirePost.guardianName}, I am interested in purchasing/adopting ${inquirePost.petName} for ৳${inquirePost.priceTK.toLocaleString()} TK.`
                  }
                  className="w-full p-2.5 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl"
                ></textarea>
              </div>

              <button type="submit" className="w-full primary-button py-3 text-xs font-bold cursor-pointer">
                Send Adoption Inquiry to Guardian →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EXPLORE MODAL 1: OFFER CLOSE CONFIRMATION MODAL (Matching Image 3 -> Image 2 flow) */}
      {confirmCloseFoodPostId && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 space-y-5 border border-[var(--line)] shadow-2xl text-center">
            <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-2xl mx-auto font-bold shadow-inner">
              🍧
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">Close Food Requests?</h3>
              <p className="text-xs text-[var(--muted-ink)] leading-relaxed font-medium">
                Are you sure no more food is needed for this pet? Confirming will update the status badge to <strong className="text-slate-800 font-bold">"No more food accepted"</strong>.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setConfirmCloseFoodPostId(null)}
                className="px-4 py-3 bg-[var(--paper-deep)] hover:bg-[var(--line)] text-[var(--ink)] font-bold text-xs rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmCloseFood(confirmCloseFoodPostId)}
                className="px-4 py-3 bg-[#006978] hover:bg-[#00525e] text-white font-bold text-xs rounded-full shadow-md transition-colors cursor-pointer"
              >
                Yes, Close Food Requests
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPLORE MODAL 2: MARK ADOPTED CONFIRMATION MODAL (Matching Image 3 -> Image 2 flow) */}
      {confirmAdoptedPostId && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 space-y-5 border border-[var(--line)] shadow-2xl text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-2xl mx-auto font-bold shadow-inner">
              🐾
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">Mark Pet as Adopted?</h3>
              <p className="text-xs text-[var(--muted-ink)] leading-relaxed font-medium">
                Has this rescued pet found a safe permanent home? Confirming will update the status to <strong className="text-emerald-700 font-bold">"Pet has found a home"</strong>.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setConfirmAdoptedPostId(null)}
                className="px-4 py-3 bg-[var(--paper-deep)] hover:bg-[var(--line)] text-[var(--ink)] font-bold text-xs rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmAdopted(confirmAdoptedPostId)}
                className="px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-full shadow-md transition-colors cursor-pointer"
              >
                Yes, Mark as Adopted 🎉
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPLORE MODAL 3: HELP WITH FOOD (MATCHING SCREENSHOT DESIGN) */}
      {offerFoodModalPost && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn cursor-pointer"
          onClick={() => setOfferFoodModalPost(null)}
        >
          <div 
            className="bg-white rounded-[32px] max-w-sm sm:max-w-md w-full p-6 md:p-7 space-y-5 border border-slate-100 shadow-2xl relative animate-slideUp cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top drag handle indicator */}
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto -mt-1 mb-2" aria-hidden="true" />

            {/* Top Right Close Button */}
            <button
              onClick={() => setOfferFoodModalPost(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header: Pet Thumbnail, Title with Verified Badge & Location */}
            <div className="flex items-center gap-3">
              <img
                src={offerFoodModalPost.image}
                alt={offerFoodModalPost.authorName}
                className="w-12 h-12 rounded-full object-cover border border-slate-200 flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 font-bold text-base text-[var(--ink)] truncate">
                  <span>
                    {offerFoodModalPost.id === 'explore-1' 
                      ? 'Bella & 4 Puppies' 
                      : `${offerFoodModalPost.authorName}'s ${offerFoodModalPost.petType}`}
                  </span>
                  <span className="w-4 h-4 rounded-full bg-[#006978] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    ✓
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                  📍 {offerFoodModalPost.location} , Posted by {offerFoodModalPost.authorName.split(' ')[0]}
                </div>
              </div>
            </div>

            {/* Title & Question */}
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-bold font-editorial text-[var(--ink)]">
                Help with Food
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                How would you like to provide food for this {offerFoodModalPost.petType.toLowerCase()}?
              </p>
            </div>

            {/* Options Cards */}
            <div className="space-y-3">
              {/* Option 1: My Own Food */}
              <div
                onClick={() => setFoodOfferMethod('own')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  foodOfferMethod === 'own'
                    ? 'border-[#006978] bg-[#006978]/5 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-xl">
                    🍔
                  </div>
                  <span className="font-bold text-sm text-[var(--ink)]">My Own Food</span>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                  foodOfferMethod === 'own'
                    ? 'bg-[#006978] border-[#006978] text-white'
                    : 'border-slate-300 bg-white'
                }`}>
                  {foodOfferMethod === 'own' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* Option 2: Buy from Food Store */}
              <div
                onClick={() => setFoodOfferMethod('store')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  foodOfferMethod === 'store'
                    ? 'border-[#006978] bg-[#006978]/5 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                    <ShoppingBag className="w-5 h-5 text-slate-700" />
                  </div>
                  <span className="font-bold text-sm text-[var(--ink)]">Buy from Food Store</span>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                  foodOfferMethod === 'store'
                    ? 'bg-[#006978] border-[#006978] text-white'
                    : 'border-slate-300 bg-white'
                }`}>
                  {foodOfferMethod === 'store' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>

            {/* Helper Text */}
            <p className="text-[11px] text-slate-500 text-center font-medium leading-relaxed px-3">
              You can coordinate delivery time or pick specific items in the next step.
            </p>

            {/* Buttons: Continue & Cancel */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleContinueFoodOffer}
                className="w-full py-3.5 bg-[#006978] hover:bg-[#00525e] text-white font-bold text-sm rounded-full transition-all shadow-sm cursor-pointer flex items-center justify-center"
              >
                Continue
              </button>

              <button
                onClick={() => setOfferFoodModalPost(null)}
                className="w-full py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPLORE MODAL 4: CREATE NEW EXPLORE POST MODAL (MATCHING SCREENSHOT DESIGN) */}
      {createExplorePostModalOpen && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-4 animate-fadeIn cursor-pointer"
          onClick={() => setCreateExplorePostModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[32px] max-w-lg w-full p-6 md:p-7 space-y-5 border border-[var(--line)] shadow-2xl relative max-h-[92vh] overflow-y-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top handle bar */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto -mt-1 mb-2" aria-hidden="true" />

            <div className="flex items-center justify-between pb-1">
              <h3 className="text-2xl md:text-3xl font-bold font-editorial text-[#006978]">
                Create Post
              </h3>
              <button
                onClick={() => setCreateExplorePostModalOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 bg-[#F1F5F9] hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {dailyLimitError && (
              <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-2xl text-amber-900 text-xs font-bold">
                ⚠️ {dailyLimitError}
              </div>
            )}

            <form onSubmit={handleCreateExplorePost} className="space-y-5 text-xs">
              {/* 1. Your Pet's Location Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-bold text-xs">
                  <label className="text-[var(--ink)]">Your Pet's Location</label>
                  <span className="text-[var(--muted-ink)] font-normal text-[11px]">City, Area or Street</span>
                </div>
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 text-[#006978] absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={newExplorePost.location}
                    onChange={(e) => setNewExplorePost({ ...newExplorePost, location: e.target.value })}
                    placeholder="Banani, Mohakhali"
                    className="w-full pl-10 pr-24 py-3.5 bg-white border border-[#CBD5E1] rounded-2xl font-semibold text-xs text-[var(--ink)] focus:outline-none focus:border-[#006978] shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setNewExplorePost({ ...newExplorePost, location: 'Banani, Mohakhali, Dhaka' })}
                    className="absolute right-2 px-3 py-1.5 bg-[#E8F6F6] hover:bg-[#d0f0f0] text-[#006978] font-bold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    🎯 Detect
                  </button>
                </div>
              </div>

              {/* 2. Need Badges Option Cards (4 Selectable Options) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'Need Food', label: 'Need Food', icon: '🥣' },
                  { id: 'Need a Home', label: 'Need a Home', icon: '🏠' },
                  { id: 'Lost Pet', label: 'Lost Pet', icon: '🐾' },
                  { id: 'Need Vet', label: 'Need Vet', icon: '🩺' }
                ].map((item) => {
                  const isSelected = newExplorePost.needBadge === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setNewExplorePost({ ...newExplorePost, needBadge: item.id as any })}
                      className={`p-3.5 rounded-[20px] font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all cursor-pointer border-2 ${
                        isSelected
                          ? 'bg-[#006978] text-white border-[#006978] shadow-md scale-[1.02]'
                          : 'bg-white text-[var(--ink)] border-[#E2E8F0] hover:border-[#006978]'
                      }`}
                    >
                      <span className={`text-xl p-2 rounded-full ${isSelected ? 'bg-white/20' : 'bg-[#E8F6F6]'}`}>
                        {item.icon}
                      </span>
                      <span className="leading-tight text-center">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 3. REGISTERED PET Dropdown Container */}
              <div className="bg-[#F0FDFD] border border-[#A5F3FC] rounded-[22px] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[11px] tracking-wider uppercase text-[#006978]">
                    REGISTERED PET
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const petName = prompt("Enter new pet's name:");
                      if (petName) {
                        setRegisteredPetsList(prev => [...prev, petName]);
                        setNewExplorePost({ ...newExplorePost, registeredPet: petName });
                      }
                    }}
                    className="font-bold text-[#006978] hover:underline cursor-pointer flex items-center gap-1 text-xs"
                  >
                    + Add New Pet
                  </button>
                </div>

                <div className="relative">
                  <select
                    value={newExplorePost.registeredPet}
                    onChange={(e) => setNewExplorePost({ ...newExplorePost, registeredPet: e.target.value })}
                    className="w-full p-3 pl-10 bg-white border border-[#CBD5E1] rounded-2xl text-xs font-bold text-[var(--ink)] focus:outline-none focus:border-[#006978] cursor-pointer appearance-none shadow-2xs"
                  >
                    {registeredPetsList.map((pet, idx) => (
                      <option key={idx} value={pet}>{pet}</option>
                    ))}
                  </select>
                  <span className="absolute left-3 top-3.5 text-base pointer-events-none">🐶</span>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-4 pointer-events-none" />
                </div>
              </div>

              {/* 4. Description Textarea with Smiley Icon */}
              <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-[22px] p-4 space-y-2 focus-within:bg-white focus-within:border-[#006978] transition-all">
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your pet's needs, medical details, or routine..."
                  value={newExplorePost.description}
                  onChange={(e) => setNewExplorePost({ ...newExplorePost, description: e.target.value })}
                  className="w-full bg-transparent text-xs text-[var(--ink)] placeholder:text-slate-400 focus:outline-none resize-none font-medium leading-relaxed"
                ></textarea>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-slate-400">
                  <button
                    type="button"
                    onClick={() => setNewExplorePost(prev => ({ ...prev, description: prev.description + ' 😊🐾' }))}
                    className="text-lg hover:scale-125 transition-transform cursor-pointer"
                    title="Add Emoji"
                  >
                    🙂
                  </button>
                  <span className="text-[10px] text-slate-400 font-semibold">{newExplorePost.description.length}/500</span>
                </div>
              </div>

              {/* 5. Pet Photos Upload & Preview Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[var(--ink)]">Pet Photos</span>
                  <span className="text-[var(--muted-ink)] font-normal text-[11px]">Supports JPG, PNG</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Photo Thumbnails */}
                  {newExplorePost.photos.map((photo, idx) => (
                    <div key={idx} className="relative w-24 h-20 rounded-[18px] overflow-hidden border border-slate-300 shadow-2xs group">
                      <img src={photo} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1.5 right-1.5 p-1 bg-black/70 hover:bg-rose-600 text-white rounded-full transition-colors cursor-pointer"
                        title="Remove photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {/* Add Photo Upload Button */}
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="w-24 h-20 bg-[#E8F6F6] hover:bg-[#d8f2f2] border-2 border-dashed border-[#A5F3FC] rounded-[18px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer text-[#006978] shadow-2xs"
                  >
                    <span className="text-xl">📸</span>
                    <span className="text-[10px] font-extrabold">Add Photo</span>
                  </button>

                  <input
                    type="file"
                    ref={photoInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </div>
              </div>

              {/* 6. Publish Post Main Action Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#006978] hover:bg-[#00525e] text-white font-extrabold text-sm rounded-full transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99] text-center"
              >
                Publish Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EXPLORE MODAL 4B: LOGIN PROMPT OR POST ANONYMOUSLY MODAL */}
      {authPromptModalOpen && (
        <div 
          className="fixed inset-0 z-[10001] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
          onClick={() => setAuthPromptModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[28px] max-w-md w-full p-6 space-y-5 border border-[var(--line)] shadow-2xl relative text-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setAuthPromptModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[var(--muted-ink)] hover:text-[var(--ink)] bg-[var(--paper-deep)] rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 bg-[#006978]/10 text-[#006978] rounded-full flex items-center justify-center text-2xl mx-auto font-bold">
              🔐
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">Sign In or Post Anonymously</h3>
              <p className="text-xs text-[var(--muted-ink)] leading-relaxed font-medium">
                Log in to post with your profile name, or publish your post anonymously. (Daily Limit: 1 post per day)
              </p>
            </div>

            {dailyLimitError && (
              <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs font-bold text-left">
                ⚠️ {dailyLimitError}
              </div>
            )}

            <div className="space-y-3 pt-1">
              <button
                onClick={handlePostLoggedIn}
                className="w-full py-3.5 bg-[#006978] hover:bg-[#00525e] text-white font-bold text-xs rounded-full transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" /> Log In / Sign Up & Post
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--line)]"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-bold"><span className="bg-white px-2 text-[var(--muted-ink)]">or</span></div>
              </div>

              <button
                onClick={handlePostAnonymous}
                className="w-full py-3.5 bg-[var(--paper-deep)] hover:bg-[var(--line)] text-[var(--ink)] font-bold text-xs rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 border border-[var(--line)]"
              >
                👤 Post Anonymously (Anonymous 1)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPLORE MODAL 5: EDIT POST MODAL (For Owner) */}
      {editPostModal && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
          onClick={() => setEditPostModal(null)}
        >
          <div 
            className="bg-white rounded-[28px] max-w-lg w-full p-6 space-y-5 border border-[var(--line)] shadow-2xl relative max-h-[90vh] overflow-y-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditPostModal(null)}
              className="absolute top-4 right-4 p-2 text-[var(--muted-ink)] hover:text-[var(--ink)] bg-[var(--paper-deep)] rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006978] bg-[#E8F6F6] px-3 py-1 rounded-full">
                EDIT POST DETAILS
              </span>
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">
                Edit Your Explore Community Post
              </h3>
            </div>

            <form onSubmit={handleSaveEditPost} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[var(--ink)] mb-1">Location / Area</label>
                <input
                  type="text"
                  required
                  value={editPostModal.location}
                  onChange={(e) => setEditPostModal({ ...editPostModal, location: e.target.value })}
                  className="w-full p-2.5 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--ink)] mb-1">Need Tag</label>
                <select
                  value={editPostModal.needBadge}
                  onChange={(e) => setEditPostModal({ ...editPostModal, needBadge: e.target.value as any })}
                  className="w-full p-2.5 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl font-bold text-[#E65A3C]"
                >
                  <option value="Need Food">🍧 Need Food</option>
                  <option value="Need a Home">🏠 Need a Home</option>
                  <option value="Urgent Care">🩺 Urgent Care</option>
                  <option value="Food Offered">✨ Food Offered</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[var(--ink)] mb-1">Post Description</label>
                <textarea
                  required
                  rows={4}
                  value={editPostModal.description}
                  onChange={(e) => setEditPostModal({ ...editPostModal, description: e.target.value })}
                  className="w-full p-2.5 bg-[var(--paper-deep)] border border-[var(--line)] rounded-xl font-medium"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditPostModal(null)}
                  className="py-3 bg-[var(--paper-deep)] text-[var(--ink)] font-bold text-xs rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-3 bg-[#006978] hover:bg-[#00525e] text-white font-bold text-xs rounded-full shadow-md transition-colors cursor-pointer"
                >
                  Save Changes ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXPLORE MODAL 6: REPORT POST MODAL (For Other Users) */}
      {reportPostModal && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
          onClick={() => setReportPostModal(null)}
        >
          <div 
            className="bg-white rounded-[28px] max-w-md w-full p-6 space-y-5 border border-[var(--line)] shadow-2xl relative cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setReportPostModal(null)}
              className="absolute top-4 right-4 p-2 text-[var(--muted-ink)] hover:text-[var(--ink)] bg-[var(--paper-deep)] rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full">
                REPORT INAPPROPRIATE POST
              </span>
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">
                Report {reportPostModal.authorName}'s Post
              </h3>
              <p className="text-xs text-[var(--muted-ink)]">
                Help us keep PetMama safe and respectful for all animal lovers.
              </p>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="block font-bold text-[var(--ink)]">Select Reason:</label>
                {[
                  'Inappropriate Content or Language',
                  'False or Misleading Information',
                  'Spam or Unrelated Commercial Product',
                  'Scam or Suspicious Donation Request'
                ].map((reason, idx) => (
                  <label key={idx} className="flex items-center gap-2 p-2.5 bg-[var(--paper-deep)] rounded-xl border border-[var(--line)] cursor-pointer hover:bg-white transition-colors">
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      checked={reportReason === reason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="accent-rose-600"
                    />
                    <span className="font-semibold text-[var(--ink)]">{reason}</span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReportPostModal(null)}
                  className="py-3 bg-[var(--paper-deep)] text-[var(--ink)] font-bold text-xs rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-full shadow-md transition-colors cursor-pointer"
                >
                  Submit Report 🚩
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AUTHENTICATION MODAL: SIGN IN / SIGN UP (WITH GOOGLE SIGNUP & EMAIL) */}
      {authModalOpen && (
        <div 
          className="fixed inset-0 z-[10050] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
          onClick={() => setAuthModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 space-y-6 border border-slate-100 shadow-2xl relative animate-slideUp cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Brand Emblem & Welcome Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#006978] text-white flex items-center justify-center text-2xl shadow-md">
                <PawPrint className="w-7 h-7 fill-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[var(--ink)]">
                {authMode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                {authMode === 'signup'
                  ? 'Join PetMama to connect with verified pet parents, save posts, and access personalized pet care.'
                  : 'Log in to manage your registered pets, view orders, and connect with pet lovers.'}
              </p>
            </div>

            {/* Switch Mode Tab Pill [ Sign Up ] | [ Sign In ] */}
            <div className="bg-[#F1F5F9] p-1 rounded-full flex items-center border border-slate-200">
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                className={`flex-1 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer text-center ${
                  authMode === 'signup'
                    ? 'bg-[#006978] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[var(--ink)]'
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                className={`flex-1 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer text-center ${
                  authMode === 'login'
                    ? 'bg-[#006978] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[var(--ink)]'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Google One-Click Sign In/Up Button (Requested by user) */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-slate-800 font-extrabold text-xs sm:text-sm rounded-full shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{authMode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-slate-200"></div>
              <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
                or with email
              </span>
            </div>

            {/* Error message */}
            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl text-center animate-fadeIn">
                ⚠️ {authError}
              </div>
            )}

            {/* Email / Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4 text-xs">
              {authMode === 'signup' && (
                <div className="space-y-1">
                  <label className="font-bold text-[var(--ink)] block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={authNameInput}
                    onChange={(e) => setAuthNameInput(e.target.value)}
                    placeholder="e.g. Rahim Ahmed"
                    className="w-full p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl font-semibold text-slate-900 focus:outline-none focus:border-[#006978] shadow-2xs"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-[var(--ink)] block">Email Address</label>
                <input
                  type="email"
                  required
                  value={authEmailInput}
                  onChange={(e) => setAuthEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl font-semibold text-slate-900 focus:outline-none focus:border-[#006978] shadow-2xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[var(--ink)] block">Password</label>
                <input
                  type="password"
                  required
                  value={authPasswordInput}
                  onChange={(e) => setAuthPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl font-semibold text-slate-900 focus:outline-none focus:border-[#006978] shadow-2xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#006978] hover:bg-[#00525e] text-white font-extrabold text-sm rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
              >
                {authMode === 'signup' ? 'Create PetMama Account →' : 'Sign In to Account →'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SETTINGS / EDIT PROFILE MODAL */}
      {settingsModalOpen && (
        <div 
          className="fixed inset-0 z-[10050] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
          onClick={() => setSettingsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-7 space-y-5 border border-slate-100 shadow-2xl relative animate-slideUp cursor-default max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSettingsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-[#006978] uppercase tracking-wider bg-[#E0F2F1] px-3 py-1 rounded-full">
                PROFILE SETTINGS
              </span>
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">
                Edit Your Profile
              </h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSettingsModalOpen(false);
                setAuthToast('✓ Profile updated successfully!');
                setTimeout(() => setAuthToast(''), 4000);
              }}
              className="space-y-4 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-[var(--ink)] block">Display Name</label>
                <input
                  type="text"
                  required
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl font-semibold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[var(--ink)] block">Username / Handle</label>
                <input
                  type="text"
                  required
                  value={userProfile.handle}
                  onChange={(e) => setUserProfile({ ...userProfile, handle: e.target.value })}
                  className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl font-semibold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[var(--ink)] block">Location</label>
                <input
                  type="text"
                  required
                  value={userProfile.location}
                  onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}
                  className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl font-semibold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[var(--ink)] block">Bio & Passion</label>
                <textarea
                  rows={3}
                  value={userProfile.bio}
                  onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                  className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl font-medium text-slate-900 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSettingsModalOpen(false)}
                  className="py-3 bg-slate-100 text-slate-700 font-bold rounded-full cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-3 bg-[#006978] hover:bg-[#00525e] text-white font-bold rounded-full shadow-md transition-colors cursor-pointer"
                >
                  Save Changes ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* USER PROFILE MODAL (When clicking any user ID in Explore or Pet Circle) */}
      {selectedUserProfile && (
        <div 
          className="fixed inset-0 z-[10070] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
          onClick={() => setSelectedUserProfile(null)}
        >
          <div 
            className="bg-white rounded-[32px] max-w-xl w-full p-6 sm:p-8 space-y-6 border border-slate-100 shadow-2xl relative animate-slideUp cursor-default max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedUserProfile(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <img src={selectedUserProfile.avatar} alt={selectedUserProfile.name} className="w-20 h-20 rounded-full object-cover ring-3 ring-[#006978]/20 shadow-md" />
              <div>
                <h2 className="text-2xl font-bold font-editorial text-[var(--ink)]">{selectedUserProfile.name}</h2>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#006978]" />
                  <span>{selectedUserProfile.handle} • {selectedUserProfile.location}</span>
                </p>
                <span className="mt-2 inline-block px-3 py-0.5 bg-[#FEF3C7] text-[#92400E] font-extrabold text-[10px] rounded-full border border-[#FDE68A]">
                  Verified Pet Parent
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-200">
              {selectedUserProfile.bio}
            </p>

            {/* Follow & Message Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => setAuthToast(`✓ Now following ${selectedUserProfile.name}!`)}
                className="py-3 bg-[#006978] hover:bg-[#00525e] text-white font-extrabold text-xs rounded-full flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <UserPlus className="w-4 h-4" /> Follow
              </button>
              <button
                onClick={() => setAuthToast(`💬 Chat opened with ${selectedUserProfile.name}`)}
                className="py-3 bg-[#E0F2F1] hover:bg-[#b2dfdb] text-[#006978] font-extrabold text-xs rounded-full flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" /> Message
              </button>
            </div>

            {/* User's Posts Section */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-extrabold text-[var(--ink)] uppercase tracking-wider">
                Posts by {selectedUserProfile.name} ({selectedUserProfile.posts.length})
              </h4>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {selectedUserProfile.posts.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No community posts published yet.</p>
                ) : (
                  selectedUserProfile.posts.map(p => (
                    <div key={p.id} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1.5">
                      <div className="font-bold text-[var(--ink)]">{p.needBadge} · {p.petType}</div>
                      <p className="text-slate-600 line-clamp-2">{p.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PET OWNERSHIP TRANSFER MODAL */}
      {transferPetModalOpen && petToTransfer && (
        <div 
          className="fixed inset-0 z-[10080] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
          onClick={() => setTransferPetModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-7 space-y-5 border border-slate-100 shadow-2xl relative animate-slideUp cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setTransferPetModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-[#006978] uppercase tracking-wider bg-[#E0F2F1] px-3 py-1 rounded-full">
                PET OWNERSHIP TRANSFER
              </span>
              <h3 className="text-2xl font-bold font-editorial text-[var(--ink)]">
                Transfer {petToTransfer.name}'s Ownership
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Enter the username or full name of the new pet parent receiving ownership.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!transferTargetUsername.trim()) return;
                setMyPetsList(prev => prev.filter(p => p.id !== petToTransfer.id));
                setTransferPetModalOpen(false);
                setAuthToast(`✓ Ownership of ${petToTransfer.name} successfully transferred to ${transferTargetUsername}!`);
                setTimeout(() => setAuthToast(''), 4000);
                setTransferTargetUsername('');
                setPetToTransfer(null);
              }}
              className="space-y-4 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-[var(--ink)] block">New Owner / Username</label>
                <input
                  type="text"
                  required
                  value={transferTargetUsername}
                  onChange={(e) => setTransferTargetUsername(e.target.value)}
                  placeholder="e.g. Sarah Jenkins or @sarah_j"
                  className="w-full p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-2xl font-semibold text-slate-900 focus:outline-none focus:border-[#006978]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setTransferPetModalOpen(false)}
                  className="py-3 bg-slate-100 text-slate-700 font-bold rounded-full cursor-pointer hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-3 bg-[#006978] hover:bg-[#00525e] text-white font-bold rounded-full shadow-md cursor-pointer"
                >
                  Confirm Transfer ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING TOAST NOTIFICATION */}
      {authToast && (
        <div className="fixed bottom-6 right-6 z-[10090] bg-[#1C2926] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/40 animate-slideUp text-xs font-bold">
          <span>{authToast}</span>
          <button
            onClick={() => setAuthToast('')}
            className="text-slate-400 hover:text-white p-1 cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
