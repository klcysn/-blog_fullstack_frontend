import {useContext} from "react"
import Grid from '@material-ui/core/Grid';
import {useStyles} from "./Home.style"
import {MyCarousel} from "../../components/Carousel/MyCarousel"
import {PostCard} from "../../components/PostCard/PostCard"
import {AuthContext} from "../../App"



export const Home = () =>{
    const classes = useStyles();
    const {selectedCategory} = useContext(AuthContext)
    console.log(selectedCategory)
    return (
      <div className={classes.root}>
        <Grid container xs={12} spacing={0}>
          {
          selectedCategory
          ?
          null
          :
          <Grid container item spacing={0} className={classes.carouselContainer} xs={12}>
            <Grid item xs={12} className={classes.carousel}>
              <MyCarousel />
            </Grid>
          </Grid>
          }
          <Grid item xs={12} spacing={0} className={classes.postArea}>
            <PostCard />
          </Grid>
        </Grid>
      </div>
    );
}