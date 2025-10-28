# Decap CMS OAuth Proxy for GitHub Pages

This directory contains configuration for deploying a Cloudflare Worker that handles OAuth authentication for Decap CMS when hosted on GitHub Pages.

## Why this is needed

GitHub Pages serves only static files and cannot handle OAuth callbacks. Decap CMS needs to authenticate users with GitHub to allow editing content. This lightweight Cloudflare Worker acts as an OAuth proxy between Decap CMS and GitHub.

## Prerequisites

- A Cloudflare account with Workers enabled
- A domain configured in Cloudflare DNS
- Node.js and npm installed
- Wrangler CLI: `npm install -g wrangler`

## Setup Instructions

### 1. Fork or clone the decap-proxy repository

```bash
git clone https://github.com/sterlingwes/decap-proxy.git
cd decap-proxy
npm install
```

### 2. Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: `UvA AI Chat Manual CMS`
   - **Homepage URL**: `https://decap.YOUR-DOMAIN.com`
   - **Authorization callback URL**: `https://decap.YOUR-DOMAIN.com/callback`
4. Click "Register application"
5. Note your **Client ID** and generate a new **Client Secret**

### 3. Configure the Worker

Copy the example configuration:

```bash
cp ../aichat-manual/infra/decap-proxy/wrangler.toml.example wrangler.toml
```

Edit `wrangler.toml`:
- Replace `YOUR-DOMAIN.com` with your actual domain
- Update the route pattern to match your subdomain

### 4. Set OAuth secrets

```bash
npx wrangler secret put GITHUB_OAUTH_ID
# Paste your GitHub OAuth Client ID when prompted

npx wrangler secret put GITHUB_OAUTH_SECRET
# Paste your GitHub OAuth Client Secret when prompted
```

### 5. Deploy the Worker

```bash
npx wrangler deploy
```

The Worker will be deployed to your specified route (e.g., `https://decap.YOUR-DOMAIN.com`).

### 6. Configure DNS

In your Cloudflare DNS settings:

1. Add a DNS record for the subdomain:
   - **Type**: CNAME or A
   - **Name**: decap
   - **Target**: Your Workers route (or use Cloudflare's automatic routing)
   - **Proxy status**: Proxied (orange cloud)

### 7. Update Decap CMS configuration

The `static/admin/config.yml` in the main project should already be configured with:

```yaml
backend:
  name: github
  repo: YOUR-ORG/aichat-manual
  branch: main
  base_url: https://decap.YOUR-DOMAIN.com
```

Make sure to replace `YOUR-ORG` and `YOUR-DOMAIN.com` with your actual values.

## Testing

### Local development

For local development without OAuth:

```bash
# In the main project directory
npm install -g decap-server
npx decap-server

# In another terminal
npm run start
```

Visit `http://localhost:3000/admin/` and you can edit content locally.

### Production testing

1. Deploy your Docusaurus site to GitHub Pages
2. Visit `https://YOUR-ORG.github.io/aichat-manual/admin/`
3. Click "Login with GitHub"
4. You should be redirected to GitHub for authorization
5. After authorizing, you should be redirected back to the CMS

## Troubleshooting

### OAuth callback fails

- Verify the callback URL in your GitHub OAuth App matches exactly: `https://decap.YOUR-DOMAIN.com/callback`
- Check that the Worker is deployed and accessible
- Verify the secrets are set correctly: `npx wrangler secret list`

### CMS cannot load repository

- Check that the repository name in `config.yml` is correct
- Verify the GitHub OAuth App has access to the repository
- Check browser console for CORS or authentication errors

### Worker deployment fails

- Ensure you have the correct Cloudflare permissions
- Verify the route pattern matches your domain
- Check that your domain is properly configured in Cloudflare

## Security Considerations

- The OAuth Client Secret is stored securely as a Cloudflare Worker secret
- The Worker only proxies OAuth flows; it does not store user credentials
- All traffic should use HTTPS (enforced by Cloudflare)
- The Worker has minimal attack surface (only two endpoints: `/auth` and `/callback`)

## Resources

- [decap-proxy GitHub repository](https://github.com/sterlingwes/decap-proxy)
- [Decap CMS documentation](https://decapcms.org/)
- [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
- [GitHub OAuth Apps documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
