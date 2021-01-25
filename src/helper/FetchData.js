import axios from "axios"


export const FetchData = async (path) =>{
    try {
        const {data} = await axios.get(`${path}`)
        return data
    } catch (error) {
        console.log(error)
    }
}