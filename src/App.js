import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {NavBar} from "./components/NavBar/NavBar"
import {Login, Register, Home} from "./pages"

function App() {
  return (
    <Router >
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} exact/>
        <Route path="/register" component={Register} exact/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
