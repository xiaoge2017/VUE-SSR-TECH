const Router = require('koa-router')
const serverRender = require('./server-render.js')
const path = require('path')
const fs = require('fs')

const VueServerRender = require('vue-server-renderer')

const clientManifest = require('../../public/vue-ssr-client-manifest.json')

const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {inject: false, clientManifest})

const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)

const Pagerouter = new Router()

Pagerouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = Pagerouter
