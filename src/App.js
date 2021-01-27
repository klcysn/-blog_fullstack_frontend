import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {createContext, useState} from "react"
import "./App.css"
import {NavBar} from "./components/NavBar/NavBar"
import {Footer} from "./components/Footer/Footer"
import {Login, Register, Home, PostDetail, PostForm} from "./pages"

export const AuthContext = createContext()

function App() {
  const [Authorization, setAuthorization] = useState(localStorage.getItem("Authorization"))
  return (
    <div className="appContainer">
      <AuthContext.Provider value={{Authorization, setAuthorization}}>
      <Router >
        <NavBar />
        <Switch>
          <Route path="/login" component={Login} exact/>
          <Route path="/register" component={Register} exact/>
          <Route path="/post-detail/:slug" component={PostDetail} exact/>
          <Route path="/post-send/" component={PostForm} exact/>
          <Route path="/" component={Home}/>
        </Switch>
        <Footer />
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
