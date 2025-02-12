<script setup lang="ts">
  import { useHead, useSeoMeta } from 'unhead'
  import checkDarkTheme from '@/composables/dark-color-scheme-check?raw'
  import type { Script } from '@unhead/schema'

  import { computed } from 'vue'
  import { useData } from 'vitepress'

  import siteDefn from '@/site'
  import image from '@/screenshots/image.jpg'
  import { pg_font_urls } from '../../themes/pg-vuetify/tokens.mjs'

  type TurboScript = Script & { once: true }

  const link: any = [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.svg',
    },
  ]
  const noscript: any = []

  if (pg_font_urls.length) {
    const googleapis = 'https://fonts.googleapis.com'
    const gstatic = 'https://fonts.gstatic.com'
    link.push(
      { rel: 'dns-prefetch', href: googleapis },
      { rel: 'dns-prefetch', href: gstatic },
      { rel: 'preconnect', crossorigin: 'anonymous', href: googleapis },
      { rel: 'preconnect', crossorigin: 'anonymous', href: gstatic },
      {
        rel: 'preload',
        as: 'style',
        onload: "this.onload=null;this.rel='stylesheet'",
        href: pg_font_urls.toString(),
      },
    )
    noscript.push(
      `<link rel="stylesheet" crossorigin="anonymous" href="${pg_font_urls.toString()}" />`,
    )
  }

  const { title, description, url, author } = siteDefn

  const { site, frontmatter } = useData()
  const imgUrl = new URL(image, url).href

  useSeoMeta({
    // charset: 'utf-8',
    // author,
    // viewport: 'width=device-width, initial-scale=1',
    // keywords: route.meta.tags?.toString(),
    // title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogImage: imgUrl,
    ogImageAlt: title,
    // og:image:width
    // og:image:height
    // og:image:alt
    // og:image: type
    // og:image: secure_url
    ogUrl: url,
    ogSiteName: title,
    // og: locale
    // og: type
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imgUrl,
    twitterImageAlt: title,
    twitterSite: '@vuedesigner',
    twitterCreator: '@techakayy',
    twitterCard: 'summary_large_image',
  })

  import { getCurrentInstance } from 'vue'
  const instance = getCurrentInstance()

  useHead({
    // title,
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - ${title}` : title
    },
    htmlAttrs: { lang: 'en-US' },
    meta: [
      { name: 'charset', content: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { name: 'author', content: author },
      {
        name: 'keywords',
        content: computed(() => frontmatter.value?.tags).value,
      },
    ],
    script: [{ innerHTML: checkDarkTheme, once: true } as TurboScript],
    link,
    noscript,
  })
</script>

<template>
  <!-- <style>
    {{ instance.appContext.provides['Symbol(vuetify:theme)']?.styles.value }}
  </style> -->
  <div></div>
</template>

<style></style>
