// src/App.jsx
import React, { useState, useContext, useEffect } from 'react'; // Added useEffect
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import SareesPage from './pages/SareesPage';
import CartDrawer from './components/cart/CartDrawer';
import WishlistModal from './components/cart/WishlistModal';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Footer from './components/common/Footer';
import GiftCardPage from './pages/GiftCardPage';
import WishlistButton from './components/common/WishlistButton';
import CurrencyDropdown from './components/filters/CurrencyDropdown';
import JewelleryPage from './pages/JewelleryPage';
import MeetTheTeamPage from './pages/MeetTheTeamPage';
import TeamMemberDetailPage from './pages/TeamMemberDetailPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
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
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage'; // Import the new page
import { allProducts } from './utils/searchUtils'; // Ensure this is imported

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

function AppContent() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState('home');
  const [viewingMemberId, setViewingMemberId] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [viewingPostId, setViewingPostId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null); // NEW state for product detail view

  // Add useEffect to manage body class based on checkout/product detail page
  useEffect(() => {
    if (currentPage === 'checkout' || currentPage === 'product-detail') {
      document.body.classList.add(`${currentPage}-active`);
    } else {
      document.body.classList.remove('checkout-active');
      document.body.classList.remove('product-detail-active');
    }
    // Cleanup function
    return () => {
      document.body.classList.remove('checkout-active');
      document.body.classList.remove('product-detail-active');
    };
  }, [currentPage]); // Re-run when currentPage changes


  const handleOpenLogin = () => {
    if (isLoggedIn) return;
    if (viewingMemberId) setViewingMemberId(null);
    if (viewingPostId) setViewingPostId(null);
    setSelectedProductId(null); // Clear product view on login navigation
    setCurrentPage('login');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  const toggleSearch = () => {
      setIsSearchOpen(prev => !prev);
      if (!isSearchOpen && isFilterOpen) setIsFilterOpen(false);
      if (!isSearchOpen) window.scrollTo(0, 0);
  };

   const handleSelectCollection = (collectionName) => {
      setSelectedCollection(collectionName);
      setSelectedProductId(null); // Clear product view
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
      // Clear specific views unless navigating to them
      if (!pageNameOrId.startsWith('product-detail-')) setSelectedProductId(null);
      if (!pageNameOrId.startsWith('team-member-detail-')) setViewingMemberId(null);
      if (!pageNameOrId.startsWith('blog-detail-')) setViewingPostId(null);


      if (isLoggedIn && (pageNameOrId === 'login' || pageNameOrId === 'register')) {
          pageNameOrId = 'home';
      }

       // --- NEW: Product Detail Logic ---
       if (typeof pageNameOrId === 'string' && pageNameOrId.startsWith('product-detail-')) {
            const prodId = pageNameOrId.split('-')[2];
            const productExists = allProducts.some(p => p && String(p.id) === String(prodId));
            if (prodId && productExists) {
                setSelectedProductId(prodId);
                setCurrentPage('product-detail');
                // Ensure other views are reset
                setViewingMemberId(null);
                setViewingPostId(null);
                setSelectedCollection(null);
            } else {
                console.warn("Invalid product ID:", pageNameOrId);
                setCurrentPage('shop'); // Fallback
            }
       }
       // Team Member Logic
       else if (typeof pageNameOrId === 'string' && pageNameOrId.startsWith('team-member-detail-')) {
            const memberId = pageNameOrId.split('-')[3]; // Assuming format 'team-member-detail-<id>'
             // Basic check if memberId exists (can improve with actual data check)
            if (memberId) {
                setViewingMemberId(memberId);
                setCurrentPage('team-member-detail'); // Set a generic page key if needed, or rely on viewingMemberId
                // Ensure other views are reset
                setSelectedProductId(null);
                setViewingPostId(null);
                setSelectedCollection(null);
            } else {
                 console.warn("Invalid team member ID:", pageNameOrId);
                 setCurrentPage('meet-the-team'); // Fallback
            }
       }
       // Blog Detail Logic
       else if (typeof pageNameOrId === 'string' && pageNameOrId.startsWith('blog-detail-')) {
           const postId = parseInt(pageNameOrId.split('-')[2], 10);
           if (!isNaN(postId)) {
               setViewingPostId(postId);
               setCurrentPage('blog-detail');
                // Ensure other views are reset
               setSelectedProductId(null);
               setViewingMemberId(null);
               setSelectedCollection(null);
           } else {
               console.warn("Invalid blog post ID:", pageNameOrId);
               setCurrentPage('blog'); // Fallback
           }
       }
       // Standard Page Navigation
       else if (typeof pageNameOrId === 'string') {
           setCurrentPage(pageNameOrId);
           // Clear specific views if navigating to a standard page
           setSelectedProductId(null);
           setViewingMemberId(null);
           setViewingPostId(null);
            if (pageNameOrId !== 'collection') setSelectedCollection(null);
       }

      window.scrollTo(0, 0);
  };


  const getCollectionBannerDetails = (collectionName) => {
       if (!collectionName) { return { title: "Collection", subtitle: "" }; }
      const upperCollectionName = collectionName.toUpperCase();
      // --- (Keep your existing collectionDetails object here) ---
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

  const renderPage = () => {
    // Render specific detail pages first
     if (currentPage === 'product-detail' && selectedProductId) {
        return <ProductDetailPage productId={selectedProductId} setPage={handleNavigation} />;
    }
     if (currentPage === 'team-member-detail' && viewingMemberId) { // Rely on viewingMemberId to render
        return <TeamMemberDetailPage memberId={viewingMemberId} onBack={() => handleNavigation('meet-the-team')} />;
    }
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
                 {/* Pass setPage down to ProductList */}
                <ProductList collectionName={selectedCollection} setPage={handleNavigation} />
            </>
        );
    }

    // Route Protection
    const guestAllowedPages = [
        'home', 'login', 'register', 'shop', 'jewellery', 'collection', 'bestsellers',
        'neckpieces', 'earrings', 'bangles-cuffs', 'rings', 'new-arrivals-jewellery',
        'new-arrivals-sarees', 'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen',
        'sarees-chanderi', 'fall-picot', 'blog', 'blog-detail',
        'our-story', 'meet-the-team', 'team-member-detail',
        'all-collections', 'faq', 'shipping-policy', 'refund-policy', 'contact',
        'terms-service', 'terms-conditions', 'privacy-policy', 'disclaimer-policy',
        'checkout', 'product-detail' // <-- ADDED product-detail
    ];
    if (!isLoggedIn && !guestAllowedPages.includes(currentPage)) {
         return <LoginPage setPage={handleNavigation} />;
    }
    if (isLoggedIn && (currentPage === 'login' || currentPage === 'register')) {
      return <HomePage setPage={handleNavigation} onCollectionItemClick={handleSelectCollection} />;
    }

    // Switch statement for standard pages
    // Pass setPage prop to pages containing ProductList or needing navigation
    switch (currentPage) {
        case 'home': return <HomePage setPage={handleNavigation} onCollectionItemClick={handleSelectCollection} />;
        case 'gift-card': return <GiftCardPage />;
        case 'jewellery': return <JewelleryPage setPage={handleNavigation} />;
        case 'new-arrivals-jewellery': return <NewArrivalsJewelleryPage setPage={handleNavigation} />;
        case 'neckpieces': return <NeckpiecesPage setPage={handleNavigation} />;
        case 'earrings': return <EarringsPage setPage={handleNavigation} />;
        case 'bangles-cuffs': return <BanglesCuffsPage setPage={handleNavigation} />;
        case 'rings': return <RingsPage setPage={handleNavigation} />;
        case 'new-arrivals-sarees': return <NewArrivalsSareesPage setPage={handleNavigation} />;
        case 'sarees-cotton': return <CottonSareesPage setPage={handleNavigation} />;
        case 'sarees-silk-tussar': return <SilkTussarSareesPage setPage={handleNavigation} />;
        case 'sarees-linen': return <LinenSareesPage setPage={handleNavigation} />;
        case 'sarees-chanderi': return <ChanderiSareesPage setPage={handleNavigation} />;
        case 'fall-picot': return <FallPicotPage setPage={handleNavigation} />;
        case 'blog': return <BlogPage setPage={handleNavigation} />;
        case 'our-story': return <OurStoryPage />;
        case 'bestsellers': return <BestsellersPage setPage={handleNavigation} />;
        case 'meet-the-team': return <MeetTheTeamPage onSelectMember={(id) => handleNavigation(`team-member-detail-${id}`)} />;
        case 'all-collections': return <AllCollectionsPage setPage={handleNavigation} onCollectionItemClick={handleSelectCollection} />;
        case 'faq': return <FaqPage />;
        case 'shipping-policy': return <ShippingPolicyPage />;
        case 'refund-policy': return <RefundPolicyPage />;
        case 'contact': return <ContactPage />;
        case 'terms-service': return <TermsServicePage />;
        case 'terms-conditions': return <TermsConditionsPage />;
        case 'privacy-policy': return <PrivacyPolicyPage />;
        case 'disclaimer-policy': return <DisclaimerPolicyPage />;
        case 'shop': return <SareesPage setPage={handleNavigation} />;
        case 'login': return <LoginPage setPage={handleNavigation} />;
        case 'register': return <RegisterPage setPage={handleNavigation} />;
        case 'checkout': return <CheckoutPage setPage={handleNavigation} />;
        // Detail pages are handled above the switch
        default: return <SareesPage setPage={handleNavigation} />;
    }
  };

  // Determine header/footer visibility and style
   const pagesThatMightStartTransparent = [ /* ... keep as is ... */
       'home', 'shop', 'jewellery', 'collection', 'bestsellers',
       'neckpieces', 'earrings', 'bangles-cuffs', 'rings',
       'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi',
       'new-arrivals-sarees',
       'new-arrivals-jewellery',
       'fall-picot',
       'all-collections'
   ];
   const staticSolidHeaderPages = [ /* ... keep as is ... */
       'login', 'register', 'our-story', 'faq',
       'shipping-policy', 'refund-policy', 'contact',
       'terms-service', 'terms-conditions', 'privacy-policy', 'disclaimer-policy',
       'meet-the-team', 'team-member-detail',
       'blog',
       'blog-detail',
       'checkout', 'product-detail' // Added product-detail
   ];
   const isSolidHeaderForced = isSearchOpen ||
                              !!viewingMemberId ||
                              !!viewingPostId ||
                              !!selectedProductId || // Added product ID check
                              staticSolidHeaderPages.includes(currentPage) ||
                              !pagesThatMightStartTransparent.includes(currentPage);
   const isHomePage = currentPage === 'home' && !viewingMemberId && !viewingPostId && !selectedProductId;

   // Hide header/footer on checkout and product detail
   const hideHeader = currentPage === 'checkout'; // Only hide header on checkout for now
   const hideFooter = currentPage === 'checkout';

  return (
    <div className={`App ${isSolidHeaderForced || hideHeader ? 'page-with-solid-header' : ''} ${isHomePage ? 'homepage-active' : ''} ${isSearchOpen ? 'search-open' : ''}`}>
      {!hideHeader && (
          <Header
            setPage={handleNavigation}
            currentPage={currentPage}
            resetTeamView={() => setViewingMemberId(null)}
            handleSelectCollection={handleSelectCollection}
            viewingMemberId={viewingMemberId} // Pass viewingMemberId
            isSearchOpen={isSearchOpen}
            toggleSearch={toggleSearch}
            handleLogout={handleLogout}
          />
      )}
      {!hideHeader && (
        <SearchBar
            isSearchOpen={isSearchOpen}
            handleCloseSearch={toggleSearch}
            handleNavClick={(e, pageName) => {
                e.preventDefault();
                handleNavigation(pageName);
            }}
        />
       )}
      <main>{renderPage()}</main>

      {/* Global Components */}
      <CartDrawer setPage={handleNavigation} />
      {/* Pass handleNavigation to WishlistProvider */}
      <WishlistModal handleNavClick={handleNavigation} />
      <CurrencyDropdown />
      <WishlistButton />
      {!hideFooter && (
        <Footer setPage={handleNavigation} toggleSearch={toggleSearch} />
      )}
      <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
    </div>
  );
}

// Update WishlistProvider wrapper to pass handleNavClick
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CurrencyProvider>
           {/* Wrap AppContent to potentially pass handleNavigation */}
           {/* Note: Direct prop passing is better than context for this */}
          <WishlistProvider>
             <AppContent />
          </WishlistProvider>
        </CurrencyProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;