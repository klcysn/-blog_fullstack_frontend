import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {createContext, useEffect, useState} from "react"
import "./App.css"
import {NavBar} from "./components/NavBar/NavBar"
import {Footer} from "./components/Footer/Footer"
import {Login, Register, Home, PostDetail, PostForm, TopPosts} from "./pages"
import axios from "axios"

export const AuthContext = createContext()


function App() {
  const [Authorization, setAuthorization] = useState(localStorage.getItem("Authorization") ? localStorage.getItem("Authorization") : "")
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser"))
  const [force, setForce] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(()=>{
    axios.get("https://blog-fullstack-backend.herokuapp.com/auth/user/",{
        headers: {
          'Authorization': `Token ${Authorization}`
        } 
        }).then(({data})=>{
          setCurrentUser(data.pk)
          localStorage.setItem("currentUser", data.pk)
        })
      },[Authorization])
  
  return (
    <div className="appContainer">
      <AuthContext.Provider value={{Authorization, setAuthorization, currentUser, setCurrentUser, force, setForce, selectedCategory, setSelectedCategory}}>
      <Router >
        <NavBar />
        <Switch>
          <Route path="/login" component={Login} exact/>
          <Route path="/register" component={Register} exact/>
          <Route path="/post-detail/:slug" component={PostDetail} exact/>
          <Route path="/post-send/" component={PostForm} exact/>
          <Route path="/top-posts/" component={TopPosts} exact/>
          <Route path="/" component={Home}/>
        </Switch>
        <Footer />
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
