import React,{useEffect, useState, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {useStyles} from "./PostForm.style"
import {FetchData} from "../../helper/FetchData"
import {DeleteAlert} from "../../helper/DeleteAlert"
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {AuthContext} from "../../App"
import {useHistory} from "react-router-dom"
import axios from "axios"

export const PostForm = ({update}) =>{
    const {Authorization, currentUser} = useContext(AuthContext)
    const history = useHistory()
    const classes = useStyles();
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState(!update ? "" : update.title)
    const [media, setMedia] = useState(!update ? "" : update.media)
    const [category, setCategory] = useState(!update ? "" : update.category)
    const [content, setContent] = useState(!update ? "" : update.content)
    const [status, setStatus] = useState(!update ? "" : update.status)
    const [openAlert, setOpenAlert] = useState(false)
   
    useEffect(()=>{
        FetchData("https://blog-fullstack-backend.herokuapp.com/category-list/").then((data)=>setCategories(data))
      },[])
    
    useEffect(()=>{
        if(!Authorization){
            history.push("/register")
        }
    },[])
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
        }} )
        history.push("/")
    }
    const handleUpdate = () =>{
        axios.put(`https://blog-fullstack-backend.herokuapp.com/post-detail/${update.slug}/`,{
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
        }} )
        history.push("/")
    }
    const handleDelete = (permission) =>{
        if(permission){
            axios.delete(`https://blog-fullstack-backend.herokuapp.com/post-detail/${update.slug}/`,
            {
            headers: {
                'Authorization': `Token ${Authorization}`
            }} )
            history.push("/")
        }
        setOpenAlert(false)
    }

    return(
        <div className={classes.container}>

            <form className={classes.formContainer}>
                <TextField className={classes.inputs} id="outlined-basic" label="Title" variant="outlined"
                onChange={(e)=>setTitle(e.target.value)} value={title}/>
                <TextField className={classes.inputs} id="outlined-basic" label="Image" variant="outlined"
                onChange={(e)=>setMedia(e.target.value)} placeholder="Copy Image URL here" value={media} />
                <InputLabel htmlFor="grouped-select" className={classes.select} >Categories</InputLabel>
                <Select className={classes.inputs} onChange={(e)=>setCategory(e.target.value)} label="Category"
                id="grouped-select" variant="outlined" value={category} >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                        {categories?.map((item, i) => <MenuItem key={i} value={item.id}>{item.name}</MenuItem>)}
                </Select>
                <TextField className={classes.inputs} rows={10} id="outlined-textarea" label="Message"
                onChange={(e)=>setContent(e.target.value)} placeholder="Message" multiline variant="outlined" value={content} />
                <InputLabel htmlFor="grouped-select" className={classes.select}>Status</InputLabel>
                <Select className={classes.inputs} onChange={(e)=>setStatus(e.target.value)}
                label="Status" id="grouped-select" variant="outlined" value={status} >
                    <MenuItem value="published">
                        <em>Published</em>
                    </MenuItem>
                    <MenuItem value="draft">
                        <em>Draft</em>
                    </MenuItem>
                </Select>
                <Button variant="contained" color="primary" className={classes.inputs}
                onClick={update ? handleUpdate : handleSubmit} endIcon={<Icon>send</Icon>}>{update ? "Update" : "Send"}</Button>
                {update
                ?
                <>
                <Button variant="contained" color="secondary" className={classes.inputs}
                onClick={()=>setOpenAlert(true)} endIcon={<Icon>delete</Icon>}>Delete</Button>
                <DeleteAlert openAlert={openAlert} permission={handleDelete} />
                </>
                :
                null
                }
            </form>
        </div>
    )
} 