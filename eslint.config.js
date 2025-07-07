// Import the recommended JavaScript ESLint rules
import js from '@eslint/js'
// Import browser globals (like window, document, etc.) for linting
import globals from 'globals'
// Import React Hooks linting rules to catch common mistakes
import reactHooks from 'eslint-plugin-react-hooks'
// Import React Refresh linting rules for Vite development
import reactRefresh from 'eslint-plugin-react-refresh'
// Import ESLint configuration utilities
import { defineConfig, globalIgnores } from 'eslint/config'

// Export the ESLint configuration
export default defineConfig([
  // Ignore the 'dist' folder globally (built files don't need linting)
  globalIgnores(['dist']),
  
  // Configuration for JavaScript and JSX files
  {
    // Apply this config to all .js and .jsx files
    files: ['**/*.{js,jsx}'],
    
    // Extend from these rule sets:
    extends: [
      js.configs.recommended,                    // Standard JavaScript best practices
      reactHooks.configs['recommended-latest'],  // React Hooks rules (useEffect, useState, etc.)
      reactRefresh.configs.vite,                 // React Refresh rules for Vite
    ],
    
    // Language-specific options
    languageOptions: {
      ecmaVersion: 2020,                         // Use ES2020 features
      globals: globals.browser,                  // Allow browser globals (window, document, etc.)
      parserOptions: {
        ecmaVersion: 'latest',                   // Use latest ECMAScript features
        ecmaFeatures: { jsx: true },             // Enable JSX parsing
        sourceType: 'module',                    // Treat files as ES modules
      },
    },
    
    // Custom rules
    rules: {
      // Allow unused variables that start with uppercase letters or underscores
      // (useful for React components and constants)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
