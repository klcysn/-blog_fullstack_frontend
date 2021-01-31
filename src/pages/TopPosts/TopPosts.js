import React, {useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import {FetchData} from "../../helper/FetchData"
import {useHistory} from "react-router-dom"
import axios from "axios"
import {AuthContext} from "../../App"


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "auto",
    display: 'flex',
    flexDirection: "column",
    flexWrap: 'wrap',
    cursor: "pointer",
    alignItems: "center"
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));



export const TopPosts = () =>{
    const classes = useStyles();
    const [posts, setPosts] = useState([])
    const {currentUser, Authorization} = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        FetchData(
          "https://blog-fullstack-backend.herokuapp.com/post/?page=1"
        ).then(({ results }) => setPosts(results))
      }, []);

      const lookPost = async (post) =>{
        if(!Authorization){
            return history.push(`/post-detail/${post.slug}`)
        }

        let viewed = false
        await FetchData(`https://blog-fullstack-backend.herokuapp.com/post-view/${post?.slug}`)
        .then((data)=>{
          data.map((view)=>{
            if(view.user == currentUser){
              viewed = true
            }
          })
        })

        if(!viewed){
          axios.post(`https://blog-fullstack-backend.herokuapp.com/post-view/${post.slug}/`,{
            user: currentUser,
            post: post.pk
          },{
            headers:{
              "Authorization": `Token ${Authorization}`
          }
          })
          .then(()=>history.push(`/post-detail/${post.slug}`))
        }else{
          history.push(`/post-detail/${post.slug}`)
      }
      }
      

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Last 5 Posts</ListSubheader>
        </GridListTile>
        {posts.map((tile) => (
          <GridListTile key={tile.media} cols={1.5} onClick={()=>lookPost(tile)} >
            <img src={tile.media || "/blog-image.png"} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.username}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );

}