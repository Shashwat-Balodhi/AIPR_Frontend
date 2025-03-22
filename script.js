async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const resultBox = document.getElementById("result-box");

    if (fileInput.files.length === 0) {
        resultBox.style.display = "block";
        resultBox.innerHTML = "<b style='color:red;'>Please select a file to upload.</b>";
        return;
    }

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    resultBox.style.display = "block";
    resultBox.innerHTML = "<b>Processing... (This may take some time) ⏳</b>";

    try {
        let controller = new AbortController();  
        let timeoutId = setTimeout(() => controller.abort(), 300000);  // ⬅ Increase timeout to 150s  

        let response = await fetch("https://aipr-project.onrender.com/process", {
            method: "POST",
            body: formData,
            signal: controller.signal
        });

        clearTimeout(timeoutId);  // Clear timeout if response comes back

        let data = await response.json();
        console.log("API Response:", data);  // ✅ Debugging

        if (response.ok && data.analysis) {
            resultBox.innerHTML = `<b>Analysis Result:</b><br><pre>${data.analysis}</pre>`;
        } else {
            resultBox.innerHTML = `<b style="color:red;">No text extracted</b>`;
        }
    } catch (error) {
        if (error.name === "AbortError") {
            resultBox.innerHTML = `<b style="color:red;">Request timed out. Please try again.</b>`;
        } else {
            resultBox.innerHTML = `<b style="color:red;">Request failed:</b> ${error.message}`;
        }
    }
}
