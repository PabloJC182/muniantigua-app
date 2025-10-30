<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-zinc-900">
    <Header />
    <main class="flex-grow mx-0">
      <slot />
    </main>
    <Footer />
  </div>
</template>
<!-- START Botmaker Webchat-->
<script>
    (function () {
        let js = document.createElement('script');
        js.type = 'text/javascript';
        js.async = 1;
        js.src = 'https://go.botmaker.com/rest/webchat/p/GSN74WRH4I/init.js';
        document.body.appendChild(js);
    })();
    (function() {
  // Observa cambios en el DOM (porque el iframe se inserta dinámicamente)
  const observer = new MutationObserver(() => {
    const iframe = document.querySelector('iframe[name="Botmaker"]');
    if (iframe) {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (doc && doc.querySelectorAll('audio').length > 0) {
          doc.querySelectorAll('audio').forEach(el => el.remove());
          console.log("🎧 Sonidos del Webchat eliminados");
        }
      } catch (e) {
        // Si aún no se puede acceder (por políticas del navegador), se ignora
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
</script>
<!-- END Botmaker Webchat-->

