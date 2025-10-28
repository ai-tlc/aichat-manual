# UvA AI Chat Manual

User manual for UvA AI Chat, built with Docusaurus and managed through Decap CMS.

## Architecture

This project uses:

- **Docusaurus** for documentation site generation
- **Decap CMS** for content management
- **GitHub Pages** for hosting
- **Cloudflare Worker** for OAuth proxy (enables CMS authentication)

## Project Structure

```text
aichat-manual/
├── docs/
│   ├── en/              # English documentation
│   └── nl/              # Dutch documentation
├── static/
│   ├── admin/           # Decap CMS files
│   └── img/             # Images and media
├── src/
│   └── css/             # Custom styles
├── infra/
│   └── decap-proxy/     # OAuth proxy configuration
└── .github/
    └── workflows/       # GitHub Actions deployment
```

## Quick Start

### Prerequisites

- Node.js 20 or later
- npm or yarn

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-ORG/aichat-manual.git
   cd aichat-manual
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Local CMS Development

To edit content locally using Decap CMS:

1. Install the local backend proxy:

   ```bash
   npm install -g decap-server
   ```

2. Start the local backend:

   ```bash
   npx decap-server
   ```

3. In another terminal, start Docusaurus:

   ```bash
   npm run start
   ```

4. Visit [http://localhost:3000/admin/](http://localhost:3000/admin/)

## Configuration

### Before Deployment

Update these configuration files with your actual values:

1. **docusaurus.config.js**:

   ```javascript
   url: 'https://YOUR-ORG.github.io',
   baseUrl: '/aichat-manual/',
   organizationName: 'YOUR-ORG',
   projectName: 'aichat-manual',
   ```

2. **static/admin/config.yml**:

   ```yaml
   site_url: https://YOUR-ORG.github.io/aichat-manual
   backend:
     repo: YOUR-ORG/aichat-manual
     base_url: https://decap.YOUR-DOMAIN.com
   ```

### GitHub Pages Setup

1. Go to repository Settings → Pages
2. Source: **GitHub Actions**
3. Push to the `main` branch to trigger deployment

The site will be available at: `https://YOUR-ORG.github.io/aichat-manual/`

### OAuth Proxy Setup

The OAuth proxy is required for Decap CMS to authenticate with GitHub. See [infra/decap-proxy/README.md](infra/decap-proxy/README.md) for detailed setup instructions.

Summary:

1. Create a GitHub OAuth App
2. Deploy the Cloudflare Worker
3. Configure DNS
4. Update `static/admin/config.yml` with the Worker URL

## Content Management

### For Editors

- Production CMS: `https://YOUR-ORG.github.io/aichat-manual/admin/`
- See [README-EDITORIAL.md](README-EDITORIAL.md) for editorial guidelines and workflow

### Content Structure

Documentation is bilingual (English/Dutch) with identical structures:

**English** (`docs/en/`):

- [01-before-you-start.md](docs/en/01-before-you-start.md)
- [02-core-features.md](docs/en/02-core-features.md)
- [03-personalization-collaboration.md](docs/en/03-personalization-collaboration.md)
- [04-advanced-usage.md](docs/en/04-advanced-usage.md)
- [05-faq.md](docs/en/05-faq.md)
- [06-glossary.md](docs/en/06-glossary.md)

**Nederlands** (`docs/nl/`):

- [01-voordat-je-begint.md](docs/nl/01-voordat-je-begint.md)
- [02-de-kernfunctionaliteiten.md](docs/nl/02-de-kernfunctionaliteiten.md)
- [03-personalisatie-en-samenwerking.md](docs/nl/03-personalisatie-en-samenwerking.md)
- [04-geavanceerd-gebruik.md](docs/nl/04-geavanceerd-gebruik.md)
- [05-veelgestelde-vragen.md](docs/nl/05-veelgestelde-vragen.md)
- [06-begrippenlijst.md](docs/nl/06-begrippenlijst.md)

## Available Scripts

- `npm run start` - Start development server
- `npm run build` - Build production site
- `npm run serve` - Serve production build locally
- `npm run clear` - Clear Docusaurus cache
- `npm run deploy` - Deploy to GitHub Pages (manual)

## Deployment

Deployment is automated via GitHub Actions. When changes are pushed to `main`:

1. GitHub Actions runs the build
2. Site is deployed to GitHub Pages
3. Changes are live in 2-5 minutes

To manually trigger a deployment:
1. Go to Actions tab in GitHub
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

## i18n (Internationalization)

The site supports English (default) and Dutch locales. Language switching is available in the navbar.

### Adding Translations

Both language versions must be maintained in parallel. When updating content:

1. Edit English version in `docs/en/`
2. Edit Dutch version in `docs/nl/`
3. Ensure both have matching structure and anchors

## Troubleshooting

### Build fails

```bash
npm run clear
npm ci
npm run build
```

### CMS authentication fails

- Verify OAuth proxy is deployed and accessible
- Check GitHub OAuth App callback URL matches the proxy URL
- Ensure repository name in config.yml is correct

### Pages not deploying

- Check GitHub Actions logs for errors
- Verify Pages is enabled in repository settings
- Ensure `baseUrl` matches repository name

## Contributing

1. Create a feature branch
2. Make changes
3. Test locally with `npm run build`
4. Submit a pull request

## License

See [LICENSE](LICENSE) file for details.

## Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [Decap CMS Documentation](https://decapcms.org/)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Editorial Guidelines](README-EDITORIAL.md)
- [OAuth Proxy Setup](infra/decap-proxy/README.md)
