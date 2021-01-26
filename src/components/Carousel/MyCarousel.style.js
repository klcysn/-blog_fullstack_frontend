import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  }));