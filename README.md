# SmartEduRural - Enhancing Rural Education

A comprehensive web-based educational platform designed to bridge the gap between students, parents, and teachers in rural areas. SmartEduRural provides essential tools for learning, assessment, and progress tracking.

## 🚀 Features

### For Students
- **Dashboard**: Overview of progress, upcoming tests, and quick actions
- **Resources**: Access to educational materials, videos, and documents
- **Tests & Assessments**: Take tests, view results, and track performance
- **Virtual Mentor**: AI-powered chat assistant for 24/7 academic support
- **Leaderboard**: Compete with peers and track rankings
- **1:1 Sessions**: Book sessions with teachers and mentors

### For Parents
- **Progress Monitoring**: Track child's academic performance
- **Detailed Reports**: Comprehensive analysis of learning progress
- **SMS Notifications**: Receive updates on child's activities
- **Multi-child Support**: Manage multiple children from one account

### For Teachers/Mentors
- **Student Management**: Monitor and manage student progress
- **Test Creation**: Design and configure assessments
- **Resource Upload**: Share educational materials
- **1:1 Sessions**: Conduct personalized mentoring sessions
- **Analytics**: Detailed reports on student performance

## 🛠️ Technology Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for responsive, mobile-first design
- **React Query** for efficient data fetching
- **React i18next** for multilingual support
- **React Hook Form** for form management
- **Lucide React** for consistent iconography

### Backend (Mock Implementation)
- **Local Storage** for data persistence
- **Context API** for state management
- **Mock APIs** for demonstration purposes

### Key Libraries
- `@tanstack/react-query` - Data fetching and caching
- `react-i18next` - Internationalization
- `react-hook-form` - Form handling
- `@headlessui/react` - Accessible UI components
- `lucide-react` - Icon library

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile devices** (320px and up)
- **Tablets** (768px and up)
- **Desktop** (1024px and up)

## 🌐 Multilingual Support

Currently supports:
- **English** (en)
- **Hindi** (hi)

Easy to extend with additional languages.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smartedurural
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

For testing purposes, use these credentials:

**Student Account:**
- Email: `student@example.com`
- Password: `password`

**Parent Account:**
- Email: `parent@example.com`
- Password: `password`

**Teacher Account:**
- Email: `teacher@example.com`
- Password: `password`

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components
│   ├── layout/         # Layout components
│   ├── parent/         # Parent-specific components
│   ├── student/        # Student-specific components
│   └── teacher/        # Teacher-specific components
├── contexts/           # React contexts
├── i18n/              # Internationalization
└── App.jsx            # Main application component
```

## 🎯 Key Components

### Authentication System
- Role-based access control (Student, Parent, Teacher)
- Secure login/logout functionality
- User profile management

### Student Portal
- **Dashboard**: Progress overview and quick actions
- **Resources**: Educational material access
- **Tests**: Assessment taking and results
- **Virtual Mentor**: AI-powered assistance
- **Leaderboard**: Peer competition

### Parent Portal
- **Dashboard**: Child progress monitoring
- **Reports**: Detailed performance analysis
- **SMS Integration**: Notification system

### Teacher Portal
- **Dashboard**: Class overview and statistics
- **Student Management**: Individual student tracking
- **Test Creation**: Assessment builder
- **Resource Management**: Material upload and sharing

## 🔧 Customization

### Adding New Languages
1. Add translation files in `src/i18n/index.js`
2. Update the `LanguageSwitcher` component
3. Test with different locales

### Styling
- Uses Tailwind CSS for consistent styling
- Custom color scheme defined in `tailwind.config.js`
- Responsive breakpoints configured

### Adding New Features
- Follow the existing component structure
- Use the established patterns for state management
- Ensure responsive design principles

## 📊 Performance Features

- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: Efficient image handling
- **Caching**: React Query for data caching
- **Code Splitting**: Automatic code splitting with Vite

## 🔒 Security Features

- **Input Validation**: Form validation with React Hook Form
- **XSS Protection**: React's built-in XSS protection
- **Secure Authentication**: JWT-based authentication (mock)
- **Role-based Access**: Different views for different user types

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Real Backend Integration**: Replace mock APIs with real backend
- **Advanced Analytics**: Detailed performance analytics
- **Video Conferencing**: Integrated video calls for 1:1 sessions
- **Mobile App**: React Native mobile application
- **Offline Support**: PWA capabilities for offline access
- **AI Integration**: Advanced AI features for personalized learning

## 📈 Success Metrics

- User engagement and retention
- Test completion rates
- Parent involvement metrics
- Teacher satisfaction scores
- Student performance improvements

---

**SmartEduRural** - Bridging the digital divide in rural education through technology and innovation.