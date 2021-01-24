import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "3rem"
      
    },
    form:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "1rem",
        marginTop: "1rem"
    },
    textField:{
        width: "20rem",
    },
    icon:{
        fontSize: 70,
    },
    button: {
        width: "20rem"
      },
      closeIcon:{
          position: 'absolute',
          right: "8rem",
          top: "7rem",
          color: "black",
          cursor: "pointer",
          [theme.breakpoints.down('xs')]: {
            display: 'none',
          },
      }
  }));