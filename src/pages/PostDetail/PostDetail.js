import {useParams} from "react-router-dom"
import {FetchData} from "../../helper/FetchData"
import {useEffect, useState} from "react"
import Grid from '@material-ui/core/Grid';
import {useStyles} from "./PostDetail.style"
import moment from "moment"
import Paper from '@material-ui/core/Paper';
import {Comment} from "../../components/Comment/Comment"

export const PostDetail = () =>{
    const {slug} = useParams()
    const [post, setPost] = useState([])
    const classes = useStyles();
useEffect(()=>{
    FetchData(`https://blog-fullstack-backend.herokuapp.com/post-detail/${slug}`
    ).then((results) => setPost(results)).catch((err)=>console.log({err}));
},[])
console.log(post)
return (
    <Grid container xs={12} justify="center" className={classes.root}>
      <Grid item >
        <div className={classes.container}>
          <img src={post?.media || "/blog-image.png"} className={classes.image}/>
          <div className={classes.titleContainer}>
            <h1 className={classes.title}>{post?.title}</h1>
            <p className={classes.author}>Author: {post.username?.slice(0,1).toUpperCase() + post.username?.slice(1)}</p>
            <p className={classes.date}>{moment(post?.created_date).format("MMMM, Do YYYY")}</p>
          </div>
        </div>
      </Grid>
      <Grid item >
        <Paper className={classes.content} elevation={3} variant="outlined"><span className={classes.contentTitle}>{post?.title}</span><br/>{post?.content}</Paper>
      </Grid>
      <Grid item xs={12}>
        <Comment slug={post.slug} />
      </Grid>
    </Grid>
)
}