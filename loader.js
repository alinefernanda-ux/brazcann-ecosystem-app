// Loader do custom element <brazcann-ecosystem>.
// Aponte a "Server URL" do custom element no Wix para ESTE arquivo (loader.js) — não para o bundle direto.
// Ele lê version.json (sem cache) e carrega o bundle com ?v=<versao> a cada carga:
//  - a cada deploy a versao muda -> o navegador pega o bundle NOVO na hora (sem esperar o cache de 10 min);
//  - quando nada muda, a URL versionada continua cacheada (rapido, sem re-baixar);
//  - o PROGRESSO do usuario (localStorage) nao e afetado.
// Se algo der errado, o fallback carrega o bundle sem versao (comportamento antigo).
(function () {
  var BASE = 'https://alinefernanda-ux.github.io/brazcann-ecosystem-app/';
  function load(src) {
    if (document.querySelector('script[data-bz-app]')) return; // evita carga dupla
    var s = document.createElement('script');
    s.src = src; s.async = false; s.setAttribute('data-bz-app', '1');
    document.head.appendChild(s);
  }
  fetch(BASE + 'version.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) { load(BASE + 'brazcann-ecosystem.js?v=' + ((j && j.v) || Date.now())); })
    .catch(function () { load(BASE + 'brazcann-ecosystem.js'); });
})();
