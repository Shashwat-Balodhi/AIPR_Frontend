document.getElementById("upload-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent page reload

    let fileInput = document.getElementById("file");
    let file = fileInput.files[0];

    if (!file) {
        alert("Please select a PDF file to upload.");
        return;
    }

    let formData = new FormData();
    formData.append("file", file);

    // Show loading animation
    document.getElementById("loading").style.display = "block";
    document.getElementById("result-box").style.display = "none";

    // Start countdown timer (2 minutes)
    let timeLeft = 120;
    let countdownElement = document.getElementById("countdown");
    let timer = setInterval(() => {
        timeLeft--;
        countdownElement.innerText = `${timeLeft}s remaining`;
        if (timeLeft <= 0) clearInterval(timer);
    }, 1000);

    try {
        let response = await fetch("https://proofreader-backend.onrender.com/process", {
            method: "POST",
            body: formData
        });

        let result = await response.json();

        // Stop loading & timer
        clearInterval(timer);
        document.getElementById("loading").style.display = "none";

        // Show result
        document.getElementById("result-box").style.display = "block";
        document.getElementById("output-box").innerText = result.output || "No text extracted.";

    } catch (error) {
        clearInterval(timer);
        document.getElementById("loading").style.display = "none";
        alert("Error processing document. Please try again.");
    }
});
