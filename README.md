# 🌐 Habit Tracker Server

The **backend server** for the Habit Tracker application — built with **Express.js** and **MongoDB**.  
It powers user management, habit tracking, and progress monitoring through clean RESTful APIs.

---

## 🔗 Live Server  
https://server-habit.vercel.app/

---

## 🚀 Features

- ✅ **Express.js Server** — Fast, lightweight, and scalable backend  
- ✅ **MongoDB Integration** — Stores users, habits, and progress data  
- ✅ **Environment Variables** — Secure config using `.env`  
- ✅ **CORS Enabled** — Safe communication with frontend  
- ✅ **Modular Structure** — Organized routes, controllers & configs  

---

## 🛠️ Tech Stack

| Category       | Libraries / Tools |
|----------------|-------------------|
| **Runtime**    | Node.js           |
| **Framework**  | Express 5         |
| **Database**   | MongoDB           |
| **Middleware** | CORS, dotenv      |

---

## 📦 Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/habit-tracker-server.git
cd habit-tracker-server
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 🔧 Environment Variables

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```
Make sure your MongoDB cluster IP is whitelisted
or your local MongoDB server is running.

## ▶️ Start the Server
Development Mode:
```bash
npm run dev
```

Production Start:
```bash
npm start
```

Server will run on:
👉 http://localhost:5000

## 📁 Project Structure

```bash
habit-tracker-server/
│── src/
│ ├── routes/ # API route definitions
│ ├── controllers/ # Route logic & handlers
│ ├── config/ # Database & environment configuration
│ └── models/ # Mongoose models (User, Habit, etc.)
│── .env # Environment variables
│── package.json # Project metadata & scripts
│── server.js # Entry point of the application

```

---

## 💡 Available Scripts

```bash
| Command         | Description                 |
|-----------------|-----------------------------|
| `npm run dev`   | Start server with nodemon   |
| `npm start`     | Start production server     |
| `npm install`   | Install all dependencies    |
```
---

## 💖 Contributing

Contributions are always welcome!  
You can support the project by:

- Opening an **issue** 🐛  
- Submitting a **pull request** 🧩  

---

## 🐕 License

This project is licensed under the **MIT License** — feel free to use, extend, and customize it.

---

## ✨ Acknowledgments

- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **Mongoose**  
- **Vercel Server Hosting**
