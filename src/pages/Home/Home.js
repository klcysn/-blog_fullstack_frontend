import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useStyles} from "./Home.style"
import {MyCarousel} from "../../components/Carousel/MyCarousel"


export const Home = () =>{
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid container item className={classes.carouselContainer} xs={12}>
            <Grid item xs={12}  className={classes.carousel} sm={12}>
              <MyCarousel />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.postArea} sm={12}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
        </Grid>
      </div>
    );
}