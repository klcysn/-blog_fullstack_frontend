import Grow from "@material-ui/core/Grow";
import React, { useState, useEffect, useContext } from "react";
import {AuthContext} from "../../App"
import { FetchData } from "../../helper/FetchData";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import Badge from "@material-ui/core/Badge";
import CardActionArea from "@material-ui/core/CardActionArea";
import {useHistory} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios"

export const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      margin: "2rem 5rem 0rem 5rem",
      cursor: "pointer"
    },
    media: {
        height: 0,
        paddingTop: '35%',
        
      },
      card: {
        textAlign: "center",
        overflow: "hidden",
        width: "280px",
        height: "280px",
        borderRadius: "200px",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "0rem",
        marginBottom: "0.3rem"
      },
      header:{
        paddingTop: "2rem",
        marginBottom: "-1rem"
      },
      avatar: {
        backgroundColor: "#9b0000",
        marginLeft: "1rem",
        marginRight: "-3.5rem"
      },
      content:{
          marginBottom: "-0.4rem",
          marginTop: "-1.4rem"
      },
      buttons:{
          justifyContent: "center",
          marginTop: "-1.2rem"
      },
      badge:{
        '& > *': {
          margin: theme.spacing(1),
        },
      },
   
  }));


export const CardItem = ({post, i}) =>{
    const {currentUser, Authorization, force, setForce} = useContext(AuthContext)
    const history = useHistory()
    const classes = useStyles();
    const [liked, setLiked] = useState(false)
    const [viewed, setViewed] = useState(false)
    
    
    useEffect(()=>{
        FetchData(`https://blog-fullstack-backend.herokuapp.com/like/${post.slug}`)
        .then((data)=> {
            data.map((item)=>{
                if(item.user == currentUser && item.slug == post.slug){
                    setLiked(item.pk)
                }
            })
        })

        FetchData(`https://blog-fullstack-backend.herokuapp.com/post-view/${post.slug}`)
        .then((data)=>{
          data.map((view)=>{
            if(view.user == currentUser){
              setViewed(true)
            }
          })
        })

    },[force, post])

    const handleLike = () =>{
        if(liked){
            axios.delete(`https://blog-fullstack-backend.herokuapp.com/like-detail/${post.slug}/${liked}/`,
            {
                headers:{
                    "Authorization": `Token ${Authorization}`
                }
            })
            .then(()=>{
              setLiked(false)
              setForce(s=>!s)
            })
            
        }else{
            axios.post(`https://blog-fullstack-backend.herokuapp.com/like/${post.slug}/`,{
                user: currentUser,
                post: post.pk
            },{
                headers:{
                    "Authorization": `Token ${Authorization}`
                }
            })
            .then((msg)=>setForce(s=>!s))
        }
    }

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
          state:{liked}
        })
      }
      
    }

    return(
        <Grid item className={classes.container}>
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: 1000 * i }}
            >
              <Card className={classes.card}>
              <CardActionArea onClick={lookPost}>
                <CardHeader
                  avatar={
                    <Avatar className={classes.avatar}>
                      {post?.username[0].toUpperCase()}
                    </Avatar>
                  }
                  title={post?.username}
                  subheader={moment(post?.created_date).format("MMMM Do YYYY")}
                  className={classes.header}
                />
                <CardMedia
                  className={classes.media}
                  image={post.media || "https://shiftdigital.co.za/wp-content/uploads/2014/11/Post-Background.jpg"}
                />
                <CardContent className={classes.content}>
                  <Typography
                    variant="h6"
                  >
                    {post?.title.length>16 ? post?.title.slice(0, 15) + "..." : post?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {post?.content.slice(0, 50)}...
                  </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions disableSpacing className={classes.buttons}>
                  <IconButton color={viewed ? "secondary" : "action"}>
                    <Badge badgeContent={post?.postview_count} color="secondary">
                      <VisibilityIcon />
                    </Badge>
                  </IconButton>
                  <IconButton onClick={handleLike}>
                    <Badge badgeContent={post?.like_count} color="secondary">
                      <FavoriteIcon color={liked ? "secondary" : "action"}  />
                    </Badge>
                  </IconButton>
                  <IconButton>
                    <Badge badgeContent={post?.comment_count} color="secondary">
                      <ModeCommentIcon />
                    </Badge>
                  </IconButton>
                </CardActions>
              </Card>
            </Grow>
          </Grid>
    )
} 