import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from './Footer'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="MainContent" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
