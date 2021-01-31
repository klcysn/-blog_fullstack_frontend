import { useParams } from "react-router-dom";
import { FetchData } from "../../helper/FetchData";
import { useEffect, useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./PostDetail.style";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import { Comment } from "../../components/Comment/Comment";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoodBadIcon from '@material-ui/icons/MoodBad';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import {PostForm} from "../../pages"
import {AuthContext} from "../../App"
import axios from "axios"

export const PostDetail = (props) => {
  const {currentUser, Authorization, force, setForce} = useContext(AuthContext)
  const { slug } = useParams();
  const [post, setPost] = useState([]);
  const classes = useStyles();
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    FetchData(
      `https://blog-fullstack-backend.herokuapp.com/post-detail/${slug}`
    )
      .then((results) => {
        setPost(results)
        isLiked(results)
      })
  }, [force]);

  const isLiked = (postDetail) =>{
    FetchData(`https://blog-fullstack-backend.herokuapp.com/like/${postDetail.slug}`)
      .then((data)=> {
          data.map((item)=>{
              if(item.user == currentUser && item.slug == postDetail.slug){
                  setLiked(item.pk)
              }
          })
      })
  }

  const handleLike = () =>{
    if(!Authorization){
      return null
    }
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
        setLiked(true)
        setForce(s=>!s)
    }
}

  return (
    <Grid container xs={12} justify="center" className={classes.root}>
      <Grid item>
        <div className={classes.container}>
          <img src={post?.media || "../../../blog-image.png"} className={classes.image} alt=""/>
          <div className={classes.titleContainer}>
            <div>
              <h1 className={classes.title}>{post?.title}</h1>
              <p className={classes.author}>
                Author:{" "}
                {post.username?.slice(0, 1).toUpperCase() +
                  post.username?.slice(1)}
              </p>
              <p className={classes.date}>
                {moment(post?.created_date).format("MMMM, Do YYYY")}
              </p>
            </div>
            <div className={classes.iconButtons}>
              <IconButton onClick={handleLike}>
                <Badge badgeContent={post?.like_count} color="secondary">
                  {liked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon color="primary" />}
                </Badge>
              </IconButton>
              <IconButton>
                <Tooltip title="Report as Bad Post" arrow>
                  <MoodBadIcon color="primary" />
                </Tooltip>
              </IconButton>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item>
        <Paper className={classes.content} elevation={3} variant="outlined">
          <span className={classes.contentTitle}>{post?.title}</span>
          <br />
          {post?.content}
        </Paper>
      </Grid>
     {
     post.user == currentUser
      ?
      <>
        <Accordion className={classes.content}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Update/Delete Post</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PostForm update={post} />
          </AccordionDetails>
        </Accordion>
        <Grid item xs={12}>
          <Comment slug={post.slug} postId={post.pk} />
        </Grid>
      </>
      :
      <Grid item xs={12}>
        <Comment slug={post.slug} postId={post.pk} />
      </Grid>
      }
      
    </Grid>
  );
};
