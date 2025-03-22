document.getElementById("upload-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    let fileInput = document.getElementById("file");
    let outputDiv = document.getElementById("output");
    let loadingDiv = document.getElementById("loading");

    // Show loading spinner
    loadingDiv.style.display = "block";
    outputDiv.innerHTML = ""; // Clear previous output

    // Start a 2-minute timer
    let timer = setTimeout(() => {
        outputDiv.innerHTML = "Processing is taking longer than expected...";
    }, 120000); // 2 minutes

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        let response = await fetch("https://proofreader-backend.onrender.com/process", {
            method: "POST",
            body: formData
        });

        let result = await response.json();
        
        // Stop the timer as soon as output is ready
        clearTimeout(timer);

        // Hide loading animation
        loadingDiv.style.display = "none";

        // Display output
        outputDiv.innerHTML = `<pre>${result.text}</pre>`; // Keeps formatting

    } catch (error) {
        clearTimeout(timer);
        loadingDiv.style.display = "none";
        outputDiv.innerHTML = "Error processing document. Please try again.";
    }
});
