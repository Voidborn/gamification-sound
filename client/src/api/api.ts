import React from "react"
    const baseUrl = "http://localhost:8080/";
async function hello() {
    fetch(baseUrl+"hello/")
        .then(response => {
            console.log(response);
            response.json().then(data =>
               console.log(data) );
            console.log("error?");
        })
        .catch(err => {console.log(err)})
    
}


export default hello