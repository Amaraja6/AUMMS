import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/*browser router is a std library for routing in react---enables 
navigation between views of different components,browser url changes.*/
import Navbar from "./components/Navbar/Navbar"; //importing the different components into App.js file
import Home from "./components/PAGES/Home";
import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/SignUp/RegisterForm";
import SearchBar from "./components/Search/SearchBar";
import center from "./components/PAGES/center";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <Switch>
        <Route path="/login" exact component={LoginForm} />
      </Switch>
      <Switch>
        <Route path="/register" exact component={RegisterForm} />
      </Switch>
      <Switch>
        <Route path="/search" exact component={SearchBar} />
      </Switch>
      <Switch>
        <Route path="/card" exact component={center} />
      </Switch>
    </Router>
  );
}
export default App;
/*Switch helps to look for a path match in Route and render that particular URL,
 if Switch is not used all paths will be displayed at once.
 The exact param disables the partial matching for a route and makes sure that 
 it only returns the route if the path is an EXACT match to the current url.*/
