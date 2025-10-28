const config = {
  title: 'UvA AI Chat Manual',
  tagline: 'User manual for UvA AI Chat',
  favicon: 'img/favicon.ico',

  url: 'https://YOUR-ORG.github.io',
  baseUrl: '/aichat-manual/',

  organizationName: 'YOUR-ORG',
  projectName: 'aichat-manual',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      nl: {
        label: 'Nederlands',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'UvA AI Chat Manual',
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `UvA AI Chat Manual`,
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
  },
};

module.exports = config;
