document.getElementById("upload-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    let fileInput = document.getElementById("file");
    let outputDiv = document.getElementById("output");
    let resultBox = document.getElementById("result-box");
    let loadingDiv = document.getElementById("loading");

    // Show loading spinner and hide previous results
    loadingDiv.style.display = "block";
    resultBox.style.display = "none";
    outputDiv.innerHTML = ""; // Clear previous output

    // Start a 2-minute timer (120,000ms)
    let timer = setTimeout(() => {
        outputDiv.innerHTML = "Processing is taking longer than expected...";
        resultBox.style.display = "block";
    }, 120000); 

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

        // Show result box with processed output
        resultBox.style.display = "block";
        outputDiv.innerHTML = `<pre>${result.text}</pre>`; // Preserves formatting

    } catch (error) {
        clearTimeout(timer);
        loadingDiv.style.display = "none";
        resultBox.style.display = "block";
        outputDiv.innerHTML = "Error processing document. Please try again.";
    }
});
