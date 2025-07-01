# Groupups Frontend

This repository contains the **React** frontend implementation for the **GroupUps** application – a conversational interface where users interact with a smart AI chatbot that recommends products based on their needs.

The **GroupUps** frontend provides a seamless chat interface that guides users through a dynamic conversation. The chatbot asks tailored questions, learns about the user's preferences, and recommends products – acting as a virtual salesperson.

---

## 🚀 Features

- **Industry & Equipment Selection:**  
  Users can browse industries and select equipment tailored to their needs.

- **AI Chatbot:**  
  Interactive chatbot for equipment guidance.

- **Admin Dashboard:**

  - Secure login, password update, and profile management.
  - Manage industries, equipment, questions, products, and AI training snippets.
  - View and manage user chats and chat details.

- **Responsive UI:**  
  Design using TailwindCSS.

---

## 🏗️ Project Structure

```
src/
  ├── components/         # Reusable UI and page components
  ├── pages/              # Main pages (user & admin)
  ├── routes/             # Route definitions
  ├── store/              # Zustand state management
  ├── utils/              # Utility functions and API client
  ├── validations/        # Zod validation schemas
  └── App.jsx             # Main app and router
```

---

## 🧩 Tech Stack

- **Frontend:** React 19, Vite, TailwindCSS
- **State Management:** Zustand
- **Routing:** React Router DOM v7
- **Validation:** Zod
- **API:** Axios
- **Charts:** Chart.js, react-chartjs-2
- **Notifications:** React Toastify
- **Other:** Socket.io-client, Lucide React Icons

---

## 📁 Environment Variables

Create a `.env` file and set the VITE_SERVER_URL:
VITE_SERVER_URL=your_backend_server_url

---

## ⚡ Getting Started

### 1. **Clone the repository**

```sh
git clone https://github.com/Softaims/groupups-frontend.git
cd groupups
```

### 2. **Install dependencies**

```sh
npm install
```

### 3. **Run the development server**

```sh
npm run dev
```

---

## 🛠️ Available Scripts

- **Start development server:**

  ```sh
  npm run dev
  ```

- **Build for production:**

  ```sh
  npm run build
  ```

- **Serve production build:**
  ```sh
  npm start
  ```
