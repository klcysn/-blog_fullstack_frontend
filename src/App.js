import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {NavBar} from "./components/NavBar/NavBar"
import {Login, Register, Home, PostDetail, PostForm} from "./pages"

function App() {
  return (
    <Router >
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} exact/>
        <Route path="/register" component={Register} exact/>
        <Route path="/post-detail/:slug" component={PostDetail} exact/>
        <Route path="/post-send/" component={PostForm} exact/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
