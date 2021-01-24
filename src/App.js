import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {NavBar} from "./components/NavBar/NavBar"
import {Login} from "./pages"

function App() {
  return (
    <Router >
      <NavBar />
      <Switch>
        <Route path="/login" component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
