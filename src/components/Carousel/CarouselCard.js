import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import { FetchData } from "../../helper/FetchData";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Badge from "@material-ui/core/Badge";
import {useHistory} from "react-router-dom"

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
    padding: "0rem 3rem 1rem 3rem",
  },
  head: {
    padding: "1rem",
  },
  buttons:{
    justifyContent: "center",
    paddingBottom: "3rem"
  }
});

export function CarouselCard() {
  const history = useHistory()
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(true);
  const [direction, setDirection] = useState(true);
  const [posts, setPosts] = useState([]);

  const changeCarousel = () => {
    if (index === posts.length - 1) {
      setIndex(0);
      setTimeout(function () {
        setChecked(false);
        setDirection("left");
      }, 3000);
    } else {
      setIndex(index + 1);
      setTimeout(function () {
        setChecked(false);
        setDirection("left");
      }, 3000);
    }
  };

  useEffect(() => {
    FetchData(
      "https://blog-fullstack-backend.herokuapp.com/post/?page=1"
    ).then(({ results }) => setPosts(results)).catch((err)=>console.log({err}));
  }, []);

  useEffect(() => {
    setTimeout(changeCarousel, 4000);
    setChecked(true);
    setDirection("right");
  }, [index]);
  return (
    <Slide direction={direction} in={checked} mountOnEnter unmountOnExit>
      <Card className={classes.root} onClick={()=>history.push(`/post-detail/${posts[index].slug}`)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={posts[index]?.media || "/blog-image.png"}
          />
          <CardContent>
            <Typography
              align="center"
              className={classes.head}
              variant="h5"
              component="h2"
            >
              {posts[index]?.title.length>30 ? posts[index]?.title.slice(0, 29) + "..." : posts[index]?.title}
            </Typography>
            <Typography
              className={classes.content}
              align="center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {posts[index]?.content.length>130 ? posts[index]?.content.slice(0, 129) + "..." : posts[index]?.content}
            </Typography>
          </CardContent>
        <CardActions disableSpacing className={classes.buttons}>
          <IconButton aria-label="add to favorites">
            <Badge badgeContent={posts[index]?.postview_count} color="secondary">
              <VisibilityIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="add to favorites">
            <Badge badgeContent={posts[index]?.like_count} color="secondary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="share">
            <Badge badgeContent={posts[index]?.comment_count} color="secondary">
              <ModeCommentIcon />
            </Badge>
          </IconButton>
        </CardActions>
        </CardActionArea>
      </Card>
    </Slide>
  );
}
