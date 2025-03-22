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
    resultBox.innerHTML = "<b>Processing...</b> ⏳";

    try {
        let response = await fetch("https://aipr-project.onrender.com/process", {
            method: "POST",
            body: formData
        });

        let data = await response.json();

        if (response.ok) {
            resultBox.innerHTML = `<b>Analysis Result:</b><br><pre>${data.analysis || "No analysis received"}</pre>`;
        } else {
            resultBox.innerHTML = `<b style="color:red;">Error:</b> ${data.error || "Something went wrong"}`;
        }
    } catch (error) {
        resultBox.innerHTML = `<b style="color:red;">Request failed:</b> ${error.message}`;
    }
}
