# Contact List Application# Contact List Application# Contact List Application# Contact List Application

A modern, responsive React contact management application built with Vite and a handcrafted design system.A modern React contact management application with CRUD operations, search, filtering, and CSV import/export.A modern, feature-rich React contact management application built with Vite and a handcrafted design system.A modern, responsive React contact list application built with Vite and a handcrafted design system.

## Features## Features## Features## Features

- **Contact Management** – Add, edit, and delete contacts with validation- Add, edit, and delete contacts### Core Features✨ **Core Features:**

- **Dual View Modes** – Toggle between card grid and sortable table layouts

- **Advanced Search & Filter** – Search by name with field-specific filters- Search and filter contacts

- **Bulk Operations** – Multi-select contacts for batch deletion or CSV export

- **CSV Import/Export** – Import contacts from CSV files and export selections- Card and table view modes- **Dual View Modes**: Toggle between card grid and sortable table layouts- 📋 View contacts in a refined card-based layout

- **Responsive Design** – Mobile-first UI that adapts to all screen sizes

- **Activity Tracking** – Log of recent changes and operations- Bulk selection and operations

## Tech Stack- CSV import/export- **Advanced Filtering**: Search across all fields with granular field-specific filters - 🔍 Search contacts by name in real-time

- React 18 – UI library- Responsive design

- Vite 5 – Build tool and dev server

- Vitest 4 – Testing framework- Toast notifications- **Contact Management**: Create, edit, and delete contacts with comprehensive validation- ➕ Add new contacts with validation and extended fields

- Lucide React – Icon system

- Custom CSS – Design system with CSS variables## Tech Stack- **Bulk Operations**: Multi-select contacts for batch deletion or CSV export- 🗑️ Delete contacts from the list

## Installation- React 18- **CSV Import/Export**: Import contacts from CSV files and export selected contacts- �️ Open a detail modal for the full contact profile

```bash- Vite 5

# Install dependencies

npm install- Vitest 4- **Sorting & Pagination**: Sort by any column and customize page size (6, 9, 12, 18, 24)- �📱 Fully responsive design (mobile, tablet, desktop)



# Start development server- Lucide React (icons)

npm run dev

- Custom CSS- **Detailed View**: Full contact modal with edit/delete actions

# Build for production

npm run build## Installation- **Avatar Support**: Display profile images with graceful fallback to initials## Tech Stack

```

`````bash- **Toast Notifications**: User feedback for all actions (success, info, error)

## Usage

# Install dependencies

### Adding Contacts

Click "Add Contact" to open the form. Fill in required fields (name, email, phone) and optional fields (company, role, address, birthday, notes, tags, avatar).npm install- **Activity Log**: Track recent changes and operations (last 10 activities)- **React 18** – UI library



### Search & Filter

Use the search bar to find contacts by name. Click "Filters" to show/hide advanced field-specific filters.

# Start development server- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support- **Vite** – Fast build tool and dev server

### View Modes

Toggle between Card View (grid layout with avatars) and Table View (sortable columns with pagination).npm run dev



### Bulk Actions- **Fully Responsive**: Mobile-first design that works on all devices- **Custom CSS / PostCSS** – Design system and build tooling

Select multiple contacts using checkboxes. Use the bulk actions bar to delete or export selected contacts to CSV.

# Build for production

### CSV Operations

Import contacts by clicking "Import CSV" and selecting a file. Export all or selected contacts using the "Export CSV" button.npm run build- **Lucide React** – Icon system



## Project Structure



```# Run tests## Tech Stack

src/

├── components/       # UI components (ContactCard, ContactTable, etc.)npm test

├── contexts/         # React context (ContactContext)

├── hooks/           # Custom hooks (useToasts)```## Installation & Setup

├── services/        # Business logic (contactService)

├── data/            # Mock data (mockContacts)

└── utils/           # Utilities (CSV parser)

```## Usage- **React 18.2.0** - UI library with hooks



## Scripts



- `npm run dev` – Start development server### Adding Contacts- **Vite 5.0.8** - Lightning-fast build tool and dev server### Prerequisites

- `npm run build` – Build for production

- `npm run preview` – Preview production buildClick "Add Contact" button, fill the form (name required), and save.

- `npm test` – Run tests

- `npm run lint` – Check code quality- **Lucide React 0.454.0** - Beautiful icon system



## Browser Support### Search & Filter



Modern browsers with ES2020 support (Chrome, Firefox, Safari, Edge).Use the search bar or click "Filters" for advanced filtering.- **Custom CSS** - Handcrafted design system with CSS custom properties- Node.js (v16 or higher)



## License



MIT### View Modes- **PostCSS + Autoprefixer** - CSS processing and browser compatibility- npm or yarn


Toggle between card grid and sortable table views.

## Installation & Setup### Local Development

### Bulk Actions

Select multiple contacts using checkboxes, then delete or export.### Prerequisites1. **Clone the repository**



### CSV Operations\`\`\`bash

- **Import**: Click "Import CSV" and select file

- **Export**: Select contacts and click "Export CSV"- Node.js (v16 or higher) git clone <your-repo-url>



## Project Structure- npm or yarn cd contact-list-app



```  \`\`\`

src/

├── components/     # UI components### Local Development

├── services/       # API services

├── hooks/          # Custom hooks2. **Install dependencies**

├── utils/          # Utilities

├── data/           # Mock data1. **Clone the repository** \`\`\`bash

└── test/           # Tests

```   ````bash npm install



## Scripts   git clone <your-repo-url>   \`\`\`



```bash   cd my-app

npm run dev        # Development server

npm run build      # Production build   ```3. **Start development server**

npm run preview    # Preview build

npm test           # Run tests   \`\`\`bash

npm run lint       # Lint code

```   ````



## Browser Support1. **Install dependencies** npm run dev



Modern browsers (Chrome, Firefox, Safari, Edge)   ```bash   \`\`\`



## License   npm install The app will open at `http://localhost:3000`



MIT   ```


`````

1. **Build for production**

1. **Start development server** \`\`\`bash

   ```bash npm run build

   npm run dev   \`\`\`

   ```

   The app will open at `http://localhost:3000`5. **Preview production build**

   \`\`\`bash

1. **Build for production** npm run preview

   ```bash   \`\`\`

   npm run build

   ```## Project Structure

   ```

1. **Preview production build**\`\`\`

   ````bashcontact-list-app/

   npm run preview├── src/

   ```│ ├── components/
   ````

│ │ ├── Header.jsx # App header

## Project Structure│ │ ├── SearchBar.jsx # Search functionality

│ │ ├── ContactList.jsx # Contacts grid display

````│ │ ├── ContactCard.jsx # Interactive contact card

my-app/│ │ ├── ContactDetails.jsx # Detail modal

├── src/│ │ └── AddContactForm.jsx # Add contact form

│   ├── components/│ ├── data/

│   │   ├── Header.jsx              # App header│ │ └── mockContacts.js # Mock contact data

│   │   ├── FiltersBar.jsx          # Search and filter controls│ ├── App.jsx # Main app component

│   │   ├── ContactList.jsx         # Grid view of contacts│ ├── main.jsx # React entry point

│   │   ├── ContactCard.jsx         # Individual contact card│ └── index.css # Global styles & design tokens

│   │   ├── ContactTable.jsx        # Table view with sorting├── index.html # HTML entry point

│   │   ├── ContactDetails.jsx      # Detail modal├── vite.config.js # Vite configuration

│   │   ├── AddContactForm.jsx      # Create/edit form├── postcss.config.js # PostCSS configuration

│   │   ├── BulkActionsBar.jsx      # Multi-select actions└── package.json # Dependencies

│   │   ├── PaginationControls.jsx  # Page navigation\`\`\`

│   │   ├── Avatar.jsx              # Profile image component

│   │   ├── ToastStack.jsx          # Notification system## Usage

│   │   └── ActivityPanel.jsx       # Recent activity log

│   ├── hooks/### Viewing Contacts

│   │   └── useToasts.js            # Toast notification hook

│   ├── utils/- All contacts are displayed in a responsive grid layout

│   │   └── csv.js                  # CSV import/export utilities- Each contact card shows name, title, company, email, phone, and address

│   ├── data/- Click on email or phone to open default mail/phone app

│   │   └── mockContacts.js         # Sample contact data

│   ├── App.jsx                     # Main app orchestrator### Searching Contacts

│   ├── main.jsx                    # React entry point

│   └── index.css                   # Complete design system- Type in the search bar to filter contacts by name

├── index.html                      # HTML entry point- Search is case-insensitive and real-time

├── vite.config.js                  # Vite configuration- Shows count of filtered vs total contacts

├── postcss.config.js               # PostCSS configuration

├── eslint.config.mjs               # ESLint configuration### Adding Contacts

└── package.json                    # Dependencies

```1. Click the "Add Contact" button

2. Fill in the contact details (name is required)

## Usage Guide3. Email, phone, and website inputs are validated

4. Click "Add Contact" to save or "Cancel" to close

### Viewing Contacts

### Viewing Details

- **Card View**: Click the "Cards" button to see contacts in a responsive grid

- **Table View**: Click the "List" button for a sortable table with sticky headers- Click or press Enter on any contact card to open the detail modal

- Each contact displays name, title, company, email, phone, and address- The modal supports keyboard dismissal (Escape) and background click

- Click email/phone links to open default mail/phone apps- Notes, website, and company data appear when available

- Profile images load from URLs or show initials as fallback

### Deleting Contacts

### Searching & Filtering

- Click the trash icon on any contact card to delete it

- Use the main search bar to filter across all contact fields- Deletion is immediate

- Click "Advanced" to reveal field-specific filters (name, email, phone, company)

- Click "Clear" to reset all filters## Design Decisions

- Filter count updates in real-time

### Architecture

### Adding Contacts

- **Component-based**: Each feature is a separate, reusable component

1. Click the "Add Contact" button- **State management**: Uses React hooks (useState, useMemo) for simplicity

2. Fill in contact details:- **Responsive design**: Mobile-first approach with custom CSS modules and design tokens

   - **Name** (required)

   - Title, Company### Features

   - Email (validated format)

   - Phone (validated format)- **Real-time search**: Uses useMemo for optimized filtering

   - Website (validated URL)- **Form validation**: Client-side validation for email, phone, and website

   - Address- **Mock data**: Pre-populated with sample contacts for demo

   - Notes- **Accessible**: Semantic HTML, ARIA attributes, and keyboard support

   - Profile Image URL (validated URL)

3. Click "Add Contact" to save or "Cancel" to close### Styling

4. Validation errors appear inline below each field

- **Design tokens**: Custom CSS variables for color, shadow, and radius

### Editing Contacts- **Color scheme**: Professional blue/green theme

- **Responsive grid**: 1 column on mobile, 2 on tablet, 3 on desktop

1. Click on any contact card or click "View" in table row

2. In the detail modal, click the "Edit" button## Assumptions

3. Modify fields in the edit form

4. Click "Save Changes" or "Cancel"1. **Data persistence**: Currently uses in-memory state. For production, integrate with a backend API

2. **Authentication**: No user authentication implemented

### Deleting Contacts3. **Validation**: Basic client-side validation only

4. **Unique IDs**: Uses timestamp-based IDs for new contacts

- **Single**: Click trash icon on contact card, or "Delete" in detail modal5. **No duplicate prevention**: Users can add duplicate contacts

- **Bulk**: Select multiple contacts via checkboxes, then click "Delete" in bulk actions bar

- Deletion closes any open modals/forms for affected contacts## Future Enhancements



### Bulk Operations- 📊 Backend API integration for data persistence

- 🔐 User authentication and authorization

1. Select contacts using checkboxes (in card view or table view)- 📤 Import/Export contacts (CSV, vCard)

2. Click "Select all contacts on this page" checkbox to select visible contacts- 🔔 Contact groups and categories

3. Bulk actions bar appears showing count- 📞 Call/SMS integration

4. Click "Delete" to remove selected contacts- 🌙 Dark mode support

5. Click "Export CSV" to download selected contacts- 🔄 Undo/Redo functionality

6. Click "Clear" to deselect all- 📧 Email templates



### CSV Import/Export## Deployment



**Import:**### Static Host (Netlify, Render, etc.)

1. Click "Import CSV" button

2. Select a CSV file with headers: name, title, company, email, phone, address, website, notes1. Push your code to GitHub

3. Contacts are validated and added to your list2. Create a new project on your preferred static host (Netlify, Render, Cloudflare Pages, etc.)

4. Toast notification confirms import count3. Set the build command to `npm run build`

4. Set the publish directory to `dist`

**Export:**5. Trigger the deployment

1. Select contacts to export using checkboxes

2. Click "Export CSV" in bulk actions bar### Deploy to GitHub Pages

3. CSV file downloads with timestamp in filename

1. Update `vite.config.js`:

### Sorting & Pagination   \`\`\`js

   export default defineConfig({

- **Sorting**: Click column headers in table view to sort (click again to reverse)   base: '/contact-list-app/',

- **Page Size**: Choose 6, 9, 12, 18, or 24 contacts per page   // ... rest of config

- **Navigation**: Use arrow buttons or page numbers to navigate   })

- Current page auto-adjusts if it exceeds total pages after deletion/filtering   \`\`\`

2. Run: `npm run build`

### Activity Log3. Push the `dist` folder to `gh-pages` branch



- Appears at the bottom when there are recent activities## Browser Support

- Shows last 10 operations (add, edit, delete, import)

- Displays timestamp for each activity- Chrome (latest)

- Firefox (latest)

### Toast Notifications- Safari (latest)

- Edge (latest)

- **Success** (green): Contact added, updated, exported

- **Info** (blue): Contact deleted, selection cleared## License

- **Error** (red): Import failed, validation errors

- Automatically dismiss after 4.5 seconds or click X to closeMIT License - feel free to use this project for personal or commercial purposes.



## Design System## Support



### Color PaletteFor issues or questions, please open an issue on GitHub or contact the maintainer.


- **Primary**: Blue (`#2563eb` / `#1e40af`)
- **Accent**: Sky Blue (`#38bdf8`)
- **Success**: Green (`#22c55e`)
- **Surface**: White with transparency (`rgba(255, 255, 255, 0.92)`)
- **Text**: Slate (`#0f172a`)
- **Muted**: Slate 500 (`#64748b`)

### Components

- **Cards**: Glassmorphism effect with backdrop blur
- **Buttons**: Gradient backgrounds with hover lift effect
- **Forms**: Rounded inputs with focus states
- **Modals**: Centered overlay with blur backdrop
- **Tables**: Sticky headers with hover row highlighting

### Responsive Breakpoints

- **Desktop**: 769px+ (3 columns, full features)
- **Tablet**: 520-768px (2 columns, adjusted spacing)
- **Mobile**: <520px (1 column, stacked layouts)

## Architecture Decisions

### State Management

- **Local State**: Uses React `useState` for all app state
- **Derived State**: `useMemo` for filtered, sorted, and paginated data
- **No External Libraries**: Deliberately avoided Redux/Zustand for simplicity

### Component Design

- **Composition**: Small, focused components with single responsibilities
- **Props**: Unidirectional data flow with callback props for actions
- **Accessibility**: Semantic HTML, ARIA attributes, keyboard support built-in

### Form Handling

- **Unified Form**: Single `AddContactForm` component handles both create and edit modes
- **Validation**: Client-side validation with regex patterns for email, phone, website, avatar
- **Controlled Inputs**: All form fields use controlled component pattern

### Data Persistence

- **In-Memory**: Currently uses `useState` with mock data
- **No Backend**: Ready for API integration (see Future Enhancements)

## Assumptions

1. **Data Persistence**: App state resets on page reload (no localStorage or backend)
2. **Unique IDs**: New contacts use `Date.now()` + `Math.random()` for uniqueness
3. **CSV Format**: Import expects specific column headers (case-sensitive)
4. **Avatar URLs**: Must be valid HTTP/HTTPS URLs (validated on input)
5. **No Duplicates**: App allows duplicate names/emails (no deduplication logic)
6. **Browser Support**: Modern browsers with ES6+ support required

## Future Enhancements

### Planned Features

- Backend API integration (REST or GraphQL)
- User authentication and authorization
- Contact groups and tags
- Advanced search with boolean operators
- Contact history and audit logs
- Dark mode support
- Undo/Redo functionality
- Drag-and-drop avatar upload
- vCard import/export
- Email templates and bulk email
- Integration with calendar apps
- Contact sharing and collaboration
- Offline support with service workers
- Internationalization (i18n)

### Technical Improvements

- TypeScript migration for type safety
- PropTypes for runtime type checking
- Error boundaries for graceful error handling
- React Testing Library + Vitest for unit tests
- Playwright for E2E tests
- Storybook for component documentation
- Performance profiling and optimization
- Code splitting and lazy loading
- Progressive Web App (PWA) support

## Deployment

### Static Hosting (Netlify, Vercel, Cloudflare Pages)

1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Manual Deploy

```bash
npm run build
# Upload dist/ folder to your static host
````

### Environment Variables

No environment variables required for basic deployment. For API integration:

```
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_api_key
```

## Browser Support

- Chrome 90+ (latest)
- Firefox 88+ (latest)
- Safari 14+ (latest)
- Edge 90+ (latest)

## Performance

- **Bundle Size**: ~180KB JS (gzipped: ~56KB)
- **CSS Size**: ~24KB (gzipped: ~5KB)
- **Lighthouse Score**:
  - Performance: 95+
  - Accessibility: 100
  - Best Practices: 95+
  - SEO: 100

## Troubleshooting

### Build Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Dev Server Not Opening

- Check if port 3000 is already in use
- Manually navigate to `http://localhost:3000`
- Change port in `vite.config.js`

### Import Errors

- Ensure CSV file has correct headers
- Check file encoding (UTF-8 recommended)
- Verify no extra commas or malformed rows

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or feature requests:

- Open an issue on GitHub
- Contact the maintainer

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Avatar images from [Pravatar](https://pravatar.cc/)
- Inspired by modern CRM and contact management systems

---

Built with ❤️ using React and Vite
#   t r i a A s s i g n m e n t  
 