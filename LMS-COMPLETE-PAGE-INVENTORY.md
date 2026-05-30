# Complete LMS Page & Component Inventory

Based on analysis of the PU (Panjab University) LMS at pu.sem-hgf.com and industry-standard LMS patterns.

---

## DESIGN SYSTEM (from PU LMS CSS)

### CSS Custom Properties (Design Tokens)

```
Colors:
  --color-primary: #D31225
  --color-primary-hover: #B00E1C
  --color-background: #ffffff
  --color-surface: #ffffff
  --color-muted: #F8FAFC
  --color-muted-foreground: #64748B
  --color-slate-50 through --color-slate-900 (full grayscale palette)

Typography:
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

Spacing/Layout:
  --header-height: 64px
  --sidebar-width: 256px
  --sidebar-collapsed: 64px

Border Radius:
  --radius-sm: 0.25rem | --radius-md: 0.5rem | --radius-lg: 0.75rem | --radius-xl: 1rem

Shadows:
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)

Elevation (Material Design 3):
  --md-elevation-1 through --md-elevation-4
```

### Core Component Classes

| Category | Classes |
|----------|---------|
| **Layout** | `.lms-layout`, `.lms-header`, `.lms-main`, `.lms-sidebar`, `.lms-sidebar.collapsed`, `.lms-content`, `.app-container`, `.main-content`, `.page-content` |
| **Header** | `.header-logo-section`, `.header-logo`, `.header-search`, `.header-search-input`, `.header-actions`, `.topbar`, `.topbar-search`, `.topbar-actions` |
| **Sidebar** | `.sidebar`, `.sidebar-header`, `.sidebar-logo`, `.sidebar-logo-icon`, `.sidebar-logo-text`, `.sidebar-nav`, `.sidebar-welcome`, `.sidebar-cta`, `.nav-group`, `.nav-group-label`, `.nav-items`, `.nav-item`, `.nav-item.active`, `.nav-item-content`, `.nav-section-title` |
| **Buttons** | `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-sm`, `.btn-lg`, `.btn:disabled`, `.icon-button`, `.icon-btn`, `.icon-btn-badge` |
| **Cards** | `.card`, `.card-header`, `.card-body`, `.card-footer`, `.course-card`, `.course-card-thumbnail`, `.course-card-content`, `.course-card-instructor`, `.course-card-title`, `.course-card-footer` |
| **Forms** | `.form-group`, `.form-label`, `.form-input`, `.form-checkbox`, `.required-asterisk`, `.helper-text` |
| **Alerts** | `.alert-error`, `.alert-error-text` |
| **Avatar** | `.avatar`, `.user-avatar` |
| **Badge** | `.badge` |
| **Progress** | `.progress-bar`, `.progress-bar-fill`, `.progress-text` |
| **Tabs** | `.tabs`, `.tab`, `.tab.active` |
| **Links** | `.link-primary` |
| **Notifications** | `.notification-dot`, `.notification-dropdown`, `.notification-dropdown-header`, `.notification-dropdown-content`, `.notification-item`, `.notification-item.unread`, `.notification-icon`, `.notification-content`, `.notification-title`, `.notification-message`, `.notification-time`, `.unread-dot`, `.notification-dropdown-footer` |
| **Dropdown** | `.dropdown`, `.dropdown-menu`, `.dropdown-item` |
| **Search** | `.search-clear-btn`, `.search-results-dropdown`, `.search-loading`, `.search-no-results`, `.search-section-title`, `.search-result-item`, `.result-icon`, `.result-content`, `.result-title`, `.result-description`, `.search-view-all` |
| **Chat/Assistant** | `.chat-messages`, `.chat-message`, `.chat-bubble`, `.chat-bubble.assistant`, `.chat-bubble.user`, `.chat-sources`, `.chat-input-container`, `.chat-input` |
| **Lesson Viewer** | `.lesson-layout`, `.lesson-sidebar`, `.lesson-content`, `.lesson-assistant`, `.module-list`, `.module-item`, `.module-header`, `.lesson-list`, `.lesson-item`, `.lesson-item.active`, `.lesson-item.completed`, `.lesson-item.locked`, `.lesson-icon` |
| **Video** | `.video-player`, `.video-controls` |
| **Animations** | `.animate-fade-in`, `.animate-slide-in`, `@keyframes fadeIn`, `@keyframes slideInFromBottom`, `@keyframes fadeInUp`, `@keyframes slideDown` |
| **Utilities** | `.text-primary`, `.text-slate-900`, `.text-slate-600`, `.text-slate-500`, `.text-slate-400`, `.bg-primary`, `.bg-slate-50`, `.hidden` |

---

## COMPLETE PAGE INVENTORY

### AUTHENTICATION PAGES

---

#### 1. Login Page
- **Route:** `/login`
- **Layout:** Split-screen (no sidebar/header)
- **Sections/Components:**
  - Left panel: Background image banner (`/static/images/login-banner.png`)
  - Right panel: Form container (max-width 440px)
  - Form header: "Sign In" title + subtitle
  - Error alert (hidden by default, shown on failure)
  - Email field (required, email validation)
  - Password field (required, with visibility toggle eye icon)
  - Remember me checkbox + Forgot password link
  - Primary CTA: "Sign In" button with loading spinner
  - Divider: "or"
  - Google OAuth button with Google SVG icon
  - Footer: Copyright + "Platform powered by The Foundary"
- **Data Displayed:** None (input only)
- **User Interactions:**
  - Form submission -> POST `/api/auth/login` (FormData with username/password)
  - Password visibility toggle
  - Google OAuth redirect to `/api/auth/google`
  - Role-based redirect after login (student->`/dashboard`, instructor->`/instructor/dashboard`, admin->`/admin/dashboard`, moderator->`/admin/communities`)
  - Community moderator role check -> redirect to community
  - Email verification resend for 403 errors
  - Error handling for `google_denied` and `google_failed` query params
- **Redirect Query Param:** `?next=/path` for post-login redirect

#### 2. Registration Page
- **Route:** `/register`
- **Layout:** Split-screen (no sidebar/header)
- **Sections/Components:**
  - Left panel: Background image banner
  - Right panel: Form container (max-width 440px)
  - Form header: "Create Account" title + subtitle
  - Success alert (email verification message, hidden by default)
  - Error alert (hidden by default)
  - Full Name field (required)
  - Email field (required)
  - Password field (required, minlength 8, visibility toggle)
  - Helper text: "At least 8 characters with 1 uppercase and 1 number"
  - Primary CTA: "Create Account" button with loading spinner
  - Divider: "or"
  - Google OAuth button
  - "Already have an account? Sign in" link
  - Footer
- **Data Displayed:** None (input only)
- **User Interactions:**
  - Form submission -> POST `/api/auth/register` (JSON: full_name, email, password)
  - On success: form hides, success alert shows with "Check your email!" message
  - Does NOT auto-login (requires email verification first)
  - Google OAuth signup

#### 3. Forgot Password Page
- **Route:** `/forgot-password`
- **Layout:** Centered card (no sidebar/header)
- **Sections/Components:**
  - Lock icon in red circle
  - "Forgot Password?" title
  - Subtitle: "Enter your email address and we'll send you a link to reset your password."
  - Success alert (hidden by default)
  - Error alert (hidden by default)
  - Email field
  - "Send Reset Link" button with loading spinner
  - "Back to Sign In" link
- **Data Displayed:** None
- **User Interactions:**
  - Form submission -> POST `/api/auth/forgot-password` (JSON: email)
  - Rate limiting (429 error handling)
  - On success: form hides, success message shows

#### 4. Reset Password Page
- **Route:** `/reset-password?token=xxx`
- **Sections/Components (inferred):**
  - New password field
  - Confirm password field
  - Password strength indicator
  - "Reset Password" button
  - Token validation
  - Success/error states
- **User Interactions:**
  - Form submission -> POST `/api/auth/reset-password`
  - Token expiry handling

#### 5. Email Verification Page
- **Route:** `/verify-email?token=xxx`
- **Sections/Components (inferred):**
  - Verification status display
  - Success/error states
  - "Go to Sign In" link
  - "Resend verification" option

---

### STUDENT PAGES

---

#### 6. Student Dashboard
- **Route:** `/dashboard`
- **Layout:** Full LMS layout (sidebar + header + content)
- **Sidebar Nav (active: "Dashboard"):**
  - Dashboard (icon: dashboard)
  - All Courses (icon: explore)
  - My Courses (icon: auto_stories)
  - Live Sessions (icon: video_call)
  - Communities (icon: groups)
- **Sections/Components:**
  - Welcome greeting with user name
  - Stats overview cards (enrolled courses, completed, progress %, streaks)
  - Continue Learning section (in-progress courses with progress bars)
  - Recent activity feed
  - Upcoming live sessions
  - Recommended courses
  - Achievement badges
- **Data Displayed:**
  - User's enrolled courses with progress
  - Completion statistics
  - Recent activity timeline
  - Upcoming schedule
- **User Interactions:**
  - Click to resume a course
  - Navigate to course detail
  - View all courses
  - Quick actions

#### 7. All Courses (Browse/Explore)
- **Route:** `/student/courses` (aliased as `/courses`)
- **Layout:** Full LMS layout
- **Sections/Components:**
  - **Page Header Banner:** Gradient background with decorative blur circles, icon, title "Explore Courses", subtitle "Discover and enroll in world-class courses", stats bar (courses available count, "Self-Paced Learning")
  - **Search & Filter Bar:** White card with search input (magnifying glass icon, clear button) and filter controls
  - **Course Grid:** Grid of course cards
  - **Each Course Card:**
    - Thumbnail image (16:9 aspect ratio, hover zoom effect)
    - Instructor name (small text)
    - Course title (2-line clamp, hover color change to primary)
    - Badge/category tag
    - Footer with additional info
  - **Search Results Dropdown:** Sections for Courses and Lessons with icons
- **Data Displayed:**
  - Course catalog with thumbnails, titles, instructors
  - Course count stats
- **User Interactions:**
  - Search courses (debounced 300ms, with loading spinner, no-results state)
  - Filter by category/difficulty
  - Click course card -> course detail page
  - Enroll in course

#### 8. My Courses
- **Route:** `/my-courses`
- **Layout:** Full LMS layout
- **Sections/Components:**
  - Page header with user's course stats
  - Tab filters: All | In Progress | Completed | Bookmarked
  - Course cards with progress bars showing completion %
  - Sort/filter controls
  - Empty state for no enrolled courses
- **Data Displayed:**
  - Enrolled courses with progress percentages
  - Completion status
  - Last accessed date
  - Bookmark status
- **User Interactions:**
  - Filter by status (in-progress, completed, bookmarked)
  - Sort courses
  - Click to resume course -> lesson viewer
  - Bookmark/unbookmark courses
  - Continue learning button

#### 9. Course Detail Page
- **Route:** `/courses/:id`
- **Layout:** Full LMS layout (redirects to login if not authenticated)
- **Sections/Components:**
  - Course hero/banner with thumbnail
  - Course title and description
  - Instructor info card
  - Course stats (lessons count, duration, enrolled students, rating)
  - Module/section accordion list
  - Each module contains lesson list with:
    - Lesson icon (video, quiz, document, etc.)
    - Lesson title
    - Completion status (checkmark)
    - Lock icon for locked lessons
    - Duration
  - Enrollment button (if not enrolled)
  - "Continue Learning" button (if enrolled)
  - Reviews/ratings section
  - Related courses
- **Data Displayed:**
  - Full course metadata
  - Module/lesson structure
  - Enrollment status
  - Reviews and ratings
- **User Interactions:**
  - Enroll in course
  - Expand/collapse modules
  - Navigate to specific lesson
  - Rate/review course

#### 10. Lesson Viewer (Course Player)
- **Route:** `/courses/:courseId/lessons/:lessonId`
- **Layout:** Special 3-panel layout (no standard sidebar)
  - **Left Panel (320px):** Lesson sidebar with module/lesson navigation
  - **Center:** Lesson content area
  - **Right Panel (320px):** AI Assistant chat panel
- **Left Sidebar Components:**
  - Module list with collapsible sections
  - Each lesson item: icon, title, active/completed/locked states
  - Progress indicator per module
- **Center Content Components:**
  - Video player (16:9, with controls: play/pause, progress bar, volume, fullscreen)
  - Lesson title and description
  - Tabs: Overview | Resources | Notes | Discussion
  - Lesson content (text, images, embedded content)
  - Navigation: Previous/Next lesson buttons
  - "Mark as Complete" button
- **Right AI Assistant Components:**
  - Chat messages container with gradient background
  - Assistant messages (white bubble, left-aligned, with shadow)
  - User messages (gradient primary bubble, right-aligned)
  - Chat input with send button (rounded pill input)
  - Source references for assistant responses
- **Data Displayed:**
  - Video/content for current lesson
  - Full course outline with progress
  - Chat history with AI assistant
- **User Interactions:**
  - Play/pause video
  - Navigate between lessons
  - Chat with AI assistant about lesson content
  - Take notes
  - Mark lesson complete
  - Download resources
  - Toggle sidebar/assistant panels on mobile

#### 11. Live Sessions
- **Route:** `/student/live-classes`
- **Layout:** Full LMS layout
- **Sections/Components:**
  - Upcoming sessions list/calendar view
  - Each session card: title, instructor, date/time, duration, join button
  - Past sessions with recordings
  - Session status badges (upcoming, live, completed, cancelled)
- **Data Displayed:**
  - Scheduled live class list
  - Recording links for past sessions
  - Instructor info
- **User Interactions:**
  - Join live session (external link/embed)
  - Watch recordings
  - Set reminders
  - View session details

#### 12. Communities
- **Route:** `/communities`
- **Layout:** Full LMS layout
- **Sections/Components:**
  - Community list/grid
  - Each community card: name, description, member count, cover image
  - Search/filter communities
  - Create community option (if permitted)
  - Community detail page with posts feed
- **Data Displayed:**
  - Community listings
  - Member counts
  - Recent activity
- **User Interactions:**
  - Join/leave community
  - Browse posts
  - Create posts
  - Comment, like, mention users
  - Report content

---

### PROFILE & SETTINGS PAGES

---

#### 13. Profile Page
- **Route:** `/profile`
- **Layout:** Full LMS layout
- **Sections/Components:**
  - Profile header with avatar, name, email, role badge
  - Edit profile form:
    - Avatar upload
    - Full name
    - Email (read-only or with verification)
    - Bio/description
    - Phone number
    - Location/timezone
  - Account settings section
  - Password change section:
    - Current password
    - New password
    - Confirm new password
  - Notification preferences
  - Connected accounts (Google)
  - Danger zone (delete account)
- **Data Displayed:**
  - User profile information
  - Account statistics
  - Enrollment history
- **User Interactions:**
  - Edit profile fields
  - Upload/change avatar
  - Change password
  - Toggle notification preferences
  - Connect/disconnect Google account
  - Delete account

#### 14. Notifications Page
- **Route:** `/notifications`
- **Layout:** Full LMS layout
- **Sections/Components:**
  - Page header: "Notifications" with unread count badge
  - "Mark all as read" button
  - Notification list (full page version of dropdown)
  - Each notification item:
    - Type-specific icon (42px circle with color-coded background)
    - Title (bold if unread)
    - Message preview
    - Timestamp (relative: "Just now", "5m ago", "2h ago", "3d ago")
    - Unread indicator dot (8px red dot with glow)
  - Empty state: Large bell icon + "No notifications yet"
  - "Clear all" button
- **Notification Types (from code analysis):**
  - **Community:** mention, reply, like, warning, report_reviewed, post_hidden, post_deleted, banned, unbanned, appeal_message, appeal_approved, appeal_rejected
  - **Course:** enrollment, course_completion, new_lesson, new_quiz, progress_milestone, course_published
  - **Batch:** batch_added, batch_removed, batch_student_added, new_batch_created
  - **Live Class:** live_class_scheduled, live_class_reminder, live_class_instructor_reminder, live_class_recording, new_live_class_scheduled
  - **Activity:** new_student_enrollment, student_completed
  - **Admin/System:** new_user_registration, new_course_created, new_community_created
- **Data Displayed:**
  - All user notifications with type-specific formatting
  - Read/unread status
- **User Interactions:**
  - Click notification -> navigate to action_url
  - Mark individual as read
  - Mark all as read
  - Clear all notifications
  - Auto-refresh every 2 minutes

---

### INSTRUCTOR PAGES

---

#### 15. Instructor Dashboard
- **Route:** `/instructor/dashboard`
- **Layout:** Full LMS layout (instructor-specific sidebar)
- **Instructor Sidebar Nav (inferred):**
  - Dashboard
  - My Courses
  - Create Course
  - Students
  - Live Sessions
  - Earnings
  - Analytics
  - Communities
- **Sections/Components:**
  - Revenue/earnings overview cards
  - Course performance metrics
  - Recent enrollments
  - Student engagement stats
  - Quick actions (create course, schedule session)
  - Activity feed
- **Data Displayed:**
  - Total students, courses, revenue
  - Course ratings
  - Enrollment trends
- **User Interactions:**
  - Navigate to course management
  - View student details
  - Create new course
  - Schedule live session

#### 16. Instructor Course Management
- **Route:** `/instructor/courses`
- **Sections/Components:**
  - Course list with status (draft, published, archived)
  - Each course: thumbnail, title, students count, rating, revenue
  - Create new course button
  - Edit/duplicate/archive/delete actions
- **User Interactions:**
  - Create, edit, publish, archive courses
  - View course analytics

#### 17. Course Builder / Editor
- **Route:** `/instructor/courses/create` and `/instructor/courses/:id/edit`
- **Sections/Components:**
  - Multi-step form or tabbed interface:
    - Step 1: Basic Info (title, description, category, thumbnail, price)
    - Step 2: Curriculum builder (drag-and-drop modules/lessons)
    - Step 3: Lesson editor (video upload, text content, quizzes)
    - Step 4: Settings (enrollment limits, prerequisites, certificate)
    - Step 5: Pricing & publish
  - Drag-and-drop module/lesson ordering
  - Rich text editor for lesson content
  - Video upload with progress
  - Quiz builder
  - Preview mode
- **User Interactions:**
  - Add/edit/delete modules and lessons
  - Upload videos and documents
  - Create quizzes with question types
  - Set course pricing
  - Publish/unpublish
  - Preview as student

#### 18. Instructor Students Page
- **Route:** `/instructor/students`
- **Sections/Components:**
  - Student list with search/filter
  - Each student: name, email, enrolled courses, progress, last active
  - Batch management
  - Export student data
- **User Interactions:**
  - View student progress
  - Send messages/notifications
  - Manage batches
  - Export data

#### 19. Instructor Earnings Page
- **Route:** `/instructor/earnings`
- **Sections/Components:**
  - Revenue summary cards (total, this month, pending)
  - Transaction history table
  - Earnings chart (line/bar)
  - Payout settings
  - Withdraw button
- **User Interactions:**
  - View transaction details
  - Request payout
  - Update payout settings
  - Filter by date range

#### 20. Instructor Analytics Page
- **Route:** `/instructor/analytics`
- **Sections/Components:**
  - Enrollment trends chart
  - Course completion rates
  - Student engagement metrics
  - Revenue trends
  - Top-performing courses
  - Student feedback summary
- **User Interactions:**
  - Filter by date range
  - Export reports
  - Drill down into specific courses

---

### ADMIN PAGES

---

#### 21. Admin Dashboard
- **Route:** `/admin/dashboard`
- **Layout:** Full LMS layout (admin-specific sidebar)
- **Admin Sidebar Nav (inferred):**
  - Dashboard
  - Users
  - Courses
  - Communities
  - Batches
  - Live Classes
  - Reports
  - Settings
- **Sections/Components:**
  - Platform-wide stats (total users, courses, enrollments, revenue)
  - New user registrations chart
  - Active users
  - System health indicators
  - Recent activity feed
  - Quick action buttons
- **Data Displayed:**
  - Aggregate platform metrics
  - Growth trends
  - System status
- **User Interactions:**
  - Navigate to user/course/community management
  - View system reports
  - Quick actions

#### 22. Admin User Management
- **Route:** `/admin/users`
- **Sections/Components:**
  - User table with search, filter, sort
  - Each user row: avatar, name, email, role, status, join date, last active
  - Role filter (student, instructor, admin, tutor, moderator)
  - Status filter (active, inactive, banned)
  - Bulk actions
  - User detail modal/page
- **User Interactions:**
  - View user details
  - Edit user role
  - Ban/unban users
  - Delete users
  - Send notifications
  - Export user data

#### 23. Admin Course Management
- **Route:** `/admin/courses`
- **Sections/Components:**
  - Course table with filters
  - Course status (draft, published, archived)
  - Instructor assignment
  - Enrollment counts
  - Revenue per course
- **User Interactions:**
  - Approve/reject courses
  - Edit course settings
  - Assign instructors
  - Archive/delete courses

#### 24. Admin Communities Management
- **Route:** `/admin/communities`
- **Sections/Components:**
  - Community list with moderation tools
  - Reported content queue
  - Community health metrics
  - Member management
- **User Interactions:**
  - Review reported content
  - Hide/delete posts
  - Ban/unban users from communities
  - Review appeals

#### 25. Admin Batches Management
- **Route:** `/admin/batches`
- **Sections/Components:**
  - Batch list with details
  - Each batch: name, course, students, instructor, schedule
  - Create batch form
  - Student assignment
- **User Interactions:**
  - Create/edit/delete batches
  - Add/remove students
  - Assign instructors
  - Set schedules

#### 26. Admin Live Classes Management
- **Route:** `/admin/live-classes`
- **Sections/Components:**
  - Scheduled sessions calendar/list
  - Each session: title, instructor, course, date/time, status
  - Create session form
  - Recording management
- **User Interactions:**
  - Schedule new sessions
  - Edit/cancel sessions
  - Manage recordings
  - Assign instructors

#### 27. Admin Reports
- **Route:** `/admin/reports`
- **Sections/Components:**
  - Report types: enrollment, revenue, engagement, completion
  - Date range picker
  - Charts and graphs
  - Data tables
  - Export options (CSV, PDF)
- **User Interactions:**
  - Generate reports
  - Filter by date/type
  - Export data
  - Schedule automated reports

#### 28. Admin Settings
- **Route:** `/admin/settings`
- **Sections/Components:**
  - General settings (site name, logo, description)
  - Email templates
  - Payment settings
  - OAuth/SSO configuration
  - Notification settings
  - Content moderation rules
  - API keys
- **User Interactions:**
  - Update platform settings
  - Configure integrations
  - Manage email templates
  - Set moderation rules

---

### SHARED COMPONENTS (used across multiple pages)

---

#### Global Header/Topbar
- **Components:**
  - Logo section (left)
  - Global search bar (center, 400px width)
    - Search input with icon and clear button
    - Search results dropdown with sections (Courses, Lessons)
    - Loading spinner state
    - No results state
    - "View all results" footer
  - Notification bell icon (with unread count badge)
    - Dropdown with notification list (reusable component)
    - "Mark all as read" button
    - "View all" link to `/notifications`
    - "Clear all" button
  - User avatar dropdown
    - Profile link
    - Logout button

#### Sidebar Navigation
- **Student sidebar items:** Dashboard, All Courses, My Courses, Live Sessions, Communities
- **Instructor sidebar items:** Dashboard, My Courses, Create Course, Students, Live Sessions, Earnings, Analytics, Communities
- **Admin sidebar items:** Dashboard, Users, Courses, Communities, Batches, Live Classes, Reports, Settings

#### Notification Center Component
- **Reusable across all roles** (student, instructor, admin)
- Role-based clickability (admin/tutor notifications are view-only)
- Auto-refresh every 2 minutes
- 30+ notification type icons with color coding
- Relative time formatting

---

### ADDITIONAL PAGES (industry-standard, inferred)

---

#### 29. Course Wishlist
- **Route:** `/wishlist`
- Saved/bookmarked courses for later

#### 30. Certificates
- **Route:** `/certificates`
- **Sections:** Certificate list, download PDF, share options
- **User Interactions:** View, download, share certificates

#### 31. Quiz/Assessment Page
- **Route:** `/courses/:id/quizzes/:quizId`
- **Sections:** Quiz questions, timer, progress bar, submit button
- **User Interactions:** Answer questions, submit, view results

#### 32. Discussion Forum
- **Route:** `/courses/:id/discussions`
- **Sections:** Thread list, create thread, replies
- **User Interactions:** Post, reply, like, mark as resolved

#### 33. Course Announcements
- **Route:** `/courses/:id/announcements`
- **Sections:** Announcement feed from instructor

#### 34. Help/Support
- **Route:** `/help` or `/support`
- **Sections:** FAQ, contact form, knowledge base

#### 35. Terms of Service
- **Route:** `/terms`

#### 36. Privacy Policy
- **Route:** `/privacy`

#### 37. 404 Not Found
- **Route:** `*` (catch-all)

#### 38. Landing/Home Page
- **Route:** `/` (unauthenticated)
- **Sections:** Hero banner, featured courses, testimonials, stats, CTA

---

## API ENDPOINTS DISCOVERED

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/login` | Login (FormData: username, password) |
| POST | `/api/auth/register` | Register (JSON: full_name, email, password) |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/auth/google` | Google OAuth redirect |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/resend-verification` | Resend verification email |
| GET | `/api/notifications?limit=10` | Get notifications |
| PUT | `/api/notifications/:id/read` | Mark notification read |
| PUT | `/api/notifications/read-all` | Mark all read |
| DELETE | `/api/notifications/clear-all` | Clear all notifications |
| GET | `/api/communities/user/role` | Get user's community role |
| GET | `/api/search` | Global search (courses, lessons) |

---

## ROLE-BASED ACCESS SUMMARY

| Role | Default Redirect | Sidebar Items |
|------|-----------------|---------------|
| **student** | `/dashboard` | Dashboard, All Courses, My Courses, Live Sessions, Communities |
| **instructor** | `/instructor/dashboard` | Dashboard, My Courses, Create Course, Students, Live Sessions, Earnings, Analytics, Communities |
| **admin** | `/admin/dashboard` | Dashboard, Users, Courses, Communities, Batches, Live Classes, Reports, Settings |
| **tutor** | `/admin/dashboard` | Same as admin |
| **moderator** | `/admin/communities` | Communities management |

---

## RESPONSIVE BREAKPOINTS

- **Desktop:** Full sidebar (280px) + content
- **Tablet (1024px):** Sidebar becomes off-canvas (slide-in), lesson sidebar/assistant panels become overlays
- **Mobile (768px):** Reduced content padding, search hidden in header, single-column layouts

---

## EXTERNAL DEPENDENCIES

- **Fonts:** Inter (Google Fonts), Material Icons + Material Icons Outlined
- **CSS:** Tailwind CSS (CDN), custom CSS
- **JS:** Alpine.js (reactivity), Toastify.js (notifications), DOMPurify (XSS protection)
- **Auth:** CSRF protection (`/static/js/csrf.js`)
- **Icons:** Material Icons for all UI icons
