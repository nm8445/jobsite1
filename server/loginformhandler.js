function loginbutton(){
    document.getElementById("loginform").addEventListener("submit", async function(event) {
        event.preventDefault();// prevents the page from reloading

        const formdata = {// assigns the value of what was entered in the form to properties in formdata the constant
            email: document.getElementById("loginInputEmail").value,
            password: document.getElementById("loginInputPassword").value
        };
        console.log(" the form data that was entered",formdata);
        const data = JSON.stringify(formdata);// turning the formdata into json
        console.log("this is the data turned into json",data);

        // fetch api sending a post request to the server endpoint
        const response = await fetch("http://localhost:3000/login/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: data
        });
        const result = await response.json();
        console.log(result);
    });
};