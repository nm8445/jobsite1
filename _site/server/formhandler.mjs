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
         try {
            // this is a fetch request which sends a post request with the json data to the endpoint /signup. the endpoint is what has the request so you need to pull it in the express file
        const response = await fetch('/signup',{// calls the server at the url signup
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        });
        const result = await response.json();
        console.log(result);
            
         } catch (error) {
            console.error("Error submitting form:", error); 
            
         }
    });
}
