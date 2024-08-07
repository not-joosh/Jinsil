/*================================================================================
*               DEPENDENCIES
==================================================================================*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AUTH, HOME, LANDINGPAGE } from "./lib/routes";
import { LandingPage } from "./components/views/LandingPage";
import { AuthView } from "./components/views/Auth";
import { Toaster } from "./components/ui/toaster";  
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
        <Route path = {HOME} element = {<div>Home</div>} />
        <Route path = {AUTH} element = {<AuthView />} />
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
