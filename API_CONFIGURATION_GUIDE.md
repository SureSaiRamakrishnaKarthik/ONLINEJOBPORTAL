# API Configuration & Troubleshooting Guide

## Problem Diagnosis

Your application works initially but fails after some time. This is typically caused by:

1. **API URL Misconfiguration** - Hardcoded URLs pointing to wrong backend
2. **CORS Issues** - Frontend domain not whitelisted in backend
3. **Backend Sleep** - Free tier services (Render) sleep after 15 min of inactivity
4. **Environment Variables Not Set** - Missing `.env` files in production
5. **Timeout Issues** - Network requests timing out after long delays

---

## Solution: Environment-Based Configuration

### Frontend Setup

#### Step 1: Create `.env` files

**`.env.development`** (Local development)

```
VITE_API_BASE_URL=http://localhost:5001
```

**`.env.production`** (Production deployment)

```
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

#### Step 2: Use Environment Variables in Code

Instead of hardcoding URLs, use `import.meta.env.VITE_API_BASE_URL`

Example in [Frontend/src/utils/data.js](Frontend/src/utils/data.js):

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export const USER_API_ENDPOINT = `${API_BASE_URL}/api/user`;
export const JOB_API_ENDPOINT = `${API_BASE_URL}/api/job`;
export const APPLICATION_API_ENDPOINT = `${API_BASE_URL}/api/application`;
export const COMPANY_API_ENDPOINT = `${API_BASE_URL}/api/company`;
```

#### Step 3: Use Centralized Axios Configuration

Use the new [Frontend/src/utils/axiosConfig.js](Frontend/src/utils/axiosConfig.js) which includes:

- Automatic error handling
- Timeout management (10 seconds)
- Request/response interceptors
- Helpful error logging

---

### Backend Setup

#### Step 1: Create `.env` file

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUD_NAME=your_cloud_name
CLOUD_API=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,https://your-frontend-url.com
```

#### Step 2: Use Environment Variable for CORS

In [Backend/index.js](Backend/index.js), the CORS config now uses:

```javascript
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:5173", ...], // fallback
  credentials: true,
};
```

---

## Deployment Checklist

### For Vercel (Frontend):

1. ✅ Set `VITE_API_BASE_URL` in Vercel Environment Variables
2. ✅ Ensure it points to your actual backend URL
3. ✅ Example: `VITE_API_BASE_URL=https://your-backend.onrender.com`

### For Render (Backend):

1. ✅ Set all environment variables in Render dashboard
2. ✅ Include `ALLOWED_ORIGINS` with your frontend URL
3. ✅ Upgrade from free tier if experiencing timeouts (free tier sleeps)
4. ✅ Example: `ALLOWED_ORIGINS=https://your-frontend.vercel.app`

---

## Testing

### Local Development:

```bash
# Terminal 1: Backend
cd Backend
npm run dev  # Runs on http://localhost:5001

# Terminal 2: Frontend
cd Frontend
npm run dev  # Runs on http://localhost:5173
```

### Production URLs:

- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.onrender.com`

### Test API Connection:

```javascript
// In browser console
fetch("https://your-backend.onrender.com/api/user/profile", {
  method: "GET",
  credentials: "include",
})
  .then((r) => r.json())
  .then((d) => console.log(d))
  .catch((e) => console.error("Error:", e.message));
```

---

## Common Errors & Solutions

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Cause:** Frontend domain not in backend's ALLOWED_ORIGINS
**Solution:** Add your frontend URL to ALLOWED_ORIGINS in backend `.env`

### Error: "Failed to fetch" or timeout

**Cause:** Backend is sleeping (Render free tier) or offline
**Solution:**

- Upgrade Render to paid tier, OR
- Configure a cron job to keep it awake, OR
- Use a better hosting solution

### Error: "Unexpected token < in JSON"

**Cause:** Receiving HTML error page instead of JSON (likely 404 or 500)
**Solution:** Check backend is running and endpoint is correct

### Error: "401 Unauthorized" after login

**Cause:** JWT token expired or not being sent
**Solution:** Ensure cookies are being sent with `credentials: 'include'`

---

## Files Modified:

1. ✅ [Frontend/src/utils/data.js](Frontend/src/utils/data.js) - Use environment variables
2. ✅ [Frontend/src/utils/axiosConfig.js](Frontend/src/utils/axiosConfig.js) - NEW centralized axios config
3. ✅ [Frontend/.env.example](.env.example) - Environment template
4. ✅ [Frontend/.env.production](.env.production) - Production settings
5. ✅ [Frontend/.env.development](.env.development) - Development settings
6. ✅ [Backend/index.js](Backend/index.js) - Flexible CORS configuration
7. ✅ [Backend/.env.example](.env.example) - Updated with ALLOWED_ORIGINS

---

## Next Steps:

1. **Update your frontend `.env.production`** with your actual backend URL
2. **Update your backend `.env`** with frontend CORS origins
3. **Redeploy both services** with new environment variables
4. **Test all API endpoints** in production
5. **Monitor logs** for any connection issues
