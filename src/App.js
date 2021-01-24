import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {NavBar} from "./components/NavBar/NavBar"
import {Login, Register} from "./pages"

function App() {
  return (
    <Router >
      <NavBar />
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
    </Router>
  );
}

export default App;
