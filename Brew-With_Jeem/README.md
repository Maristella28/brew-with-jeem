# Brew with Jeem - Coffee Shop SPA

A modern Single Page Application (SPA) for a coffee shop built with **Vite + React** and **React Router DOM**, featuring authentication, dynamic routing, and a beautiful responsive UI.

## 🚀 Features

### ✅ Single Page Application Requirements
1. **5 Main Sections**: Home, Menu, About, Contact, and Authentication (Login/Register)
2. **Header Component**: Persistent navigation across all pages
3. **React Router DOM**: Seamless navigation without page reloads
4. **Dynamic Routing**: Hash-based navigation for sections
5. **Protected Routes**: Authentication-based access control
6. **404 Page**: Custom not-found page with navigation options
7. **Programmatic Navigation**: JavaScript-based routing
8. **Modern Styling**: Custom CSS with animations and responsive design

### 🎨 Key Features
- **Authentication System**: Login and Register with PHP backend
- **Session Management**: Persistent user sessions with PHP
- **Contact Form**: Send messages (authentication required)
- **Dark Mode Toggle**: Switch between light and dark themes
- **Smooth Scrolling**: Beautiful scroll animations between sections
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Form Validation**: Client-side and server-side validation
- **Loading States**: User feedback during async operations

## 📁 Project Structure

```
Brew-With_Jeem/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header component
│   │   ├── Home.jsx             # Hero section
│   │   ├── Menu.jsx             # Coffee menu section
│   │   ├── About.jsx            # About section
│   │   ├── Contact.jsx          # Contact form section
│   │   ├── Footer.jsx           # Footer component
│   │   └── ProtectedRoute.jsx   # Route protection wrapper
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication context
│   ├── pages/
│   │   ├── HomePage.jsx         # Main landing page
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   └── NotFound.jsx         # 404 error page
│   ├── App.jsx                  # Main app with routing
│   ├── App.css                  # Component styles
│   ├── index.css                # Global styles
│   └── main.jsx                 # App entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- XAMPP (for PHP backend and MySQL)
- Modern web browser

### Backend Setup
1. Ensure XAMPP is running (Apache and MySQL)
2. Create a database named `brew_with_jeem` in phpMyAdmin
3. Create the required tables:

```sql
-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birthdate DATE NOT NULL,
    age INT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Frontend Setup
1. Navigate to the project directory:
```bash
cd Brew-With_Jeem
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## 🎯 React Router Implementation

### Routes Configuration
- `/` - Home page with all sections (Home, Menu, About, Contact)
- `/login` - Login page
- `/register` - Registration page
- `*` - 404 Not Found page (wildcard route)

### Navigation Features
1. **Hash Navigation**: Smooth scrolling to sections (#home, #menu, #about, #contact)
2. **Active Link Highlighting**: Current section highlighted in nav
3. **Programmatic Navigation**: `useNavigate()` for redirects after login/logout
4. **Protected Routes**: Can be applied to any route requiring authentication
5. **Browser History**: Back/forward button support

## 🔐 Authentication Flow

### Login Process
1. User enters email and password
2. Form validation (client-side)
3. API call to `api/login.php`
4. Session created on server
5. User data stored in React context
6. Automatic redirect to homepage

### Register Process
1. User fills registration form with age auto-calculation
2. Client-side validation
3. API call to `api/register.php`
4. Password hashing on server
5. Redirect to login page

### Logout Process
1. User clicks logout icon
2. Confirmation dialog
3. API call to `api/logout.php`
4. Session destroyed
5. User context cleared
6. Redirect to login page

## 🎨 Styling

### CSS Features
- **Custom Properties**: CSS variables for theming
- **Flexbox & Grid**: Modern layout techniques
- **Transitions**: Smooth animations
- **Responsive**: Mobile-first design
- **Dark Mode**: Toggle-able theme
- **Intersection Observer**: Scroll-based animations

### Key Classes
- `.header` - Sticky navigation
- `.hero` - Landing section
- `.menu-category` - Menu items
- `.contact-form` - Contact form styles
- `.login-container` - Auth pages
- `.not-found-container` - 404 page

## 📱 Responsive Design

### Breakpoints
- Desktop: > 768px
- Tablet/Mobile: ≤ 768px

### Mobile Optimizations
- Hamburger menu (can be added)
- Single column layouts
- Stacked navigation
- Touch-friendly buttons

## 🔗 API Endpoints

All endpoints are in the `/backend` folder:

- `POST /backend/login.php` - User login
- `POST /backend/register.php` - User registration
- `GET /backend/logout.php` - User logout
- `GET /backend/check-auth.php` - Check authentication status
- `POST /backend/contact.php` - Send contact message

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy
1. Build the project
2. Upload `dist/` folder to web server
3. Ensure PHP backend is accessible
4. Configure CORS settings if needed

## 📝 Usage Guide

### As a Guest
- Browse Home, Menu, About sections
- View contact information
- Cannot send contact messages
- See login prompt

### As a Logged-in User
- Full access to all features
- Send contact messages
- See profile icon with name
- Logout option available

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **React Router DOM v6** - Routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Styling
- **Font Awesome** - Icons

### Backend
- **PHP** - Server-side logic
- **MySQL** - Database
- **Sessions** - Authentication

## 📚 Learning Outcomes

This project demonstrates:
1. ✅ Single Page Application architecture
2. ✅ React Router DOM implementation
3. ✅ Dynamic and nested routing
4. ✅ Protected routes with authentication
5. ✅ Programmatic navigation
6. ✅ 404 error handling
7. ✅ Context API for state management
8. ✅ Component-based architecture
9. ✅ RESTful API integration
10. ✅ Modern CSS techniques

## 🐛 Troubleshooting

### Issue: CORS Errors
**Solution**: Ensure CORS headers are set in `api/config.php`

### Issue: Session Not Persisting
**Solution**: Check `withCredentials: true` in Axios requests

### Issue: 404 on Refresh
**Solution**: Configure server to redirect all routes to index.html

### Issue: Database Connection Failed
**Solution**: Verify XAMPP is running and database credentials are correct

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a demonstration of Single Page Application development with React Router DOM.

---

**Happy Coding! ☕**
