import { FetchData } from "../../helper/FetchData";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./Comment.style";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Pagination from '@material-ui/lab/Pagination';

export const Comment = ({ slug }) => {
  const classes = useStyles();
  const [comment, setComment] = useState([]);
  const [page, setPage] = useState(1)
  useEffect(() => {
    FetchData(`https://blog-fullstack-backend.herokuapp.com/comment/${slug}/?page=${page}`)
      .then(( results ) => setComment(results))
      .catch((err) => console.log({ err }));
  }, [page]);
  console.log(comment.results)
  return (
    <div className={classes.root}>
        <div className={classes.container}>
        <form className={classes.formContainer}>
          <TextField className={classes.inputs} rows={5} id="outlined-textarea" label="Comment" placeholder="Comment" multiline variant="outlined"/>
          <Button variant="contained" color="primary" className={classes.inputs} endIcon={<Icon>send</Icon>}>Send</Button>
        </form>
      </div>
      {comment.length ? (
        <div>
          <h4 className={classes.commentHeader}>{comment?.length} Comments:</h4>
        </div>
      ) : null}
      <Grid container justify="center" spacing={3}>
        {comment.results?.map((item) => {
          return (
            <Grid item className={classes.paperContainer} xs={12}>
              <Paper className={classes.paper}>
                <div className={classes.avatarContainer}>
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {item?.username[0].toUpperCase()}
                  </Avatar>
                  <p>{item?.username}</p>
                </div>
                {item.comment}
                <hr />
                <div className={classes.buttonContainer}>
                  {moment(item.created_date).format("MMMM Do YYYY, h:mm a")}
                  <div>
                    <IconButton aria-label="add to favorites">
                      <Badge badgeContent={item?.commentlike_count} color="secondary">
                        <FavoriteIcon />
                      </Badge>
                    </IconButton>
                    <IconButton aria-label="add to favorites">
                      <Tooltip title="Report as Bad Comment" arrow>
                        <MoodBadIcon />
                      </Tooltip>
                    </IconButton>
                  </div>
                </div>
              </Paper>
            </Grid>
          );
        })}
        <Grid item xs={12} className={classes.pagination} justify="center">
            <Pagination count={Math.ceil(comment?.count/5)} variant="outlined" onChange={(event, value)=>setPage(value)} size="large" color="secondary" />
        </Grid>
      </Grid>
    </div>
  );
};
