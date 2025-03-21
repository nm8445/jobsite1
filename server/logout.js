async function logout(){
    
    const response = await fetch("http://localhost:3000/logout/",{
        method: "Get",
        credentials: 'include', // Include cookies
    });
}
logout();


