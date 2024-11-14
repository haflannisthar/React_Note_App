import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import { BrowserRouter } from 'react-router-dom'
import AuthState from './Context/Context.jsx'
import { Provider } from 'react-redux';
import store from './Store/Store.js'



createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <ThemeProvider>
      <AuthState>
        <Provider store={store}> {/* Add the Provider here */}
          <App />
        </Provider>
      </AuthState>
    </ThemeProvider>

  </BrowserRouter>,
)
