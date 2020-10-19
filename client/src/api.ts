import {getToken, setToken} from './cookieManager'
import {Image, UserInfo, Response} from './interfaces/interfaces'

const baseUrl = "http://localhost:8080/";


export async function register(prolific?: string): Promise<string>{
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
    
    setToken(token);
    return (token)
}

export async function fetchUserInfo(): Promise<UserInfo>{
    //TODO: transmit from server only necessary data
    let user:any = await fetch(
        baseUrl + "user/userinfo",
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ getToken(),    
            }
        }
    )
        .then(response => response.json())
        .then(response => {
            return response
        })
    return {
        studyProgress: user.studyProgress,
        testgroup: user.testgroup
    };
}

export async function submitResponse(data: Response) {
    console.log("blab",data);
    console.log("blab2", JSON.stringify(data));
    let submitSuccessful = await fetch(
        baseUrl + "response",
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(err => { console.log(err) })
    return submitSuccessful;
}

export async function fetchNextImage(): Promise<Image>{
    let image = await fetch(
        baseUrl + "getData/nextImage/",
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ getToken(),    
            }
        }
    )
        .then(response => response.json())
        .then(response => {
            return response.data
        })
        .catch(err=> {console.log(err)})
    
    console.log(image);
    return (image);
}