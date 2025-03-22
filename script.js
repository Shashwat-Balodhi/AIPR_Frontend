const API_URL = ""; // Use the new backend URL

document.getElementById("uploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("pdf", document.getElementById("pdfInput").files[0]);

    const response = await fetch(`${API_URL}/process`, {
        method: "POST",
        body: formData,
    });

    const result = await response.json();
    document.getElementById("output").innerText = result.text; // Display result
});
