document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("file", document.getElementById("pdfFile").files[0]);

    try {
        let response = await fetch("https://aipr-project.onrender.com", { // ✅ Update Backend URL
            method: "POST",
            body: formData
        });

        let result = await response.json();
        document.getElementById("output").innerText = result.message; // ✅ Show Output on Website
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("output").innerText = "Error processing document.";
    }
});
