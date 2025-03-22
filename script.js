document.getElementById("upload-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    let fileInput = document.getElementById("file");
    let loadingDiv = document.getElementById("loading");
    let outputBox = document.getElementById("output-box");
    let resultBox = document.getElementById("result-box");

    if (fileInput.files.length === 0) {
        alert("Please select a file to upload.");
        return;
    }

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    // Show loading animation and result box
    loadingDiv.style.display = "block";
    resultBox.style.display = "block";
    outputBox.innerHTML = "<p>Waiting for response...</p>";

    // Start 2-minute countdown timer
    let timeLeft = 120;
    let countdownInterval = setInterval(() => {
        timeLeft--;
        outputBox.innerHTML = `<p>Processing... (${timeLeft}s remaining)</p>`;
        if (timeLeft <= 0) clearInterval(countdownInterval);
    }, 1000);

    try {
        let response = await fetch("https://proofreader-backend.onrender.com/process", {
            method: "POST",
            body: formData
        });

        clearInterval(countdownInterval); // Stop the timer when response is received
        loadingDiv.style.display = "none"; // Hide loading animation

        if (!response.ok) {
            outputBox.innerHTML = "<p>Error processing document. Please try again.</p>";
            return;
        }

        let result = await response.json();
        outputBox.innerHTML = `<pre>${result.text || "No text extracted"}</pre>`; // Display extracted text
        outputBox.style.maxHeight = "400px"; // Ensure scrollable output
        outputBox.style.overflowY = "auto";

    } catch (error) {
        clearInterval(countdownInterval);
        loadingDiv.style.display = "none";
        outputBox.innerHTML = "<p>Server error. Please try again later.</p>";
    }
});
