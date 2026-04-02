const CACHE_NAME = "enso-mind-v1";

const APP_SHELL = [
  "/",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
];

// インストール時: アプリシェルをプリキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// アクティベート時: 古いキャッシュを削除
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// フェッチ: ナビゲーション → Network-first、その他 → Cache-first
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 同一オリジン以外はスキップ
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    // Network-first（オフライン時は "/" にフォールバック）
    event.respondWith(
      fetch(request).catch(() =>
        caches.match("/").then((res) => res ?? new Response("Offline", { status: 503 }))
      )
    );
  } else {
    // Cache-first（ネットワークにフォールバック）
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
      )
    );
  }
});
