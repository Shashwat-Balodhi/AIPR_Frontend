document.getElementById("upload-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    let fileInput = document.getElementById("file-input");
    let resultBox = document.getElementById("result-box");
    let outputBox = document.getElementById("output-box");
    let loading = document.getElementById("loading");

    // Check if a file is selected
    if (fileInput.files.length === 0) {
        alert("Please select a file to upload.");
        return;
    }

    // Show loading animation
    loading.style.display = "block";
    resultBox.style.display = "none";

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        let response = await fetch("https://aipr-project.onrender.com/process", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Server responded with an error.");
        }

        let data = await response.json();

        // Hide loading animation and show results
        loading.style.display = "none";
        resultBox.style.display = "block";
        outputBox.textContent = data.result; // Ensure backend sends a `result` field

    } catch (error) {
        console.error("Error:", error);
        loading.style.display = "none";
        alert("Failed to process the document. Check your API URL and CORS settings.");
    }
});
