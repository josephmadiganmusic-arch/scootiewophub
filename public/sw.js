/* STARRBABY WRLDWIDE service worker. Conservative on purpose: the page, scripts
   and styles go network first so a deploy is never hidden behind a stale
   cache, and only images and fonts are served cache first. Nothing but GET is
   handled and the live status poll on Rollout Heaven is never touched. A fetch
   handler is also what makes the site installable as an app. */

const VERSION = "sb-1";
const SHELL = "shell-" + VERSION;
const MEDIA = "media-" + VERSION;
const PRECACHE = ["/", "/manifest.webmanifest", "/brand/star-3d.webp", "/fonts/Unbounded-800-latin.woff2", "/fonts/Lato-400-latin.woff2"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(SHELL).then((c) => c.addAll(PRECACHE)).catch(() => {}).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL && k !== MEDIA).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const isMedia = (url) => /\.(?:png|jpe?g|webp|svg|woff2?|ico)$/i.test(url.pathname);

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isMedia(url)) {
    e.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request)
            .then((res) => {
              if (res.ok) {
                const copy = res.clone();
                caches.open(MEDIA).then((c) => c.put(request, copy));
              }
              return res;
            })
            .catch(() => hit),
      ),
    );
    return;
  }

  const shell = request.mode === "navigate" || ["document", "script", "style"].includes(request.destination);
  if (!shell) return;
  e.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(SHELL).then((c) => c.put(request, copy));
        }
        return res;
      })
      .catch(() => caches.match(request).then((hit) => hit || (request.mode === "navigate" ? caches.match("/") : undefined))),
  );
});
