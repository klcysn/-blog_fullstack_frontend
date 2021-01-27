import React,{useEffect, useState, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {useStyles} from "./PostForm.style"
import {FetchData} from "../../helper/FetchData"
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {AuthContext} from "../../App"
import {useHistory} from "react-router-dom"
import axios from "axios"

export const PostForm = () =>{
    const {Authorization, currentUser} = useContext(AuthContext)
    const history = useHistory()
    const classes = useStyles();
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState("")
    const [media, setMedia] = useState("")
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")
    const [status, setStatus] = useState("")
    useEffect(()=>{
        FetchData("https://blog-fullstack-backend.herokuapp.com/category-list/").then((data)=>setCategories(data))
      },[])
    
    useEffect(()=>{
        if(!Authorization){
            history.push("/register")
        }
    },[])
    console.log(currentUser)
    const handleSubmit = () =>{
        axios.post("https://blog-fullstack-backend.herokuapp.com/post/",{
            user: currentUser,
            category,
            title,
            media,
            content,
            status
        },
        {
        headers: {
            'Authorization': `Token ${Authorization}`
        }} ).then((message)=>console.log(message)).catch((err)=>console.log({err}))
    }

    return(
        <div className={classes.container}>

            <form  className={classes.formContainer}>
                <TextField className={classes.inputs} id="outlined-basic" label="Title" variant="outlined"
                onChange={(e)=>setTitle(e.target.value)} />
                <TextField className={classes.inputs} id="outlined-basic" label="Image" variant="outlined"
                onChange={(e)=>setMedia(e.target.value)} placeholder="Copy Image URL here" />
                <InputLabel htmlFor="grouped-select" className={classes.select} >Categories</InputLabel>
                <Select className={classes.inputs} onChange={(e)=>setCategory(e.target.value)} label="Category"
                id="grouped-select" variant="outlined">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                        {categories?.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
                </Select>
                <TextField className={classes.inputs} rows={10} id="outlined-textarea" label="Message"
                onChange={(e)=>setContent(e.target.value)} placeholder="Message" multiline variant="outlined"/>
                <InputLabel htmlFor="grouped-select" className={classes.select}>Status</InputLabel>
                <Select className={classes.inputs} onChange={(e)=>setStatus(e.target.value)}
                label="Status" id="grouped-select" variant="outlined">
                    <MenuItem value="published">
                        <em>Published</em>
                    </MenuItem>
                    <MenuItem value="draft">
                        <em>Draft</em>
                    </MenuItem>
                </Select>
                <Button variant="contained" color="primary" className={classes.inputs} onClick={handleSubmit} endIcon={<Icon>send</Icon>}>Send</Button>
            </form>
        </div>
    )
} 