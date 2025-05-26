# Deploy to GitHub Pages, Netlify, Vercel, or any static hosting

## GitHub Pages
To deploy to GitHub Pages:

1. Build the project:
   ```bash
   npm run build
   ```

2. The `dist` folder contains the built files
3. Deploy the contents of `dist` to your hosting service

## Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Manual deployment
1. Run `npm run build`
2. Upload the contents of the `dist` folder to your web server

## Environment Variables
No environment variables are required for this application.
All processing is done client-side.

## HTTPS Requirement
For the clipboard functionality to work properly, the application 
should be served over HTTPS in production.
