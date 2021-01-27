import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      margin: "2rem 5rem 0rem 5rem",
      cursor: "pointer"
      
    },
    media: {
        height: 0,
        paddingTop: '35%', // 16:9,
        
      },
      card: {
        textAlign: "center",
        overflow: "hidden",
        width: "280px",
        height: "280px",
        borderRadius: "200px",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "0rem",
        marginBottom: "0.3rem"
      },
      header:{
        paddingTop: "2rem",
        marginBottom: "-1rem"
      },
      avatar: {
        backgroundColor: "#9b0001",
        marginLeft: "1rem",
        marginRight: "-3.5rem"
      },
      content:{
          marginBottom: "-0.4rem",
          marginTop: "-1.4rem"
      },
      buttons:{
          justifyContent: "center",
          marginTop: "-1.2rem"
      },
      badge:{
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      pagination:{
        display: 'flex',
        margin: "0rem 5rem",
      },
   
  }));