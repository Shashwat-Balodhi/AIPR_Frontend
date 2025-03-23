document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("upload-form");
    const fileInput = document.getElementById("file-input");
    const resultBox = document.getElementById("result-box");
    const outputBox = document.getElementById("output-box");
    const loading = document.getElementById("loading");

    uploadForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        const file = fileInput.files[0];

        if (!file) {
            alert("Please select a file before uploading.");
            return;
        }

        // Show loading animation
        loading.style.display = "block";
        resultBox.style.display = "none"; 

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("https://aipr-project.onrender.com/process", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            // Hide loading animation and show result box
            loading.style.display = "none";
            resultBox.style.display = "block";

            // ✅ Only show Legal Analysis
            outputBox.innerHTML = `
                <strong>Legal Analysis:</strong><br>${result.analysis || "No analysis available"}
            `;
        } catch (error) {
            console.error("Error processing file:", error);
            outputBox.textContent = "Error processing file. Please try again.";
            loading.style.display = "none";
            resultBox.style.display = "block";
        }
    });
});
