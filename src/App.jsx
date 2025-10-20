import React, { useState } from 'react';
import Header from './components/common/Header';
import SareesPage from './pages/SareesPage';
import CartDrawer from './components/cart/CartDrawer';
import { CartProvider } from './context/CartContext';
import './assets/css/main.css';
import Footer from './components/common/Footer';
import GiftCardPage from './pages/GiftCardPage';
import WishlistButton from './components/common/WishlistButton';
import CurrencyDropdown from './components/filters/CurrencyDropdown';
import JewelleryPage from './pages/JewelleryPage';

// --- Team & Other Pages ---
import MeetTheTeamPage from './pages/MeetTheTeamPage';
import TeamMemberDetailPage from './pages/TeamMemberDetailPage';
import BlogPage from './pages/BlogPage';
import BestsellersPage from './pages/BestsellersPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [viewingMemberId, setViewingMemberId] = useState(null);

  const renderPage = () => {
    // If a member is selected, show their detail page
    if (viewingMemberId) {
      return (
        <TeamMemberDetailPage
          memberId={viewingMemberId}
          onBack={() => setViewingMemberId(null)}
        />
      );
    }

    switch (currentPage) {
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
      case 'home':
      default:
        return <SareesPage />;
    }
  };

  // ✅ Make the header transparent across all pages
  const isSolidHeader = !!viewingMemberId; // Only solid when viewing team member detail

  return (
    <CartProvider>
      <div className={`App ${isSolidHeader ? 'page-with-solid-header' : ''}`}>
        {/* Header always visible with offer bar */}
        <Header
          setPage={setCurrentPage}
          currentPage={currentPage}
          resetTeamView={() => setViewingMemberId(null)}
        />

        <main>{renderPage()}</main>

        {/* Global Components */}
        <CartDrawer />
        <CurrencyDropdown />
        <WishlistButton />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
