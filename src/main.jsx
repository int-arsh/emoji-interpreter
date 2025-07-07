// Import React's StrictMode for additional development checks and warnings
import { StrictMode } from 'react'
// Import createRoot from React DOM for rendering React 18+ applications
import { createRoot } from 'react-dom/client'
// Import global CSS styles for the entire application
import './index.css'
// Import our main App component
import App from './App.jsx'

// Create a root container and render our React application
// This is the entry point where React takes over the DOM
createRoot(document.getElementById('root')).render(
  // StrictMode helps identify potential problems in development
  // It renders components twice to detect side effects
  <StrictMode>
    {/* Render our main App component */}
    <App />
  </StrictMode>,
)
