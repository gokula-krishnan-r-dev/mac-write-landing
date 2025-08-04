# Bug Reporting System

A comprehensive bug reporting system for Macwrite with user-friendly form submission and a powerful admin dashboard for managing reports.

## Features

### 🐛 Bug Report Form (`/bug-report`)

- **Required Fields**: Bug title (minimum 5 characters)
- **Optional Fields**: Detailed description (up to 1000 characters)
- **File Upload**: Screenshot support (PNG, JPG, GIF, WebP up to 5MB)
- **Drag & Drop**: Easy screenshot upload with visual feedback
- **Validation**: Real-time form validation with clear error messages
- **Loading States**: Progress indicators and user feedback
- **Success State**: Confirmation screen with option to submit more reports

### 🔐 Admin Dashboard (`/admin/dashboard`)

- **Authentication**: Secure login with JWT tokens
- **Dashboard Overview**: Statistics cards showing report counts by status
- **Advanced Filtering**: Search by title/description and filter by status
- **Report Management**: View, update status, and manage all bug reports
- **Image Viewer**: Full-screen screenshot viewing with modal
- **Export Feature**: Download filtered reports as CSV
- **Responsive Design**: Works on desktop and mobile devices

### 🔧 Technical Features

- **File Storage**: Screenshots stored in `/public/bug-reports/`
- **Data Persistence**: Bug reports stored in JSON format in `/data/bug-reports.json`
- **API Routes**: RESTful APIs for CRUD operations
- **Authentication**: JWT-based admin authentication
- **Form Validation**: Both client-side and server-side validation
- **Error Handling**: Comprehensive error handling throughout the system

## Demo Credentials

For testing the admin dashboard:

- **Email**: `admin@macwrite.ai`
- **Password**: `admin123`

⚠️ **Security Note**: These are demo credentials. In production, implement proper user management with hashed passwords and secure authentication.

## File Structure

```
app/
├── bug-report/
│   └── page.tsx                    # Bug report form page
├── admin/
│   ├── login/
│   │   └── page.tsx               # Admin login page
│   └── dashboard/
│       └── page.tsx               # Admin dashboard
└── api/
    ├── bug-reports/
    │   ├── route.ts               # GET/POST bug reports
    │   └── [id]/
    │       └── route.ts           # PUT/DELETE specific reports
    └── admin/
        └── auth/
            └── route.ts           # Admin authentication API

data/
└── bug-reports.json               # Bug reports data storage

public/
└── bug-reports/                   # Screenshot uploads directory
```

## API Endpoints

### Bug Reports

- `GET /api/bug-reports` - Fetch all bug reports (with optional filtering)
- `POST /api/bug-reports` - Submit new bug report
- `PUT /api/bug-reports/[id]` - Update bug report status (admin only)
- `DELETE /api/bug-reports/[id]` - Delete bug report (admin only)

### Authentication

- `POST /api/admin/auth` - Admin login
- `GET /api/admin/auth` - Verify admin token

## Usage

### For Users

1. Navigate to `/bug-report` from the main navigation
2. Fill in the bug title (required)
3. Optionally add a description and screenshot
4. Submit the report
5. Receive confirmation of successful submission

### For Admins

1. Go to `/admin/login`
2. Use demo credentials to log in
3. View dashboard with bug report statistics
4. Search and filter reports as needed
5. Click on any report to view details and update status
6. Export filtered reports for external analysis

## Development Notes

### Security Considerations

- JWT tokens expire after 24 hours
- File upload validation for type and size
- Admin-only routes protected with authentication middleware
- Input sanitization and validation on all forms

### Customization

- Update admin credentials in `/app/api/admin/auth/route.ts`
- Modify file upload limits in `/app/api/bug-reports/route.ts`
- Customize styling by updating Tailwind classes
- Add email notifications by integrating with email service

### Production Deployment

1. Set `JWT_SECRET` environment variable
2. Configure proper user management system
3. Set up database instead of JSON file storage
4. Implement email notifications for new reports
5. Add rate limiting for API endpoints
6. Configure proper file upload handling with cloud storage

## Browser Support

- Modern browsers with ES2020+ support
- File drag & drop API support
- LocalStorage for admin session management
- Responsive design for mobile devices

---

_Built with Next.js 15, TypeScript, Tailwind CSS, and modern React patterns for a professional, maintainable codebase._
