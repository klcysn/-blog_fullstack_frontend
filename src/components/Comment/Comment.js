import {FetchData} from "../../helper/FetchData"
import {useEffect, useState} from "react"


export const Comment = ({slug}) =>{
    const [comment, setComment] = useState()
    useEffect(()=>{
        FetchData(`https://blog-fullstack-backend.herokuapp.com/comment/${slug}`
    ).then(({results}) => setComment(results[0])).catch((err)=>console.log({err}));
    },[])
    console.log({slug},comment)
    return(
        <div>{comment?.username}</div>
    )
}