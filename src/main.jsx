import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import JournalEntriesProvider from './contexts/EntriesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JournalEntriesProvider>
      {/* Putting the JournalEntriesProvider as a wrapper will provide whatever data we want to the whole tree, then placing App in between means
      that the app is also rendered as a child of this provider */}
      <App />
    </JournalEntriesProvider>
    
  </StrictMode>,
)
