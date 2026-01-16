# Online Job Portal

A full-stack MERN (MongoDB, Express, React, Node.js) job portal application where students can search and apply for jobs, and recruiters can post job openings and manage applications.

## Features

### For Students

- User registration and authentication
- Browse available job listings
- Apply for jobs with profile
- Track application status
- Profile management with image upload

### For Recruiters

- Company registration and management
- Post job openings
- View and manage applications
- Applicant tracking system

## Tech Stack

**Frontend:**

- React.js with Vite
- Redux Toolkit for state management
- Tailwind CSS for styling
- Axios for API calls
- React Router for navigation

**Backend:**

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for image storage
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Cloudinary account (for image uploads)

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Online-Job-Portal-main
```

### 2. Backend Setup

```bash
cd Backend
npm install

# Create .env file
cp .env.example .env
```

Edit `.env` file with your credentials:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Update `src/utils/data.js` to match your backend port if needed.

## Running Locally

### Start Backend Server

```bash
cd Backend
npm run dev
```

Backend will run on `http://localhost:3000`

### Start Frontend Development Server

```bash
cd Frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## Deployment

### Backend Deployment (Render/Railway)

1. **Create account** on [Render](https://render.com) or [Railway](https://railway.app)

2. **Create a new Web Service**

   - Connect your GitHub repository
   - Set root directory: `Backend`
   - Build command: `npm install`
   - Start command: `npm run dev` or `node index.js`

3. **Add Environment Variables:**

   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLOUD_NAME`
   - `CLOUD_API`
   - `API_SECRET`
   - `PORT` (usually auto-set by platform)

4. **Deploy** and note your backend URL

### Frontend Deployment (Vercel/Netlify)

1. **Create account** on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)

2. **Before deploying**, update `Frontend/src/utils/data.js` with your deployed backend URL:

```javascript
export const USER_API_ENDPOINT = "https://your-backend-url.com/api/user";
export const JOB_API_ENDPOINT = "https://your-backend-url.com/api/job";
export const APPLICATION_API_ENDPOINT =
  "https://your-backend-url.com/api/application";
export const COMPANY_API_ENDPOINT = "https://your-backend-url.com/api/company";
```

3. **Deploy via Vercel:**

   - Import your GitHub repository
   - Set root directory: `Frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Deploy

4. **Update CORS** in `Backend/index.js`:

```javascript
const corsOptions = {
  origin: ["https://your-frontend-url.vercel.app"],
  credentials: true,
};
```

## Environment Variables

### Backend (.env)

```
PORT=3000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_name
CLOUD_API=your_cloudinary_api_key
API_SECRET=your_cloudinary_secret
```

### Frontend

Update API endpoints in `src/utils/data.js` to point to your deployed backend.

## Project Structure

```
Online-Job-Portal-main/
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## API Endpoints

### User Routes

- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile/update` - Update profile

### Job Routes

- `GET /api/job` - Get all jobs
- `GET /api/job/:id` - Get job by ID
- `POST /api/job/post` - Post new job (Recruiter)
- `GET /api/job/admin/jobs` - Get recruiter's jobs

### Company Routes

- `POST /api/company/register` - Register company
- `GET /api/company` - Get all companies
- `GET /api/company/:id` - Get company by ID
- `PUT /api/company/:id` - Update company

### Application Routes

- `POST /api/application/apply/:id` - Apply for job
- `GET /api/application` - Get user applications
- `GET /api/application/:id/applicants` - Get job applicants

## License

MIT License

## Author

Your Name
