import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AccountPage from "./features/auth/pages/AccountPage";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import RequireAuth from "./features/auth/RequireAuth";
import HerbDetailPage from "./features/herbs/pages/HerbDetailPage";
import HerbSearchPage from "./features/herbs/pages/HerbSearchPage";
import RemediesPage from "./features/herbs/pages/RemediesPage";
import RemedyDetailPage from "./features/herbs/pages/RemedyDetailPage";
import TrailMapPage from "./features/trail-map/TrailMapPage";
import WellbeingCheckInPage from "./features/wellbeing/WellbeingCheckInPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="herbs" element={<HerbSearchPage />} />
        <Route path="herbs/:herbId" element={<HerbDetailPage />} />
        <Route path="remedies" element={<RemediesPage />} />
        <Route path="remedies/:remedyId" element={<RemedyDetailPage />} />
        <Route path="trail-map" element={<TrailMapPage />} />
        <Route path="check-in" element={<WellbeingCheckInPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route
          path="account"
          element={
            <RequireAuth>
              <AccountPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
