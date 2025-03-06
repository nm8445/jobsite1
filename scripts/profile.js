// Filename: profile.js

// JavaScript to handle enabling the editing mode
document.getElementById('edit-button').addEventListener('click', function() {
document.getElementById('edit-section').style.display = 'block';
document.getElementById('First-Name').disabled = false;
document.getElementById('Last-Name').disabled = false;
document.getElementById('profileEmail').disabled = false;
});

// Handle Save Changes
document.getElementById('save-button').addEventListener('click', function() {
// The updated information is sent to the server
const updatedFirstName = document.getElementById('editFirstName').value;
const updatedLastName = document.getElementById('editLastName').value;
const updatedEmail = document.getElementById('editEmail').value;

// const updatedPassword = document.getElementById('editPassword').value;

// Hide the edit form again after saving
document.getElementById('edit-section').style.display = 'none';
document.getElementById('First-Name').value = updatedFirstName;
document.getElementById('Last-Name').value = updatedLastName;
document.getElementById('profileEmail').value = updatedEmail;
});