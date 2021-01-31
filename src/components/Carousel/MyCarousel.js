import {CarouselCard} from "./CarouselCard"
import {useStyles} from "./MyCarousel.style"
import React, { useEffect, useState } from "react";
import { FetchData } from "../../helper/FetchData";

export const MyCarousel = () =>{
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(true);
  const [direction, setDirection] = useState(true);

  useEffect(() => {
    FetchData(
      "https://blog-fullstack-backend.herokuapp.com/post/?page=1"
    ).then(({ results }) => setPosts(results))
  }, []);

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
    setTimeout(changeCarousel, 4000);
    setChecked(true);
    setDirection("right");
  }, [index]);
  
    return (
      <div className={classes.root}>
        <CarouselCard checked={checked} direction={direction} post={posts[index]} />
      </div>
    );
  };
