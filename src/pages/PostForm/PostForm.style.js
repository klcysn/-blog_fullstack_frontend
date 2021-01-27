import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
  }));