import axios from "axios"


export const FetchData = async (path) =>{
    try {
        const {data} = await axios.get(`${path}`)
        console.log({data})
        return data
    } catch (error) {
        console.log(error)
        console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    }
}