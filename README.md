# 🚀 DAG Editor - Visual Workflow Designer

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react)](https://reactjs.org/)
[![React Flow](https://img.shields.io/badge/react%20flow-%2361DAFB.svg?logo=react)](https://reactflow.dev/)

A powerful **Directed Acyclic Graph (DAG)** editor built with **React** and **React Flow** to design, visualize, and manage workflow pipelines interactively.

---

## 📋 Problem Statement

Design and develop an interactive DAG (Directed Acyclic Graph) Editor that enables users to:
- Create, edit, and connect custom nodes.
- Visualize workflows in real-time.
- Handle DAG-specific constraints like cycle detection and validation.

📄 **View the problem statement PDF**:  
🔗 [Click to Open](https://drive.google.com/file/d/10mTmic435GnrSVxH-69gYt9JGHTvcR4w/view?usp=sharing)

---

## 📸 Screenshots

Here are snapshots of the live application in action:

![Screenshot 1](https://drive.google.com/uc?id=1pB_y3INyDIzjeCQ7_EqXYW2BX1F8m0Jt)
![Screenshot 2](https://drive.google.com/uc?id=1WwRWnzqV1mg0N6LNAprMqrIXS1jm_3Wy)

---

## 📹 Demo Video

🎥 **Watch the project screen recording**:  
[![Watch Demo](https://img.shields.io/badge/Watch%20Demo-%23FF0000.svg?style=for-the-badge&logo=Google-Drive&logoColor=white)](https://drive.google.com/file/d/1MNcKcnVhhF22zehhphNC77n-9amr277P/view?usp=sharing)

---

## 🌐 Live Deployment (Coming Soon)

Once deployed, the Vercel live link will be updated here.

---

## 🛠 Tech Stack

| Category        | Technologies                          |
|-----------------|---------------------------------------|
| **Frontend**    | React, React Flow, Dagre.js           |
| **State**       | Context API, Custom Reducers          |
| **Styling**     | CSS Modules, Responsive Design        |
| **UI/UX**       | DALL·E (Visual Assets), React Icons   |
| **Deployment**  | Vercel                                |

---

## 🚀 Features

### 🔧 Node Management
- Add nodes via prompt input
- Enforce unique node names to avoid conflicts
- Support for various node types: input, process, output

### 🔁 Edge & Graph Control
- Connect nodes with validation
- Prevent circular dependencies
- Intuitive undo/redo and delete functionality

### 🧭 Layout & Visualization
- Zoom, pan, and auto-layout support
- View graph structure as JSON
- Dynamic updates on changes

---

## 🧩 Architectural Decisions

- **React Flow** is used for rendering and managing graph visuals.
- **Custom context + reducers** for handling graph state (nodes, edges, validations).
- **Unique node enforcement** to prevent semantic confusion.
- Modular component design ensures maintainability and scalability.
- **Dagre layout** improves graph clarity via automatic node positioning.

---

## 🐞 Challenges Faced

1. **Cycle Detection**  
   Ensuring the graph remains acyclic was a major logic hurdle. Circular dependencies had to be prevented both during manual and programmatic edge connections.

2. **Unique Node Names**  
   Initially, nodes with identical names were allowed, creating ambiguity in edge logic. Solved by validating unique IDs and labels before node creation.

3. **Graph Lifecycle Issues**  
   During updates and deletions, syncing node positions and maintaining graph integrity required careful use of React Flow hooks and reducer-based updates.

4. **Visual Design & UX**  
   Achieving a clean UI took iterations. Styling needed to adapt well for various screen sizes and devices. DALL·E and design inspiration helped polish the visuals.

---

## 📦 Installation & Setup

To run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/dag-editor.git
cd dag-editor
