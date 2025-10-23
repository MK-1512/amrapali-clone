// src/App.jsx
import React, { useState } from 'react';
import Header from './components/common/Header'; //
import HomePage from './pages/HomePage'; //
import SareesPage from './pages/SareesPage'; //
import CartDrawer from './components/cart/CartDrawer'; //
import { CartProvider } from './context/CartContext'; //
import './assets/css/main.css'; //
import Footer from './components/common/Footer'; //
import GiftCardPage from './pages/GiftCardPage'; //
import WishlistButton from './components/common/WishlistButton'; //
import CurrencyDropdown from './components/filters/CurrencyDropdown'; //
import JewelleryPage from './pages/JewelleryPage'; //
import MeetTheTeamPage from './pages/MeetTheTeamPage'; //
import TeamMemberDetailPage from './pages/TeamMemberDetailPage'; //
import BlogPage from './pages/BlogPage'; //
import BestsellersPage from './pages/BestsellersPage'; //
import LoginPage from './pages/LoginPage'; //
import ProductList from './components/product/ProductList'; //
import CollectionHeroBanner from './components/common/CollectionHeroBanner'; //
import FilterBar from './components/filters/FilterBar'; //
import FilterDrawer from './components/filters/FilterDrawer'; //
import RegisterPage from './pages/RegisterPage'; //

// --- Import New Jewellery Category Pages ---
import NeckpiecesPage from './pages/jewellery/NeckpiecesPage'; //
import EarringsPage from './pages/jewellery/EarringsPage'; //
import BanglesCuffsPage from './pages/jewellery/BanglesCuffsPage'; //
import RingsPage from './pages/jewellery/RingsPage'; //

// --- Import New Arrivals Jewellery Page ---
import NewArrivalsJewelleryPage from './pages/NewArrivalsJewelleryPage';

// Import slick carousel CSS if HomePage uses it (Original Import)
import "slick-carousel/slick/slick.css"; //
import "slick-carousel/slick/slick-theme.css"; //

function App() {
  const [currentPage, setCurrentPage] = useState('home'); //
  const [viewingMemberId, setViewingMemberId] = useState(null); //
  const [selectedCollection, setSelectedCollection] = useState(null); //
  const [isFilterOpen, setIsFilterOpen] = useState(false); //

  // Handler to open login page
   const handleOpenLogin = () => { //
       if (viewingMemberId) setViewingMemberId(null); //
       setCurrentPage('login'); //
       window.scrollTo(0, 0); //
   };

  // Handlers for Filter Drawer
  const handleOpenFilter = () => setIsFilterOpen(true); //
  const handleCloseFilter = () => setIsFilterOpen(false); //

  // Handler for selecting a collection
  const handleSelectCollection = (collectionName) => { //
      setSelectedCollection(collectionName); //
      if (collectionName) { //
        setCurrentPage('collection'); //
      }
      handleCloseFilter(); //
  };

  // Helper function to get Banner Details
  const getCollectionBannerDetails = (collectionName) => { //
       if (!collectionName) { return { title: "Collection", subtitle: "" }; } //
      const upperCollectionName = collectionName.toUpperCase(); //
      if (upperCollectionName.includes("SOULFUL WEAVES")) { return { title: "SOULFUL WEAVES", subtitle: "A celebration of soft textures, timeless weaves and understated elegance." }; } //
      if (upperCollectionName.includes("IKTARA - JAMDANI WEAVES")) { return { title: "IKTARA - JAMDANI STORIES", subtitle: "A timeless weave of tradition and craftsmanship, the process of jamdani weaving is considered one of the most advanced hand-weaving techniques in the world. Woven by artisans of Bengal in the softest cotton, these textiles make for handmade luxury at its best." }; } //
      if (upperCollectionName.includes("RAANJHANA - BENARASI WEAVES")) { return { title: "RAANJHANA - BANARASI WEAVES", subtitle: "Presenting 'Raanjhana', an exquisite edit of Banaras weaves, made of stories wrapped in silk, colors dipped in richness and designs woven from blooms all around us." }; } //
      if (upperCollectionName.includes("MASAKALI - CHANDERI WEAVES")) { return { title: "MASAKALI", subtitle: "Lightweight and handwoven, the understated glamour of these six yards exude a remarkable aura around its wearer. Coming straight from the looms of Chanderi, here's our curation of this fascinating small town, that boasts of its legendary weave :)" }; } //
      if (upperCollectionName.includes("POPSICLE - EVERYDAY COTTONS")) { return { title: "POPSICLE", subtitle: "Easy breezy soft cottons in bright vibrant hues" }; } //
      if (upperCollectionName.includes("DOODHE-AALTA - RED-BORDERED WHITE SAREES")) { return { title: "DOODHE-AALTA", subtitle: "The iconic 'Laal Paadh Shada Saree' or the Red-bordered White Saree synonymous with the culture and tradition of West Bengal, celebrates femininity in all its glory. \n Take your pick from our specially curated collection of the quintessential doodhe-alta sarees and immerse yourself in the mélange of scarlet and snow." }; } //
      if (upperCollectionName.includes("STORIES FROM HOME - COTTON SAREES")) { return { title: "STORIES FROM HOME", subtitle: "Looking closely, there are so many memories and feelings that lurk in every corner of our homes that often smell of nostalgia and longing.\nThey often say, home is a feeling and we think quite rightly so, because every time we hear home, we think of stories of love and belonging, of remembrance and nostalgia and of memories and experiences that shaped us into who we are today :)\nOn the occasion of our 6th anniversary, presenting to you, 'Stories from Home' in 8 beautiful shades, that resembles the softness of our grandmothers' laps and warmth of the morning sun." }; } //
      if (upperCollectionName.includes("ROOPKATHA - BALUCHARI AND SWARNACHARI")) { return { title: "ROOPKATHA", subtitle: "Live your moment of fairytale, by embracing an ancient heritage craft, that weaves tales of mythology and history, on silk, synonymous with royal opulence and grandeur -\nBalucharis and Swarnacharis." }; } //
      if (upperCollectionName.includes("CANDYFLOSS - COTTON SAREES")) { return { title: "CANDYFLOSS", subtitle: "Presenting an assortment of soft, extremely airy, easy-breezy, effortless, handloom pure cotton drapes, with cute braided tassles in beautiful hues, to elevate your mood and spirit." }; } //
      if (upperCollectionName.includes("NOOR - ORGANZA BENARASI")) { return { title: "NOOR - A TALE OF ORGANZA", subtitle: "Echoing voices of the looms that lingered in the narrow lanes and ghats of Benaras, this exquisite edition of ultra-fine, dreamy, ethereal organza drapes is a special one.\nThe kadhua weave banarasi borders add a touch of royal opulence to the otherwise minimal, flowy silhouette, making it a timeless closet treasure :)" }; } //
      if (upperCollectionName.includes("SUNKISSED - MINIMALIST JEWELLERY")) { return { title: "SUNKISSED", subtitle: "Modern and Minimalist | Fuss-free and understated Pieces that will tag along with you everyday and collect stories; as you do.\nPieces that are rather complementary, just like yin and yang.\nPieces that add a little sunshine to your life :)" }; } //
      if (upperCollectionName.includes("A MIDAS TOUCH - TUSSAR SILK")) { return { title: "A MIDAS TOUCH", subtitle: "" }; } //
      if (upperCollectionName.includes("GOLDEN HOUR - ECLECTIC JEWELLERY")) { return { title: "GOLDEN HOUR", subtitle: "Presenting an eclectic edit of versatile and modern, handcrafted contemporary pieces, that perfectly marries femininity and edge.\nEach of these exquisite beauty is a work of art, created by independent artisans in Jaipur and it was quite an interesting journey to source, curate and build this collection. It's yours now :)" }; } //
      if (upperCollectionName.includes("EK SITARA - KOTA SAREES")) { return { title: "EK SITARA", subtitle: "An air of subtle sophistication, lightweight yet luxurious, a blend of cotton and silk with real gold in the zari, straight from the master weavers of Kaithoon, Kota." }; } //
      if (upperCollectionName.includes("SMART STAPLES - A WORKWEAR EDIT")) { return { title: "SMART STAPLES - A WORKWEAR EDIT", subtitle: "Functional | Minimalistic | Contemporary\nPresenting a workwear collective comprising simple, clean-lined, versatile drapes that will go a long way in making a striking impression at work and beyond." }; } //
      return { title: collectionName.split('-')[0].trim(), subtitle: "" }; //
  };

  // Function to determine which page component to render
  const renderPage = () => { //
    if (viewingMemberId) { //
        return <TeamMemberDetailPage memberId={viewingMemberId} onBack={() => setViewingMemberId(null)} />; //
    }

    if (currentPage === 'collection' && selectedCollection) { //
        const { title, subtitle } = getCollectionBannerDetails(selectedCollection); //
        const subtitleLines = subtitle ? subtitle.split('\n') : []; //
        return ( //
            <>
                <CollectionHeroBanner //
                    title={title} //
                    subtitle={subtitleLines.map((line, index) => <React.Fragment key={index}>{line}{index < subtitleLines.length - 1 && <br />}</React.Fragment>)} //
                 />
                <FilterBar handleOpenFilter={handleOpenFilter} /> //
                <ProductList collectionName={selectedCollection} /> //
            </>
        );
    }

    // UPDATED switch statement
    switch (currentPage) { //
     case 'home': return <HomePage setPage={setCurrentPage} />; //
     case 'gift-card': return <GiftCardPage />; //
     // Case for SHOP > JEWELLERY > All
     case 'jewellery': return <JewelleryPage />; //
     // Case for NEW ARRIVALS > Jewellery
     case 'new-arrivals-jewellery': return <NewArrivalsJewelleryPage />; // <-- ADDED
     // Cases for specific jewellery categories
     case 'neckpieces': return <NeckpiecesPage />; //
     case 'earrings': return <EarringsPage />; //
     case 'bangles-cuffs': return <BanglesCuffsPage />; //
     case 'rings': return <RingsPage />; //
     case 'blog': return <BlogPage />; //
     case 'bestsellers': return <BestsellersPage />; //
     case 'meet-the-team': return <MeetTheTeamPage onSelectMember={setViewingMemberId} />; //
     case 'login': return <LoginPage setPage={setCurrentPage} />; //
     case 'register': return <RegisterPage setPage={setCurrentPage} />; //
     case 'shop': //
     default: return <SareesPage />; //
    }
  };

   // Logic for solid header
   const isSolidHeaderForced = !!viewingMemberId || currentPage === 'login' || currentPage === 'register'; //
   const isHomePage = currentPage === 'home'; //

  // --- Main Render ---
  return ( //
    <CartProvider> {/* */}
      <div className={`App ${isSolidHeaderForced ? 'page-with-solid-header' : ''} ${isHomePage ? 'homepage-active' : ''}`}> {/* */}
        <Header //
          setPage={setCurrentPage} //
          currentPage={currentPage} //
          resetTeamView={() => setViewingMemberId(null)} //
          onUserIconClick={handleOpenLogin} //
          handleSelectCollection={handleSelectCollection} //
          viewingMemberId={viewingMemberId} //
        />
        <main>{renderPage()}</main> {/* */}

        {/* Global Components */}
        <CartDrawer /> {/* */}
        <CurrencyDropdown /> {/* */}
        <WishlistButton /> {/* */}
        <Footer /> {/* */}
        <FilterDrawer show={isFilterOpen} handleClose={handleCloseFilter} /> {/* */}
      </div>
    </CartProvider>
  );
}

export default App; //