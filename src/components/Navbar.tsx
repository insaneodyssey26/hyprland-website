"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ currentPath }: { currentPath: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const repoUrl = "https://github.com/insaneodyssey26/hyprland";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const AndroidIcon = () => (
    <svg viewBox="0 0 24 24" fill="#3DDC84" width="16" height="16" style={{ display: 'inline', marginLeft: '6px', verticalAlign: 'text-bottom' }}>
      <path d="M17.6 9.48l1.84-3.18a.3.3 0 0 0-.11-.41.3.3 0 0 0-.41.11L17 9.27A10.74 10.74 0 0 0 12 8c-1.78 0-3.46.46-4.95 1.26L5.16 6a.3.3 0 0 0-.41-.11.3.3 0 0 0-.11.41l1.84 3.18C4.54 10.8 3.18 12.75 3 15h18c-.18-2.25-1.54-4.2-3.4-5.52M7 13.5a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 7 13.5m10 0a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 17 13.5"/>
    </svg>
  );

  return (
    <>
      {currentPath !== '/configs' && <div className="top-fade"></div>}
      <nav className={`floating-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <h1>Hyprland Setup</h1>
          
          <div className="desktop-links">
            {currentPath === '/configs' ? (
              <Link href="/" className="primary">Home</Link>
            ) : (
              <Link href="/configs" className="primary">View Dotfiles</Link>
            )}
            <Link href={repoUrl} target="_blank">GitHub</Link>
            
            <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 8px' }}></div>
            
            <a href="https://masum.tech/" target="_blank" rel="noreferrer" className="avatar-link">
              <img src="https://github.com/insaneodyssey26.png" alt="Masum Ali" className="avatar-img" />
              <div className="avatar-tooltip">
                Not an actual android, just an engineer who builds them. Click to stalk my portfolio <AndroidIcon />
              </div>
            </a>
          </div>

          <button 
            className={`hamburger ${isOpen ? 'open' : ''}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <span className="line"></span>
            <span className="line"></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-overlay ${isOpen ? 'open' : ''}`}>
        <div className="mobile-links">
            {currentPath === '/configs' ? (
              <Link href="/" className="primary" onClick={() => setIsOpen(false)}>Home</Link>
            ) : (
              <Link href="/configs" className="primary" onClick={() => setIsOpen(false)}>View Dotfiles</Link>
            )}
            <Link href={repoUrl} target="_blank" onClick={() => setIsOpen(false)}>GitHub</Link>
        </div>
      </div>
    </>
  );
}
