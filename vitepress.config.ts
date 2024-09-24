// vite.config.js (or) vite.config.ts
import { fileURLToPath, URL } from 'node:url'

import { liveDesigner } from '@pinegrow/vite-plugin'
import AutoImportComponents from 'unplugin-vue-components/vite'
import AutoImportAPIs from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'
import VueDevTools from 'vite-plugin-vue-devtools'
// import myVitepressModule from './src/modules/my-module'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// import { visualizer } from 'rollup-plugin-visualizer'

import { defineConfig, HeadConfig } from 'vitepress'

import siteDefn from './src/site'
const { title, description, url } = siteDefn

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // srcDir must be relative to root
  srcDir: 'src',
  outDir: 'dist',
  title,
  titleTemplate: `:title - ${title}`,
  description,
  sitemap: {
    hostname: url,
  },

  vue: {
    template: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#image-loading
      transformAssetUrls,
      compilerOptions: {
        isCustomElement: (tag) => tag === 'lite-youtube',
      },
    },
  },

  vite: {
    ssr: {
      // noExternal: ['vuetify'],
      noExternal: [/\.css$/, /^vuetify/, /\.scss$/, /\.sass$/],
    },

    plugins: [
      // For details, refer to https://github.com/antfu/unplugin-auto-import#configuration
      AutoImportAPIs({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
          /\.mdx$/, // .mdx
        ],
        imports: [
          'vue',
          // 'vue-router',
          // 'vue-i18n',
          // 'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
          'pinia',
        ],
        dirs: [
          /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
          // Path must be relative to Vitepress's srcDir
          'composables',
          'utils',
          'stores',
        ],
        vueTemplate: true,
        dts: 'auto-imports.d.ts',
      }),

      // For details, refer to https://github.com/antfu/unplugin-vue-components#configuration
      AutoImportComponents({
        /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
        // Path must be relative to Vitepress's srcDir
        dirs: ['components'],

        // allow auto load markdown components under ./src/components/
        extensions: ['vue', 'md'],

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.mdx?/],

        // resolvers: [], // Auto-import using resolvers
        dts: 'components.d.ts',
      }),

      Unocss({
        presets: [
          presetIcons({
            prefix: 'i-', // default prefix, do not change
          }),
        ],
        content: {
          pipeline: {
            include: ['**/*'],
          },
        },
      }),
      Vuetify({
        /* If customizing sass variables of vuetify components */
        styles: {
          configFile: '../src/assets/vuetify/settings.scss',
        },
        //...
      }),
      VueDevTools(),
      liveDesigner({
        iconPreferredCase: 'unocss', // default value (can be removed), unocss by default uses the unocss format for icon names
        devtoolsKey: 'devtoolsKey', // see app.ts
        /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
        vuetify: {
          /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
          configPath: 'vuetify.config.ts', // or file where vuetify is created
          // themePath: false, // Set to false so that Design Panel is not used
          // utilities: false,
          // restartOnConfigUpdate: true,
          restartOnThemeUpdate: true,
        },
        dirs: {
          src: '@/',
          components: '@/components',
          pages: '@/pages',
          layouts: '@/layouts',
        },
        // plugins: [
        //   {
        //     name: 'My Awesome Lib 3.0',
        //     key: 'my-awesome-lib',
        //     pluginPath: fileURLToPath(
        //       new URL('./web-types/my-awesome-lib.json', import.meta.url),
        //     ),
        //   },
        // ],
      }),
      // ...
    ],

    // build: {
    //   // Vite uses Rollup under the hold, so rollup options & plugins can be used for advanced usage
    //   rollupOptions: {
    //     plugins: [visualizer()],
    //   },
    // },

    resolve: {
      alias: {
        /* Must be either an object, or an array of { find, replacement, customResolver } pairs. */
        /* Refer to: https://vitejs.dev/config/shared-options.html#resolve-alias */
        /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
        // Path resolved relative to this file
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./src', import.meta.url)),
        '~~': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
  },

  // transformHead() {
  //   const head: HeadConfig[] = []

  //   head.push([
  //     'style',
  //     {
  //       hid: 'vuetifyTheme',
  //       type: 'text/css',
  //       cssText: this.$vuetify.theme.generatedStyles,
  //     },
  //   ])
  //   return head

  //   // head() {
  //   //   return {
  //   //     style: [{
  //   //       hid: "vuetifyTheme",
  //   //       type: "text/css",
  //   //       cssText: this.$vuetify.theme.generatedStyles,
  //   //     }],
  //   //   }
  //   // },
  // },

  // themeConfig: {
  //   // https://vitepress.dev/reference/default-theme-config
  //   nav: [
  //     { text: 'Home', link: '/' },
  //     { text: 'Examples', link: '/markdown-examples' },
  //   ],

  //   sidebar: [
  //     {
  //       text: 'Examples',
  //       items: [
  //         { text: 'Markdown Examples', link: '/markdown-examples' },
  //         { text: 'Runtime API Examples', link: '/api-examples' },
  //       ],
  //     },
  //   ],

  //   socialLinks: [
  //     { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
  //   ],
  // },
})
