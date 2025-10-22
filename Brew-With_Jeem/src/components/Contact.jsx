import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance, { getCsrfCookie } from '../utils/axios';

const Contact = () => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: user ? `${user.first_name} ${user.last_name}` : '',
    email: user?.email || '',
    message: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    
    try {
      // First, get the CSRF cookie from Sanctum
      await getCsrfCookie();

      // Then submit the contact form
      const response = await axiosInstance.post('/contact', formData);

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setFormData({ ...formData, message: '' });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <h2>Visit Us</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Address</h4>
                <p>@street view<br />MBC, Mamatid Cabuyao Laguna</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p>(+63)9147852369</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>Brewthjeem@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div>
                <h4>Hours</h4>
                <p>Mon-Fri: 6AM - 8PM<br />Sat-Sun: 7AM - 9PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h3>Send us a Message</h3>
            
            {!isAuthenticated && (
              <div className="info-message" style={{ color: '#8B4513', textAlign: 'center', marginBottom: '10px' }}>
                Please login to send us a message.
              </div>
            )}

            {error && (
              <div className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
                {error}
              </div>
            )}

            {successMessage && (
              <div className="success-message" style={{ color: 'green', textAlign: 'center', marginBottom: '10px' }}>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isAuthenticated}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isAuthenticated}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                disabled={!isAuthenticated}
                required
              ></textarea>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!isAuthenticated || loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

