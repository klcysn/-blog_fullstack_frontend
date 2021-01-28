import { FetchData } from "../../helper/FetchData";
import { useEffect, useState, useContext } from "react";
import {useHistory} from "react-router-dom"
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
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Pagination from '@material-ui/lab/Pagination';
import {AuthContext} from "../../App"
import axios from "axios"
import {DeleteAlert} from "../../helper/DeleteAlert"

export const Comment = ({ slug, postId }) => {
  const history = useHistory()
  const classes = useStyles();
  const {Authorization, currentUser} = useContext(AuthContext)
  const [comment, setComment] = useState([]);
  const [text, setText] = useState([]);
  const [page, setPage] = useState(1)
  const [openAlert, setOpenAlert] = useState(false)
  const [force, setForce] = useState(false)
  const [pk, setPk] = useState("")
  
  useEffect(() => {
    FetchData(`https://blog-fullstack-backend.herokuapp.com/comment/${slug}/?page=${page}`)
      .then(( results ) => setComment(results))
      .catch((err) => console.log({ err }));
  }, [page, force, slug]);
console.log({slug}, {postId})
  const handleSubmit = () =>{
    axios.post(`https://blog-fullstack-backend.herokuapp.com/comment/${slug}/`,{
      user: currentUser,
      comment: text,
      post: postId

    },
    {
      headers:{
        "Authorization": `Token ${Authorization}`
      }
    }).then(()=>setForce(s=>!s)).catch((err)=>console.log({err}))
    setText("")
  }

  const handleDelete = (permission) =>{
    console.log(pk)
    if(permission){
      axios.delete(`https://blog-fullstack-backend.herokuapp.com/comment-detail/${slug}/${pk}/`,
      {
        headers:{
          "Authorization": `Token ${Authorization}`
        }
      }).then(()=>setForce(s=>!s)).catch((err)=>console.log({err}))
      
    }
    setOpenAlert(false)
  }
  console.log(comment)
  return (
    <div className={classes.root}>
        {Authorization
        ?
        <div className={classes.container}>
          <form className={classes.formContainer} >
            <TextField className={classes.inputs} rows={5} id="outlined-textarea" label="Comment"
            onChange={(e)=>setText(e.target.value)} placeholder="Comment" multiline variant="outlined"/>
            <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.inputs} endIcon={<Icon>send</Icon>}>Send</Button>
          </form>
        </div>
        :
        null}
      {comment.length ? (
        <div>
          <h4 className={classes.commentHeader}>{comment?.length} Comments:</h4>
        </div>
      ) : null}
      <Grid container justify="center" spacing={3}>
        {comment.results?.map((item) => {
          return (
            <Grid item className={classes.paperContainer} xs={12}>
              <DeleteAlert openAlert={openAlert} permission={(permission)=>handleDelete(permission)}/>
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
                    {item.user == currentUser
                    ?
                    <>
                    <IconButton onClick={()=>{
                      setPk(item.pk)
                      setOpenAlert(true)
                      }}>
                      <DeleteIcon />
                    </IconButton>
                    </>
                    :
                    <>
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
                    </>}
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
