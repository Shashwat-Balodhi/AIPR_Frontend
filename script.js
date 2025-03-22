document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData();
    let fileInput = document.getElementById("pdfFile");

    if (fileInput.files.length === 0) {
        document.getElementById("output").innerText = "Please select a file.";
        return;
    }

    formData.append("file", fileInput.files[0]);

    try {
        let response = await fetch("https://aipr-project.onrender.com/process", {
            method: "POST",
            body: formData
        });

        let result = await response.json();
        document.getElementById("output").innerText = result.message || "File processed successfully.";
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("output").innerText = "Error processing document.";
    }
});
