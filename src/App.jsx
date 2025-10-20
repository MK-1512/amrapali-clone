// src/App.jsx
import React, { useState } from 'react'; // <-- Ensure useState is imported
import Header from './components/common/Header';
import HomePage from './pages/HomePage'; // <-- Make sure HomePage is created and imported
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

// Import slick carousel CSS if HomePage uses it
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  // Default to 'home' to show the homepage initially
  const [currentPage, setCurrentPage] = useState('home');
  const [viewingMemberId, setViewingMemberId] = useState(null);

  const renderPage = () => {
    // If viewing a team member detail, render that page
    if (viewingMemberId) {
      return (
        <TeamMemberDetailPage
          memberId={viewingMemberId}
          onBack={() => setViewingMemberId(null)} // Function to go back
        />
      );
    }

    // Otherwise, render based on the currentPage state
    switch (currentPage) {
     case 'home': // Render HomePage when currentPage is 'home'
       return <HomePage setPage={setCurrentPage} />; // Pass setPage if HomePage needs to navigate
      case 'gift-card':
        return <GiftCardPage />;
      case 'jewellery':
        return <JewelleryPage />;
      case 'blog':
        return <BlogPage />;
      case 'bestsellers':
        return <BestsellersPage />;
      case 'meet-the-team':
        return <MeetTheTeamPage onSelectMember={setViewingMemberId} />; // Pass handler to select member
      case 'shop': // Render SareesPage for 'shop'
      default:   // Also default to SareesPage
        return <SareesPage />;
    }
  };

  // Determine if the header should have solid background styling applied
  // (e.g., for team member detail page, independent of scrolling)
  const isSolidHeaderForced = !!viewingMemberId;

  // Determine if it's the homepage for specific styling
  const isHomePage = currentPage === 'home';

  return (
    <CartProvider>
      {/* Apply classes based on states */}
      <div className={`App ${isSolidHeaderForced ? 'page-with-solid-header' : ''} ${isHomePage ? 'homepage-active' : ''}`}>
        <Header
          setPage={setCurrentPage} // Pass function to update page state
          currentPage={currentPage} // Pass current page state
          resetTeamView={() => setViewingMemberId(null)} // Pass function to reset team view
        />
        <main>{renderPage()}</main> {/* Render the selected page component */}

        {/* Global components */}
        <CartDrawer />
        <CurrencyDropdown />
        <WishlistButton />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;