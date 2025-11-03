const config = {
  title: 'UvA AI Chat Manual',
  tagline: 'User manual for UvA AI Chat',
  favicon: 'img/favicon.ico',

  url: 'https://ai-tlc.github.io',
  baseUrl: '/',

  organizationName: 'ai-tlc',
  projectName: 'ai-tlc.github.io',

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

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
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/',
            to: '/before-you-start',
          },
        ],
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'UvA AI Chat Manual',
      logo: {
        alt: 'UvA AI Chat Logo',
        src: 'img/logo.png',
        href: '/before-you-start',
        style: {
          height: '32px',
          marginRight: '12px',
        },
      },
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
