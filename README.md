### 🌸 PinkGuard – Women’s Health Companion

> Gentle Care for Every Woman 💗

PinkGuard is a web-based women’s health awareness platform designed to provide early risk screening, emotional reassurance, and actionable next steps for common health conditions affecting women.

---

## 📌 Project Description

PinkGuard helps women monitor and understand their health by offering:

* Breast Cancer risk screening
* PCOS / PCOD symptom analysis
* Iron Deficiency detection
* Period tracking & cycle prediction
* Personalized nutrition suggestions
* Emotional support and recommended next steps

The goal is to empower women with awareness and informed decision-making in a simple and accessible way.

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* Flask
* Flask-CORS
* Gunicorn

### Database

* MongoDB Atlas

### Deployment

* Render (HTTPS enabled)

---

## 🚀 Features

* Symptom-based risk analysis engine
* Emotional support messaging based on risk level
* Clear next-step medical recommendations
* Period cycle prediction system
* Categorized nutrition guide (Iron Boost, Hormonal Balance, Immunity)
* REST API backend integration
* Cloud deployment with MongoDB Atlas

---

## 🏗 System Architecture

PinkGuard follows a layered architecture:

User (Browser)
↓
Frontend (HTML, CSS, JavaScript)
↓
Flask Backend (REST API)
↓
MongoDB Atlas (Cloud Database)

Backend modules:

* Authentication module
* Risk calculation engine
* Emotional support logic
* Period prediction logic

Architecture diagram is available in:

<img width="1523" height="880" alt="diagram-export-2-28-2026-9_34_31-AM" src="https://github.com/user-attachments/assets/128c7b35-7f9c-4e1d-a8bd-4a6d2af89843" />


---

## 📂 Folder Structure

```
pinkguard/
│
├── app.py
├── requirements.txt
├── Procfile
├── runtime.txt
├── README.md
├── LICENSE
├── .gitignore
│
├── templates/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── breast-cancer.html
│   ├── pcos.html
│   ├── anemia.html
│   ├── period.html
│   ├── nutrition.html
│   └── symptom.html
│
├── static/
│   ├── css/style.css
│   └── js/script.js
│
└── docs/
    ├── architecture.png
    └── screenshots/
```

* Lowercase folder names
* No spaces in filenames
* Organized modular structure

---

## 💻 Installation

Clone repository:

```bash
git clone [https://github.com/yourusername/pinkguard.git](https://github.com/ArchanaVadakkath/pinkguard
cd pinkguard
```

Create virtual environment:

```bash
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## ▶ Run Locally

Set MongoDB environment variable:

```bash
export MONGO_URI="your_mongodb_connection_string"
```

Run server:

```bash
python app.py
```

Open in browser:

```
http://127.0.0.1:5000
```

---

## 🌍 Live Deployment

Live link:

```
https://pinkguard-backend.onrender.com](https://pinkguard.onrender.co
```

* HTTPS enabled
* No errors on load
* Connected to MongoDB Atlas

---

## 📡 API Documentation

### Base URL

```
https://pinkguard-backend.onrender.com](https://pinkguard.onrender.com
```

### Endpoints

**POST /api/register**
Registers a new user.

**POST /api/login**
Authenticates user.

**POST /api/add_period**
Adds period data and predicts next cycle.

**POST /api/pcos**
Performs PCOS risk analysis.

**GET /api/user/<email>**
Returns user data (excluding password).

All responses are JSON formatted.

---

## 🖼 Screenshots

Store screenshots inside:

<img width="1871" height="893" alt="Screenshot 2026-02-28 095606" src="https://github.com/user-attachments/assets/96da9fe7-4340-4715-a9f9-1e4602d51a84" />
<img width="1861" height="905" alt="Screenshot 2026-02-28 085500" src="https://github.com/user-attachments/assets/16bae149-d5d9-491e-abf2-899f168a2463" />
<img width="1864" height="888" alt="Screenshot 2026-02-28 085821" src="https://github.com/user-attachments/assets/b101b3a5-9ed9-4294-afe8-1bdc1735a7d1" />
<img width="1871" height="896" alt="Screenshot 2026-02-28 085857" src="https://github.com/user-attachments/assets/6e6a4b36-b1c5-4b85-b50b-5ac662ba62b5" />
<img width="1854" height="874" alt="Screenshot 2026-02-28 090241" src="https://github.com/user-attachments/assets/39cdc2ad-0227-4395-865d-0a0077c373c4" />
<img width="1867" height="885" alt="Screenshot 2026-02-28 090336" src="https://github.com/user-attachments/assets/4ad20360-ca1d-45da-b1c4-01a6675a3b1d" />




Recommended screenshots:

* Landing Page
* Dashboard
* Symptom Result Page
* Period Tracker
* Nutrition Guide

---

## 🎥 Demo Video

Demo video link:

```
[https://your-demo-video-link.com](https://drive.google.com/file/d/1gMgXaJNxVjGg2rlwyCeARJ5Gq-TaLr55/view?usp=sharing)
```

---

## 🔐 Security Practices

* MongoDB URI stored as environment variable
* No credentials hardcoded
* RESTful API design
* Proper HTTP status codes

---

## 🧠 Code Quality

* No errors on load
* Backend routes include comments
* Clean function naming
* Modular folder structure
* No monolithic files

---

## 📝 Commit Standards

* Meaningful commit messages
* Feature-based commits
* Development spread over multiple days
* AI tools documented (used for debugging, optimization, and documentation assistance)

Example commit messages:

```
Added PCOS risk scoring logic
Integrated MongoDB Atlas
Implemented emotional support responses
Deployed backend to Render
Fixed CORS issue
```

---

## 👩‍💻 Team Members

Archana V
Devapriya K

---

## 📜 License

This project is licensed under the MIT License.
See the LICENSE file for details.

---

## 🎯 Impact Statement

PinkGuard empowers women through early health awareness, structured symptom screening, emotional reassurance, and actionable next steps — delivered via a secure, cloud-deployed web platform.


