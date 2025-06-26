import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';



import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Aboutus from './Components/Aboutus';
import Contactus from './Components/Contactus';
import ProtectedRoute from './Components/Protection/Protectedroute';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Admin from './Components/Admin/Admin';
import SubmissionForm from './Components/SubmissionForm';
import IndianMemoryProject from './Components/Supoort';
import ProductList from './Components/Poruductlist';
import HathiwalasPage from './Components/Supoort';
import MobileSidebar from './Components/MobileSidebar';
import AddToCart from './Components/AddToCart';
import Checkout from './Components/Checkout';
import SubmissionView from './Components/Admin/Submissionviewpage';
import NineteenTen from './Components/pages/1910';
import NineteenHundred from './Components/pages/1900';
import NineteenTwenty from './Components/pages/1920';
import NineteenThirty from './Components/pages/1930';
import NineteenForty from './Components/pages/1940';
import NineteenFifty from './Components/pages/1950';
import NineteenSixty from './Components/pages/1960';
import NineteenSeventy from './Components/pages/1970';
import NineteenEighty from './Components/pages/1980';
import NineteenNinety from './Components/pages/1990';
import TwoThousand from './Components/pages/2000';
import LoveLetters from './Components/Letters/LoveLetters';
import FamilyLetters from './Components/Letters/FamilyLetters';
import WarPoliticalTurmoil from './Components/Letters/WarPoliticalTurmoil';
import Travel from './Components/Letters/Travel';
import DairyNewsPages from './Components/Letters/DairyNewsPages';
import CardsPostcards from './Components/Letters/CardsPostcards';
import MoviePoster from './Components/Letters/MoviePoster';
import Calendars from './Components/Letters/Calendars';
import Others from './Components/Letters/Others';
import FamousLetters from './Components/Letters/FamousLetters';
import FeaturedLetters from './Components/Letters/FeaturedLetters';
import FeaturedPhotographs from './Components/Letters/FeaturedPhotographs';
import DetailPage from './DetailPage';
import ProductForm from './Components/Admin/ProductAddForm';
import AllProducts from './Components/Admin/GetAllProducts';
import ProductDetail from './Components/Admin/ProductDetail';
import ProductUpdateForm from './Components/Admin/Updateproduct';
import FeaturedProducts from './Components/Admin/FeaturedProduct';
import ContactList from './Components/Admin/GetContact';
import ProductViewPage from './Components/Productviewpage';
import LetterSubmissionsPage from './Components/Admin/GetLetters';
import PhotographSubmissionsPage from './Components/Admin/GetPhotographs';
import { Sliders } from 'lucide-react';
import Article from './Components/ArticleDetail';
import PhotoGallery from './Components/PhotoGallery';
import LettersPage from './LetterPage';
import AdminSubmissionForm from './Components/Admin/AdminSubmissionForm';
import RouteChangeLoader from './Components/RouteChangeLoader';
import  SearchProvider  from './Components/SearchContext';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0.95 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }} // 👈 very light & fast
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 5000); // 5s initial load
    return () => clearTimeout(timer);
  }, []);



  return (
  <>
    <Toaster position="top-center" />
        <SearchProvider>

       
    <BrowserRouter>
        <RouteChangeLoader />

        <PageWrapper>
          <Routes>
              <Route element={<Navbar />} path="/" />
            <Route path="/sign" element={<Signup />} />
            <Route path="/log" element={<Login />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/sub" element={<SubmissionForm />} />
            <Route path="/support" element={<IndianMemoryProject />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/product-view/:id" element={<ProductViewPage />} />
            <Route path="/photo" element={<PhotoGallery />} />
            <Route path="/supp" element={<HathiwalasPage />} />
            <Route path="/mob" element={<MobileSidebar />} />
            <Route path="/cart" element={<AddToCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/submission/view/:id" element={<SubmissionView />} />
            <Route path="/1900" element={<NineteenHundred />} />
            <Route path="/1910" element={<NineteenTen />} />
            <Route path="/1920" element={<NineteenTwenty />} />
            <Route path="/1930" element={<NineteenThirty />} />
            <Route path="/1940" element={<NineteenForty />} />
            <Route path="/1950" element={<NineteenFifty />} />
            <Route path="/1960" element={<NineteenSixty />} />
            <Route path="/1970" element={<NineteenSeventy />} />
            <Route path="/1980" element={<NineteenEighty />} />
            <Route path="/1990" element={<NineteenNinety />} />
            <Route path="/2000" element={<TwoThousand />} />
            <Route path="/love" element={<LoveLetters />} />
            <Route path="/family" element={<FamilyLetters />} />
            <Route path="/war" element={<WarPoliticalTurmoil />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/dairy" element={<DairyNewsPages />} />
            <Route path="/cards" element={<CardsPostcards />} />
            <Route path="/movie" element={<MoviePoster />} />
            <Route path="/calenders" element={<Calendars />} />
            <Route path="/other" element={<Others />} />
            <Route path="/famous" element={<FamousLetters />} />
            <Route path="/featured" element={<FeaturedLetters />} />
            <Route path="/photographs" element={<FeaturedPhotographs />} />
            <Route path="/details/:id" element={<DetailPage />} />
            <Route path="/addproduct" element={<ProductForm />} />
            <Route path="/getallproducts" element={<AllProducts />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product/update/:id" element={<ProductUpdateForm />} />
            <Route path="/getcontact" element={<ContactList />} />
            <Route path="/featuredproduct" element={<FeaturedProducts />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/lettersubmissions" element={<LetterSubmissionsPage />} />
            <Route path="/photographsubmissions" element={<PhotographSubmissionsPage />} />
            <Route path="/aboutslider" element={<Sliders />} />
            <Route path="/letters" element={<LettersPage />} />
            <Route path="/adminsubmission" element={<AdminSubmissionForm />} />
<Route path="/search" element={<SearchResultsPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/routechangeloader" element={<RouteChangeLoader />} />
            </Route>
          </Routes>
        </PageWrapper>

        {/* Footer if global */}
        {/* <Footer /> */}

    </BrowserRouter>
     </SearchProvider>
  </>
  );
};

export default App;