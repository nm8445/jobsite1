// checkLoginStatus.js
const checkLoginStatus = async () => {
    try {
        // Send a GET request to server check if the user is logged in 
        // (I added a check-loggedin to server)
        const response = await fetch('http://localhost:3000/check-loggedin', {
            method: 'GET',
            credentials: 'include', 
        });

        const data = await response.json(); 

        if (data.loggedin) {
            // If logged in, show logout button and hide login button
            document.getElementById('logout-button').style.display = 'block';
            document.getElementById('login-button').style.display = 'none';
        } else {
            // If not logged in, show login button and hide logout button
            document.getElementById('logout-button').style.display = 'none';
            document.getElementById('login-button').style.display = 'block';
        }
    } catch (error) {
        console.error('Error checking login status:', error); // Log any errors
    }
};

// Run checkLoginStatus when the page is loaded
window.onload = checkLoginStatus;