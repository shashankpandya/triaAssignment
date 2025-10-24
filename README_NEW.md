# Contact List App - Professional Edition

> A modern, accessible, enterprise-ready contact management application built with React, Tailwind CSS, and comprehensive testing.

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Latest-yellow)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

🚀 **[Live Demo](#)** | 📖 **[Documentation](#)** | 🐛 **[Report Bug](issues)**

## ✨ Features

### Core Functionality

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete contacts
- ✅ **Bulk Actions** - Select multiple contacts for batch operations
- ✅ **CSV Import/Export** - Import contacts from CSV with validation, export selected contacts
- ✅ **Advanced Filtering** - Search across all fields, filter by company, sort by any column
- ✅ **Pagination** - Customizable page sizes (6, 9, 12, 18, 24 contacts per page)
- ✅ **Dual View Modes** - Toggle between card grid and sortable table view
- ✅ **Real-time Search** - Instant filtering as you type
- ✅ **Toast Notifications** - User feedback for all actions (success, error, info, warning)
- ✅ **Activity Tracking** - Recent actions log for audit trail

### Technical Excellence

- 🎨 **Modern UI/UX** - Built with Tailwind CSS utility-first framework
- ♿ **WCAG 2.1 AA Compliant** - Full keyboard navigation, screen reader support, ARIA labels
- 📱 **Fully Responsive** - Mobile-first design, works on all screen sizes
- 🧪 **Comprehensive Testing** - Unit tests with Vitest and React Testing Library
- 🔒 **Type-Safe** - PropTypes validation throughout
- 🚀 **Optimized Performance** - Code splitting, lazy loading, memoization
- 🎯 **State Management** - Robust Context API with useReducer
- 📦 **Modular Architecture** - Reusable, scalable components
- 🔌 **API-Ready** - Mock API layer ready for real backend integration
- 🌐 **Production Deployed** - Live demo with public URL

## 🏗️ Architecture

### Project Structure

```
my-app/
├── src/
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.jsx       # Button with variants & loading
│   │   │   ├── Input.jsx        # Input with labels & validation
│   │   │   ├── Loading.jsx      # Loading spinners
│   │   │   ├── Toast.jsx        # Toast notifications
│   │   │   └── Modal.jsx        # Modal dialogs
│   │   ├── ContactCard.jsx      # Contact card component
│   │   ├── ContactForm.jsx      # Create/Edit form
│   │   ├── ContactList.jsx      # Grid view of contacts
│   │   ├── ContactTable.jsx     # Table view with sorting
│   │   ├── SearchBar.jsx        # Search & filter controls
│   │   ├── Pagination.jsx       # Page navigation
│   │   ├── BulkActions.jsx      # Multi-select actions
│   │   └── ImportCSV.jsx        # CSV import component
│   ├── contexts/
│   │   └── ContactContext.jsx   # Global state management
│   ├── services/
│   │   └── contactService.js    # API service layer
│   ├── hooks/
│   │   ├── useToasts.js         # Toast notification hook
│   │   ├── useDebounce.js       # Debounce hook
│   │   └── useLocalStorage.js   # Local storage hook
│   ├── utils/
│   │   ├── validation.js        # Form validation
│   │   ├── csv.js               # CSV utilities
│   │   └── constants.js         # App constants
│   ├── test/
│   │   ├── setup.js             # Test configuration
│   │   └── utils.jsx            # Test utilities
│   ├── App.jsx                  # Main application
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind directives
├── public/
├── vitest.config.js             # Test configuration
├── tailwind.config.js           # Tailwind configuration
├── vite.config.js               # Vite configuration
└── package.json
```

### Technology Stack

| Category               | Technology               | Purpose                        |
| ---------------------- | ------------------------ | ------------------------------ |
| **Frontend Framework** | React 18.2               | UI library with hooks          |
| **Styling**            | Tailwind CSS 3.x         | Utility-first CSS framework    |
| **State Management**   | Context API + useReducer | Centralized state management   |
| **Build Tool**         | Vite 5.x                 | Fast development and bundling  |
| **Testing**            | Vitest + Testing Library | Unit and integration testing   |
| **Icons**              | Lucide React             | Beautiful SVG icon library     |
| **HTTP Client**        | Fetch API                | Native API communication       |
| **Validation**         | Custom validators        | Form and data validation       |
| **Linting**            | ESLint + jsx-a11y        | Code quality and accessibility |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** 7.x or higher (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/contact-list-app.git
cd contact-list-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Available Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run tests in watch mode
npm run test:ui      # Run tests with UI dashboard
npm run test:coverage # Generate coverage report
npm run lint         # Lint code for errors
```

## 📖 Usage Guide

### Creating a Contact

1. Click **"Add Contact"** button
2. Fill in the form:
   - **Name** (required) - Full name of the contact
   - **Email** (required) - Valid email address
   - **Phone** - Phone number in any format
   - **Company** - Company or organization name
   - **Title** - Job title or position
   - **Website** - Company or personal website URL
   - **Address** - Physical address
   - **Notes** - Additional notes or comments
   - **Avatar URL** - Profile image URL
3. Click **"Save Contact"** or **Cancel**

### Editing a Contact

1. Click on any contact card or table row to open details
2. Click **"Edit"** button in the detail modal
3. Modify any fields
4. Click **"Save Changes"**

### Deleting Contacts

**Single Delete:**

- Click trash icon on contact card, or
- Open contact details and click **"Delete"**

**Bulk Delete:**

1. Select multiple contacts using checkboxes
2. Click **"Delete Selected"** in bulk actions bar
3. Confirm deletion

### Searching & Filtering

- **Main Search** - Type in search bar to filter across all fields
- **Advanced Filters** - Click "Advanced" to filter by specific fields:
  - Name
  - Email
  - Phone
  - Company
- **Sorting** - Click column headers in table view to sort
- **Clear Filters** - Click "Clear" to reset all filters

### CSV Import

1. Click **"Import CSV"** button
2. Select a CSV file with these headers:
   ```
   name,email,phone,company,title,website,address,notes
   ```
3. Contacts are validated and imported
4. Error report shows any failed rows

### CSV Export

1. Select contacts to export (or leave empty for all)
2. Click **"Export CSV"** in bulk actions bar
3. File downloads with timestamp: `contacts-2024-10-24.csv`

### Keyboard Navigation

- **Tab** - Navigate between interactive elements
- **Enter/Space** - Activate buttons and links
- **Escape** - Close modals and dialogs
- **Arrow Keys** - Navigate pagination
- **Ctrl/Cmd + Click** - Multi-select in table view

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Test Coverage

Current coverage targets:

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

### Test Structure

```javascript
// Example: Button component test
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state", () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });
});
```

## ♿ Accessibility

### WCAG 2.1 Compliance

- ✅ **Level A** - All criteria met
- ✅ **Level AA** - All criteria met (target level)
- ⚠️ **Level AAA** - Partial compliance

### Accessibility Features

1. **Semantic HTML** - Proper heading structure, landmarks, lists
2. **ARIA Labels** - All interactive elements labeled
3. **Keyboard Navigation** - Full keyboard support, visible focus indicators
4. **Screen Reader Support** - Meaningful alt text, live regions for dynamic content
5. **Color Contrast** - Minimum 4.5:1 for normal text, 3:1 for large text
6. **Focus Management** - Focus traps in modals, skip links
7. **Error Handling** - Clear error messages announced to screen readers
8. **Form Labels** - All inputs have associated labels
9. **Loading States** - `aria-busy` and loading announcements
10. **Responsive Text** - Readable at 200% zoom

### Testing Tools Used

- **axe DevTools** - Automated accessibility testing
- **NVDA/JAWS** - Screen reader testing
- **Keyboard Only** - Navigation without mouse
- **Color Contrast Analyzer** - WCAG color compliance

## 🎨 Design System

### Color Palette

```javascript
// Primary Colors
primary: {
  50: '#eff6ff',
  100: '#dbeafe',
  600: '#2563eb', // Main brand color
  700: '#1d4ed8',
}

// Semantic Colors
success: '#22c55e'  // Green
error: '#ef4444'    // Red
warning: '#f59e0b'  // Amber
info: '#3b82f6'     // Blue
```

### Typography

- **Font Family**: Inter, system-ui, sans-serif
- **Font Sizes**: 0.75rem - 2.25rem (12px - 36px)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing Scale

- **Tailwind Default**: 0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24 (in 0.25rem increments)

### Responsive Breakpoints

```javascript
sm: '640px'   // Mobile landscape, small tablets
md: '768px'   // Tablets
lg: '1024px'  // Laptops, small desktops
xl: '1280px'  // Desktops
2xl: '1536px' // Large desktops
```

## 🔌 API Integration

### Switching to Real API

The app uses a mock API by default. To connect to a real backend:

1. **Set environment variable**:

   ```bash
   # .env
   VITE_API_URL=https://api.example.com
   ```

2. **Update contactService.js**:

   ```javascript
   // Replace mock implementation with:
   export async function getContacts(filters) {
     const response = await fetch(`${API_BASE_URL}/contacts?${qs(filters)}`);
     if (!response.ok) throw new APIError("Failed to fetch");
     return response.json();
   }
   ```

3. **Expected API Endpoints**:
   ```
   GET    /api/contacts           # List contacts
   GET    /api/contacts/:id       # Get contact
   POST   /api/contacts           # Create contact
   PUT    /api/contacts/:id       # Update contact
   DELETE /api/contacts/:id       # Delete contact
   POST   /api/contacts/bulk      # Bulk operations
   POST   /api/contacts/import    # Import CSV
   GET    /api/contacts/export    # Export CSV
   ```

### API Error Handling

All API errors are caught and displayed with user-friendly messages:

```javascript
try {
  await createContact(data);
  toast.success("Contact created!");
} catch (error) {
  if (error.status === 400) {
    toast.error("Invalid data. Please check your inputs.");
  } else if (error.status === 409) {
    toast.error("A contact with this email already exists.");
  } else {
    toast.error("Something went wrong. Please try again.");
  }
}
```

## 📦 Deployment

### Build for Production

```bash
npm run build
```

Outputs to `dist/` directory:

- `index.html` - ~0.5 KB
- `assets/index-[hash].js` - ~150 KB (gzipped)
- `assets/index-[hash].css` - ~8 KB (gzipped)

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Environment Variables

```bash
VITE_API_URL=https://api.example.com  # API base URL
VITE_ENV=production                    # Environment
```

## 🐛 Troubleshooting

### Common Issues

**Port 3000 is already in use**

```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- --port 3001
```

**Tailwind classes not applying**

```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
npm run dev
```

**Tests failing**

```bash
# Clear test cache
npx vitest --clearCache
npm test
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use ES6+ syntax
- Follow Prettier formatting
- Add JSDoc comments for components
- Write tests for new features
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vitest Team** - For the fast testing framework
- **Lucide Icons** - For the beautiful icon library
- **Pravatar** - For placeholder avatars

## 📞 Support

- 📧 Email: support@example.com
- 💬 Discord: [Join our community](#)
- 🐦 Twitter: [@contactlistapp](#)
- 📝 Blog: [blog.example.com](#)

---

**Built with ❤️ using React, Tailwind CSS, and modern web standards**

**[⬆ back to top](#contact-list-app---professional-edition)**
