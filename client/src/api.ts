import {getToken, setToken, resetCookies} from './cookieManager'
import {Image, Response} from './interfaces/interfaces'

const baseUrl = "https://api.gamification-sound-study.ga/" //"http://localhost:8080/"; //


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

export async function fetchUserInfo(): Promise<{
    studyProgress: number,
    totalImages: any,
    currentImage: number
}>{
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
        .catch(() => {
            console.error("Error while fetching user! Corrupt token? -> Try erasing cookies!");
            return null;
        })

    if (!user.userId) {
        return {studyProgress: -1, totalImages: -1, currentImage: -1};
    } else {
        return {
            studyProgress: user.studyProgress,
            //Reads how many images total need to be rated...
            totalImages: JSON.parse(user.imageOrder).array.length,
            //...and how many have been rated. Since the current Image is the array index, we have to increment!
            currentImage: user.currentImage + 1
        }

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


export async function fetchHistory(): Promise<number[]>{
    interface history {
        points: number,
        timestamp: number
    }

    let points: number[] = await fetch(
        baseUrl + "response/userHistory", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getToken(),
            }
        }
    )
        .then(response => response.json())
        .then(response => {
            let res: history[] = response;
            try {
                res.sort(
                    function (a:any, b:any) {
                        return (a.timestamp - b.timestamp);
                    }
                )
            }
            catch(error) { console.log(error) }

            return res.map(element => {
                return (element.points)
            });
        })
    return points;
}

export async function submitResponse(data: Response) {
    //console.log("wants to submit", JSON.stringify(data));
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

export function getImageUrl(name: string):string{
    return baseUrl + "img/" + name;
}

export function getSoundUrl(name: string):string{
    return baseUrl + "sound/" + name;
}

export function wipeToken() {
    setToken("");
}