# Skill & Job Portal Backend 🚀

This is the backend for the **Skill & Job Portal** web application, built with **Node.js, Express, PostgreSQL**, and **JWT authentication**.

## 📌 Features
- ✅ User Signup (`POST /api/auth/signup`)
- ✅ User Login (`POST /api/auth/login`)
- ✅ JWT Authentication (Protected routes)
- ✅ Skill Portal (Earn coins by solving problems)
- 🛠️ Job Portal APIs (Coming next)

---

## 🧠 About the Concept (Inspired by Rewardify)

Skill & Job Portal introduces a gamified technical platform where freelancers earn TTS coins by solving coding problems. These coins can be used to apply for jobs, track performance, and get tiered based on skill.

Coming features include:
- Performance-based reward coins
- Leaderboards
- Growth tracking
- Career integration with recruiter access

---

## 🏗️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Authentication:** JWT  
- **Password Hashing:** bcryptjs  
- **API Testing:** Postman  

## 📂 Project Structure
- `indexSJ.js` – Server entry point  
- `routesAUTH.js` – Auth routes  
- `routesSkill.js` – Problem-solving APIs  
- `middleware/authMiddleware.js` – JWT protection  
- `configdb.js` – PostgreSQL setup  
