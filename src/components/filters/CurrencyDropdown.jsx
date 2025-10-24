import React, { useState, useMemo, useRef, useEffect, useContext } from 'react';
import { currencies } from '../../data/currencies';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { CurrencyContext } from '../../context/CurrencyContext'; // <-- NEW IMPORT

const CurrencyDropdown = () => {
  const { selectedCurrency, updateCurrency } = useContext(CurrencyContext); // <-- USE CONTEXT
    
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState({ bottom: 0, left: 0 });
  
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  // Calculate dropdown position when it opens
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      setDropdownPosition({
        bottom: viewportHeight - buttonRect.top + 8,
        left: buttonRect.left
      });
    }
  }, [isOpen]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelectCurrency = (currency) => {
    updateCurrency(currency.code); // <-- USE CONTEXT FUNCTION
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredCurrencies = useMemo(() => {
    if (!searchTerm) return currencies;
    return currencies.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="currency-selector" ref={dropdownRef}>
      <button 
        ref={buttonRef}
        onClick={handleToggle} 
        className="currency-button"
      >
        {selectedCurrency.flag} {/* <-- USE CONTEXT STATE */}
        <span className="ms-2">
          {selectedCurrency.code} {/* <-- USE CONTEXT STATE */}
          <span style={{ 
            display: 'inline-block', 
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            ▼
          </span>
        </span>
      </button>

      {isOpen && (
        <div 
          className="currency-dropdown-panel"
          style={{
            position: 'fixed',
            bottom: `${dropdownPosition.bottom}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <div className="search-container">
            <input
              type="text"
              className="form-control currency-search-input"
              placeholder="Search..."
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="currency-list">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency) => (
                <div
                  key={currency.code}
                  className="currency-list-item"
                  onClick={() => handleSelectCurrency(currency)}
                >
                  <span>{currency.flag} {currency.name} ({currency.code})</span>
                </div>
              ))
            ) : (
              <div className="no-results">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;