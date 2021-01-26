import {useParams} from "react-router-dom"
import {FetchData} from "../../helper/FetchData"
import {useEffect, useState} from "react"
import Grid from '@material-ui/core/Grid';
import {useStyles} from "./PostDetail.style"

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
  <div className={classes.root}>
    <Grid container xs={12} spacing={3}>
      <Grid item xs={9} justify="center">
        {/* <img src={post.media} title="Helllloooooo"/> */}
      </Grid>
    </Grid>
  </div>
);
}