// File: logout.js 

async function logout() {
    try {
        // Check if the user is logged in
        const checkResponse = await fetch('http://localhost:3000/check-loggedin', {
            method: 'GET',
            credentials: 'include', // Include cookies
        });

        const data = await checkResponse.json();

        if (data.loggedin) {
            // Proceed with logout if user is logged in
            const response = await fetch("http://localhost:3000/logout/", {
                method: "GET",
                credentials: 'include', // Include cookies
            });

            if (response.ok) {
                // Hide the logout button and show the login button
                const logoutButton = document.getElementById("navlogoutbutton");
                const loginButton = document.getElementById("navloginbutton");
                logoutButton.style.display = "none";
                loginButton.style.display = "block";
                
                // Redirect to login page
                window.location.href = 'http://localhost:8080/login';
            } else {
                console.error("Logout failed");
            }
        } else {
            // If the user is not logged in
            console.log("User is not logged in");
        }
    } catch (error) {
        console.error("Error during logout process:", error);
    }
}
// Trigger the logout function when the button is clicked
document.getElementById("navlogoutbutton").addEventListener("click", logout);

