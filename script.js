document.addEventListener("DOMContentLoaded", function () {
    let uploadBtn = document.getElementById("uploadBtn");
    let fileInput = document.getElementById("fileInput");

    if (!uploadBtn || !fileInput) {
        console.error("❌ ERROR: Upload button or file input not found! Check your HTML IDs.");
        return;
    }

    uploadBtn.addEventListener("click", async () => {
        if (fileInput.files.length === 0) {
            alert("⚠️ Please select a file.");
            return;
        }

        let file = fileInput.files[0];
        let formData = new FormData();
        formData.append("file", file);

        try {
            let response = await fetch("https://aipr-project.onrender.com/process", {
                method: "POST",
                body: formData,
            });

            let result = await response.json();
            console.log("✅ API Response:", result);

            let outputBox = document.getElementById("output-box");
            let resultBox = document.getElementById("result-box");

            if (result.message) {
                outputBox.textContent = result.message;
                resultBox.style.display = "block";
            } else {
                outputBox.textContent = "No response received.";
            }
        } catch (error) {
            console.error("⚠️ Error sending request:", error);
        }
    });
});
