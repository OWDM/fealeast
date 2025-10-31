# Deployment Guide - Fuel East

This guide will help you deploy the Fuel East website to Vercel.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account
- A Vercel account (free tier is sufficient)

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to Git Repository

First, initialize a git repository and push your code:

```bash
git init
git add .
git commit -m "Initial commit: Fuel East website"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Vercel will automatically detect Next.js settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

5. Click "Deploy"

### Step 3: Configure Domain (Optional)

1. Once deployed, go to your project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., fueleast.com)
4. Follow Vercel's instructions to configure DNS

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Follow the prompts to complete the deployment.

## Environment Variables

Currently, the website doesn't require any environment variables. However, if you integrate email services or analytics in the future, add them in:

1. Vercel Dashboard → Your Project → Settings → Environment Variables

Example variables you might need later:

```
SENDGRID_API_KEY=your_api_key
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Post-Deployment Checklist

- [ ] Test all pages (Home, About, Services, Contact)
- [ ] Test contact form submission
- [ ] Verify responsive design on mobile devices
- [ ] Check page load speed using Vercel Analytics
- [ ] Set up custom domain (if applicable)
- [ ] Configure email service for contact form
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Add SEO meta tags for better search engine visibility

## Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to the `main` branch
- **Preview**: When you create a pull request or push to other branches

## Monitoring

Monitor your deployment:
- **Vercel Dashboard**: View deployment logs, analytics, and performance
- **Real-time Logs**: Check function logs for API routes
- **Analytics**: Track page views and performance metrics

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Run `npm run build` locally to test

### Contact Form Not Working

1. Check API route logs in Vercel dashboard
2. Verify the API endpoint is accessible
3. Check browser console for errors

### Environment Issues

1. Ensure Node.js version compatibility (18.x or higher)
2. Clear Vercel build cache if needed
3. Redeploy after making changes

## Support

For Vercel-specific issues, visit:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

## Next Steps

After deployment, consider:
1. Integrating an email service (SendGrid, Resend, etc.) for the contact form
2. Adding analytics to track visitor behavior
3. Implementing SEO optimizations
4. Setting up a CMS for easier content management
5. Adding a blog section
