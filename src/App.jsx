import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'

const Shop = lazy(() => import('./pages/Shop'))
const ShopWomen = lazy(() => import('./pages/ShopWomen'))
const ShopMen = lazy(() => import('./pages/ShopMen'))
const CollectionNewArrivals = lazy(() => import('./pages/CollectionNewArrivals'))
const NewUsers = lazy(() => import('./pages/NewUsers'))
const NewUsersWomen = lazy(() => import('./pages/NewUsersWomen'))
const NewUsersMen = lazy(() => import('./pages/NewUsersMen'))
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
const DeliveryInformation = lazy(() => import('./pages/help/DeliveryInformation'))
const ReturnsPolicy = lazy(() => import('./pages/help/ReturnsPolicy'))
const ReviewsPolicy = lazy(() => import('./pages/help/ReviewsPolicy'))
const SubmitAFake = lazy(() => import('./pages/help/SubmitAFake'))
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex'))
const BlogCategory = lazy(() => import('./pages/blog/BlogCategory'))
const BlogTag = lazy(() => import('./pages/blog/BlogTag'))
const BlogArticle = lazy(() => import('./pages/blog/BlogArticle'))
const Stores = lazy(() => import('./pages/Stores'))
const ReferAFriend = lazy(() => import('./pages/ReferAFriend'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const Careers = lazy(() => import('./pages/Careers'))
const StudentDiscount = lazy(() => import('./pages/StudentDiscount'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Home stays eagerly imported (it's the index route and the one most
// visitors land on first); everything else is route-split so, e.g., the
// Stripe/Supabase code pulled in by account/login pages isn't part of the
// bundle a homepage visitor has to download and parse.
export default function App() {
  return (
    <Suspense fallback={null}>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="pages/shop-women" element={<ShopWomen />} />
          <Route path="pages/shop-men" element={<ShopMen />} />
          <Route path="collections/new-releases/:slug" element={<CollectionNewArrivals />} />
          <Route path="pages/new-users" element={<NewUsers />} />
          <Route path="pages/new-users/women" element={<NewUsersWomen />} />
          <Route path="pages/new-users/men" element={<NewUsersMen />} />
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
          <Route path="help/delivery-information" element={<DeliveryInformation />} />
          <Route path="help/returns-policy" element={<ReturnsPolicy />} />
          <Route path="help/reviews-policy" element={<ReviewsPolicy />} />
          <Route path="help/submit-a-fake" element={<SubmitAFake />} />
          <Route path="blog" element={<BlogIndex />} />
          <Route path="blog/category/:slug" element={<BlogCategory />} />
          <Route path="blog/tag/:slug" element={<BlogTag />} />
          <Route path="blog/article/:slug" element={<BlogArticle />} />
          <Route path="pages/stores" element={<Stores />} />
          <Route path="pages/refer-a-friend" element={<ReferAFriend />} />
          <Route path="pages/about-us" element={<AboutUs />} />
          <Route path="pages/careers" element={<Careers />} />
          <Route path="pages/student-discount" element={<StudentDiscount />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
