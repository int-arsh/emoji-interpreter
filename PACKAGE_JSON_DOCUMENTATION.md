# Package.json Documentation

This file explains what each section and line in `package.json` does in simple terms.

## Project Metadata
```json
"name": "emoji-interpreter"    // Project name - used by npm/yarn to identify your package
"private": true               // Prevents accidental publishing to npm registry
"version": "0.0.0"           // Current version of your project (semantic versioning)
"type": "module"             // Tells Node.js to treat .js files as ES modules (import/export syntax)
```

## Scripts
These are commands you can run with `npm run <script-name>`:

```json
"scripts": {
  "dev": "vite",           // Start development server with hot reload
  "build": "vite build",   // Create production-ready files in 'dist' folder
  "lint": "eslint .",      // Check code for style and potential errors
  "preview": "vite preview" // Preview the built production files locally
}
```

## Production Dependencies
These packages are needed when your app runs in production:

```json
"dependencies": {
  "react": "^19.1.0",      // Main React library for building UI components
  "react-dom": "^19.1.0"   // React's DOM rendering package for web browsers
}
```

## Development Dependencies
These packages are only needed during development (not in production):

```json
"devDependencies": {
  "@eslint/js": "^9.29.0",                    // ESLint's JavaScript rules
  "@types/react": "^19.1.8",                  // TypeScript definitions for React
  "@types/react-dom": "^19.1.6",              // TypeScript definitions for React DOM
  "@vitejs/plugin-react": "^4.5.2",           // Vite plugin for React support
  "eslint": "^9.29.0",                        // Code linting tool
  "eslint-plugin-react-hooks": "^5.2.0",      // ESLint rules for React Hooks
  "eslint-plugin-react-refresh": "^0.4.20",   // ESLint rules for React Refresh
  "globals": "^16.2.0",                       // Global variables definitions for ESLint
  "vite": "^7.0.0"                            // Fast build tool and dev server
}
```

## Version Numbers Explained
- `^19.1.0` means "19.1.0 or higher, but less than 20.0.0"
- This allows for bug fixes and minor updates while avoiding breaking changes 