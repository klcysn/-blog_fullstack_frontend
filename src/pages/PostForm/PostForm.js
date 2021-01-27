import React,{useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {useStyles} from "./PostForm.style"
import {FetchData} from "../../helper/FetchData"
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

export const PostForm = () =>{
    const classes = useStyles();
    const [category, setCategory] = useState([])
    useEffect(()=>{
        FetchData("https://blog-fullstack-backend.herokuapp.com/category-list/").then((data)=>setCategory(data))
      },[])
    return(
        <div className={classes.container}>

            <form className={classes.formContainer}>
                <TextField className={classes.inputs} id="outlined-basic" label="Title" variant="outlined" />
                <TextField className={classes.inputs} id="outlined-basic" label="Image" variant="outlined" placeholder="Copy Image URL here" />
                <InputLabel htmlFor="grouped-select" className={classes.select} >Categories</InputLabel>
                <Select className={classes.inputs} label="Category" id="grouped-select" variant="outlined">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                        {category?.map((item) => <MenuItem value={1}>{item.name}</MenuItem>)}
                </Select>
                <TextField className={classes.inputs} rows={10} id="outlined-textarea" label="Message" placeholder="Message" multiline variant="outlined"/>
                <InputLabel htmlFor="grouped-select" className={classes.select}>Status</InputLabel>
                <Select className={classes.inputs} label="Status" id="grouped-select" variant="outlined">
                    <MenuItem value="published">
                        <em>Published</em>
                    </MenuItem>
                    <MenuItem value="draft">
                        <em>Draft</em>
                    </MenuItem>
                </Select>
                <Button variant="contained" color="primary" className={classes.inputs} endIcon={<Icon>send</Icon>}>Send</Button>
            </form>
        </div>
    )
} 