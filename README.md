# Blog Platform Backend

A Node.js + Express backend for a blogging platform that supports user authentication, blog posts, comments, and role-based access control.  
Built with **ExpressJS, MongoDB (Mongoose), JWT, and Zod**.

---

## 🚀 Features

- User registration & login (JWT authentication)
- Role-based access control (Admin & User)
- CRUD operations for blog posts
- Comment system for blog posts
- Secure password hashing with bcrypt
- Input validation with Zod
- Helmet, CORS, and Rate limiting for security
- Clean MVC structure (controllers, models, routes, middlewares)

---

## 📂 Project Structure

```backend/
├─ .env
├─ package.json
├─ README.md
├─
│  ├─ index.js
│  ├─ app.js
│  ├─ config/
│  ├─ models/
│  ├─ controllers/
│  ├─ routes/
│  ├─ middlewares/
│  ├─ validators/
│  └─ utils/

---

## ⚙️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/blog-backend.git
cd blog-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the root directory

### 4. Run in development

```bash
npm run dev
```

Server runs at:  
👉 `http://localhost:4000`

---

## 📡 API Endpoints

### **Auth**

- `POST /api/auth/register` → Register new user
- `POST /api/auth/login` → Login & get JWT
- `GET /api/auth/me` → Get current user (requires token)

### **Posts**

- `GET /api/posts` → List all posts
- `GET /api/posts/:id` → Get a single post
- `POST /api/posts` → Create new post (auth required)
- `PATCH /api/posts/:id` → Update own post or admin
- `DELETE /api/posts/:id` → Delete own post or admin

### **Comments**

- `GET /api/posts/:postId/comments` → List comments for a post
- `POST /api/posts/:postId/comments` → Add comment (auth required)
- `DELETE /api/posts/:postId/comments/:commentId` → Delete own comment or admin

---

## 🔒 Roles & Permissions

- **Admin**
  - Full access to all posts & comments
- **User**
  - Create posts
  - Edit/Delete own posts
  - Comment on posts
  - Delete own comments

---

## 🛠️ Tech Stack

- **Backend:** Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcryptjs
- **Validation:** Zod
- **Security:** Helmet, CORS, Rate limiting

---

## 🧑‍💻 Development

```bash
# Run server in dev mode
npm run dev

# Run server in production mode
npm start

```

---
