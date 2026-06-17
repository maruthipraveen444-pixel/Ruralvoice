# 🌾 Rural Voice

<div align="center">

![Rural Voice Banner](https://img.shields.io/badge/Rural%20Voice-Empowering%20Villages-green?style=for-the-badge&logo=leaf)

**Bridging the gap between village communities and government officials.**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Demo](#) · [Report Bug](https://github.com/DineshRC006/Rural-Voice/issues) · [Request Feature](https://github.com/DineshRC006/Rural-Voice/issues)

</div>

---

## 📖 About the Project

**Rural Voice** is a web platform designed to empower rural communities by creating a direct and transparent communication channel between village residents and government officials. It enables villagers to raise concerns, submit grievances, and stay informed about government schemes and local updates — all from a single platform.

The platform aims to reduce bureaucratic friction, improve governance transparency, and ensure that the voices of rural citizens are heard at the official level.

---

## ✨ Features

- 🏠 **Villager Registration & Login** — Secure account creation for village residents to register and access the platform.
- 🏛️ **Government Official Portal** — A dedicated dashboard for officials to view, respond to, and manage incoming complaints and queries.
- 📝 **Grievance Submission** — Villagers can submit complaints or concerns with details and track their status.
- 📢 **Government Updates & Announcements** — Officials can post scheme details, policy updates, and important notices visible to all residents.
- 📊 **Admin Dashboard** — Centralized control panel for managing users, posts, and platform content.
- 🔍 **Complaint Status Tracking** — Users can follow up on the status of their submitted grievances.
- 🔔 **Notifications** — Alerts for villagers when their complaints are updated or new government announcements are published.
- 📱 **Responsive Design** — Mobile-friendly UI accessible from any device, including low-end smartphones.
- 🔒 **Secure Authentication** — Session-based authentication to protect user data and official accounts.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB (with Mongoose ODM) |
| Authentication | Express Sessions / JWT |
| Templating | EJS / HTML Pages |

---

## 📁 Folder Structure

```
Rural-Voice-main/
├── public/                  # Static assets
│   ├── css/                 # Stylesheets
│   ├── js/                  # Client-side JavaScript
│   └── images/              # Images and icons
├── views/                   # HTML / EJS templates
│   ├── index.html           # Landing page
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── dashboard.html       # User dashboard
│   └── admin/               # Admin panel views
├── routes/                  # Express route handlers
│   ├── auth.js              # Authentication routes
│   ├── user.js              # Villager routes
│   └── official.js          # Government official routes
├── models/                  # Mongoose data models
│   ├── User.js              # User schema
│   ├── Complaint.js         # Complaint/Grievance schema
│   └── Announcement.js      # Government announcements schema
├── controllers/             # Business logic
├── middleware/              # Auth and validation middleware
├── config/                  # DB and app configuration
│   └── db.js                # MongoDB connection
├── .env.example             # Environment variable template
├── package.json             # Dependencies and scripts
├── server.js                # Main entry point
└── README.md
```

> **Note:** The actual folder structure may vary slightly. Refer to the repository for the exact layout.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/DineshRC006/Rural-Voice.git
cd Rural-Voice/Rural-Voice-main
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then open `.env` and fill in your values:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ruralvoice
SESSION_SECRET=your_secret_key_here
```

**4. Start MongoDB** (if running locally)

```bash
mongod
```

**5. Run the application**

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

**6. Open in your browser**

```
http://localhost:3000
```

---

## 🖥️ Usage

### For Villagers
1. Navigate to the homepage and click **Register** to create an account.
2. Log in with your credentials.
3. Use the **Submit Complaint** form to raise a grievance with a description and category.
4. Track the status of your complaint from your **Dashboard**.
5. View government **Announcements** and scheme updates on the notice board.

### For Government Officials
1. Log in with official credentials (provided by the administrator).
2. Access the **Official Dashboard** to view all submitted complaints.
3. Update complaint status (Pending → In Progress → Resolved) and respond to villagers.
4. Post new **Announcements** or government scheme updates.

### For Administrators
1. Log in at `/admin` with admin credentials.
2. Manage user accounts, official profiles, and platform content.
3. Monitor platform activity and complaint statistics.

---

## 🔮 Future Improvements

- [ ] **Multi-language Support** — Add regional language options (Tamil, Hindi, Telugu, etc.) for better rural accessibility.
- [ ] **SMS / WhatsApp Notifications** — Notify villagers of complaint updates via SMS using Twilio or WhatsApp API.
- [ ] **AI-Powered Complaint Categorization** — Automatically categorize complaints using NLP.
- [ ] **GIS / Map Integration** — Map-based visualization of complaint hotspots in a village/district.
- [ ] **Mobile App** — Develop a React Native mobile app for wider reach.
- [ ] **Offline Support (PWA)** — Progressive Web App support for areas with limited internet connectivity.
- [ ] **Analytics Dashboard** — Charts and reports for officials to analyze grievance trends.
- [ ] **Voice-Based Input** — Allow villagers with low literacy to submit complaints using voice input.
- [ ] **Document Upload** — Allow villagers to attach supporting documents or photos to complaints.
- [ ] **Email Verification** — OTP/email verification during registration for enhanced security.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

Please make sure to:
- Follow the existing code style and conventions.
- Write meaningful commit messages.
- Test your changes before submitting a PR.
- Update documentation if needed.

### 🐛 Reporting Bugs

Found a bug? Please open an [issue](https://github.com/DineshRC006/Rural-Voice/issues) with:
- A clear title and description
- Steps to reproduce the problem
- Expected vs actual behaviour
- Screenshots if applicable

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

```
MIT License

Copyright (c) 2024 DineshRC006

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👤 Author

**Dinesh RC**

- GitHub: [@DineshRC006](https://github.com/DineshRC006)

---

## 🙏 Acknowledgements

- [Node.js](https://nodejs.org/) — JavaScript runtime environment
- [Express.js](https://expressjs.com/) — Fast, unopinionated web framework
- [MongoDB](https://www.mongodb.com/) — NoSQL database
- [Mongoose](https://mongoosejs.com/) — Elegant MongoDB object modeling
- [Shields.io](https://shields.io/) — Badges for the README

---

<div align="center">
  Made with ❤️ to empower rural communities across India 🇮🇳
</div>
