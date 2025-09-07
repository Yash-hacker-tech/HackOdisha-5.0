import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import { ClubsProvider } from './contexts/ClubsContext.jsx'
import { EventsProvider } from './contexts/EventsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ClubsProvider>
          <EventsProvider>
            <App />
            
          </EventsProvider>
        </ClubsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
