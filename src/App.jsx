// src/App.jsx
import React, { useState, useContext } from 'react';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import SareesPage from './pages/SareesPage';
import CartDrawer from './components/cart/CartDrawer';
import WishlistModal from './components/cart/WishlistModal';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
// Removed redundant main.css import (already in main.jsx)
import Footer from './components/common/Footer';
import GiftCardPage from './pages/GiftCardPage';
import WishlistButton from './components/common/WishlistButton';
import CurrencyDropdown from './components/filters/CurrencyDropdown';
import JewelleryPage from './pages/JewelleryPage';
import MeetTheTeamPage from './pages/MeetTheTeamPage';
import TeamMemberDetailPage from './pages/TeamMemberDetailPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage'; // Import the new component
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

// --- Import Category Pages ---
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

// Removed redundant slick carousel CSS imports (already in main.jsx)

// This component holds the main application logic and uses the AuthContext
function AppContent() {
  const { isLoggedIn, logout } = useContext(AuthContext); // Use AuthContext for login state and logout function

  const [currentPage, setCurrentPage] = useState('home');
  const [viewingMemberId, setViewingMemberId] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [viewingPostId, setViewingPostId] = useState(null); // State for selected blog post ID

  // Function to handle clicking the user icon/login link
  const handleOpenLogin = () => {
    if (isLoggedIn) return;
    if (viewingMemberId) setViewingMemberId(null);
    if (viewingPostId) setViewingPostId(null);
    setCurrentPage('login');
    window.scrollTo(0, 0);
  };

  // Function to handle logout action
  const handleLogout = () => {
    logout();
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  // Filter drawer handlers
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  // Search bar toggle handler
  const toggleSearch = () => {
      setIsSearchOpen(prev => !prev);
      if (!isSearchOpen && isFilterOpen) setIsFilterOpen(false);
      if (!isSearchOpen) window.scrollTo(0, 0);
  };

  // Handler for selecting a collection
   const handleSelectCollection = (collectionName) => {
      setSelectedCollection(collectionName);
      if (collectionName) {
        setCurrentPage('collection');
        window.scrollTo(0, 0);
      }
      handleCloseFilter();
      setViewingMemberId(null);
      setViewingPostId(null);
  };

  // Centralized Navigation Handler
  const handleNavigation = (pageNameOrId) => {
      if (isSearchOpen) setIsSearchOpen(false);
      if (pageNameOrId !== 'collection') setSelectedCollection(null);

      if (isLoggedIn && (pageNameOrId === 'login' || pageNameOrId === 'register')) {
          pageNameOrId = 'home';
      }

       // Reset viewingMemberId logic
       if (viewingMemberId && !pageNameOrId.startsWith('team-member-detail')) {
            setViewingMemberId(null);
       } else if (pageNameOrId === 'meet-the-team' && viewingMemberId) {
            setViewingMemberId(null);
       }

       // Blog Detail Logic
       if (typeof pageNameOrId === 'string' && pageNameOrId.startsWith('blog-detail-')) {
           const postId = parseInt(pageNameOrId.split('-')[2], 10);
           if (!isNaN(postId)) {
               setViewingPostId(postId);
               setCurrentPage('blog-detail');
               setViewingMemberId(null); // Ensure team view is reset
           } else {
               console.warn("Invalid blog post ID:", pageNameOrId);
               setViewingPostId(null);
               setCurrentPage('blog'); // Default back to blog list on error
           }
       } else if (typeof pageNameOrId === 'string') {
           setViewingPostId(null); // Clear blog post ID
           setCurrentPage(pageNameOrId); // Set standard page name
           // Reset team member view if not navigating specifically to it
           if (!pageNameOrId.startsWith('team-member-detail') && pageNameOrId !== 'meet-the-team') {
               setViewingMemberId(null);
           }
       }

      window.scrollTo(0, 0);
  };

  // Function to get title and subtitle for CollectionHeroBanner
  const getCollectionBannerDetails = (collectionName) => {
       // ...(same logic as previous version)...
       if (!collectionName) { return { title: "Collection", subtitle: "" }; }
      const upperCollectionName = collectionName.toUpperCase();
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
      if (collectionDetails[upperCollectionName]) return collectionDetails[upperCollectionName];
      const titlePart = collectionName.split('-')[0].trim();
      return { title: titlePart.charAt(0).toUpperCase() + titlePart.slice(1).toLowerCase(), subtitle: "" };
  };

  // Function to render the current page based on state
  const renderPage = () => {
    // Render Team Member Detail page
     if (viewingMemberId) {
        return <TeamMemberDetailPage memberId={viewingMemberId} onBack={() => handleNavigation('meet-the-team')} />;
    }

    // Render Blog Detail Page
    if (currentPage === 'blog-detail' && viewingPostId) {
        return <BlogDetailPage postId={viewingPostId} setPage={handleNavigation} />;
    }

    // Render generic Collection page
     if (currentPage === 'collection' && selectedCollection) {
        const { title, subtitle } = getCollectionBannerDetails(selectedCollection);
        const subtitleLines = subtitle ? subtitle.split('\n') : [];
        return (
            <>
                <CollectionHeroBanner
                    title={title}
                    subtitle={subtitleLines.map((line, index) => <React.Fragment key={index}>{line}{index < subtitleLines.length - 1 && <br />}</React.Fragment>)}
                 />
                <FilterBar handleOpenFilter={handleOpenFilter} />
                <ProductList collectionName={selectedCollection} />
            </>
        );
    }

    // Route Protection
    const guestAllowedPages = [ /* ...(same pages as previous version)... */
        'home', 'login', 'register', 'shop', 'jewellery', 'collection', 'bestsellers',
        'neckpieces', 'earrings', 'bangles-cuffs', 'rings', 'new-arrivals-jewellery',
        'new-arrivals-sarees', 'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen',
        'sarees-chanderi', 'fall-picot', 'blog', 'blog-detail', // Added blog-detail
        'our-story', 'meet-the-team', 'team-member-detail', // Added team-member-detail
        'all-collections', 'faq', 'shipping-policy', 'refund-policy', 'contact',
        'terms-service', 'terms-conditions', 'privacy-policy', 'disclaimer-policy'
    ];
    if (!isLoggedIn && !guestAllowedPages.includes(currentPage)) {
         return <LoginPage setPage={handleNavigation} />;
    }
    if (isLoggedIn && (currentPage === 'login' || currentPage === 'register')) {
      return <HomePage setPage={handleNavigation} onCollectionItemClick={handleSelectCollection} />;
    }

    // Switch statement for rendering pages
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
      case 'blog': return <BlogPage setPage={handleNavigation} />;
      // 'blog-detail' handled above
      case 'our-story': return <OurStoryPage />;
      case 'bestsellers': return <BestsellersPage />;
      case 'meet-the-team': return <MeetTheTeamPage onSelectMember={(id) => handleNavigation(`team-member-detail-${id}`)} />;
       // 'team-member-detail' handled above
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
      case 'login': return <LoginPage setPage={handleNavigation} />;
      case 'register': return <RegisterPage setPage={handleNavigation} />;
      default: return <SareesPage />;
    }
  };

  // Determine if header should be solid
  const pagesThatMightStartTransparent = [ /* ...(same pages as previous version)... */
       'home', 'shop', 'jewellery', 'collection', 'bestsellers',
       'neckpieces', 'earrings', 'bangles-cuffs', 'rings',
       'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi',
       'new-arrivals-sarees',
       'new-arrivals-jewellery',
       'fall-picot',
       'all-collections'
   ];
   const staticSolidHeaderPages = [ /* ...(same pages as previous version)... */
       'login', 'register', 'our-story', 'faq',
       'shipping-policy', 'refund-policy', 'contact',
       'terms-service', 'terms-conditions', 'privacy-policy', 'disclaimer-policy',
       'meet-the-team', 'team-member-detail', // Team pages solid
       'blog', // Blog list page solid
       'blog-detail' // Blog detail page also solid
   ];
   const isSolidHeaderForced = isSearchOpen ||
                              !!viewingMemberId ||
                              !!viewingPostId ||
                              staticSolidHeaderPages.includes(currentPage) ||
                              !pagesThatMightStartTransparent.includes(currentPage);
   const isHomePage = currentPage === 'home' && !viewingMemberId && !viewingPostId;

  // --- Main Render for AppContent ---
  return (
    <div className={`App ${isSolidHeaderForced ? 'page-with-solid-header' : ''} ${isHomePage ? 'homepage-active' : ''} ${isSearchOpen ? 'search-open' : ''}`}>
      <Header
        setPage={handleNavigation}
        currentPage={currentPage}
        resetTeamView={() => setViewingMemberId(null)}
        handleSelectCollection={handleSelectCollection}
        viewingMemberId={viewingMemberId}
        isSearchOpen={isSearchOpen}
        toggleSearch={toggleSearch}
        handleLogout={handleLogout}
      />
      <SearchBar
            isSearchOpen={isSearchOpen}
            handleCloseSearch={toggleSearch}
            handleNavClick={(e, pageName) => {
                e.preventDefault();
                handleNavigation(pageName);
            }}
        />
      <main>{renderPage()}</main>

      {/* Global Components */}
      <CartDrawer />
      <WishlistModal handleNavClick={handleNavigation} />
      <CurrencyDropdown />
      <WishlistButton />
      <Footer setPage={handleNavigation} toggleSearch={toggleSearch} />
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
    </div>
  );
}

// The Root App component wraps everything in context providers
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CurrencyProvider>
          <WishlistProvider>
             <AppContent />
          </WishlistProvider>
        </CurrencyProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

