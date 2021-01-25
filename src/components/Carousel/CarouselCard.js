import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles({
  root: {
    width: "40rem",
    height: "40rem",
    borderRadius: "55rem",
    overflow: "hidden",
    boxShadow: "0px 0px 3px 5px lightpink",
    // transition: "ease-in-out all 2s",
    // animation: "slide"  
  },
  media: {
    height: "25rem",
  },
  content:{
    padding: "0rem 3rem 6rem 3rem"
  },
  head:{
    padding: "1rem"
  },

  // @keyframes slide {
  //   from {width: 0;}
  //   to {width: "40rem";}
  // }
});

const list =[{image: "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
head: "Lizard",
content: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"},
{image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
head: "Wizard",
content: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"},
{image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
head: "Kizard",
content: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}]


export function CarouselCard() {
  const classes = useStyles();
  const [index, setIndex] = useState(0)
  const [checked, setChecked] = useState(true);
  const [direction, setDirection] = useState(true);

  const changeCarousel = () =>{
    if (index === list.length - 1){
      setIndex(0)
      setTimeout(function(){
        setChecked(false)
        setDirection("left")
      }, 3000)
    }else{
      setIndex(index + 1)
      setTimeout(function(){
        setChecked(false)
        setDirection("left")
      }, 3000)
    }
  }

  useEffect(()=>{
    setTimeout(changeCarousel, 4000)
    setChecked(true)
    setDirection("right")
  },[index])

  return (
    <Slide direction={direction} in={checked} mountOnEnter unmountOnExit>
          <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={list[index].image}
            />
            <CardContent>
              <Typography align="center" className={classes.head} gutterBottom variant="h5" component="h2">
                {list[index].head}
              </Typography>
              <Typography className={classes.content} align="center" variant="body2" color="textSecondary" component="p">
                {list[index].content.slice(0, 130)}...
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    </Slide>
  );
}
