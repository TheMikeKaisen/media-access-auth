# MEDIA-ACCESS-AUTH
A professional-grade backend service for video streaming applications, built with modern Node.js technologies and industry best practices.

## Features

### Authentication & Security
- **JWT-based Authentication** with access/refresh token strategy
- **Bcrypt Password Hashing** with salt rounds for secure storage
- **Cookie-based Token Storage** with httpOnly flags
- **Automatic Token Refresh** mechanism for seamless user experience

### File Management
- **Multi-file Upload Support** using Multer middleware
- **Cloudinary Integration** for cloud storage and CDN delivery
- **Automatic Cleanup** of temporary files after processing
- **Image Optimization** and format conversion

### Database & Modeling
- **MongoDB** with Mongoose ODM
- **Complex Aggregation Pipelines** for user analytics
- **Schema Relationships** with proper referencing
- **Pre/Post Hooks** for data processing

### API Architecture
- **RESTful API Design** with consistent response patterns
- **Custom Error Handling** with ApiError/ApiResponse utilities
- **Async Handler Wrapper** for clean error propagation
- **Input Validation** and sanitization

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer + Cloudinary
- **Security**: bcrypt, cookie-parser, cors
- **Development**: Nodemon, Prettier

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Cloudinary account for file storage

## ⚙️ Installation & Setup

1. **Clone the repository**
   
`
git clone <your-repo-url>
`

`
cd play-backend
`

3. **Install dependencies**
   
`
npm install
`

4. **Start Development Server**`

`
npm run dev
`

6. **Environment Configuration**
   
Create a `.env` file in the root directory:`

# Database

`
MONGODB_URI=mongodb+srv://username:[password@cluster.mongodb.net](mailto:password@cluster.mongodb.net)
`

`
DB_NAME=play
`

# Server

`
PORT=8000
`

`
CROSS_ORIGIN=[http://localhost:3000](http://localhost:3000/)
`

# JWT Secrets
```
ACCESS_TOKEN_SECRET=your_access_token_secret

ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret

REFRESH_TOKEN_EXPIRY=10d
```

# Cloudinary

```
CLOUDINARY_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/user/register` - User registration with file upload
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/logout` - User logout (Protected)
- `POST /api/v1/user/refresh-token` - Refresh access token

### User Management
- `GET /api/v1/user/current-user` - Get current user (Protected)
- `POST /api/v1/user/change-password` - Change password (Protected)
- `PATCH /api/v1/user/update-account` - Update account details (Protected)
- `PATCH /api/v1/user/avatar` - Update avatar (Protected)
- `PATCH /api/v1/user/cover-image` - Update cover image (Protected)

### User Profile & Analytics
- `GET /api/v1/user/c/:username` - Get user channel profile (Protected)
- `GET /api/v1/user/history` - Get watch history (Protected)

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Security**: Separate access and refresh tokens
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Request parameter validation
- **File Upload Security**: File type and size restrictions

## Deployment Ready

- Environment-based configuration
- MongoDB Atlas integration
- Cloudinary CDN for file storage
- Production-ready error handling
- Structured logging and monitoring hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


**Built with ❤️ using modern Node.js best practices**`

