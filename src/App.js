import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import AllProfiles from './pages/SearchResults';
import UpdateUserProfile from './pages/User/UpdateUserProfile';
import PartnerPreferences from './pages/User/PartnerPreferences';
import UserProfile from './pages/User/UserProfile';
import ComingSoon from './pages/ComingSoon';
import Footer from './pages/layouts/Footer';
import { AuthProvider } from './context/AuthContext';  // Correct import for AuthProvider
import MainMenu from "./pages/layouts/menus/MainMenu";
import ProfileDetails from "./pages/ProfileDetails";
import RefundPolicy from "./pages/RefundPolicy";
import Matches from "./pages/Matches";
import NotFound from "./pages/NotFound";
import { Provider } from 'react-redux';  // Import redux provider
import { store } from './store';  // Import your redux store
import PaymentStatus from './components/PaymentStatus';
import UserPlan from "./pages/User/UserPlan";
import VerifyOtp from "./pages/VerifyOtp";
import PaymentResponse from '../src/components/PaymentResponse';
import PaymentCancel from '../src/components/PaymentCancel';
function App() {
  return (
    <Provider store={store}> {/* Wrap with Provider for Redux */}
      <AuthProvider> {/* Wrap with AuthProvider for authentication context */}
        <Router>
          {/* Wrap your app layout */}
          <MainMenu /> {/* Moved outside of Routes for consistency across all pages */}
          <div className="App">
            <Routes>
              <Route path="/" element={<><Home /><Footer /></>} />
              <Route path="/home" element={<><Home /><Footer /></>} />
              <Route path="/login" element={<><Login /><Footer /></>} />
              <Route path="/register" element={<><Register /><Footer /></>} />
              <Route path="/pricing" element={<><Pricing /><Footer /></>} />
              <Route path="/contact" element={<><Contact /><Footer /></>} />
              <Route path="/about" element={<><About /><Footer /></>} />
              <Route path="/logout" element={<><Logout /><Footer /></>} />
              <Route path="/edituserprofile" element={<><UpdateUserProfile /><Footer /></>} />
              <Route path="/partnerpreferences" element={<><PartnerPreferences /><Footer /></>} />
              <Route path="/userprofile" element={<><UserProfile /><Footer /></>} />
              <Route path="/allprofiles" element={<><AllProfiles /><Footer /></>} />
              <Route path="/matches" element={<><Matches /><Footer /></>} />
              <Route path="/profiledetails/:id" element={<><ProfileDetails /><Footer /></>} />
              <Route path="*" element={<NotFound />} />
              <Route path="/comingsoon" element={<ComingSoon />} />
              <Route path="/privacypolicy" element={<><PrivacyPolicy /><Footer /></>} />
              <Route path="/termsconditions" element={<><TermsConditions /><Footer /></>} />
              <Route path="/refundpolicy" element={<><RefundPolicy /><Footer /></>} />
              <Route path="/PaymentStatus" element={<><PaymentStatus /><Footer /></>} />
              <Route path="/UserPlan" element={<><UserPlan /><Footer /></>} />
              <Route path="/VerifyOtp" element={<><VerifyOtp /><Footer /></>} />
              <Route path="/payment-response" element={<PaymentResponse />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
