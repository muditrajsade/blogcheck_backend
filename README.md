# 🛡️ BlogCheck

**BlogCheck** is an AI-powered moderation assistant for Blogger.com authors and admins. It allows blog owners to define content rules in natural language and automatically validates posts submitted by contributors using Google's **Gemini 1.5 Flash** before publishing them to Blogspot.

---

## 🚀 Features

### ✅ Rule-Based Moderation
- Authors define **natural language rules** for their blog (e.g., “No profanity”, “At least 300 words”, “Must contain an image”).
- These rules are stored per blog and used to assess post quality.

### 🔐 Google OAuth Authentication
- Secure login using Google accounts for both authors and contributors.
- Ensures only authorized users can submit or manage content.

### 🧠 Gemini-Powered Post Evaluation
- Each submitted post is evaluated by **Gemini 1.5 Flash** based on the defined rules.
- Returns a strict **`"YES"`** or **`"NO"`** response to determine approval.

### ✍️ Post Publishing to Blogger
- If Gemini returns `"YES"`, the post is published automatically to Blogspot using the Blogger API.
- If `"NO"`, the post is rejected and feedback is shown to the user.

---

## 🏗️ Tech Stack

| Layer         | Tech                        |
|--------------|-----------------------------|
| Frontend     | React.js                    |
| Backend      | Flask / Node.js             |
| Authentication | Google OAuth 2.0          |
| Database     | MongoDB / PostgreSQL        |
| AI Service   | Gemini 1.5 Flash (LLM)      |
| Deployment   | Railway / Render / Vercel   |
| Blog Posting | Blogger Data API v3         |

---

## 🧭 BlogCheck Workflow

1. **Author logs in** via Google OAuth.
2. **Author sets blog-specific rules** in natural language (e.g., "No hate speech", "Post must contain at least 300 words").
3. **Contributor logs in** using Google OAuth.
4. **Contributor submits a blog post** through the BlogCheck interface.
5. **Backend retrieves the stored rules** for the associated blog.
6. **Post and rules are sent to Gemini 1.5 Flash** for automatic evaluation.
7. **Gemini responds with a strict `"YES"` or `"NO"`**:
   - ✅ If `"YES"`:
     - The post is approved and automatically published to Blogspot using the Blogger API.
     - The contributor receives confirmation.
   - ❌ If `"NO"`:
     - The post is rejected.
     - The contributor is shown a message indicating the post did not meet the rules and may need revision.

## 🔮 Future Prospects

While BlogCheck already provides a smart, automated moderation pipeline, there are several directions for future enhancement:

### 1. 🗣️ Multilingual Rule & Post Support
- Extend rule interpretation and post evaluation to support multiple languages using multilingual LLM capabilities.
- Useful for global bloggers with diverse audiences.

### 2. 📊 Moderation Dashboard
- Create an admin dashboard with analytics:
  - Rule effectiveness.
  - Post rejection rates.
  - Contributor performance insights.

### 3. ✍️ Custom Feedback from Gemini
- Enhance Gemini responses to include **short, specific rejection reasons** when rules are violated (optional feature).
- Helps contributors fix issues more easily.

### 4. 🧑‍🤝‍🧑 Team Collaboration
- Allow multiple admins per blog.
- Define permissions (e.g., content approver, rule editor, viewer).

### 5. 🧩 Rule Templates & Suggestions
- Offer suggested rules based on blog type (e.g., travel, tech, food).
- One-click setup for new users.

### 6. 🕵️‍♂️ Rule Violation Auto-Learning
- Train a custom lightweight classifier using feedback on rejected posts.
- Use it to **pre-filter** obviously invalid posts to save API costs.

### 7. 🔔 Email & In-App Notifications
- Notify contributors when posts are accepted, rejected, or need revision.

### 8. 📱 Mobile Support
- Build a responsive or native mobile app for moderation on the go.

### 9. 🧠 Rule Conflict Detection
- Automatically detect conflicting or overly strict rules using AI.

### 10. 🔄 Version Control for Rules
- Track changes to rules over time.
- Restore previous rule sets if needed.


