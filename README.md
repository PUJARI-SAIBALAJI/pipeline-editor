# 🚀 DAG Editor - Visual Workflow Designer

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react)](https://reactjs.org/)
[![React Flow](https://img.shields.io/badge/react%20flow-%2361DAFB.svg?logo=react)](https://reactflow.dev/)

A powerful **Directed Acyclic Graph (DAG)** editor built with **React** and **React Flow** to create, visualize, and manage workflow pipelines interactively and intuitively.

---

## 📋 Problem Statement

The goal of this project was to develop a fully functional DAG (Directed Acyclic Graph) editor that allows users to:
- Visually design workflows and pipeline structures.
- Create and connect custom nodes with drag-and-drop functionality.
- Ensure DAG-specific constraints such as **no cyclic dependencies** and **unique node validations**.
- Provide real-time feedback on edge connections and graph structure.

📄 **Problem Statement PDF**:  
🔗 [Click to View](https://drive.google.com/file/d/10mTmic435GnrSVxH-69gYt9JGHTvcR4w/view?usp=sharing)

---

## 📘 Project Documentation

<p align="center">
  <a href="https://drive.google.com/file/d/1npyo78XKQna3wDHdy45Xt-DSG7OxgkMm/view?usp=sharing" target="_blank">
    <img src="https://img.shields.io/badge/📄%20View%20Full%20Documentation-%230078D7.svg?style=for-the-badge&logo=google-drive&logoColor=white" alt="Project Documentation" />
  </a>
</p>

This document includes:
- Overview & Architecture
- Implementation Flow
- Screenshots
- Challenges & Resolutions
- Future Enhancements

---

## 📸 Screenshots

### 🏠 Home Page

<p align="center">
  <img src="https://drive.google.com/uc?id=1vp5Xh6_hlXapTAa77yvbB0LY7Z29kWJq" alt="Home Screenshot 1" width="45%" />
  <img src="https://drive.google.com/uc?id=1WwRWnzqV1mg0N6LNAprMqrIXS1jm_3Wy" alt="Home Screenshot 2" width="45%" />
</p>

### 📊 DAG Editor Page

<p align="center">
  <img src="https://drive.google.com/uc?id=1pB_y3INyDIzjeCQ7_EqXYW2BX1F8m0Jt" alt="DAG Editor Screenshot 1" width="45%" />
  <img src="https://drive.google.com/uc?id=10mTmic435GnrSVxH-69gYt9JGHTvcR4w" alt="DAG Editor Screenshot 2" width="45%" />
</p>

---


## 📹 Demo Video

<p align="center">
  <a href="https://youtu.be/KK_4PUvZXyY" target="_blank">
    <img src="https://img.shields.io/badge/▶️%20Watch%20on%20YouTube-%23FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch Demo on YouTube">
  </a>
</p>


<p align="center">
  <a href="https://drive.google.com/file/d/1MNcKcnVhhF22zehhphNC77n-9amr277P/view?usp=sharing" target="_blank">
    <img src="https://img.shields.io/badge/▶️%20Watch%20Demo%20Video-%23FF0000.svg?style=for-the-badge&logo=google-drive&logoColor=white" alt="Watch Demo Video"/>
  </a>
</p>

This video provides a complete walkthrough of:
- Node creation and deletion
- Connecting nodes with validation
- Undo/redo and auto-layout in action
- Exporting JSON structure

---

## 🌐 Live Deployment

You can try the live version here:

<p align="center">
  <a href="https://pipeline-editor-pujari-saibalajis-projects.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Open%20Live%20App-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo on Vercel"/>
  </a>
</p>

---

## 🚀 Features

### 🔧 Node Management
- Create nodes using a prompt modal.
- Enforce unique names to avoid graph confusion.
- Nodes can be of types: input, process, output.

### 🔁 Edge Handling & Graph Control
- Connect nodes via drag-and-drop.
- Edges are validated for DAG structure (no cycles).
- Undo/Redo support using keyboard shortcuts.
- Delete nodes/edges via key press.

### 🧭 Visualization Tools
- Auto-layout using Dagre.js for clarity.
- Zoom in/out and panning support.
- Real-time JSON export of node/edge structure.

---

## 🛠 Tech Stack

| Category        | Technologies                          |
|-----------------|---------------------------------------|
| **Frontend**    | React, React Flow                     |
| **Layout**      | Dagre.js                              |
| **State**       | React Context API, Reducers           |
| **Styling**     | CSS Modules, Responsive Design        |
| **Icons**       | React Icons                           |
| **Design**      | DALL·E for graphics                   |
| **Deployment**  | Vercel                                |

---

## 🧩 Architectural Decisions

- **React Flow** was chosen for high flexibility and visual edge/node management.
- **Custom Reducers + Context** for precise and scalable state control.
- Implemented **unique node validation** to eliminate naming conflict errors.
- Integrated **dagre.js** for improving graph layout aesthetics.

---

## 🐞 Challenges Faced

### 1. 🔄 Cycle Detection
One of the biggest challenges was ensuring the graph remained acyclic. This involved implementing logic to trace paths and block invalid edge creation that could form loops.

### 2. 🆔 Unique Node Names
Initially, repeated node names created edge mismatches. Introduced a validation mechanism to enforce uniqueness and maintain graph clarity.

### 3. 🔁 Undo/Redo with React Flow
Maintaining undo/redo functionality required synchronizing React Flow states with internal state reducers. Custom logic was written for time travel support.

### 4. 🎨 Responsive UI & Layout
Creating a layout that scales on all devices required extra tweaks in CSS and positioning via Flexbox and media queries.

---

## 📦 Installation & Setup

To run this project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/PUJARI-SAIBALAJI/pipeline-editor.git
cd pipeline-editor
2.
