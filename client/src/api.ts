import Cookies from 'universal-cookie';

import { User } from './interfaces/userInterface'
import {Image} from './interfaces/imageInterface'


const baseUrl = "http://localhost:8080/";

export async function register(prolific?: string): Promise<User>{
    const cookies = new Cookies();
    var opts = {
        prolificId: prolific ?prolific:""
    }

    //TODO: Handle possible errors
    console.log("tries to login with data: ",JSON.stringify(opts))
    let token = await fetch(
        baseUrl + "user/register/",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(opts)
        })
        .then(response => response.json())
        .then(response => {
            return response.token
        })
        .catch(err => { console.log(err) })
    cookies.set('AuthToken', token, { path: '/' });
    return (token)
}

export async function fetchNextImage(): Promise<Image>{
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


