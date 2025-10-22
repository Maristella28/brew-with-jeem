const About = () => {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Brew with Jeem</h2>
            <p>
              Founded in 2020, Brew with Jeem has been serving the finest coffee to our
              community. We source our beans from sustainable farms and roast them to
              perfection in our local roastery.
            </p>
            <p>
              Our baristas are trained to craft the perfect cup every time, ensuring that
              every visit is a memorable experience.
            </p>
            <div className="features">
              <div className="feature">
                <i className="fas fa-leaf"></i>
                <span>Organic Beans</span>
              </div>
              <div className="feature">
                <i className="fas fa-heart"></i>
                <span>Made with Love</span>
              </div>
              <div className="feature">
                <i className="fas fa-clock"></i>
                <span>Fresh Daily</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&h=400&fit=crop"
              alt="Coffee beans and equipment"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

