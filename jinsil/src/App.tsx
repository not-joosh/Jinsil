/*================================================================================
*               DEPENDENCIES
==================================================================================*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HOME, LANDINGPAGE } from "./lib/routes";
import { LandingPage } from "./components/views/LandingPage";

/*================================================================================
*               COMPONENTS AND ROUTES
==================================================================================*/



/*================================================================================
*               APP ENTRY (ROUTING)
==================================================================================*/
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path = {LANDINGPAGE} element = {<LandingPage />} /> 
        <Route path = {HOME} element = {<div>Home</div>} />
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
