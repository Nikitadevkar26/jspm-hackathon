<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->


admin-dashboard/
├── public/                         # Static assets (logos, icons, etc.)
│
├── src/
│   ├── assets/                     # Images, icons, etc.
│   ├── components/                 # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Card.jsx
│   │   ├── Table.jsx
│   │   ├── ScoreModal.jsx
│   │   └── EmailModal.jsx
│   │
│   ├── context/                    # Context API for global state (if needed)
│   │   └── AdminContext.jsx
│   │
│   ├── hooks/                      # Custom hooks (fetching data, etc.)
│   │   └── useFetch.js
│   │
│   ├── layouts/                    # Page Layouts (with sidebar, navbar)
│   │   └── AdminLayout.jsx
│   │
│   ├── pages/                      # Main Admin Pages
│   │   ├── Dashboard.jsx           # Stats (registrations count, quick insights)
│   │   ├── Registrations.jsx       # All registrations list
│   │   ├── Applications.jsx        # Problem statement submissions
│   │   ├── Scoring.jsx             # Score and categorize teams
│   │   ├── SelectedTeams.jsx       # View selected teams
│   │   └── NonSelectedTeams.jsx    # View rejected teams
│   │
│   ├── services/                   # API calls
│   │   ├── api.js                  # Axios instance / fetch wrapper
│   │   ├── registrations.js        # Registrations-related API
│   │   ├── applications.js         # Applications-related API
│   │   └── email.js                # Email sending API
│   │
│   ├── utils/                      # Helper functions
│   │   ├── formatDate.js
│   │   └── scoreUtils.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                   # Tailwind/global CSS
│
├── package.json
└── vite.config.js

use the following cmds to install the required libraries:
 - npm install react-router-dom
 - npm install lucide-react
 - npm install react-icons