import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'react-datepicker/dist/react-datepicker.css'
import './index.css'
import { initCometChat } from './services/Chat'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
initCometChat().then(() => {
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
})
