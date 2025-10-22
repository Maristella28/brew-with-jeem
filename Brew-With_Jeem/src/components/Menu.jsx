const Menu = () => {
  const menuData = {
    hotCoffee: [
      { name: 'Espresso', description: 'Rich and bold single shot', price: '₱89.00' },
      { name: 'Cappuccino', description: 'Espresso with steamed milk foam', price: '₱105.00' },
      { name: 'Latte', description: 'Smooth espresso with steamed milk', price: '₱120.00' },
      { name: 'Americano', description: 'Espresso with hot water', price: '₱95.00' }
    ],
    coldDrinks: [
      { name: 'Iced Latte', description: 'Chilled espresso with cold milk', price: '₱85.00' },
      { name: 'Cold Brew', description: 'Smooth 18-hour steeped coffee', price: '₱90.00' },
      { name: 'Frappuccino', description: 'Blended coffee with ice cream', price: '₱155.00' },
      { name: 'Iced Americano', description: 'Espresso over ice with water', price: '₱80.00' }
    ],
    pastries: [
      { name: 'Croissant', description: 'Buttery French pastry', price: '₱100.00' },
      { name: 'Blueberry Muffin', description: 'Fresh baked with real berries', price: '₱50.00' },
      { name: 'Chocolate Chip Cookie', description: 'Warm and gooey', price: '₱60.00' },
      { name: 'Bagel', description: 'Fresh daily with cream cheese', price: '₱75.00' }
    ]
  };

  return (
    <section className="menu section" id="menu">
      <div className="container">
        <h2 id="our-menu">Our Menu</h2>
        <div className="menu-grid">
          {/* Hot Coffee */}
          <div className="menu-category">
            <h3>Hot Coffee</h3>
            <div className="menu-items">
              {menuData.hotCoffee.map((item, index) => (
                <div className="menu-item" key={index}>
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <span className="price">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cold Drinks */}
          <div className="menu-category">
            <h3>Cold Drinks</h3>
            <div className="menu-items">
              {menuData.coldDrinks.map((item, index) => (
                <div className="menu-item" key={index}>
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <span className="price">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pastries & Snacks */}
          <div className="menu-category">
            <h3>Pastries & Snacks</h3>
            <div className="menu-items">
              {menuData.pastries.map((item, index) => (
                <div className="menu-item" key={index}>
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <span className="price">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;

