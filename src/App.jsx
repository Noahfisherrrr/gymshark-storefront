import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Register from './pages/Register'
import AccountLayout from './pages/account/AccountLayout'
import AccountDetails from './pages/account/AccountDetails'
import AddressBook from './pages/account/AddressBook'
import OrderHistory from './pages/account/OrderHistory'
import Returns from './pages/account/Returns'
import ReferFriend from './pages/account/ReferFriend'
import Search from './pages/Search'
import Help from './pages/Help'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:productId" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="account" element={<AccountLayout />}>
          <Route index element={<AccountDetails />} />
          <Route path="addresses" element={<AddressBook />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="returns" element={<Returns />} />
          <Route path="refer-a-friend" element={<ReferFriend />} />
        </Route>
        <Route path="search" element={<Search />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
