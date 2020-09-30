import { User } from './interfaces/userInterface'
import {Image} from './interfaces/imageInterface'

const baseUrl = "http://localhost:8080/";

export async function register(prolific?: string): Promise<User>{    
    let prolificId = "";
    if (prolific) {
        prolificId = ":" + prolific;
    }

    let user = await fetch(baseUrl + "register/"+prolificId)
        .then(response => response.json())
        .then(response => {
            return response.data
        })
        .catch(err => { console.log(err) })
    
    return(user)
}

export async function fetchNextImage(userId: number): Promise<Image>{
    //TODO: add userId into server
    let image = await fetch(baseUrl + "getData/nextImage/")
        .then(response => response.json())
        .then(response => {
            return response.data
        })
        .catch(err=> {console.log(err)})
    
    console.log(image)
    return (image);
}
