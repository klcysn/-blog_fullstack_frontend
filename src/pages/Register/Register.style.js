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
        marginTop: "1rem",
    },
    textField:{
      minWidth: "15rem",
      [theme.breakpoints.up('sm')]: {
        width: "25rem",
      },
    },
    icon:{
        fontSize: 70,
    },
    button: {
        minWidth: "15rem",
        [theme.breakpoints.up('sm')]: {
          width: "25rem",
        },
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
      },
      link:{
        [theme.breakpoints.up('sm')]: {
          alignSelf: "flex-end"
        },
    }
  }));