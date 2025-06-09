# 🧠 Hate Speech Detection Chrome Extension

A Chrome Extension that detects and censors hate speech, obscenity, and offensive content using NLP and TensorFlow.js. Built as a final-year major project, it allows users to filter web content in real time with customizable levels of censorship.

---

## 🚀 Features

- ✅ Real-time filtering of hate speech, threats, and obscenity
- ✅ One-click Enable/Disable toggle
- ✅ Adjustable sliders for:
  - Sensibility
  - Obscenity
  - Threat
- ✅ Gentlemen Mode for polite on-screen censorship
- ✅ Multiple theme options: Dark, Bright, Red
- ✅ Entirely runs on-device using TensorFlow.js (no server calls)

---

## 💻 Tech Stack

- HTML, SCSS, JavaScript
- Chrome Extensions API
- TensorFlow.js for client-side ML
- POS tagging and NLP preprocessing (jspos)

---


## 🔧 How to Install Locally

1. Clone or download this repository
2. Open Google Chrome and go to `chrome://extensions`
3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the `extension/` folder

---


## 🧑‍💻 Author

**Swadha Dwivedi**  
Frontend Developer | Passionate about clean UI and intuitive UX  
🔗 [LinkedIn](https://www.linkedin.com/in/swadhadwivedi)  
📫 dswadha@gmail.com
[GitHub Profile](https://github.com/swadhadwivedi)

## 📂 Folder Structure

```bash
chrome-hate-text-detector/
├── extension/              # All extension source code
│   ├── popup/              # Popup UI HTML/CSS/JS
│   ├── content/            # Scripts injected into webpages
│   ├── background/         # Background logic
│   ├── modules/            # NLP libraries (jspos)
│   ├── engine/             # Model config and JSON data
│   ├── manifest.json       # Chrome extension config
│   ├── style.scss          # SCSS styling
├── images/                 # Screenshots or logos
└── README.md

---
