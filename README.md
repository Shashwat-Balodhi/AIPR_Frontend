
# AI Proofreader - Frontend

This is the frontend for the **AI Proofreader (AIPR)** system. It allows users to upload legal documents (PDFs), sends them to the backend for processing, and displays the AI-analyzed output on the webpage.

🌐 Live Demo: [Click Here](https://shashwat-balodhi.github.io/AIPR_Frontend/)   backend server is offline right now...

🛠️ Backend Repo: [AIPR_Backend](https://github.com/Shashwat-Balodhi/AIPR_Backend)

---

## 📁 Project Structure

```
AIPR_Frontend/
├── index.html          # Main webpage layout
├── style.css           # UI styling
└── script.js           # Logic to handle PDF upload and fetch results
```

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Shashwat-Balodhi/AIPR_Frontend.git
   cd AIPR_Frontend
   ```

2. Open `index.html` in your browser.

3. Make sure your backend server (Flask API) is running and accessible at:
   ```
   https://proofreader-backend.onrender.com/process
   ```

---

## 🧠 Features

- Upload PDF legal documents
- Sends document to the backend for OCR + NLP processing
- Displays extracted data, summaries, and legal risk assessments

---


## 🕸️Website 

![image](https://github.com/user-attachments/assets/0cddc1c7-98cc-43b2-b244-8efa36e83039)


---
## 🌍 Deployment

You can host this frontend using:
- GitHub Pages
- Netlify
- Vercel

Just make sure the backend endpoint in `script.js` is correctly pointing to the deployed backend URL.

---

## 📜 License

MIT License © 2025 Shashwat Balodhi
