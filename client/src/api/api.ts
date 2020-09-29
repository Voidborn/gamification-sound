import { userInterface } from '../interfaces/userInterface'

const baseUrl = "http://localhost:8080/";

export async function register(prolific?: string): Promise<userInterface>{

    
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

export default register