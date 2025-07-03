# DAG Editor - Visual Workflow Designer

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react)](https://reactjs.org/)
[![React Flow](https://img.shields.io/badge/react%20flow-%2361DAFB.svg?logo=react)](https://reactflow.dev/)

A powerful Directed Acyclic Graph (DAG) editor built with React and React Flow for creating, editing, and visualizing complex workflows.

![DAG Editor Screenshot](./screenshot.png)

## 📋 Problem Statement

[View Problem Statement PDF](https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing)  
*Click above to view the complete problem statement document*

## 📹 Demo Video

<div align="center">
  <a href="https://drive.google.com/file/d/YOUR_VIDEO_ID/view?usp=sharing">
    <img src="https://img.shields.io/badge/Watch%20Demo-%23FF0000.svg?style=for-the-badge&logo=Google-Drive&logoColor=white" alt="DAG Editor Demo" width="300">
  </a>
</div>

## 🌐 Live Deployment

Access the live application here:  
[![Live Demo](https://img.shields.io/badge/Visit%20Live%20Site-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](YOUR_VERCEL_DEPLOYMENT_URL)

## 🚀 Features

### Node Management
- ✨ Create nodes via modal or drag-and-drop
- 🔍 Unique name validation
- 🎨 Multiple node types (input/output/process/decision)

### Connection Handling
- ↔️ Intuitive edge creation
- ❌ Visual validation indicators
- 🛣️ Automatic path routing

### Editing Tools
- ↩️ Undo/Redo (Ctrl+Z/Ctrl+Y)
- 🗑️ Delete with keyboard support
- 📍 Position synchronization

### Layout & Visualization
- 🏗️ One-click auto layout
- 🔍 Zoom/pan navigation
- 📊 JSON structure preview

## 🛠 Tech Stack

| Category        | Technologies                          |
|-----------------|---------------------------------------|
| **Frontend**    | React, React Flow, Dagre.js           |
| **State**       | Context API, Custom Reducers          |
| **Styling**     | CSS Modules, Responsive Design        |
| **Icons**       | React Icons                           |
| **Deployment**  | Vercel                                |

## 📦 Installation & Setup

1. **Clone repository**:
   ```bash
   git clone https://github.com/yourusername/dag-editor.git
   cd dag-editor