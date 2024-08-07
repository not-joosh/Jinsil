/*================================================================================
*               DEPENDENCIES
==================================================================================*/
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { AUTH, HOME, LANDINGPAGE, SETTINGS } from "./lib/routes";
import { LandingPage } from "./components/views/LandingPage";
import { AuthView } from "./components/views/Auth";
import { Toaster } from "./components/ui/toaster";  
import { HomePage } from "./components/views/HomePage";
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
        <Route path = {LANDINGPAGE} element = {<LandingPage />} /> 
        <Route path = {HOME} element = {<HomePage />}>
        </Route>
        <Route path = "certificate" element = {<div className = "text-black ">Certificates<Outlet /></div>}>
          <Route path = ":id" element = {<div className = "text-black ">id specific <Outlet /></div>}/>
        </Route>
        <Route path = {AUTH} element = {<AuthView />} />
        <Route path = {SETTINGS} element = {<div>Settings</div>} />

          {/* HANDLING ERROR ROUTRES */}
          {/* <Route path = "/home" element = {<>Hi</>}>
          <Route path = ":id" element = {<div className = "text-black ">id specific <Outlet /></div>}/>
          <Route path = "admin" element = {<>Admin<Outlet /></>}/>
          </Route> */}
        
        <Route path = "*" element = {<div>404</div>} />
      </Routes>
    </Router>
  );
};

export default App;
