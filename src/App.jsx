import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'

const Shop = lazy(() => import('./pages/Shop'))
const ShopWomen = lazy(() => import('./pages/ShopWomen'))
const Product = lazy(() => import('./pages/Product'))
const Cart = lazy(() => import('./pages/Cart'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const AccountLayout = lazy(() => import('./pages/account/AccountLayout'))
const AccountOverview = lazy(() => import('./pages/account/AccountOverview'))
const AccountDetails = lazy(() => import('./pages/account/AccountDetails'))
const AddressBook = lazy(() => import('./pages/account/AddressBook'))
const OrderHistory = lazy(() => import('./pages/account/OrderHistory'))
const Returns = lazy(() => import('./pages/account/Returns'))
const ReferFriend = lazy(() => import('./pages/account/ReferFriend'))
const Search = lazy(() => import('./pages/Search'))
const Help = lazy(() => import('./pages/Help'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Home stays eagerly imported (it's the index route and the one most
// visitors land on first); everything else is route-split so, e.g., the
// Stripe/Supabase code pulled in by account/login pages isn't part of the
// bundle a homepage visitor has to download and parse.
export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="pages/shop-women" element={<ShopWomen />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<AccountOverview />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="returns" element={<Returns />} />
            <Route path="addresses" element={<AddressBook />} />
            <Route path="refer-a-friend" element={<ReferFriend />} />
            <Route path="details" element={<AccountDetails />} />
          </Route>
          <Route path="search" element={<Search />} />
          <Route path="help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
