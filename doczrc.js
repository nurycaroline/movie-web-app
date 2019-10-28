import { css } from 'docz-plugin-css';

export default {
  base: '/',
  title: 'Document',
  description: 'Document',
  plugins: [
    css({
      preprocessor: 'sass',
      cssmodules: false,
    }),
  ],
  dest: '/buildDocz',
  files: '**/*.{md,markdown,mdx}',
  public: '/publicDocz',
  codeSandbox: false,
  propsParser: true,
  themeConfig: {
    colors: {
      primary: 'tomato',
    },
    styles: {
      h1: {
        fontSize: 100,
      },
    },
  },
  menu: ['Home', { name: 'Componentes', menu: ['Pagination'] }],
};
