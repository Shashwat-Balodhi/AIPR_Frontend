document.getElementById("uploadBtn").addEventListener("click", function () {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    // Show loading spinner
    document.getElementById("loading").style.display = "block";
    document.getElementById("result-box").style.display = "none";

    const formData = new FormData();
    formData.append("file", file);

    // Start a 2-minute timer
    let timer = setTimeout(() => {
        document.getElementById("output-box").innerText = "Processing taking longer than expected...";
    }, 120000); // 2 minutes

    fetch("https://aipr-project.onrender.com/process", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        clearTimeout(timer); // Stop timer when response is received
        document.getElementById("loading").style.display = "none"; // Hide spinner
        document.getElementById("result-box").style.display = "block"; // Show result
        document.getElementById("output-box").innerText = data.result || "No text extracted";
    })
    .catch(error => {
        clearTimeout(timer);
        document.getElementById("loading").style.display = "none";
        document.getElementById("output-box").innerText = "Error processing file.";
    });
});
