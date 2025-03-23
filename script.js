document.addEventListener("DOMContentLoaded", function () {
    let uploadForm = document.getElementById("upload-form");
    let fileInput = document.getElementById("file-input");
    let loading = document.getElementById("loading");
    let resultBox = document.getElementById("result-box");
    let outputBox = document.getElementById("output-box");

    if (!uploadForm || !fileInput) {
        console.error("❌ ERROR: Form or file input not found! Check your HTML IDs.");
        return;
    }

    uploadForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        if (fileInput.files.length === 0) {
            alert("⚠️ Please select a file.");
            return;
        }

        let file = fileInput.files[0];
        let formData = new FormData();
        formData.append("file", file);

        // Show loading animation
        loading.style.display = "block";
        resultBox.style.display = "none"; // Hide result while processing

        try {
            let response = await fetch("https://aipr-project.onrender.com/process", {
                method: "POST",
                body: formData,
            });

            let result = await response.json();
            console.log("✅ API Response:", result);

            // Hide loading animation
            loading.style.display = "none";

            if (result.message) {
                outputBox.textContent = result.message;
                resultBox.style.display = "block"; // Show result
            } else {
                outputBox.textContent = "No response received.";
            }
        } catch (error) {
            console.error("⚠️ Error sending request:", error);
            loading.style.display = "none";
            outputBox.textContent = "Error processing the file.";
            resultBox.style.display = "block";
        }
    });
});
