import Grow from "@material-ui/core/Grow";
import React, { useState, useEffect } from "react";
import { useStyles } from "./PostCard.style";
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

export const PostCard = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    FetchData(
      `https://blog-fullstack-backend.herokuapp.com/post/?page=${page}`
    ).then((results) => setPosts(results)).catch((err)=>console.log({err}));
  }, [page]);
  return (
    <Grid container spacing={3} justify="center">
      {posts.results?.map((post, i) => {
        return (
          <Grid item className={classes.container}>
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: 1000 * i }}
            >
              <Card className={classes.card}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      R
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
                    // gutterBottom
                    // color="textPrimary"
                    // component="h"
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
                <CardActions disableSpacing className={classes.buttons}>
                  <IconButton aria-label="add to favorites">
                    <Badge badgeContent={post?.postview_count} color="secondary">
                      <VisibilityIcon />
                    </Badge>
                  </IconButton>
                  <IconButton aria-label="add to favorites">
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
                </CardActionArea>
              </Card>
            </Grow>
          </Grid>
        );
      })}
      <Grid item xs={12} className={classes.pagination} justify="center">
        <Pagination count={Math.ceil(posts.count/5)} variant="outlined" onChange={(event, value)=>setPage(value)} size="large" color="secondary" />
      </Grid>
    </Grid>
  );
};


// e.target.innerText