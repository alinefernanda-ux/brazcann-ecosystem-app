// Loader do custom element <carli-command-center> (CARLI Command Center).
// Aponte a "Server URL" do custom element na página /carli para ESTE arquivo.
// Lê carli-version.json (sem cache) e carrega o bundle com ?v=<versao> (cache-bust por deploy):
//  - a cada deploy a versao muda -> o navegador pega o bundle NOVO na hora;
//  - quando nada muda, a URL versionada continua cacheada (rapido, sem re-baixar).
// Se algo der errado, o fallback carrega o bundle sem versao.
(function () {
  var BASE = 'https://alinefernanda-ux.github.io/brazcann-ecosystem-app/';
  function load(src) {
    if (document.querySelector('script[data-carli-cc]')) return; // evita carga dupla
    var s = document.createElement('script');
    s.src = src; s.async = false; s.setAttribute('data-carli-cc', '1');
    document.head.appendChild(s);
  }
  fetch(BASE + 'carli-version.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) { load(BASE + 'carli-command-center.js?v=' + ((j && j.v) || Date.now())); })
    .catch(function () { load(BASE + 'carli-command-center.js'); });
})();
