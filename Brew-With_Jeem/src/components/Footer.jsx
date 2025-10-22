import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeMessage('Thank you for subscribing! ☕');
      setEmail('');
      setTimeout(() => setSubscribeMessage(''), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section footer-about">
            <h3>
              <i className="fas fa-coffee"></i> Brew with Jeem
            </h3>
            <p className="footer-tagline">Crafting the perfect cup since 2020</p>
            <p className="footer-description">
              Your neighborhood coffee shop serving premium, ethically-sourced coffee 
              with a warm smile and cozy atmosphere.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="TikTok">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4><i className="fas fa-link"></i> Quick Links</h4>
            <ul>
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }}>
                  <i className="fas fa-coffee"></i> Menu
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                  <i className="fas fa-info-circle"></i> About Us
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  <i className="fas fa-envelope"></i> Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Items */}
          <div className="footer-section">
            <h4><i className="fas fa-star"></i> Popular Items</h4>
            <ul>
              <li>
                <a href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }}>
                  <i className="fas fa-mug-hot"></i> Cappuccino
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }}>
                  <i className="fas fa-coffee"></i> Espresso
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }}>
                  <i className="fas fa-ice-cream"></i> Frappuccino
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }}>
                  <i className="fas fa-bread-slice"></i> Croissant
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="footer-section">
            <h4><i className="fas fa-map-marker-alt"></i> Contact & Hours</h4>
            <div className="footer-contact-info">
              <p>
                <i className="fas fa-location-dot"></i>
                <span>@street view<br />MBC, Mamatid Cabuyao Laguna</span>
              </p>
              <p>
                <i className="fas fa-phone"></i>
                <span>(+63) 914 785 2369</span>
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                <span>Brewthjeem@gmail.com</span>
              </p>
              <div className="footer-hours">
                <p><i className="fas fa-clock"></i> <strong>Opening Hours:</strong></p>
                <p>Mon-Fri: 6:00 AM - 8:00 PM</p>
                <p>Sat-Sun: 7:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-section footer-newsletter">
            <h4><i className="fas fa-paper-plane"></i> Newsletter</h4>
            <p>Subscribe to get special offers and updates!</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
            {subscribeMessage && (
              <p className="subscribe-success">{subscribeMessage}</p>
            )}
            <div className="footer-badges">
              <div className="badge">
                <i className="fas fa-leaf"></i>
                <span>Organic</span>
              </div>
              <div className="badge">
                <i className="fas fa-award"></i>
                <span>Award Winning</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="footer-payment">
          <p>We Accept:</p>
          <div className="payment-icons">
            <i className="fab fa-cc-visa" title="Visa"></i>
            <i className="fab fa-cc-mastercard" title="Mastercard"></i>
            <i className="fab fa-cc-paypal" title="PayPal"></i>
            <i className="fas fa-credit-card" title="Credit Card"></i>
            <i className="fas fa-money-bill-wave" title="Cash"></i>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 Brew with Jeem. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <span className="separator">|</span>
              <a href="#terms">Terms of Service</a>
              <span className="separator">|</span>
              <a href="#cookies">Cookie Policy</a>
            </div>
            <p className="footer-credit">
              Made with <i className="fas fa-heart"></i> and <i className="fas fa-coffee"></i> by Brew with Jeem Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
