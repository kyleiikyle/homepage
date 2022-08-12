import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/Navbar";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import ErrorMessage from "./Pages/ErrorMessage";
import Help from "./Pages/Help/Help";
import ContactUs from "./Pages/ContactUs/ContactUs";
import organise from "./Pages/Organise/organise";
import find from "./Pages/Find/find";
import userProfile from "./Pages/UserProfile/userProfile";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/home" component={Landing} />
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/find" component={find} />
          <Route exact path="/userProfile" component={userProfile} />
          <Route exact path="/organise" component={organise} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/contactUs" component={ContactUs} />
          <Route exact path="/error" component={ErrorMessage} />
          <Redirect to="/error" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
