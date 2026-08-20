# Vimoksha Yogshala — Node/Express Backend Setup

This replaces the earlier Supabase version with your own Express server,
MongoDB database, and Cloudinary image hosting.

---

## PART A — Set up MongoDB Atlas (free database)

1. Go to https://www.mongodb.com/cloud/atlas/register → create a free account.
2. Create a free (M0) cluster.
3. Under **Database Access**, add a database user with a username/password
   (save these — you'll need them).
4. Under **Network Access**, click **Add IP Address** → **Allow Access from
   Anywhere** (0.0.0.0/0) — needed since Render's servers don't have a fixed IP.
5. Click **Connect** on your cluster → **Drivers** → copy the connection
   string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```
   Replace `<username>` and `<password>` with your real values, and add
   a database name before the `?`, e.g. `.../vimoksha?retryWrites=true...`

## PART B — Set up Cloudinary (free image hosting)

1. Go to https://cloudinary.com → sign up free.
2. On your Dashboard home page, copy: **Cloud Name**, **API Key**, **API Secret**.

## PART C — Set up the Express server locally

1. Copy the `server/` folder from this delivery into its own project folder
   (this is a **separate** project from your React frontend — don't put it
   inside your `src/` folder).

2. Open a terminal inside that `server/` folder and run:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your real values:
   ```
   MONGODB_URI=mongodb+srv://...           (from Part A)
   JWT_SECRET=any-long-random-string        (make one up, keep it secret)
   CLOUDINARY_CLOUD_NAME=...                (from Part B)
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   ```

4. Create your admin login:
   ```bash
   npm run create-admin -- youremail@example.com yourpassword
   ```
   This is the email/password you'll use to log into `/admin` on your site.

5. Start the server:
   ```bash
   npm run dev
   ```
   Visit http://localhost:5000/api/health in your browser — you should see
   `{"status":"ok"}`. That means it's working.

## PART D — Deploy the Express server to Render

1. Push the `server/` folder to its own GitHub repository (or a subfolder
   of an existing repo).
2. Go to https://render.com → New → Web Service → connect that repo.
3. Settings:
   - **Root Directory**: `server` (if it's a subfolder)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Under **Environment**, add the same variables from your `.env` file
   (MONGODB_URI, JWT_SECRET, CLOUDINARY_*, FRONTEND_URL — set this to your
   real Vercel URL, PORT is set automatically by Render).
5. Deploy. Render will give you a URL like `https://vimoksha-api.onrender.com`.

   Note: Render's free tier "sleeps" after 15 minutes of inactivity — the
   first request after a quiet period takes ~30-50 seconds to wake up.
   This is normal on the free tier.

## PART E — Wire up the React frontend

1. Copy everything from `frontend-updates/src/` into your actual project's
   `src/` folder, **replacing** these files:
   ```
   src/lib/api.js                       (new)
   src/lib/useAuth.js                   (new — replaces old Supabase version if present)
   src/components/BookTrialForm.jsx     (replace)
   src/pages/BlogPage.jsx               (replace)
   src/pages/BlogPostPage.jsx           (new)
   src/pages/GalleryPage.jsx            (replace)
   src/pages/admin/AdminLogin.jsx       (replace)
   src/pages/admin/AdminShell.jsx       (new)
   src/pages/admin/AdminBookingsPage.jsx (replace)
   src/pages/admin/AdminBlogPage.jsx    (replace)
   src/pages/admin/AdminGalleryPage.jsx (replace)
   ```

2. Delete `src/lib/supabaseClient.js` if it exists — it's no longer used.
   You can also run `npm uninstall @supabase/supabase-js` since it's no
   longer needed.

3. Add to your frontend's `.env` (project root, same as `package.json`):
   ```
   VITE_API_URL=http://localhost:5000
   ```
   For production, add the same variable in **Vercel → Settings →
   Environment Variables**, pointing to your Render URL instead:
   ```
   VITE_API_URL=https://vimoksha-api.onrender.com
   ```

4. Your `routes.js` doesn't need any changes — it was already wired to
   `AdminLogin`, `AdminBookingsPage`, `AdminBlogPage`, `AdminGalleryPage`,
   `BlogPage`, `BlogPostPage`, and `GalleryPage` by path, from the earlier
   setup. Since the file names and default exports are unchanged, the
   existing routes keep working automatically.

## PART F — Test it end to end

1. Run your Express server (`npm run dev` inside `server/`).
2. Run your React app (`npm run dev` inside your frontend project).
3. Visit `/admin/login` → sign in with the account from step D.4.
4. Create a blog post, mark Published → check `/blog`.
5. Upload a gallery image → check `/gallery`.
6. Submit the trial form → check `/admin/bookings`.

## Notes

- Every user created via `npm run create-admin` has full admin access —
  there's no separate role system. Run the script again with a different
  email to add more admins.
- Images uploaded through the admin panel go straight to Cloudinary and
  are served from Cloudinary's CDN — nothing is stored on your server disk.
- If bookings/blog/gallery don't load on your live site, the most common
  cause is `VITE_API_URL` not being set in Vercel, or `FRONTEND_URL` not
  matching your real Vercel URL in Render's environment variables (CORS
  will block the request if these don't match).
