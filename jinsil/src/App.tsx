/*================================================================================
*               DEPENDENCIES
==================================================================================*/
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { AUTH, HOME, LANDINGPAGE, SETTINGS } from "./lib/routes";
import { LandingPage } from "./components/views/LandingPage";
import { AuthView } from "./components/views/Auth";
import { Toaster } from "./components/ui/toaster";  
import { HomePage } from "./components/views/HomePage";
import { CertificatePage } from "./components/views/CertificatePage";
/*================================================================================
*               COMPONENTS AND ROUTES
==================================================================================*/



/*================================================================================
*               APP ENTRY (ROUTING)
==================================================================================*/
function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path={LANDINGPAGE} element={<LandingPage />} /> 
        <Route path={HOME} element={<HomePage />} />
        <Route path="certificate/:id" element={<CertificatePage />} />
        <Route path={AUTH} element={<AuthView />} />
        <Route path={SETTINGS} element={<div>Settings</div>} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
