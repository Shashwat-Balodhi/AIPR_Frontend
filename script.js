document.getElementById("upload-form").addEventListener("submit", async function (event) {
    event.preventDefault();  // Stop default form submission

    let fileInput = document.getElementById("file-input");
    let file = fileInput.files[0];

    if (!file) {
        alert("Please select a file first.");
        return;
    }

    let formData = new FormData();
    formData.append("file", file);  // Backend expects 'file' key

    // Show loading animation
    document.getElementById("loading").style.display = "block";

    try {
        let response = await fetch("https://aipr-project.onrender.com/process", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        let data = await response.json();

        // Hide loading animation
        document.getElementById("loading").style.display = "none";

        // Show result
        document.getElementById("result-box").style.display = "block";
        document.getElementById("output-box").innerText = data.result;

    } catch (error) {
        console.error("Error:", error);
        alert("Failed to process document.");
        document.getElementById("loading").style.display = "none";
    }
});
