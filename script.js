document.getElementById("uploadBtn").addEventListener("click", async function () {
    const fileInput = document.getElementById("fileInput");
    const resultBox = document.getElementById("result-box");
    const outputBox = document.getElementById("output-box");
    const loading = document.getElementById("loading");

    if (!fileInput.files.length) {
        alert("Please select a file.");
        return;
    }

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    resultBox.style.display = "none"; // Hide result initially
    outputBox.innerText = "Waiting for response...";
    loading.style.display = "block"; // Show loading

    try {
        const response = await fetch("https://aipr-project.onrender.com/process", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        loading.style.display = "none"; // Hide loading

        if (response.ok) {
            resultBox.style.display = "block"; // Show result
            outputBox.innerText = JSON.stringify(result, null, 2);
        } else {
            outputBox.innerText = `Error: ${result.error || "Something went wrong"}`;
            resultBox.style.display = "block";
        }
    } catch (error) {
        loading.style.display = "none";
        outputBox.innerText = "Failed to connect to the server.";
        resultBox.style.display = "block";
    }
});
