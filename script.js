document.getElementById("uploadBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");
    const outputBox = document.getElementById("output-box");
    const resultBox = document.getElementById("result-box");
    const loading = document.getElementById("loading");

    if (fileInput.files.length === 0) {
        alert("Please select a file.");
        return;
    }

    let file = fileInput.files[0];
    console.log("Selected File:", file.name); // Debugging

    let formData = new FormData();
    formData.append("file", file);

    // Show loading
    loading.style.display = "block";
    resultBox.style.display = "none";

    try {
        let response = await fetch("https://aipr-project.onrender.com/process", {
            method: "POST",
            body: formData,
        });

        let result = await response.json();
        console.log("API Response:", result); // Debugging log

        if (result.message) {
            outputBox.textContent = result.message; // Ensure this matches backend response
        } else {
            outputBox.textContent = "No valid response received.";
        }

    } catch (error) {
        console.error("Error:", error);
        outputBox.textContent = "An error occurred while processing.";
    } finally {
        // Hide loading and show results
        loading.style.display = "none";
        resultBox.style.display = "block";
    }
});
