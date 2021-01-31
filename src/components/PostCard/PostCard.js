import React, { useState, useEffect, useContext } from "react";
// import { useStyles } from "./PostCard.style";
import { FetchData } from "../../helper/FetchData";
import Grid from "@material-ui/core/Grid";
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import {CardItem} from "../../components/CardItem/CardItem"
import {AuthContext} from "../../App"
import { Category } from "@material-ui/icons";

export const useStyles = makeStyles((theme) => ({
      pagination:{
        display: 'flex',
        margin: "0rem 5rem",
      },
   
  }));

export const PostCard = () => {
  const {force, selectedCategory} = useContext(AuthContext)
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);


  useEffect(() => {
    FetchData(`https://blog-fullstack-backend.herokuapp.com/post/?page=${page}`)
    .then((data)=> setPosts(data))
  }, [page, force]);

  return (
    <Grid container spacing={0} justify="center">
      {posts?.results?.map((post, i) => {
        if(selectedCategory){
          if(selectedCategory == post.category){
            return(
              <CardItem post = {post} i ={i} />
            )
          }else{return null}
        }else{
          return (
            <CardItem post = {post} i ={i} />
          );
        }
      })}
      <Grid item xs={12} className={classes.pagination} justify="center">
        <Pagination count={Math.ceil(posts?.count/5)} variant="outlined" onChange={(event, value)=>setPage(value)} size="large" color="secondary" />
      </Grid>
    </Grid>
  );
};
