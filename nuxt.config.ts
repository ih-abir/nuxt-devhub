// https://nuxt.com/docs/api/configuration/nuxt-config

const environmentVariables = {
  NUXT_DB_URL: process.env.NUXT_DB_URL,
  NUXT_ACCESS_TOKEN: process.env.NUXT_ACCESS_TOKEN,
  NUXT_ASSETS_URL: process.env.NUXT_ASSETS_URL,
}

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  srcDir: 'app',
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    ...environmentVariables,
    public: {
      ...environmentVariables,
    }
  },
})
