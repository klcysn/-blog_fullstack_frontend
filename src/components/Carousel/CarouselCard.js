import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import {useHistory} from "react-router-dom"
import { FetchData } from "../../helper/FetchData";
import {AuthContext} from "../../App"
import axios from "axios"

const useStyles = makeStyles({
  root: {
    width: "40rem",
    height: "40rem",
    borderRadius: "55rem",
    overflow: "hidden",
    boxShadow: "0px 0px 3px 5px lightpink",
    cursor: "pointer"
  },
  media: {
    height: "25rem",
  },
  content: {
    padding: "0rem 3rem 6rem 3rem",
  },
  head: {
    padding: "1rem",
  },
});

export function CarouselCard({checked, direction, post}) {
  const {currentUser, Authorization} = useContext(AuthContext)
  const history = useHistory()
  const classes = useStyles();
  const [viewed, setViewed] = useState(false)

  useEffect(()=>{

    FetchData(`https://blog-fullstack-backend.herokuapp.com/post-view/${post?.slug}`)
    .then((data)=>{
      data.map((view)=>{
        if(view.user == currentUser){
          setViewed(true)
        }
      })
    })

},[post])

  const lookPost = () =>{
    if(!Authorization){
      return history.push(`/post-detail/${post.slug}`)
  }
  if(!viewed){
    axios.post(`https://blog-fullstack-backend.herokuapp.com/post-view/${post.slug}/`,{
      user: currentUser,
      post: post.pk
    },{
      headers:{
        "Authorization": `Token ${Authorization}`
    }
    })
    .then(()=>history.push(`/post-detail/${post.slug}`))
  }else{
    history.push({
      pathname: `/post-detail/${post.slug}`,
      state:{liked: true}
    })
}

}

  return (
    <Slide direction={direction} in={checked} mountOnEnter unmountOnExit>
      <Card className={classes.root} onClick={lookPost}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={post?.media || "/blog-image.png"}
            
          />
          <CardContent >
            <Typography
              align="center"
              className={classes.head}
              variant="h5"
              component="h2"
            >
              {post?.title.length>30 ? post?.title.slice(0, 29) + "..." : post?.title}
            </Typography>
            <Typography
              className={classes.content}
              align="center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {post?.content.length>130 ? post?.content.slice(0, 129) + "..." : post?.content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Slide>
  );
}
