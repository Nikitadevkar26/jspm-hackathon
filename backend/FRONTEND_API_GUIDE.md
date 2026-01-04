# Innovation JSCOE Hackathon - Frontend API Guide

This guide explains how to interact with the backend, the authentication flows for different users, and how to test using Postman.

## 🚀 General Information
- **Base URL**: `http://localhost:5001`
- **Content-Type**: `application/json` (unless uploading files, then use `multipart/form-data`)
- **Static Files**: Uploaded images (ID proofs, payment proofs) are served at `{{baseUrl}}/uploads/`

---

## 🔑 User Roles & Authentication Flows

### 1. Admin Flow
Admins manage the entire hackathon.
- **Login**: `POST /api/admin/login`
- **Auth Method**: Uses JWT Bearer Token.
- **Header**: `Authorization: Bearer <your_token>`

### 2. Team Flow
Teams must register, wait for admin approval, and then login to submit their ideas.
1.  **Registration**: `POST /api/teams/register`
    -   **Format**: `multipart/form-data`
    -   **Fields**: `formData` (JSON string containing team details) and files `paymentProof`, `idProofs`.
2.  **Approval**: Admin approves the team and clicks "Send Email".
3.  **Login Credentials**: A random password is generated and emailed to the Team Leader. The password is also logged in the backend terminal for testing.
4.  **Login**: `POST /api/team-login/login`
5.  **Submit Idea**: `POST /api/idea-submission` (JSON).

### 3. Evaluator Flow
Evaluators register, get approved by admin, and login to score teams.
1.  **Registration**: `POST /api/evaluators/register`
    -   **Format**: `multipart/form-data`
    -   **Fields**: Standard user info and optional file `id_proof_image`.
2.  **Login**: `POST /api/evaluators/login` (Only works AFTER admin sets status to `Approved`).

---

## 🛠️ Key Endpoints

### Auth & Registration
- `POST /api/admin/login` -> Admin Login
- `POST /api/teams/register` -> Team Signup (Multipart)
- `POST /api/evaluators/register` -> Evaluator Signup (Multipart)
- `POST /api/team-login/login` -> Team Login
- `POST /api/evaluators/login` -> Evaluator Login

### Team Operations
- `GET /api/team-details/:teamId` -> Get team profile
- `POST /api/idea-submission` -> Submit idea (Must be logged in as team)
- `GET /api/idea-submission/team/:teamId` -> Get submitted idea

### Admin Operations (Protected by Admin Token)
- `GET /api/registrations` -> Get all teams
- `PUT /api/registrations/:id/status` -> Approve/Reject team
- `POST /api/registrations/:id/send-email` -> Generate password & notify team
- `GET /api/evaluators` -> List evaluators
- `POST /api/assignments` -> Assign evaluator to team

---

## 🏮 Postman Setup

A complete Postman collection is provided in the repository: `Innovation_JSCOE_Hackathon.postman_collection.json`.

### How to use:
1.  **Import**: Import the JSON file into Postman.
2.  **Environment Variables**:
    -   Set `baseUrl` to `http://localhost:5001`.
    -   After Admin Login, copy the `token` and set it to the `adminToken` variable.
3.  **Testing Team Registration**:
    -   Use the **Body -> form-data** tab.
    -   The `formData` field contains a JSON string with the team/members info.
    -   Select actual files for `paymentProof` and `idProofs`.

---

## ⚠️ Important Implementation Notes
1.  **File Uploads**: When sending `multipart/form-data` from the frontend, do NOT set the `Content-Type` header manually; let the browser/library (like Axios or Fetch) set it automatically with the boundary.
2.  **JSON Stringified Data**: For Team Registration, the complex objects (members list) must be sent as a single stringified JSON field named `formData`.
3.  **Error Handling**: The backend consistently returns `{ success: false, message: "..." }` on errors.
