import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useStyles} from "./Home.style"
import {MyCarousel} from "../../components/Carousel/MyCarousel"
import {PostCard} from "../../components/PostCard/PostCard"
import {FetchData} from "../../helper/FetchData"


export const Home = () =>{
    // const [posts, setPosts] = useState([])
    const classes = useStyles();

    // useEffect(()=>{
    //   FetchData("https://blog-fullstack-backend.herokuapp.com/post/?page=1").then((postList)=>setPosts(postList))
    // },[])
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid container item className={classes.carouselContainer} xs={12}>
            <Grid item xs={12}  className={classes.carousel} sm={12}>
              <MyCarousel />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.postArea} sm={12}>
            <PostCard />
          </Grid>
        </Grid>
      </div>
    );
}