function ApplyRedirect(){
        document.getElementById("applyredirect").addEventListener("click", function(){
            window.location.href = 'http://localhost:8080/resume/';
        })
};


// const for upload button which when clicked will do file prview
const uploadRes = document.getElementById("UploadButton");
// const for file explorer
const pdfExplorer = document.getElementById("pdfInput");
// const for displaying pdf preview on page
const preview = document.getElementById("pdfPreview");

uploadRes.addEventListener("click", () => {
    pdfExplorer.click();
});

 // Step 2: When PDF is selected, show preview
 pdfExplorer.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const fileURL = URL.createObjectURL(file);
        preview.innerHTML = `
            <embed src="${fileURL}" type="application/pdf" width="100%" height="600px" />
        `;
    } else {
        alert('Please select a valid PDF file.');
    }
});
