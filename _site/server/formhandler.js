function button(){
    document.getElementById("sign-up-form").addEventListener("submit", async function(event){
        event.preventDefault();// prevents the page from reloading 

        // this function gets the form data and stores it in each property in the object
        const formdata = {
            firstname: document.getElementById("First-Name").value,
            lastname: document.getElementById("Last-Name").value,
            email: document.getElementById("signupEmail").value,
            password: document.getElementById("signupPassword").value
    
        };
        console.log('This is the info grabbed from the form',formdata);
        const data = JSON.stringify(formdata);
        console.log('This is the data turned to json',data);
            // this is a fetch request which sends a post request with the json data to the endpoint /signup. the endpoint is what has the request so you need to pull it in the express file
        
        const response = await fetch("http://localhost:3000/signup/",{// must point to the express backend 
            method: 'POST', // this is the request method
            // request headers give the server information about the request. it tells the server the format of the request body
            headers:{
                'Content-Type': 'application/json'// this is the request header
            },
            body: data// this is the request body
        });
        const result = await response.json();
        console.log("Result success:", result.success);
        const messageBox = document.getElementById("message-box");
         if (result.success) {
             messageBox.innerHTML = `<p style="color: green;">${result.message}</p>`;
         } else {
             messageBox.innerHTML = `<p style="color: red;">${result.message}</p>`;
         }
       
    });
}
