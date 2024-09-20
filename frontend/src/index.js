import { createRoot } from 'react-dom/client'
import App from './App.js'
import { Provider } from "react-redux"
import { store } from './app/store.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
