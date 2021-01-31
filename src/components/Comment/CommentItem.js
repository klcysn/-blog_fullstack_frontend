import { FetchData } from "../../helper/FetchData";
import { useEffect, useState, useContext } from "react";
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
import DeleteIcon from '@material-ui/icons/Delete';
import {AuthContext} from "../../App"
import axios from "axios"
import {DeleteAlert} from "../../helper/DeleteAlert"



export const CommentItem = ({item, slug}) =>{
    const classes = useStyles();
    const {Authorization, currentUser, setForce, force} = useContext(AuthContext)
    const [openAlert, setOpenAlert] = useState(false)
    const [pk, setPk] = useState("")
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState([])


    useEffect(()=>{
        FetchData(`https://blog-fullstack-backend.herokuapp.com/comment-like/${slug}/${item.pk}/`)
        .then((data)=>{
            data.map((like)=>{
                if(like.user == currentUser && like.comment == item.pk){
                    setLiked(like.pk)
                }
            })
            setLikes(data)
        })
    },[force])

    const handleDelete = (permission) =>{
        console.log(pk)
        if(permission){
          axios.delete(`https://blog-fullstack-backend.herokuapp.com/comment-detail/${slug}/${item.pk}/`,
          {
            headers:{
              "Authorization": `Token ${Authorization}`
            }
          }).then(()=>setForce(s=>!s))
          
        }
        setOpenAlert(false)
      }

      const handleLike = () =>{
        if(liked){
            axios.delete(`https://blog-fullstack-backend.herokuapp.com/comment-like-detail/${slug}/${item.pk}/${liked}/`,
            {
                headers:{
                    "Authorization": `Token ${Authorization}`
                }
            })
            .then(()=>{
              setLiked(false)
              setForce(s=>!s)
            })            
        }else{
            axios.post(`https://blog-fullstack-backend.herokuapp.com/comment-like/${slug}/${item.pk}/`,{
                user: currentUser,
                comment: item.pk
            },{
                headers:{
                    "Authorization": `Token ${Authorization}`
                }
            })
            .then((msg)=>setForce(s=>!s))
        }
    }

    return(
        <Grid item className={classes.paperContainer} xs={12}>
              <DeleteAlert openAlert={openAlert} permission={(permission)=>handleDelete(permission)}/>
              <Paper className={classes.paper}>
                <div className={classes.avatarContainer}>
                  <Avatar className={classes.avatar}>
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
                    <IconButton onClick={handleLike}>
                      <Badge badgeContent={item?.commentlike_count} color="secondary">
                        <FavoriteIcon color={liked ? "secondary" : "action"}/>
                      </Badge>
                    </IconButton>
                    <IconButton>
                      <Tooltip title="Report as Bad Comment" arrow>
                        <MoodBadIcon />
                      </Tooltip>
                    </IconButton>
                    </>}
                  </div>
                </div>
              </Paper>
            </Grid>
    )
}