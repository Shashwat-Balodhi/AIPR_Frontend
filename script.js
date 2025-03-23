document.addEventListener("DOMContentLoaded", function () {
    let uploadBtn = document.getElementById("uploadBtn");
    let fileInput = document.getElementById("fileInput");

    if (!uploadBtn || !fileInput) {
        console.error("Upload button or file input not found!");
        return;
    }

    uploadBtn.addEventListener("click", async () => {
        if (fileInput.files.length === 0) {
            alert("Please select a file.");
            console.error("No file selected.");
            return;
        }

        let file = fileInput.files[0];
        console.log("Selected File:", file); // Debugging log

        let formData = new FormData();
        formData.append("file", file);

        console.log("FormData before sending:", formData.get("file")); // Debugging log

        let response = await fetch("https://aipr-project.onrender.com/process", {
            method: "POST",
            body: formData,
        });

        let result = await response.json();
        console.log("API Response:", result); // Debugging log

        if (result.message) {
            document.getElementById("output-box").textContent = result.message;
            document.getElementById("result-box").style.display = "block";
        } else {
            document.getElementById("output-box").textContent = "No response received.";
        }
    });
});
