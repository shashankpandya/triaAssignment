# Contact List Application

A modern, responsive React contact list application built with Vite and Tailwind CSS.

## Features

✨ **Core Features:**
- 📋 View all contacts in a beautiful card-based layout
- 🔍 Search contacts by name in real-time
- ➕ Add new contacts with validation
- 🗑️ Delete contacts from the list
- 📱 Fully responsive design (mobile, tablet, desktop)

## Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd contact-list-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   The app will open at `http://localhost:3000`

4. **Build for production**
   \`\`\`bash
   npm run build
   \`\`\`

5. **Preview production build**
   \`\`\`bash
   npm run preview
   \`\`\`

## Project Structure

\`\`\`
contact-list-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # App header
│   │   ├── SearchBar.jsx        # Search functionality
│   │   ├── ContactList.jsx      # Contacts grid display
│   │   ├── ContactCard.jsx      # Individual contact card
│   │   └── AddContactForm.jsx   # Add contact form
│   ├── data/
│   │   └── mockContacts.js      # Mock contact data
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── index.html                   # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies
\`\`\`

## Usage

### Viewing Contacts
- All contacts are displayed in a responsive grid layout
- Each contact card shows name, title, email, phone, and address
- Click on email or phone to open default mail/phone app

### Searching Contacts
- Type in the search bar to filter contacts by name
- Search is case-insensitive and real-time
- Shows count of filtered vs total contacts

### Adding Contacts
1. Click the "Add Contact" button
2. Fill in the contact details (name is required)
3. Form validates email and phone format
4. Click "Add Contact" to save or "Cancel" to close

### Deleting Contacts
- Click the trash icon on any contact card to delete it
- Deletion is immediate

## Design Decisions

### Architecture
- **Component-based**: Each feature is a separate, reusable component
- **State management**: Uses React hooks (useState, useMemo) for simplicity
- **Responsive design**: Mobile-first approach with Tailwind CSS

### Features
- **Real-time search**: Uses useMemo for optimized filtering
- **Form validation**: Client-side validation for email and phone
- **Mock data**: Pre-populated with sample contacts for demo
- **Accessible**: Semantic HTML and proper ARIA labels

### Styling
- **Tailwind CSS**: Utility-first approach for consistent design
- **Color scheme**: Professional blue/green theme
- **Responsive grid**: 1 column on mobile, 2 on tablet, 3 on desktop

## Assumptions

1. **Data persistence**: Currently uses in-memory state. For production, integrate with a backend API
2. **Authentication**: No user authentication implemented
3. **Validation**: Basic client-side validation only
4. **Unique IDs**: Uses timestamp-based IDs for new contacts
5. **No duplicate prevention**: Users can add duplicate contacts

## Future Enhancements

- 📊 Backend API integration for data persistence
- 🔐 User authentication and authorization
- 📤 Import/Export contacts (CSV, vCard)
- 🔔 Contact groups and categories
- 📞 Call/SMS integration
- 🌙 Dark mode support
- 🔄 Undo/Redo functionality
- 📧 Email templates

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Vercel will auto-detect Vite and configure it
5. Click "Deploy"

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Click "Deploy"

### Deploy to GitHub Pages

1. Update `vite.config.js`:
   \`\`\`js
   export default defineConfig({
     base: '/contact-list-app/',
     // ... rest of config
   })
   \`\`\`
2. Run: `npm run build`
3. Push the `dist` folder to `gh-pages` branch

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub or contact the maintainer.
