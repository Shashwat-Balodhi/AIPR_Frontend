document.getElementById("uploadForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    let formData = new FormData();
    let fileInput = document.getElementById("fileInput").files[0];
    
    if (!fileInput) {
        alert("Please select a file.");
        return;
    }
    
    formData.append("file", fileInput);

    try {
        let response = await fetch("https://aipr-project.onrender.com/process", {
            method: "POST",
            body: formData
        });

        let result = await response.json();
        
        // Display the output
        document.getElementById("output").innerHTML = `<strong>Analysis Result:</strong> ${result.message}`;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("output").innerHTML = `<strong>Error processing file.</strong>`;
    }
});
