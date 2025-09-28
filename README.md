# African American Safety Society (AASS) Website

A modern, responsive website for the African American Safety Society built with Next.js, TypeScript, and Tailwind CSS. The site serves as both a nonprofit organization website and a platform for community safety technology solutions.

## 🎯 Mission

AASS helps Black communities achieve greater safety through business and technology. We run training, incubators, research, and safety-focused software — and we share resources, articles, and tools to uplift Black people and improve public safety and economic security.

## 🚀 Features

- **Modern Design**: Clean, professional design with accessibility in mind
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Content Management**: Easy-to-edit content via JSON and MDX files
- **Blog System**: Full blog functionality with MDX support
- **Contact Forms**: Email integration with fallback to local file storage
- **API Routes**: RESTful APIs for data management
- **Performance Optimized**: Fast loading with Next.js optimizations
- **SEO Ready**: Meta tags, Open Graph, and structured data
- **Testing**: Unit tests with Jest and React Testing Library
- **CI/CD**: GitHub Actions workflow for automated testing and deployment

## 🛠 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Content**: MDX for blog posts, JSON for structured data
- **Email**: SendGrid (primary) / Nodemailer (fallback)
- **Testing**: Jest + React Testing Library
- **Deployment**: Optimized for Vercel
- **Linting**: ESLint + Prettier

## 📁 Project Structure

```
/aass-site
├── /public                 # Static assets
│   ├── /images           # Hero images, team photos, etc.
│   └── logo.svg          # AASS typographic logo
├── /data                 # Content and seed data
│   ├── initiatives.json  # Program information
│   ├── team.json         # Team member data
│   ├── posts/            # MDX blog posts
│   └── messages.json     # Contact form fallback storage
├── /pages                # Next.js pages and API routes
│   ├── /api             # API endpoints
│   ├── /blog            # Blog pages
│   └── *.tsx            # Page components
├── /components          # Reusable React components
├── /styles              # Global CSS and Tailwind config
├── /lib                 # Utility functions
└── /__tests__           # Test files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aass-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Email Configuration (Optional)
   SENDGRID_API_KEY=your_sendgrid_api_key
   AASS_CONTACT_EMAIL=contact@aass.org
   
   # Or use SMTP
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🎨 Customization

### Updating Content

The site is designed for easy content management:

#### **Core Content**
- **Initiatives**: Edit `data/initiatives.json`
- **Team**: Edit `data/team.json`
- **Blog Posts**: Add MDX files to `data/posts/`

#### **Copy and Messaging**
- **Homepage**: Edit `pages/index.tsx`
- **About Page**: Edit `pages/about.tsx`
- **Other Pages**: Edit respective files in `pages/`

#### **Styling**
- **Colors**: Update `tailwind.config.js`
- **Global Styles**: Edit `styles/globals.css`
- **Component Styles**: Use Tailwind classes in components

### Adding New Pages

1. Create a new `.tsx` file in `pages/`
2. Use the `Layout` component for consistent structure
3. Add navigation links to `components/Navbar.tsx`
4. Update `components/Footer.tsx` if needed

### Adding Blog Posts

1. Create a new `.mdx` file in `data/posts/`
2. Include frontmatter with required fields:
   ```mdx
   ---
   title: "Your Post Title"
   date: "2025-01-01"
   excerpt: "Brief description"
   tags: ["tag1", "tag2"]
   author: "Author Name"
   featured: false
   ---
   
   # Your Content Here
   ```

## 📧 Email Configuration

The contact form supports multiple email backends:

### Option 1: SendGrid (Recommended)
1. Create a SendGrid account
2. Generate an API key
3. Set environment variables:
   ```env
   SENDGRID_API_KEY=your_api_key
   SENDGRID_FROM_EMAIL=noreply@aass.org
   AASS_CONTACT_EMAIL=contact@aass.org
   ```

### Option 2: SMTP
1. Configure SMTP settings:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   AASS_CONTACT_EMAIL=contact@aass.org
   ```

### Option 3: File Storage (Development)
If no email configuration is provided, contact form submissions are saved to `data/messages.json` for local development.

## 🧪 Testing

The project includes unit tests for key components:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

Tests are located in the `__tests__/` directory and cover:
- Component rendering
- Form validation
- API endpoints
- User interactions

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Push code to GitHub
   - Connect repository to Vercel
   - Deploy automatically

2. **Set Environment Variables**
   - Add production environment variables in Vercel dashboard
   - Include email configuration if needed

3. **Custom Domain** (Optional)
   - Add custom domain in Vercel settings
   - Update DNS records as instructed

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SENDGRID_API_KEY` | SendGrid API key for emails | No |
| `AASS_CONTACT_EMAIL` | Contact email address | No |
| `SMTP_HOST` | SMTP server host | No |
| `SMTP_USER` | SMTP username | No |
| `SMTP_PASS` | SMTP password | No |
| `NODE_ENV` | Environment (development/production) | No |

### Rate Limiting

API endpoints include basic rate limiting:
- Contact form: 5 requests per 15 minutes per IP
- Newsletter: 3 requests per 15 minutes per IP

For production, consider implementing Redis-based rate limiting.

## 📊 Performance

The site is optimized for performance:
- **Lighthouse Score**: 90+ on desktop
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Static generation with ISR

## 🔒 Security

Security features include:
- Input validation on all forms
- Rate limiting on API endpoints
- CORS headers for API routes
- Secure environment variable handling
- No sensitive data in client-side code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is proprietary software for the African American Safety Society.

## 📞 Support

For support and questions:
- **Email**: contact@aass.org
- **Phone**: (555) 123-4567
- **Address**: 1234 Community Way, Suite 100, Atlanta, GA 30309

## 🗺 Roadmap

Future enhancements planned:
- [ ] User authentication system
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Advanced content management
- [ ] Integration with CRM systems
- [ ] Mobile app development

---

**Built with ❤️ for the African American Safety Society**
