// src/App.jsx
import React, { useState } from 'react';
import Header from './components/common/Header';
import HomePage from './pages/HomePage'; // Original Import
import SareesPage from './pages/SareesPage';
import CartDrawer from './components/cart/CartDrawer';
import { CartProvider } from './context/CartContext';
import './assets/css/main.css';
import Footer from './components/common/Footer';
import GiftCardPage from './pages/GiftCardPage';
import WishlistButton from './components/common/WishlistButton';
import CurrencyDropdown from './components/filters/CurrencyDropdown';
import JewelleryPage from './pages/JewelleryPage';
import MeetTheTeamPage from './pages/MeetTheTeamPage';
import TeamMemberDetailPage from './pages/TeamMemberDetailPage';
import BlogPage from './pages/BlogPage';
import BestsellersPage from './pages/BestsellersPage';
import LoginPage from './pages/LoginPage'; // Original Import (now uncommented/added)
import ProductList from './components/product/ProductList'; // Original Import
import CollectionHeroBanner from './components/common/CollectionHeroBanner'; // Original Import
import FilterBar from './components/filters/FilterBar'; // Original Import
import FilterDrawer from './components/filters/FilterDrawer'; // Original Import
import RegisterPage from './pages/RegisterPage'; // <-- Make sure RegisterPage is imported

// Import slick carousel CSS if HomePage uses it (Original Import)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [viewingMemberId, setViewingMemberId] = useState(null);
  // const [showLoginPage, setShowLoginPage] = useState(false); // Original state - kept but commented as per original
  const [selectedCollection, setSelectedCollection] = useState(null); // Original state
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Original state

  // Handlers for Login Modal (Original Handlers - kept but related state is commented)
  // const handleOpenLogin = () => setShowLoginPage(true);
  // const handleCloseLogin = () => setShowLoginPage(false);

   // Handler to open login page by changing currentPage state (Original)
   const handleOpenLogin = () => {
       if (viewingMemberId) setViewingMemberId(null); // Reset team view if needed
       setCurrentPage('login');
       window.scrollTo(0, 0);
   };


  // Handlers for Filter Drawer (Original Handlers)
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  // Handler for selecting a collection from the Header dropdown (Original Handler)
  const handleSelectCollection = (collectionName) => {
      setSelectedCollection(collectionName);
      if (collectionName) {
        setCurrentPage('collection'); // Set state to indicate a collection is being viewed
      }
      handleCloseFilter(); // Close filter drawer when changing collection
  };

  // Helper function to get Banner Title/Subtitle based on Collection (Original Helper)
  const getCollectionBannerDetails = (collectionName) => {
      if (!collectionName) { return { title: "Collection", subtitle: "" }; }
      const upperCollectionName = collectionName.toUpperCase();

      // --- Define details for included collections --- (Original logic)
      if (upperCollectionName.includes("SOULFUL WEAVES")) { /*...*/ return { title: "SOULFUL WEAVES", subtitle: "A celebration of soft textures, timeless weaves and understated elegance." }; }
      if (upperCollectionName.includes("IKTARA - JAMDANI WEAVES")) { /*...*/ return { title: "IKTARA - JAMDANI STORIES", subtitle: "A timeless weave of tradition and craftsmanship, the process of jamdani weaving is considered one of the most advanced hand-weaving techniques in the world. Woven by artisans of Bengal in the softest cotton, these textiles make for handmade luxury at its best." }; }
      if (upperCollectionName.includes("RAANJHANA - BENARASI WEAVES")) { /*...*/ return { title: "RAANJHANA - BANARASI WEAVES", subtitle: "Presenting 'Raanjhana', an exquisite edit of Banaras weaves, made of stories wrapped in silk, colors dipped in richness and designs woven from blooms all around us." }; }
      if (upperCollectionName.includes("MASAKALI - CHANDERI WEAVES")) { /*...*/ return { title: "MASAKALI", subtitle: "Lightweight and handwoven, the understated glamour of these six yards exude a remarkable aura around its wearer. Coming straight from the looms of Chanderi, here's our curation of this fascinating small town, that boasts of its legendary weave :)" }; }
      if (upperCollectionName.includes("POPSICLE - EVERYDAY COTTONS")) { /*...*/ return { title: "POPSICLE", subtitle: "Easy breezy soft cottons in bright vibrant hues" }; }
      if (upperCollectionName.includes("DOODHE-AALTA - RED-BORDERED WHITE SAREES")) { /*...*/ return { title: "DOODHE-AALTA", subtitle: "The iconic 'Laal Paadh Shada Saree' or the Red-bordered White Saree synonymous with the culture and tradition of West Bengal, celebrates femininity in all its glory. \n Take your pick from our specially curated collection of the quintessential doodhe-alta sarees and immerse yourself in the mélange of scarlet and snow." }; }
      if (upperCollectionName.includes("STORIES FROM HOME - COTTON SAREES")) { /*...*/ return { title: "STORIES FROM HOME", subtitle: "Looking closely, there are so many memories and feelings that lurk in every corner of our homes that often smell of nostalgia and longing.\nThey often say, home is a feeling and we think quite rightly so, because every time we hear home, we think of stories of love and belonging, of remembrance and nostalgia and of memories and experiences that shaped us into who we are today :)\nOn the occasion of our 6th anniversary, presenting to you, 'Stories from Home' in 8 beautiful shades, that resembles the softness of our grandmothers' laps and warmth of the morning sun." }; }
      if (upperCollectionName.includes("ROOPKATHA - BALUCHARI AND SWARNACHARI")) { /*...*/ return { title: "ROOPKATHA", subtitle: "Live your moment of fairytale, by embracing an ancient heritage craft, that weaves tales of mythology and history, on silk, synonymous with royal opulence and grandeur -\nBalucharis and Swarnacharis." }; }
      if (upperCollectionName.includes("CANDYFLOSS - COTTON SAREES")) { /*...*/ return { title: "CANDYFLOSS", subtitle: "Presenting an assortment of soft, extremely airy, easy-breezy, effortless, handloom pure cotton drapes, with cute braided tassles in beautiful hues, to elevate your mood and spirit." }; }
      if (upperCollectionName.includes("NOOR - ORGANZA BENARASI")) { /*...*/ return { title: "NOOR - A TALE OF ORGANZA", subtitle: "Echoing voices of the looms that lingered in the narrow lanes and ghats of Benaras, this exquisite edition of ultra-fine, dreamy, ethereal organza drapes is a special one.\nThe kadhua weave banarasi borders add a touch of royal opulence to the otherwise minimal, flowy silhouette, making it a timeless closet treasure :)" }; }
      if (upperCollectionName.includes("SUNKISSED - MINIMALIST JEWELLERY")) { /*...*/ return { title: "SUNKISSED", subtitle: "Modern and Minimalist | Fuss-free and understated Pieces that will tag along with you everyday and collect stories; as you do.\nPieces that are rather complementary, just like yin and yang.\nPieces that add a little sunshine to your life :)" }; }
      if (upperCollectionName.includes("A MIDAS TOUCH - TUSSAR SILK")) { /*...*/ return { title: "A MIDAS TOUCH", subtitle: "" }; }
      if (upperCollectionName.includes("GOLDEN HOUR - ECLECTIC JEWELLERY")) { /*...*/ return { title: "GOLDEN HOUR", subtitle: "Presenting an eclectic edit of versatile and modern, handcrafted contemporary pieces, that perfectly marries femininity and edge.\nEach of these exquisite beauty is a work of art, created by independent artisans in Jaipur and it was quite an interesting journey to source, curate and build this collection. It's yours now :)" }; }
      if (upperCollectionName.includes("EK SITARA - KOTA SAREES")) { /*...*/ return { title: "EK SITARA", subtitle: "An air of subtle sophistication, lightweight yet luxurious, a blend of cotton and silk with real gold in the zari, straight from the master weavers of Kaithoon, Kota." }; }
      // --- Add details for Smart Staples --- (Original logic)
      if (upperCollectionName.includes("SMART STAPLES - A WORKWEAR EDIT")) {
          return {
              title: "SMART STAPLES - A WORKWEAR EDIT", // Title from video
              // Using \n for line break
              subtitle: "Functional | Minimalistic | Contemporary\nPresenting a workwear collective comprising simple, clean-lined, versatile drapes that will go a long way in making a striking impression at work and beyond." // Subtitle from video
          };
      }
      // --- End Smart Staples details ---

      // Default fallback (Original logic)
      return { title: collectionName.split('-')[0].trim(), subtitle: "" };
  };

  // Function to determine which main page component to render (Original function structure)
  const renderPage = () => {
    // Priority 1: Team Member Detail Page (Original logic)
    if (viewingMemberId) { /* ... */ return ( <TeamMemberDetailPage memberId={viewingMemberId} onBack={() => setViewingMemberId(null)} /> ); }
    // Priority 2: Login Page Overlay (Original logic - commented out)
    // if (showLoginPage) { return null; }

    // Priority 3: Selected Collection Page (Original logic)
    if (currentPage === 'collection' && selectedCollection) {
        const { title, subtitle } = getCollectionBannerDetails(selectedCollection);
        const subtitleLines = subtitle.split('\n'); // Handle potential line breaks
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
    // Priority 4: Other specific pages (Original switch with register case added)
    switch (currentPage) {
     case 'home': return <HomePage setPage={setCurrentPage} />;
     case 'gift-card': return <GiftCardPage />;
     case 'jewellery': return <JewelleryPage />;
     case 'blog': return <BlogPage />;
     case 'bestsellers': return <BestsellersPage />;
     case 'meet-the-team': return <MeetTheTeamPage onSelectMember={setViewingMemberId} />;
     case 'login': return <LoginPage setPage={setCurrentPage} />;
     case 'register': // <-- ADDED: Case for Register Page
        return <RegisterPage setPage={setCurrentPage} />;
     case 'shop': default: return <SareesPage />;
    }
  };

   // Logic for solid header (Original structure, updated condition)
   // Solid if viewing member OR on login page OR on register page
   const isSolidHeaderForced = !!viewingMemberId || currentPage === 'login' || currentPage === 'register';
   const isHomePage = currentPage === 'home'; // Original variable

  // --- Main Render --- (Original structure)
  return (
    <CartProvider>
      {/* Original className logic, using the updated isSolidHeaderForced */}
      <div className={`App ${isSolidHeaderForced ? 'page-with-solid-header' : ''} ${isHomePage ? 'homepage-active' : ''}`}>
        {/* Pass viewingMemberId prop */}
        <Header
          setPage={setCurrentPage}
          currentPage={currentPage}
          resetTeamView={() => setViewingMemberId(null)}
          onUserIconClick={handleOpenLogin} // Pass the handler
          handleSelectCollection={handleSelectCollection}
          viewingMemberId={viewingMemberId} // Pass viewingMemberId
        />
        <main>{renderPage()}</main>

        {/* Original Login Page logic (Commented out) */}
        {/* Uncomment the LoginPage import at the top if you re-enable this */}
        {/* {showLoginPage && <LoginPage handleClose={handleCloseLogin} />} */}

        {/* Original Global Components */}
        <CartDrawer />
        <CurrencyDropdown />
        <WishlistButton />
        <Footer />
        <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} />
      </div>
    </CartProvider>
  );
}

export default App; // Original export