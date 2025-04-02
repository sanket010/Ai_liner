# 🎨 Text-to-Image Generator  

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://text-to-image-generator-dplc.vercel.app/)

A **full-stack AI-powered web application** that converts **text into images** using an **AI-based API**. Features a **clean, responsive UI**, a **subscription-based credit system**, **secure authentication**, and **Razorpay integration** for easy payments.  

---

## 🚀 Features  

✅ **AI-Powered Image Generation** – Converts **text prompts** into **high-quality images** using an external **AI tool API**.  
✅ **Credit-Based Subscription Model** – Users get **5 free credits**, with **Razorpay-integrated payment system** for easy top-ups.  
✅ **Secure Authentication System** – Includes **JWT-based authentication**, **bcrypt for password encryption**, and **OAuth-based login options**.  
✅ **Seamless API Integration** – Optimized API requests for **fast and efficient image generation**.  
✅ **Animated & Interactive UI** – Motion-based animations for a **smooth user experience**.  
✅ **Fully Responsive Design** – Works flawlessly on **mobile, tablet, and desktop** screens.  
✅ **Razorpay Payment Gateway** – Allows **secure online transactions** for credit purchases.  

---

## 🛠 Tech Stack  

- **Frontend**: React.js, Tailwind CSS, Motion  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT, bcrypt, OAuth  
- **API Handling**: Axios  
- **Payment Integration**: Razorpay  
- **Hosting**: Vercel (Frontend), Render/Heroku (Backend)  

---

## 🎟️ Credit-Based Subscription Model  

The platform uses a **credit-based system** to manage API usage. Users can generate images based on their **remaining credits**.  

### 🆓 Free & Paid Plans  
🔹 **Free Tier** – New users get **5 free credits**.  
🔹 **Basic Plan** – **$10** for **100 credits**.  
🔹 **Advanced Plan** – **$50** for **500 credits**.  
🔹 **Business Plan** – **$250** for **5000 credits**.  

📌 **Credits are deducted per image generation request**. Users can **track their remaining credits** in their dashboard and **purchase additional credits** using Razorpay.  

---

## 💳 Razorpay Payment Integration  

The platform is integrated with **Razorpay** for seamless transactions:  

✅ **Secure Payment Processing** – Users can **purchase credits** using **UPI, credit/debit cards, and net banking**.  
✅ **Automatic Credit Update** – After a **successful payment**, the **user's account is updated with new credits**.  
✅ **Order History** – Users can **track their past purchases** and view invoices.  

🔗 **Payments are encrypted** to ensure safe transactions and **instant credit top-ups**.  

---

## 🔑 Authentication System  

The platform includes **secure user authentication** to protect user data:  

✅ **JWT-based Authentication** – Securely verifies users and manages sessions.  
✅ **Password Encryption** – Uses **bcrypt** to store hashed passwords securely.  
✅ **OAuth Login** – Allows users to sign in via **Google authentication** for a seamless login experience.  
✅ **Role-Based Access** – Restricts access to **admin-only features** for managing subscription plans.  

---

## 🎨 UI & Animations  

The frontend UI is **fully responsive and animated** for a smooth experience:  

✨ **Built with React.js & Tailwind CSS** – Ensures a fast and modern design.  
✨ **Motion-Based Animations** – Uses **Framer Motion** for **smooth transitions, button hover effects, and image loading animations**.  
✨ **Fully Responsive** – Designed with a **mobile-first approach**, ensuring a **seamless experience on desktops, tablets, and mobile devices**.  

📌 **Animations improve user experience** by making transitions feel natural and smooth. The UI is designed to keep users engaged while generating images in real time.  

---

## 📸 Screenshots  

| Home Page | Image Generation Page | Payment Page |  
|-----------|-----------------------|-------------|  
| ![Home Page](assets/images/homepage-screenshot.png) | ![Generation Page](assets/images/generation-page-screenshot.png) | ![Payment Page](assets/images/payment-page-screenshot.png) |  

---

## 🔧 Installation & Setup  

### 1️⃣ Clone the Repository  

```sh
git clone https://github.com/shubham79a/Text-to-Image-Generator.git
cd Text-to-Image-Generator


2️⃣ Install Dependencies
npm install


3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
AI_API_KEY=your_ai_api_key


4️⃣ Run the Project
Start the backend:
npm run server

Start the frontend:
npm run client




📝 Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

📜 License
This project is licensed under the MIT License.



## 📬 Contact  

🔗 **GitHub:** [shubham79a](https://github.com/shubham79a)  
🔗 **LinkedIn:** [Shubham Kumar](https://www.linkedin.com/in/shubham-kumar-894799290/)  
