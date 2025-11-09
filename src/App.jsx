// src/App.jsx
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // <-- ADDED ROUTER HOOKS
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import SareesPage from './pages/SareesPage';
import CartDrawer from './components/cart/CartDrawer';
import WishlistModal from './components/cart/WishlistModal';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import RecentlyViewed from './components/product/RecentlyViewed';
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
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { allProducts, searchAll } from './utils/searchUtils'; // Import searchAll
import ScrollToTop from './components/common/ScrollToTop';

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
import FallPicotDetailPage from './pages/FallPicotDetailPage';
import FaqPage from './pages/FaqPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import ContactPage from './pages/ContactPage';
import TermsServicePage from './pages/TermsServicePage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DisclaimerPolicyPage from './pages/DisclaimerPolicyPage';
import { Container } from 'react-bootstrap'; // Import Container for search results title

// --- NEW IMPORTS for Account/Address ---
import AccountPage from './pages/AccountPage';
import AddressesPage from './pages/AddressesPage';
// --- END NEW IMPORTS ---


// This component now contains all your app's logic
function MainAppLogic() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // <-- Get navigation function
  const location = useLocation(); // <-- Get current URL location

  // All your existing state remains the same
  const [currentPage, setCurrentPage] = useState('home');
  const [viewingMemberId, setViewingMemberId] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [viewingPostId, setViewingPostId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ color: null, price: null, style: null });
  const [sortOrder, setSortOrder] = useState('manual');

  // This existing useEffect for body class is fine
  useEffect(() => {
    if (currentPage === 'checkout' || currentPage === 'product-detail' || currentPage === 'service-detail') {
      document.body.classList.add(`${currentPage}-active`);
    } else {
      document.body.classList.remove('checkout-active');
      document.body.classList.remove('product-detail-active');
      document.body.classList.remove('service-detail-active');
    }
    return () => {
      document.body.classList.remove('checkout-active');
      document.body.classList.remove('product-detail-active');
      document.body.classList.remove('service-detail-active');
    };
  }, [currentPage]);


  // --- NEW: useEffect to sync URL to State (Fixes Reload) ---
  useEffect(() => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);

    // Helper to consolidate state setting and auth checks
    const setPageState = (page, id = null, type = null) => {
      
      // Auth Redirect Logic
      const guestAllowedPages = [
          'home', 'login', 'register', 'shop', 'jewellery', 'collection', 'bestsellers',
          'neckpieces', 'earrings', 'bangles-cuffs', 'rings', 'new-arrivals-jewellery',
          'new-arrivals-sarees', 'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen',
          'sarees-chanderi', 'fall-picot', 'blog', 'blog-detail',
          'our-story', 'meet-the-team', 'team-member-detail',
          'all-collections', 'faq', 'shipping-policy', 'refund-policy', 'contact',
          'terms-service', 'terms-conditions', 'privacy-policy', 'disclaimer-policy',
          'checkout', 'product-detail', 'service-detail', 'search-results', 'all-products',
          'gift-card'
      ];

      // Redirect logged-in users from login/register
      if (isLoggedIn && (page === 'login' || page === 'register')) {
          console.log("Redirect check: Logged-in user on auth page. Redirecting to home.");
          navigate('/'); // Use navigate to redirect
          return; // Stop this state update, as a new one will trigger
      }

      // Redirect guests from protected pages
      if (!isLoggedIn && !guestAllowedPages.includes(page)) {
          console.log("Redirect check: Guest on protected page. Redirecting to login.");
          navigate('/login'); // Use navigate to redirect
          return; // Stop this state update, as a new one will trigger
      }

      // If no redirect, set the state based on the URL
      setCurrentPage(page);
      setSelectedProductId(type === 'product' ? id : null);
      setSelectedServiceId(type === 'service' ? id : null);
      setViewingMemberId(type === 'team' ? id : null);
      setViewingPostId(type === 'blog' ? id : null);
      setSelectedCollection(type === 'collection' ? id : null);
      setSearchQuery(type === 'search' ? id : '');
    };

    // --- Map URL Paths back to your State ---
    if (path.startsWith('/product/')) {
      const id = path.split('/')[2];
      setPageState('product-detail', id, 'product');
    } else if (path.startsWith('/service/')) {
      const id = path.split('/')[2];
      setPageState('service-detail', id, 'service');
    } else if (path.startsWith('/team/')) {
      const id = path.split('/')[2];
      setPageState('team-member-detail', id, 'team');
    } else if (path.startsWith('/blog/post/')) {
      const id = parseInt(path.split('/')[3], 10);
      setPageState('blog-detail', id, 'blog');
    } else if (path.startsWith('/collection/')) {
      const name = decodeURIComponent(path.split('/')[2]);
      setPageState('collection', name, 'collection');
    } else if (path === '/search') {
      const query = searchParams.get('q') || '';
      setPageState('search-results', query, 'search');
    } else {
      // Handle static pages (e.g., '/shop', '/login', or '/' for home)
      const pageKey = path.substring(1) || 'home';
      setPageState(pageKey);
    }
    
  }, [location, isLoggedIn, navigate]); // This hook runs on URL change or login status change


  // --- UPDATED: handleNavigation (Fixes History) ---
  // This function now *changes the URL* instead of setting state directly.
  // We wrap it in useCallback so it's stable when passed to contexts/props.
  const handleNavigation = useCallback((pageNameOrId) => {
    // Check if it's the same page to prevent loops
    const pathKey = (typeof pageNameOrId === 'string') ? pageNameOrId.split('-')[0] : 'home';
    if (pathKey === currentPage && !pageNameOrId.includes('-detail-')) {
       // console.log("Navigation prevented: already on page", pageNameOrId);
       // return; // Keep this commented out if state-based nav needs to re-trigger
    }

    // Clear conflicting states (same as before)
    if (isSearchOpen) setIsSearchOpen(false);
    if (pageNameOrId !== 'search-results') setSearchQuery('');
    if (pageNameOrId !== 'collection') setSelectedCollection(null);

    // Reset filters and sort when navigating to a new page
    if (currentPage !== pageNameOrId) {
        setAppliedFilters({ color: null, price: null, style: null });
        setSortOrder('manual');
    }

    // --- NEW: Convert page key to URL path ---
    let path = '/'; // Default to home
    if (typeof pageNameOrId === 'string' && pageNameOrId.startsWith('product-detail-')) {
        const prodId = pageNameOrId.split('-')[2];
        const productExists = allProducts.some(p => p && String(p.id) === String(prodId));
        if (prodId && productExists) {
           path = `/product/${prodId}`;
        } else {
           console.warn("Invalid product ID:", pageNameOrId);
           path = '/shop'; // Fallback
        }
    } else if (typeof pageNameOrId === 'string' && pageNameOrId.startsWith('service-detail-')) {
        const serviceId = pageNameOrId.substring('service-detail-'.length);
         if (serviceId === 'fall-picot-service') {
           path = `/service/${serviceId}`;
        } else {
           console.warn("Invalid service ID:", pageNameOrId);
           path = '/shop';
        }
    } else if (typeof pageNameOrId === 'string' && pageNameOrId.startsWith('team-member-detail-')) {
        const memberId = pageNameOrId.substring('team-member-detail-'.length);
         if (memberId) {
            path = `/team/${memberId}`;
         } else {
             console.warn("Could not extract team member ID from:", pageNameOrId);
             path = '/meet-the-team';
         }
    } else if (typeof pageNameOrId === 'string' && pageNameOrId.startsWith('blog-detail-')) {
        const postId = parseInt(pageNameOrId.split('-')[2], 10);
         if (!isNaN(postId)) {
            path = `/blog/post/${postId}`;
         } else {
             console.warn("Invalid blog post ID:", pageNameOrId);
             path = '/blog';
         }
    } else if (pageNameOrId === 'search-results') {
        if (searchQuery) {
            path = `/search?q=${encodeURIComponent(searchQuery)}`;
        } else {
            console.warn("Navigating to search results without a query. Redirecting to shop.");
            path = '/shop';
        }
    } else if (pageNameOrId === 'home') {
        path = '/';
    } else if (typeof pageNameOrId === 'string') {
        // Handle all other static pages like 'shop', 'login', 'account'
        path = `/${pageNameOrId}`;
    }

    // --- Use navigate() to change URL ---
    // Only navigate if the path is actually different
    if (path !== (location.pathname + location.search)) {
      navigate(path);
    }
    
    // The useEffect[location] hook will now catch this change and update state.
    // We no longer set state here directly.

    
  }, [isSearchOpen, searchQuery, navigate, location.pathname, location.search, currentPage, allProducts]);


  const handleOpenLogin = () => {
    // This function remains largely the same, but uses handleNavigation
    if (isLoggedIn) return;
    handleNavigation('login');
  };

  // handleLogout is now defined in handleLogoutWrapper
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  const toggleSearch = () => {
      setIsSearchOpen(prev => !prev);
      if (!isSearchOpen && isFilterOpen) setIsFilterOpen(false);
      if (isSearchOpen && currentPage !== 'search-results') {
           setSearchQuery('');
       }
      if (!isSearchOpen) window.scrollTo(0, 0);
  };

   // --- UPDATED: handleSearchSubmit ---
   const handleSearchSubmit = (term, type) => {
       // Set query *before* navigating
       setSearchQuery(term); 
       setIsSearchOpen(false); // Close the search overlay
       
       if (type === 'products') {
           navigate(`/search?q=${encodeURIComponent(term)}`); // Navigate to search URL
       } else if (type === 'blogs') {
            navigate('/blog'); // Navigate to blog URL
       }
       window.scrollTo(0, 0);
   };

   // --- UPDATED: handleSelectCollection ---
   const handleSelectCollection = (collectionName) => {
      setSelectedProductId(null);
      setSelectedServiceId(null);
      if (collectionName) {
        // Navigate to the collection URL
        navigate(`/collection/${encodeURIComponent(collectionName)}`);
      }
      handleCloseFilter();
      setViewingMemberId(null);
      setViewingPostId(null);
  };

  // This function remains the same
  const handleFilterApply = (filters) => {
    console.log("Filters received in App:", filters);

    if (filters.collection) {
      const collectionKey = filters.collection.toLowerCase();
        switch (collectionKey) {
            case 'all products':
              handleNavigation('all-products');
              break;
            case 'all sarees':
              handleNavigation('shop');
              break;
            case 'all jewellery':
              handleNavigation('jewellery');
              break;
            case 'cotton':
              handleNavigation('sarees-cotton');
              break;
            case 'silk and tussar':
              handleNavigation('sarees-silk-tussar');
              break;
            case 'linen':
              handleNavigation('sarees-linen');
              break;
            case 'chanderi':
              handleNavigation('sarees-chanderi');
              break;
            case 'neckpieces':
              handleNavigation('neckpieces');
              break;
            case 'earrings':
              handleNavigation('earrings');
              break;
            case 'bangles-cuffs':
              handleNavigation('bangles-cuffs');
              break;
            case 'rings':
              handleNavigation('rings');
              break;
            default:
              console.warn("Unhandled collection filter:", filters.collection);
              handleNavigation('shop');
        }
      setAppliedFilters({ color: null, price: null, style: null });
      setSortOrder('manual');
      return; 
    }
    if (filters.style) {
      const styleKey = filters.style.toLowerCase();
        switch (styleKey) {
            case 'casual':
              handleSelectCollection('POPSICLE - Everyday Cottons');
              break;
            case 'special occasion':
              handleSelectCollection('RAANJHANA - Benarasi Weaves');
              break;
            default:
              console.warn("Unhandled style filter:", filters.style);
              handleNavigation('bestsellers'); 
        }
      setAppliedFilters({ color: null, price: null, style: null });
      setSortOrder('manual');
      return; 
    }

    console.log("Applying Color/Price filters:", filters);
    setAppliedFilters({
        color: filters.color,
        price: filters.price,
        style: filters.style
    });
  };

  // This function remains the same
  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    console.log("Sort order changed to:", newSortOrder);
  };

  // This function remains the same
  const getCollectionBannerDetails = (collectionName) => {
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
      const formattedTitle = titlePart.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
      return { title: formattedTitle, subtitle: "Explore our collection." };
  };

   // --- NEW: Wrapper function for handling logout AND navigation ---
   const handleLogoutWrapper = useCallback(() => {
    logout(); // Call the logout function from context to clear state/storage
    navigate('/'); // Explicitly navigate to home page AFTER logout
  }, [logout, navigate]); // Add dependencies


  // The redirect logic has been MOVED to the new useEffect[location] hook


  const renderPage = () => {
    // This function remains exactly the same as your original
    
    // Render specific detail pages first
     if (currentPage === 'product-detail' && selectedProductId) {
        return <ProductDetailPage productId={selectedProductId} setPage={handleNavigation} />;
    }
     if (currentPage === 'service-detail' && selectedServiceId === 'fall-picot-service') {
        return <FallPicotDetailPage setPage={handleNavigation} />;
    }
     if (currentPage === 'team-member-detail' && viewingMemberId) {
        return <TeamMemberDetailPage memberId={viewingMemberId} onBack={() => handleNavigation('meet-the-team')} />;
    }
    if (currentPage === 'blog-detail' && viewingPostId) {
         return <BlogPage setPage={handleNavigation} currentPage={`blog-detail-${viewingPostId}`} />;
    }

     // --- All Products Page ---
     if (currentPage === 'all-products') {
        return (
            <>
                <Container className="py-4 text-center">
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>ALL PRODUCTS</h1>
                </Container>
                <FilterBar
                  handleOpenFilter={handleOpenFilter}
                  sortOrder={sortOrder}
                  onSortChange={handleSortChange}
                />
                <ProductList
                    products={allProducts}
                    collectionName="All Products"
                    setPage={handleNavigation}
                    appliedFilters={appliedFilters}
                    sortOrder={sortOrder}
                />
                <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} onApplyFilters={handleFilterApply} />
            </>
        );
     }


    // --- Collection Page ---
     if (currentPage === 'collection' && selectedCollection) {
        const { title, subtitle } = getCollectionBannerDetails(selectedCollection);
        const subtitleLines = subtitle ? subtitle.split('\n') : [];
        return (
            <>
                <CollectionHeroBanner
                    title={title}
                    subtitle={subtitleLines.map((line, index) => <React.Fragment key={index}>{line}{index < subtitleLines.length - 1 && <br />}</React.Fragment>)}
                 />
                <FilterBar
                  handleOpenFilter={handleOpenFilter}
                  sortOrder={sortOrder}
                  onSortChange={handleSortChange}
                />
                <ProductList
                    collectionName={selectedCollection}
                    setPage={handleNavigation}
                    appliedFilters={appliedFilters}
                    sortOrder={sortOrder}
                />
                <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} onApplyFilters={handleFilterApply} />
            </>
        );
    }

   // --- Search Results Page ---
   if (currentPage === 'search-results' && searchQuery) {
       const searchResults = searchAll(searchQuery);
       return (
            <>
                <Container className="py-4 text-center">
                    <h1 className="search-results-page-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>SEARCH RESULTS</h1>
                    <p className="text-muted">Showing results for "{searchQuery}"</p>
                </Container>
                <FilterBar
                  handleOpenFilter={handleOpenFilter}
                  sortOrder={sortOrder}
                  onSortChange={handleSortChange}
                />
                <ProductList
                    products={searchResults.fullProductList} // Pass full list for pagination within ProductList
                    searchQuery={searchQuery} // Keep passing query for title/context
                    collectionName={`Search: ${searchQuery}`} // Keep for title
                    setPage={handleNavigation}
                    appliedFilters={appliedFilters}
                    sortOrder={sortOrder}
                />
                <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} onApplyFilters={handleFilterApply} />
            </>
       );
   }

    // --- Switch statement passes ALL filter/sort props to relevant pages ---
    const pageProps = {
      setPage: handleNavigation,
      onApplyFilters: handleFilterApply,
      isFilterOpen: isFilterOpen,
      handleOpenFilter: handleOpenFilter,
      handleCloseFilter: handleCloseFilter,
      appliedFilters: appliedFilters,
      sortOrder: sortOrder,
      onSortChange: handleSortChange
    };

    switch (currentPage) {
        // --- Pages with Filters & Sorting ---
        case 'jewellery': return <JewelleryPage {...pageProps} />;
        case 'new-arrivals-jewellery': return <NewArrivalsJewelleryPage {...pageProps} />;
        case 'neckpieces': return <NeckpiecesPage {...pageProps} />;
        case 'earrings': return <EarringsPage {...pageProps} />;
        case 'bangles-cuffs': return <BanglesCuffsPage {...pageProps} />;
        case 'rings': return <RingsPage {...pageProps} />;
        case 'new-arrivals-sarees': return <NewArrivalsSareesPage {...pageProps} />;
        case 'sarees-cotton': return <CottonSareesPage {...pageProps} />;
        case 'sarees-silk-tussar': return <SilkTussarSareesPage {...pageProps} />;
        case 'sarees-linen': return <LinenSareesPage {...pageProps} />;
        case 'sarees-chanderi': return <ChanderiSareesPage {...pageProps} />;
        case 'bestsellers': return <BestsellersPage {...pageProps} />;
        case 'shop': return <SareesPage {...pageProps} />;

        // --- Pages without Filters & Sorting ---
        case 'home': return <HomePage setPage={handleNavigation} onCollectionItemClick={handleSelectCollection} />;
        case 'gift-card': return <GiftCardPage setPage={handleNavigation} />;
        case 'fall-picot': return <FallPicotPage setPage={handleNavigation} />; // No filter bar on this page
        case 'blog': return <BlogPage setPage={handleNavigation} currentPage={'blog'} />;
        case 'our-story': return <OurStoryPage />;
        case 'meet-the-team': return <MeetTheTeamPage onSelectMember={handleNavigation} />;
        case 'all-collections': return <AllCollectionsPage setPage={handleNavigation} onCollectionItemClick={handleSelectCollection} />;
        case 'faq': return <FaqPage />;
        case 'shipping-policy': return <ShippingPolicyPage />;
        case 'refund-policy': return <RefundPolicyPage />;
        case 'contact': return <ContactPage />;
        case 'terms-service': return <TermsServicePage />;
        case 'terms-conditions': return <TermsConditionsPage />;
        case 'privacy-policy': return <PrivacyPolicyPage />;
        case 'disclaimer-policy': return <DisclaimerPolicyPage />;
        case 'login': return <LoginPage setPage={handleNavigation} />;
        case 'register': return <RegisterPage setPage={handleNavigation} />;
        case 'checkout': return <CheckoutPage setPage={handleNavigation} />;

        // --- NEW: Account and Addresses ---
        case 'account':
            // Pass the NEW handleLogoutWrapper
            return <AccountPage setPage={handleNavigation} handleLogout={handleLogoutWrapper} />;
        case 'addresses':
            return <AddressesPage setPage={handleNavigation} />;
        // --- END NEW ---

        // Default fallback
        default: return <HomePage setPage={handleNavigation} onCollectionItemClick={handleSelectCollection} />;
    }
  };

  // This logic remains the same
  const pagesThatMightStartTransparent = [
       'home', 'shop', 'jewellery', 'collection', 'bestsellers',
       'neckpieces', 'earrings', 'bangles-cuffs', 'rings',
       'sarees-cotton', 'sarees-silk-tussar', 'sarees-linen', 'sarees-chanderi',
       'new-arrivals-sarees',
       'new-arrivals-jewellery',
       'fall-picot',
       'all-collections',
       'search-results',
       'all-products'
   ]; 
   const staticSolidHeaderPages = [
       'login', 'register', 'our-story', 'faq',
       'shipping-policy', 'refund-policy', 'contact',
       'terms-service', 'terms-conditions', 'privacy-policy', 'disclaimer-policy',
       'meet-the-team', 'team-member-detail',
       'blog',
       'blog-detail', 'gift-card', 
       'checkout', 'product-detail',
       'service-detail',
       'account', 'addresses'
   ]; 
   const isSolidHeaderForced = isSearchOpen ||
                              (currentPage === 'team-member-detail' && !!viewingMemberId) ||
                              !!viewingPostId ||
                              !!selectedProductId ||
                              !!selectedServiceId ||
                              staticSolidHeaderPages.includes(currentPage) ||
                              !pagesThatMightStartTransparent.includes(currentPage);
   const isHomePage = currentPage === 'home' && !viewingMemberId && !viewingPostId && !selectedProductId && !selectedServiceId;

   const hideHeader = currentPage === 'checkout';
   const hideFooter = currentPage === 'checkout';

  const hideRecentlyViewedOn = ['home', 'meet-the-team', 'team-member-detail', 'blog', 'blog-detail', 'checkout', 'account', 'addresses'];
  const showRecentlyViewed = !hideRecentlyViewedOn.includes(currentPage);


  return (
    // --- UPDATED: Pass handleNavigation to WishlistProvider ---
    <WishlistProvider handleNavClick={handleNavigation}>
      <ScrollToTop />
      <div className={`App ${isSolidHeaderForced || hideHeader ? 'page-with-solid-header' : ''} ${isHomePage ? 'homepage-active' : ''} ${isSearchOpen ? 'search-open' : ''}`}>
        {!hideHeader && (
            <Header
              setPage={handleNavigation}
              currentPage={currentPage}
              resetTeamView={() => setViewingMemberId(null)}
              handleSelectCollection={handleSelectCollection}
              viewingMemberId={viewingMemberId}
              isSearchOpen={isSearchOpen}
              toggleSearch={toggleSearch}
              handleLogout={handleLogoutWrapper} // <-- Pass the wrapper
            />
        )}
        {!hideHeader && (
          <SearchBar
              isSearchOpen={isSearchOpen}
              handleCloseSearch={toggleSearch}
              handleNavClick={(e, pageName) => handleNavigation(pageName)} // Pass main nav function
              onSearchSubmit={handleSearchSubmit}
          />
        )}
        <main>
          {renderPage()}
          {showRecentlyViewed && <RecentlyViewed setPage={handleNavigation} />}
        </main>

        {/* Global Components */}
        <CartDrawer setPage={handleNavigation} />
        <WishlistModal handleNavClick={handleNavigation} />
        <CurrencyDropdown />
        <WishlistButton />
        {!hideFooter && (
          <Footer setPage={handleNavigation} toggleSearch={toggleSearch} />
        )}
      </div>
    </WishlistProvider>
  );
}

// --- UPDATED: App component renders MainAppLogic ---
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CurrencyProvider>
          <RecentlyViewedProvider>
            {/* MainAppLogic contains WishlistProvider and all page logic */}
            <MainAppLogic /> 
          </RecentlyViewedProvider>
        </CurrencyProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;