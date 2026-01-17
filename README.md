# <div align="center">🎓 Student Analytics AI</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

<div align="center">
  <h3>Next-Generation Student Placement Prediction using Custom ML Engine</h3>
  <p><i>Empowering students with AI-driven career insights.</i></p>
</div>

---

##  Overview

**Student Analytics AI** is a professional-grade predictive platform designed to bridge the gap between academic preparation and recruitment readiness. It features a proprietary **Machine Learning engine** built entirely from scratch in JavaScript, offering a transparent and highly customizable approach to placement forecasting.

---

##  Design System (The "Glass" Aesthetic)

The application follows a premium **Glassmorphism** design language. Below are the core design tokens:

| Token | Value | Preview |
| :--- | :--- | :--- |
| **Primary Blue** | `#3b82f6` | 🔵 |
| **Surface Glass** | `rgba(255, 255, 255, 0.08)` | ⚪ (Translucent) |
| **Success Emerald**| `#10b981` | 🟢 |
| **Risk Rose** | `#f43f5e` | 🔴 |
| **Typography** | `Inter, system-ui, Avenir` | **Abc 123** |

###  Visual Highlights
- **Backdrop Blur**: `blur(20px)` for high-depth focus.
- **Micro-interactions**: Framer Motion powered hover states and layout transitions.
- **Responsive Grid**: Fluid layout system that adapts to any screen dimension.

---

## 🛠 Tech Stack & Architecture

### <div align="left">🌐 Frontend (The Interface)</div>
- **React 19**: Utilizing the latest concurrent rendering features.
- **Framer Motion**: For fluid, organic animations (spring physics).
- **Lucide Icons**: Crisp, vector-based iconography.
- **Glassmorphic UI**: High-end aesthetic with subtle gradients and blurs.

### <div align="left">🧠 Backend & AI (The Brain)</div>
- **Node.js & Express**: High-performance asynchronous API layer.
- **Custom ML Engine**: 
  - **Algorithm**: Logistic Regression.
  - **Optimization**: Gradient Descent.
  - **Normalization**: Min-Max scaling for multi-feature stability.
- **Persistence**: Weights and bias are serialized to `model_state.json` for persistent intelligence.

---

## 🧬 Scientific Methodology: The Model

The "Inference Engine" transforms raw student data into a statistical probability.

### 1. Feature Map
The model evaluates the following vectors:
- **Academic Domain**: CGPA, Active Backlogs.
- **Technical Domain**: Tech Score, Projects, Certifications.
- **Soft Skill Domain**: Communication Score, Hackathons.
- **Cognitive Domain**: IQ Score.

### 2. The Algorithm
Our implementation of **Logistic Regression** calculates the probability $P$:
$$P = \sigma(\theta^T x + b)$$
Where $\sigma$ is the Sigmoid function, $\theta$ is the weight vector, $x$ is the input feature vector, and $b$ is the bias.

---

## 📂 Project Architecture

```bash
├── MODEL/                 # Intelligence Layer
│   ├── model_engine.js    # Logistic Regression Implementation
│   ├── train.js           # Gradient Descent Training Logic
│   ├── index.js           # API Gateway (Express)
│   └── model_state.json   # Generated AI Intelligence
└── USER/                  # Presentation Layer
    ├── src/
    │   ├── App.jsx        # Main Application Logic
    │   ├── App.css        # Glassmorphic Stylesheets
    │   └── main.jsx       # React Entry Point
    └── package.json       # Dependencies & Scripts
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Setup
1. **Initialize AI Backend**:
   ```bash
   cd MODEL && npm install
   npm run train  # Generate the model
   npm start      # Port 5001
   ```
2. **Initialize Frontend**:
   ```bash
   cd USER && npm install
   npm run dev    # Port 5173
   ```

---

