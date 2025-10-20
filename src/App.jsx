// src/App.jsx
import React, { useState } from 'react';
import Header from './components/common/Header';
import HomePage from './pages/HomePage'; // <-- Make sure HomePage is imported
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
 const [currentPage, setCurrentPage] = useState('shop'); // <-- Default to 'shop'
  const [viewingMemberId, setViewingMemberId] = useState(null);

  const renderPage = () => {
    if (viewingMemberId) {
      return (
        <TeamMemberDetailPage
          memberId={viewingMemberId}
          onBack={() => setViewingMemberId(null)}
        />
      );
    }

    switch (currentPage) {
     case 'home': // <-- Logo click
       return <HomePage />;
      case 'gift-card':
        return <GiftCardPage />;
      case 'jewellery':
        return <JewelleryPage />;
      case 'blog':
        return <BlogPage />;
      case 'bestsellers':
        return <BestsellersPage />;
      case 'meet-the-team':
        return <MeetTheTeamPage onSelectMember={setViewingMemberId} />;
      case 'shop': // <-- SHOP/COLLECTIONS click and default
      default:
        return <SareesPage />; // <-- Render SareesPage for 'shop' and default
    }
  };

  const isSolidHeader = !!viewingMemberId;

  return (
    <CartProvider>
      <div className={`App ${isSolidHeader ? 'page-with-solid-header' : ''}`}>
        <Header
          setPage={setCurrentPage}
          currentPage={currentPage}
          resetTeamView={() => setViewingMemberId(null)}
        />
        <main>{renderPage()}</main>
        <CartDrawer />
        <CurrencyDropdown />
        <WishlistButton />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;