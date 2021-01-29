import Grow from "@material-ui/core/Grow";
import React, { useState, useEffect } from "react";
// import { useStyles } from "./PostCard.style";
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
import Pagination from '@material-ui/lab/Pagination';
import CardActionArea from "@material-ui/core/CardActionArea";
import {useHistory} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      margin: "2rem 5rem 0rem 5rem",
      cursor: "pointer"
    },
    media: {
        height: 0,
        paddingTop: '35%', // 16:9,
        
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
      pagination:{
        display: 'flex',
        margin: "0rem 5rem",
      },
   
  }));

export const PostCard = () => {
  const history = useHistory()
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    FetchData(
      `https://blog-fullstack-backend.herokuapp.com/post/?page=${page}`
    ).then((results) => setPosts(results)).catch((err)=>console.log({err}));
  }, [page]);

  return (
    <Grid container spacing={0} justify="center">
      {posts?.results?.map((post, i) => {
        return (
          <Grid item className={classes.container} >
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: 1000 * i }}
            >
              <Card className={classes.card}>
              <CardActionArea onClick={()=>history.push(`/post-detail/${post.slug}`)}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {post?.username[0].toUpperCase()}
                    </Avatar>
                  }
                  title={post?.username}
                  subheader={moment(post?.created_date).format("MMMM Do YYYY")}
                  className={classes.header}
                />
                <CardMedia
                  className={classes.media}
                  image={post.media || "/blog-image.png"}
                  title="Paella dish"
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
                  <IconButton aria-label="add to favorites">
                    <Badge badgeContent={post?.postview_count} color="secondary">
                      <VisibilityIcon />
                    </Badge>
                  </IconButton>
                  <IconButton>
                    <Badge badgeContent={post?.like_count} color="secondary">
                      <FavoriteIcon />
                    </Badge>
                  </IconButton>
                  <IconButton aria-label="share">
                    <Badge badgeContent={post?.comment_count} color="secondary">
                      <ModeCommentIcon />
                    </Badge>
                  </IconButton>
                </CardActions>
              </Card>
            </Grow>
          </Grid>
        );
      })}
      <Grid item xs={12} className={classes.pagination} justify="center">
        <Pagination count={Math.ceil(posts?.count/5)} variant="outlined" onChange={(event, value)=>setPage(value)} size="large" color="secondary" />
      </Grid>
    </Grid>
  );
};


// e.target.innerText