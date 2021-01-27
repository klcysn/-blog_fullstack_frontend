import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paperContainer:{
        margin: "0rem 3rem"
    },
    paper: {
      color: theme.palette.text.secondary,
      padding: "1rem 3rem",
      textAlign: "justify",
      margin: "1rem",
      minWidth: "80vw"
    },
    commentHeader:{
        margin: "0rem 2rem",
    },
    avatarContainer:{
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        backgroundColor: "#9b0000",
        margin: "0.5rem 0.5rem 0.5rem 0rem"
      },
      buttonContainer:{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
      },
      container:{
        width: "70vw",
        margin: "auto",
        padding: "1rem",
        marginTop: "3rem"
        
    },
    formContainer:{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    inputs:{
        width: "100%",
        marginBottom: "1rem"
    },
    select: {
        alignSelf: "flex-start"
    },
    pagination:{
        display: 'flex',
        margin: "0.5rem 5rem",
      },
  }));