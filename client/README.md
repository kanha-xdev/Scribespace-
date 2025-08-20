# QuillSpace Frontend

A premium blogging platform frontend built with React, TypeScript, and Tailwind CSS. This is the UI layer that your team members can integrate with their backend API.

## 🚀 Features Built

### Pages & Components
- **Landing Page** - Hero section with glassmorphism design
- **Home Page** - Article feed with responsive cards
- **Write Page** - Rich article creation interface  
- **Authentication Pages** - Sign in/Sign up with premium styling
- **Profile Page** - User profile interface
- **Discover Page** - Content discovery and search
- **Article Detail Page** - Individual article reading
- **Settings Page** - User settings interface

### UI Components
- **Navbar** - Responsive navigation with user dropdown
- **BlogCard/ArticleCard** - Reusable article display components
- **Professional Navigation** - Breadcrumbs, back buttons
- **Rich Text Editor** - Article writing interface
- **Forms** - All authentication and content forms
- **Responsive Design** - Mobile-first across all devices

### Design Features
- ✅ Dark theme with glassmorphism effects
- ✅ Medium-style minimal typography (Inter font)
- ✅ Curved buttons with premium animations
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Professional color scheme and spacing

## 🛠 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server
- **Wouter** - Lightweight routing
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Radix UI** - Accessible components
- **Zod** - Schema validation

## 📦 Installation

```bash
cd client
npm install
npm run dev
```

## 🚀 Deployment to Vercel

### Quick Deploy
1. Push this `client/` folder to your GitHub repository
2. Connect your repo to Vercel
3. Set build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Manual Deploy
```bash
cd client
npm run build
# Upload the dist/ folder to Vercel
```

## 🔗 API Integration

This frontend is currently using mock data for demonstration. Your backend team needs to create these API endpoints:

### Authentication Endpoints
```
POST /api/auth/login
POST /api/auth/register  
POST /api/auth/logout
GET  /api/auth/me
```

### Article Endpoints
```
GET    /api/articles           # Get all articles
GET    /api/articles/featured  # Get featured articles
GET    /api/articles/:id       # Get single article
POST   /api/articles           # Create article
PUT    /api/articles/:id       # Update article
DELETE /api/articles/:id       # Delete article
```

### User Endpoints
```
GET  /api/users/me            # Get current user profile
PUT  /api/users/me            # Update profile
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── lib/                # Utilities and config
│   ├── hooks/              # Custom React hooks
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── public/                 # Static assets
├── dist/                   # Build output
└── package.json           # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (`from-purple-600 to-cyan-600`)
- **Background**: Dark slate (`bg-slate-900`)  
- **Cards**: Semi-transparent (`bg-slate-800/50`)
- **Text**: White with slate variants

### Typography
- **Headings**: Inter font, light weight, tight tracking
- **Body**: Inter font, regular weight
- **Accent**: Playfair Display for decorative text

### Components
- **Buttons**: Rounded-full with hover animations
- **Cards**: Glassmorphism effect with subtle borders
- **Forms**: Dark theme with focus states
- **Navigation**: Professional with breadcrumbs

## 🤝 Team Integration

### What You've Done (Frontend)
- ✅ All UI pages and components
- ✅ Responsive design and styling  
- ✅ Form handling and validation
- ✅ Routing and navigation
- ✅ State management setup
- ✅ Mock data integration

### What Backend Team Needs
- 🔲 API endpoints (see list above)
- 🔲 Database models (User, Article, etc.)
- 🔲 Authentication middleware
- 🔲 File upload handling
- 🔲 Database connection

### Integration Steps
1. Backend team creates API endpoints
2. Replace mock data calls with real API calls
3. Add proper error handling
4. Set up authentication flow
5. Deploy both frontend and backend

## 📝 Notes

- Uses localStorage for demo authentication
- Mock data simulates real API responses
- All components are production-ready
- Fully responsive and accessible
- Ready for backend integration

## 🆘 Support

This frontend is complete and ready for your team to integrate with their backend APIs. The design is premium, responsive, and follows modern web development best practices.