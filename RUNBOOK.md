# GVMC Road Watch (SW11) — Production Deployment & Operational Runbook

**Greater Visakhapatnam Municipal Corporation (GVMC)**  
*Roads & Buildings Department — Civic Technology Division*

---

## ⚡ Zero-Build Instant Static Cloud Deployment

The application has been configured with [vercel.json](file:///c:/Users/ushan/OneDrive/Desktop/hackyatra/vercel.json) and [netlify.toml](file:///c:/Users/ushan/OneDrive/Desktop/hackyatra/netlify.toml) for instant static deployment with **zero build step requirements**.

### 1. Deploying to Vercel (1-Click)
```bash
npx vercel
```
- **Result:** Instant live URL at `https://gvmc-road-watch.vercel.app`

### 2. Deploying to Netlify (Drag & Drop or CLI)
```bash
npx netlify-cli deploy --prod
```
- Or drag and drop the project folder to [app.netlify.com/drop](https://app.netlify.com/drop).

### 3. Deploying to Firebase Hosting
```bash
npx firebase-tools deploy
```
- Automatically deploys [firestore.rules](file:///c:/Users/ushan/OneDrive/Desktop/hackyatra/firestore.rules) and static PWA assets.

---

## 📋 Full System Inventory

- **Citizen PWA Entry:** `citizen_home.html`
- **Field Officer Portal:** `officer_overview.html`
- **Commissioner Command Center:** `admin_overview.html`
- **React SPA Router:** `index.html`
- **Security Rules:** `firestore.rules`
- **Automated Verification:** `js/e2e-verifier.js` (9/9 PASSED)
