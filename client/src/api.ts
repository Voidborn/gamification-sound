import {getToken, setToken, resetCookies} from './cookieManager'
import {Image, UserInfo, Response} from './interfaces/interfaces'

const baseUrl = "http://localhost:8080/";


export async function register(prolific?: string): Promise<string>{
    var opts = {
        prolificId: prolific ?prolific:""
    }

    resetCookies();
    //TODO: Handle possible errors
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

export async function fetchUserInfo(): Promise<{ studyProgress: number }>{
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
        studyProgress: user.studyProgress
    };
}

export async function fetchAudiofile(): Promise<string>{
    let name: string = await fetch(
        baseUrl + "user/soundName",
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ getToken(),
            }
        }
    )
        .then(response => response.json())
        .then(response => {
            return response.audiofile
        })
    return name;
}

export async function submitResponse(data: Response) {
    console.log("wants to submit", JSON.stringify(data));
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
        baseUrl + "user/nextImage/",
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
        .catch(err=> {console.log(err)})
    return (image);
}

export function getImageUrl(name: string){
    return baseUrl + "img/" + name;
}

export function getSoundUrl(name: string) {
    return baseUrl + "sound/" + name;
}