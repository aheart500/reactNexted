if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,c,i)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const t={uri:location.origin+s.slice(1)};return Promise.all(c.map(s=>{switch(s){case"exports":return a;case"module":return t;default:return e(s)}})).then(e=>{const s=i(...e);return a.default||(a.default=s),a})}))}}define("./sw.js",["./workbox-4d0bff02"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/1bfc9850.6729917a826e103499e1.js",revision:"955dc92d13547f3af4e85fa700867b94"},{url:"/_next/static/chunks/1f18147e56b33b2260c5ebd61ea42d11fb05ead9.f78e2c622e2b5e544283.js",revision:"cba8aa36af8ca2b1beff1c6b174a20ed"},{url:"/_next/static/chunks/22e36bafbacd89d39c6ec7755a6bffb4977e749d.bbd119d0dcff2f568f37.js",revision:"56cd8540c894399a08b5902342b32762"},{url:"/_next/static/chunks/3fad8191aa00e65c733098a602d5dbef68108898.4d0ffff08c415be88f2c.js",revision:"3f534e37dcff2b9ea2809932b808784d"},{url:"/_next/static/chunks/97c678fb945c0504f2ef7f0919e0e605c164b05d.1e70d7b1d72fd8dee909.js",revision:"cf586de8b52de335206fb2150a5aff92"},{url:"/_next/static/chunks/commons.cd9ca553a70fe5f8c3dd.js",revision:"5b4e704c66f64aebc4ecd3ff47aeef83"},{url:"/_next/static/chunks/e9506ef3335ed3cf1cfbdc0d851910e96fc00ba3.d0081a1dbc675a9239b0.js",revision:"db734313474d5d185f82d5c87182ac16"},{url:"/_next/static/chunks/feb9d1a9.ae226c74e10a6a4b10b8.js",revision:"b2e804beb551bc3add5223dab2b0d437"},{url:"/_next/static/chunks/framework.126679bf45d7d49475d8.js",revision:"8e6204793e3d11a8bedf359bfb6e110d"},{url:"/_next/static/css/1fba26af93e13fff665e.css",revision:"923e8cca7baa72d02459afc2316c1509"},{url:"/_next/static/css/27471265c8e1c7b42e5b.css",revision:"3c5dda71afe5b637b027849e6ece2b5f"},{url:"/_next/static/lSUjJ8pl6W-QZUhApTtS8/_buildManifest.js",revision:"d6055dad1ccfd92e30db5368912378ff"},{url:"/_next/static/lSUjJ8pl6W-QZUhApTtS8/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/lSUjJ8pl6W-QZUhApTtS8/pages/_app.js",revision:"6e9924e4c66c33a4ccff0c77bce114da"},{url:"/_next/static/lSUjJ8pl6W-QZUhApTtS8/pages/_error.js",revision:"de0e35cd3b645850451fc99bc2950dd4"},{url:"/_next/static/lSUjJ8pl6W-QZUhApTtS8/pages/add-account.js",revision:"5a79953552f19a5c6cb4e6e6ec2a3eae"},{url:"/_next/static/lSUjJ8pl6W-QZUhApTtS8/pages/admin-login.js",revision:"b9870121598e013bd4e7a7a0dd51ec78"},{url:"/_next/static/lSUjJ8pl6W-QZUhApTtS8/pages/admin.js",revision:"50792982dcd204545554c93e77d3293a"},{url:"/_next/static/lSUjJ8pl6W-QZUhApTtS8/pages/blog.js",revision:"fe50b7157bcebaa822005a2ac8a5c263"},{url:"/_next/static/lSUjJ8pl6W-QZUhApTtS8/pages/blog/%5Bname%5D.js",revision:"0289586140a0b594cfd8f70a293ee542"},{url:"/_next/static/lSUjJ8pl6W-QZUhApTtS8/pages/index.js",revision:"ea8975c3aee967993f9ebe4bf9187e92"},{url:"/_next/static/lSUjJ8pl6W-QZUhApTtS8/pages/subscription.js",revision:"293b765297a8c66c4ac28b18ba205936"},{url:"/_next/static/lSUjJ8pl6W-QZUhApTtS8/pages/user/%5Bunique%5D.js",revision:"6c7c5c6a22cb9e0566d781e846dc5337"},{url:"/_next/static/runtime/main-6e4d6a125da8b1688bae.js",revision:"fa06926b07f248a10617e4eb52a9e9fd"},{url:"/_next/static/runtime/polyfills-b6f4b95376fefb13cca6.js",revision:"94caeacefc92b6c811c272ac2b476525"},{url:"/_next/static/runtime/webpack-c212667a5f965e81e004.js",revision:"f5e6e2fca3144cc944812cfa3547f475"},{url:"/assets/images/add-account/arrow-down.svg",revision:"c317b9c22081b5eda03576a1c6e90f34"},{url:"/assets/images/add-account/logotype.svg",revision:"42a0c7a1496ce8b9c70e2279e89c620a"},{url:"/assets/images/blog/icons/arrow.svg",revision:"815e71d8d3efeb0e766bd098ffcc25a8"},{url:"/assets/images/blog/icons/facebook.svg",revision:"0eda72ba726fffcaaa2a0423d603f7e5"},{url:"/assets/images/blog/icons/instagram.svg",revision:"0dc59a18581573b9bd06a33e905c3d37"},{url:"/assets/images/blog/icons/linkedin.svg",revision:"9c9759b9f922bd3f106d9912deba9aa1"},{url:"/assets/images/blog/icons/save.svg",revision:"0a9e39581a5a6b23c4774e35150228b9"},{url:"/assets/images/blog/icons/twitter.svg",revision:"30e4545deadc1edd396caf77d916ec29"},{url:"/assets/images/blog/logotype.svg",revision:"df79cca31579de7f932f2acf3b476ad3"},{url:"/assets/images/home/ghost-icon.svg",revision:"d2c57f6c3be7be72eab5f4e43f8e4df6"},{url:"/assets/images/home/icons/add.svg",revision:"3d4faa27145b51755c38c87a0ba14777"},{url:"/assets/images/home/icons/age.svg",revision:"2e5e965cf2a80aea551ee7215b467af5"},{url:"/assets/images/home/icons/cal.svg",revision:"7e826c5aa0837daa25c30fb2e8aebed6"},{url:"/assets/images/home/icons/city.svg",revision:"a7f0be1ecdb794c5a9b8ffdf3936fe2e"},{url:"/assets/images/home/icons/clock.svg",revision:"5f324e67ceeb889775780568e1eaad42"},{url:"/assets/images/home/icons/country.svg",revision:"a1430763107c563208e062413b609039"},{url:"/assets/images/home/icons/search.svg",revision:"3ee0bd270c60bfb216de11dccddfc2d7"},{url:"/assets/images/home/icons/sex.svg",revision:"cad0dcaf12176140998ff71ab094d98f"},{url:"/assets/images/home/icons/user.svg",revision:"f15798e4779a11b0266b641e9aea082f"},{url:"/assets/images/home/logotype.svg",revision:"42a0c7a1496ce8b9c70e2279e89c620a"},{url:"/assets/images/home/profile-image.svg",revision:"d40bfd0e799ab2da62446f77e9762f37"},{url:"/assets/images/home/search.svg",revision:"3ee0bd270c60bfb216de11dccddfc2d7"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/logotype.svg",revision:"42a0c7a1496ce8b9c70e2279e89c620a"},{url:"/manifest.json",revision:"b6753e4037a6d699f27708e2d52dd317"},{url:"/robots.txt",revision:"54a7a4795b502ce131e57856e47208b3"},{url:"/sitemap.xml",revision:"af817a9e0f9396fe3fba86c48c6b11d9"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"POST"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));