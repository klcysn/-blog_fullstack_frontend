import {CarouselCard} from "./CarouselCard"
import {useStyles} from "./MyCarousel.style"

export const MyCarousel = () =>{
  const classes = useStyles();
    return (
      <div className={classes.root}>
        <CarouselCard />
      </div>
    );
  };
