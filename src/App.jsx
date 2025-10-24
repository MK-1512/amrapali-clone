// src/App.jsx
import React, { useState, useContext } from 'react'; // Import useContext
// Corrected import paths based on standard src structure
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import SareesPage from './pages/SareesPage';
import CartDrawer from './components/cart/CartDrawer';
import WishlistModal from './components/cart/WishlistModal';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider, AuthContext } from './context/AuthContext'; // Import AuthProvider and AuthContext
import './assets/css/main.css'; // Import main CSS
import Footer from './components/common/Footer';
import GiftCardPage from './pages/GiftCardPage';
import WishlistButton from './components/common/WishlistButton';
import CurrencyDropdown from './components/filters/CurrencyDropdown';
import JewelleryPage from './pages/JewelleryPage';
import MeetTheTeamPage from './pages/MeetTheTeamPage';
import TeamMemberDetailPage from './pages/TeamMemberDetailPage';
import BlogPage from './pages/BlogPage';
import BestsellersPage from './pages/BestsellersPage';
import LoginPage from './pages/LoginPage';
import ProductList from './components/product/ProductList';
import CollectionHeroBanner from './components/common/CollectionHeroBanner';
import FilterBar from './components/filters/FilterBar';
import FilterDrawer from './components/filters/FilterDrawer';
import RegisterPage from './pages/RegisterPage';
import SearchBar from './components/common/SearchBar';
import OurStoryPage from './pages/OurStoryPage';
import AllCollectionsPage from './pages/AllCollectionsPage';

// --- Import Category Pages (Corrected Paths assuming they are in src/pages/) ---
import NeckpiecesPage from './pages/jewellery/NeckpiecesPage';
import EarringsPage from './pages/jewellery/EarringsPage';
import BanglesCuffsPage from './pages/jewellery/BanglesCuffsPage';
import RingsPage from './pages/jewellery/RingsPage';
import NewArrivalsJewelleryPage from './pages/NewArrivalsJewelleryPage';
import CottonSareesPage from './pages/sarees/CottonSareesPage';
import SilkTussarSareesPage from './pages/sarees/SilkTussarSareesPage';
import LinenSareesPage from './pages/sarees/LinenSareesPage';
import ChanderiSareesPage from './pages/sarees/ChanderiSareesPage';
import NewArrivalsSareesPage from './pages/NewArrivalsSareesPage';
import FallPicotPage from './pages/FallPicotPage';
import FaqPage from './pages/FaqPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import ContactPage from './pages/ContactPage';
import TermsServicePage from './pages/TermsServicePage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DisclaimerPolicyPage from './pages/DisclaimerPolicyPage';

// Import slick carousel CSS (Keep paths as they target node_modules)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// This component holds the main application logic and uses the AuthContext
function AppContent() {
  const { isLoggedIn, logout } = useContext(AuthContext); // Use AuthContext for login state and logout function

  const [currentPage, setCurrentPage] = useState('home');
  const [viewingMemberId, setViewingMemberId] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Function to handle clicking the user icon/login link
  const handleOpenLogin = () => {
    if (isLoggedIn) return; // Don't navigate to login if already logged in
    if (viewingMemberId) setViewingMemberId(null); // Reset team view if active
    setCurrentPage('login');
    window.scrollTo(0, 0); // Scroll to top
  };

  // Function to handle logout action
  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    setCurrentPage('home'); // Redirect to home after logout
    window.scrollTo(0, 0); // Scroll to top
  };

  // Filter drawer handlers
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  // Search bar toggle handler
  const toggleSearch = () => {
      setIsSearchOpen(prev => !prev);
      if (!isSearchOpen && isFilterOpen) setIsFilterOpen(false); // Close filter if search opens
      if (!isSearchOpen) window.scrollTo(0, 0); // Scroll to top when opening search
  };

  // Handler for selecting a collection (from dropdowns or cards)
   const handleSelectCollection = (collectionName) => {
      setSelectedCollection(collectionName);
      if (collectionName) {
        setCurrentPage('collection'); // Navigate to the generic collection page
        window.scrollTo(0, 0); // Scroll to top
      }
      handleCloseFilter(); // Close filter drawer if it was open
  };


  // Centralized Navigation Handler
  const handleNavigation = (pageName) => {
      if (isSearchOpen) setIsSearchOpen(false); // Close search bar on any navigation
      if (pageName !== 'collection') setSelectedCollection(null); // Clear collection unless navigating to it

      // Prevent navigating to login/register if already logged in
      if (isLoggedIn && (pageName === 'login' || pageName === 'register')) {
          pageName = 'home'; // Redirect to home
      }

      // Reset viewingMemberId logic for back button functionality
      if (viewingMemberId && pageName !== 'meet-the-team') {
           setViewingMemberId(null);
      } else if (pageName === 'meet-the-team' && viewingMemberId) {
           setViewingMemberId(null);
      }

      setCurrentPage(pageName); // Set the new page
      window.scrollTo(0, 0); // Scroll to top
  };


  // Function to get title and subtitle for CollectionHeroBanner based on collection name
  const getCollectionBannerDetails = (collectionName) => {
       if (!collectionName) { return { title: "Collection", subtitle: "" }; }
      const upperCollectionName = collectionName.toUpperCase();

      // Define details for each collection
      const collectionDetails = {
          "POTPOURRI": { title: "POTPOURRI", subtitle: "A mix of beautiful sarees." },
          "COTTON SAREES": { title: "COTTON SAREES", subtitle: "Comfortable and stylish cotton sarees." },
          "SILK & TUSSAR SAREES": { title: "SILK & TUSSAR SAREES", subtitle: "Elegant Silk and Tussar sarees." },
          "LINEN SAREES": { title: "LINEN SAREES", subtitle: "Breathable and beautiful Linen sarees." },
          "CHANDERI SAREES": { title: "CHANDERI SAREES", subtitle: "Light and luxurious Chanderi sarees." },
          "FALL AND PICOT": { title: "FALL AND PICOT", subtitle: "Make your saree shopping experience more hassle-free..." },
          "SOULFUL WEAVES - COTTON SAREES (NEW)": { title: "SOULFUL WEAVES", subtitle: "A celebration of soft textures, timeless weaves and understated elegance." },
          "IKTARA - JAMDANI WEAVES": { title: "IKTARA - JAMDANI STORIES", subtitle: "A timeless weave of tradition and craftsmanship, the process of jamdani weaving is considered one of the most advanced hand-weaving techniques in the world. Woven by artisans of Bengal in the softest cotton, these textiles make for handmade luxury at its best." },
          "RAANJHANA - BENARASI WEAVES": { title: "RAANJHANA - BANARASI WEAVES", subtitle: "Presenting 'Raanjhana', an exquisite edit of Banaras weaves, made of stories wrapped in silk, colors dipped in richness and designs woven from blooms all around us." },
          "MASAKALI - CHANDERI WEAVES": { title: "MASAKALI", subtitle: "Lightweight and handwoven, the understated glamour of these six yards exude a remarkable aura around its wearer. Coming straight from the looms of Chanderi, here's our curation of this fascinating small town, that boasts of its legendary weave :)" },
          "POPSICLE - EVERYDAY COTTONS": { title: "POPSICLE", subtitle: "Easy breezy soft cottons in bright vibrant hues" },
          "DOODHE-AALTA - RED-BORDERED WHITE SAREES": { title: "DOODHE-AALTA", subtitle: "The iconic 'Laal Paadh Shada Saree' or the Red-bordered White Saree synonymous with the culture and tradition of West Bengal, celebrates femininity in all its glory. \n Take your pick from our specially curated collection of the quintessential doodhe-alta sarees and immerse yourself in the mélange of scarlet and snow." },
          "STORIES FROM HOME - COTTON SAREES": { title: "STORIES FROM HOME", subtitle: "Looking closely, there are so many memories and feelings that lurk in every corner of our homes that often smell of nostalgia and longing.\nThey often say, home is a feeling and we think quite rightly so, because every time we hear home, we think of stories of love and belonging, of remembrance and nostalgia and of memories and experiences that shaped us into who we are today :)\nOn the occasion of our 6th anniversary, presenting to you, 'Stories from Home' in 8 beautiful shades, that resembles the softness of our grandmothers' laps and warmth of the morning sun." },
          "ROOPKATHA - BALUCHARI AND SWARNACHARI": { title: "ROOPKATHA", subtitle: "Live your moment of fairytale, by embracing an ancient heritage craft, that weaves tales of mythology and history, on silk, synonymous with royal opulence and grandeur -\nBalucharis and Swarnacharis." },
          "CANDYFLOSS - COTTON SAREES": { title: "CANDYFLOSS", subtitle: "Presenting an assortment of soft, extremely airy, easy-breezy, effortless, handloom pure cotton drapes, with cute braided tassles in beautiful hues, to elevate your mood and spirit." },
          "NOOR - ORGANZA BENARASI": { title: "NOOR - A TALE OF ORGANZA", subtitle: "Echoing voices of the looms that lingered in the narrow lanes and ghats of Benaras, this exquisite edition of ultra-fine, dreamy, ethereal organza drapes is a special one.\nThe kadhua weave banarasi borders add a touch of royal opulence to the otherwise minimal, flowy silhouette, making it a timeless closet treasure :)" },
          "SUNKISSED - MINIMALIST JEWELLERY": { title: "SUNKISSED", subtitle: "Modern and Minimalist | Fuss-free and understated Pieces that will tag along with you everyday and collect stories; as you do.\nPieces that are rather complementary, just like yin and yang.\nPieces that add a little sunshine to your life :)" },
          "A MIDAS TOUCH - TUSSAR SILK": { title: "A MIDAS TOUCH", subtitle: "" },
          "GOLDEN HOUR - ECLECTIC JEWELLERY": { title: "GOLDEN HOUR", subtitle: "Presenting an eclectic edit of versatile and modern, handcrafted contemporary pieces, that perfectly marries femininity and edge.\nEach of these exquisite beauty is a work of art, created by independent artisans in Jaipur and it was quite an interesting journey to source, curate and build this collection. It's yours now :)" },
          "EK SITARA - KOTA SAREES": { title: "EK SITARA", subtitle: "An air of subtle sophistication, lightweight yet luxurious, a blend of cotton and silk with real gold in the zari, straight from the master weavers of Kaithoon, Kota." },
          "SMART STAPLES - A WORKWEAR EDIT": { title: "SMART STAPLES - A WORKWEAR EDIT", subtitle: "Functional | Minimalistic | Contemporary\nPresenting a workwear collective comprising simple, clean-lined, versatile drapes that will go a long way in making a striking impression at work and beyond." },
      };

      if (collectionDetails[upperCollectionName]) {
          return collectionDetails[upperCollectionName];
      }

      // Fallback title generation if no match found
      const titlePart = collectionName.split('-')[0].trim();
      return { title: titlePart.charAt(0).toUpperCase() + titlePart.slice(1).toLowerCase(), subtitle: "" };
  };


  // Function to render the current page based on state
  const renderPage = () => {
    // Render Team Member Detail page if an ID is set
     if (viewingMemberId) {
        return <TeamMemberDetailPage memberId={viewingMemberId} onBack={() => handleNavigation('meet-the-team')} />;
    }

    // Render generic Collection page if a collection is selected
     if (currentPage === 'collection' && selectedCollection) {
        const { title, subtitle } = getCollectionBannerDetails(selectedCollection);
        // Split subtitle by newline for rendering <br> tags
        const subtitleLines = subtitle ? subtitle.split('\n') : [];
        return (
            <>
                <CollectionHeroBanner
                    title={title}
                    // Map lines to React fragments with <br> tags
                    subtitle={subtitleLines.map((line, index) => <React.Fragment key={index}>{line}{index < subtitleLines.length - 1 && <br />}</React.Fragment>)}
                 />
                <FilterBar handleOpenFilter={handleOpenFilter} />
                {/* Pass the collection name to ProductList */}
                <ProductList collectionName={selectedCollection} />
            </>
        );
    }

    // --- Route Protection ---
    // Define pages accessible to guests
    const guestAllowedPages = [
        'home', 'login', 'register', 'shop', 'jewellery', 'collection', 'bestsellers',
        'neckpieces', 'earrings', 'bangles-cuffs', 'rings', 'new-arrivals-jewellery',
        'new-arrivals-sarees', 'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen',
        'sarees-chanderi', 'fall-picot', 'blog', 'our-story', 'meet-the-team',
        'all-collections', 'faq', 'shipping-policy', 'refund-policy', 'contact',
        'terms-service', 'terms-conditions', 'privacy-policy', 'disclaimer-policy'
        // Add viewingMemberId check here if team member detail page is public
    ];
     // Add team detail page to allowed guest pages if a member is being viewed
     if (viewingMemberId) guestAllowedPages.push('team-member-detail');


    // Check if the current page requires login
    if (!isLoggedIn && !guestAllowedPages.includes(currentPage) && !viewingMemberId) {
        // Redirect non-logged-in users trying to access protected areas to the login page
         return <LoginPage setPage={handleNavigation} />;
    }

    // If user IS logged in and tries to access login or register...
    if (isLoggedIn && (currentPage === 'login' || currentPage === 'register')) {
      // Redirect to home page
      return <HomePage setPage={handleNavigation} onCollectionItemClick={handleSelectCollection} />;
    }
    // --- End Route Protection ---


    // Switch statement for rendering pages based on currentPage state
    switch (currentPage) {
      case 'home': return <HomePage setPage={handleNavigation} onCollectionItemClick={handleSelectCollection} />;
      case 'gift-card': return <GiftCardPage />;
      case 'jewellery': return <JewelleryPage />;
      case 'new-arrivals-jewellery': return <NewArrivalsJewelleryPage />;
      case 'neckpieces': return <NeckpiecesPage />;
      case 'earrings': return <EarringsPage />;
      case 'bangles-cuffs': return <BanglesCuffsPage />;
      case 'rings': return <RingsPage />;
      case 'new-arrivals-sarees': return <NewArrivalsSareesPage />;
      case 'sarees-cotton': return <CottonSareesPage />;
      case 'sarees-silk-tussar': return <SilkTussarSareesPage />;
      case 'sarees-linen': return <LinenSareesPage />;
      case 'sarees-chanderi': return <ChanderiSareesPage />;
      case 'fall-picot': return <FallPicotPage />;
      case 'blog': return <BlogPage />;
      case 'our-story': return <OurStoryPage />;
      case 'bestsellers': return <BestsellersPage />;
      case 'meet-the-team': return <MeetTheTeamPage onSelectMember={setViewingMemberId} />;
      case 'all-collections': return <AllCollectionsPage setPage={handleNavigation} onCollectionItemClick={handleSelectCollection} />;
      case 'faq': return <FaqPage />;
      case 'shipping-policy': return <ShippingPolicyPage />;
      case 'refund-policy': return <RefundPolicyPage />;
      case 'contact': return <ContactPage />;
      case 'terms-service': return <TermsServicePage />;
      case 'terms-conditions': return <TermsConditionsPage />;
      case 'privacy-policy': return <PrivacyPolicyPage />;
      case 'disclaimer-policy': return <DisclaimerPolicyPage />;
      case 'shop': return <SareesPage />;
      case 'login': return <LoginPage setPage={handleNavigation} />; // Login page component
      case 'register': return <RegisterPage setPage={handleNavigation} />; // Register page component
      default: return <SareesPage />; // Default to Sarees page
    }
  };

  // Determine if header should be solid based on current page, search state, etc.
  const pagesThatMightStartTransparent = [
       'home', 'shop', 'jewellery', 'collection', 'bestsellers',
       'neckpieces', 'earrings', 'bangles-cuffs', 'rings',
       'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi',
       'new-arrivals-sarees',
       'new-arrivals-jewellery',
       'fall-picot',
       'all-collections'
   ];

   const staticSolidHeaderPages = [
       'login', 'register', 'our-story', 'faq',
       'shipping-policy', 'refund-policy', 'contact',
       'terms-service', 'terms-conditions', 'privacy-policy', 'disclaimer-policy',
       'meet-the-team' // Example: Team page might look better with solid header
   ];

   // Header is forced solid if search is open, viewing a team member, on a static solid page,
   // or if the current page isn't one that can start transparent.
   const isSolidHeaderForced = isSearchOpen || !!viewingMemberId || staticSolidHeaderPages.includes(currentPage) || !pagesThatMightStartTransparent.includes(currentPage);
   const isHomePage = currentPage === 'home'; // Specific flag for homepage styles

  // --- Main Render for AppContent ---
  return (
    // Apply dynamic classes to the main App div for styling based on state
    <div className={`App ${isSolidHeaderForced ? 'page-with-solid-header' : ''} ${isHomePage ? 'homepage-active' : ''} ${isSearchOpen ? 'search-open' : ''}`}>
      <Header
        setPage={handleNavigation} // Pass navigation function
        currentPage={currentPage} // Pass current page state
        resetTeamView={() => setViewingMemberId(null)} // Function to reset team view
        handleSelectCollection={handleSelectCollection} // Pass collection selection handler
        viewingMemberId={viewingMemberId} // Pass team member ID state
        isSearchOpen={isSearchOpen} // Pass search open state
        toggleSearch={toggleSearch} // Pass search toggle function
        handleLogout={handleLogout} // Pass logout handler
      />
      {/* Search Bar Component */}
        <SearchBar
            isSearchOpen={isSearchOpen}
            handleCloseSearch={toggleSearch} // Use toggleSearch to close
            // Pass navigation handler for "View All" links
            handleNavClick={(e, pageName) => {
                e.preventDefault();
                handleNavigation(pageName);
            }}
        />
      {/* Render the current page */}
      <main>{renderPage()}</main>

      {/* Global Components */}
      <CartDrawer />
      {/* Pass handleNavigation to WishlistModal - it will be passed down via WishlistProvider */}
      <WishlistModal handleNavClick={handleNavigation} />
      <CurrencyDropdown />
      <WishlistButton />
      <Footer setPage={handleNavigation} toggleSearch={toggleSearch} /> {/* Pass nav and search handlers */}
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} /> {/* Filter drawer */}
    </div>
  );
}

// The Root App component wraps everything in context providers
function App() {
  return (
    // Wrap with AuthProvider first
    <AuthProvider>
      <CartProvider>
        <CurrencyProvider>
          {/* WishlistProvider needs access to AuthContext, place inside AuthProvider */}
          {/* It needs handleNavClick, which is managed in AppContent */}
          {/* We wrap AppContent in WishlistProvider to give it access */}
          <WishlistProvider>
             <AppContent />
          </WishlistProvider>
        </CurrencyProvider>
      </CartProvider>
    </AuthProvider>
  );
}


export default App;

