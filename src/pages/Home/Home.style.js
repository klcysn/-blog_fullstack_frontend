import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    carouselContainer:{
        backgroundImage: "url('https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "92vh",
        position: "relative",
        // zIndex: -1,
    },
    carousel:{
        marginTop: "1rem",
    }
  }));