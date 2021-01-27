import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      overflow:"hidden",
      // width: "80%",
      // height: "40vh"
    },
    container:{
      position: "relative",
    },
    image:{
      height: "60vh",
      width:"100vw",
      
    },
    titleContainer:{
      position: "absolute",
      bottom: 2,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      width: "100%",
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title:{
      margin:0
    },
    author:{
      fontSize: "1.1rem",
      margin:0
    },
    date:{
      color: "gray",
      fontSize: "1.5rem",
      margin:0
    },
    content:{
      padding: "1rem 3rem",
      textAlign: "justify",
      margin: "1rem",
      minWidth: "80vw"
    },
    contentTitle:{
      fontSize: "2rem"
    },
    iconButtons:{
      alignSelf: "flex-end",
      marginRight: "2rem",
    }
  }));