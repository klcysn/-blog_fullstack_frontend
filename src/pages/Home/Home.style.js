import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      // width: "99vw",
      padding:0,
      margin:0,
    },
    carouselContainer:{
        backgroundImage: "url('https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundAttachment: "fixed",
    },
    carousel:{
        marginTop: "1rem",
    },
    postArea:{
      backgroundImage: "url('https://images.pexels.com/photos/220118/pexels-photo-220118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      minHeight: "100vh",
      paddingBottom: "0.5rem"
    
    }
  }));