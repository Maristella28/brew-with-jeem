import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
      heroContent.classList.add('visible');
      heroImage.classList.add('visible');
    }

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.menu-category, .contact-info, .about-text, .about-image');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Welcome to Brew with Jeem</h1>
          <p>Discover the perfect blend of tradition and innovation in every cup</p>
          <button className="btn btn-primary" onClick={scrollToMenu}>
            View Menu
          </button>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop"
            alt="Coffee shop interior"
          />
        </div>
      </section>
    </>
  );
};

export default Home;

