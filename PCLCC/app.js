/* app.js
   - Fade-in del player cuando AblePlayer está listo (evento + observer + timeout)
   - Sincronización opcional de idioma transcript -> captions (TextTracks API)
   - No requiere :has(); funciona en navegadores actuales
*/
(function () {
  'use strict';

  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function $all(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  // ===========================
  // 1) Fade-in del reproductor
  // ===========================
  var PLAYER_SEL = '#player .able-wrapper';

  function showPlayer() {
    var el = $(PLAYER_SEL);
    if (el) el.style.opacity = '1';
  }

  document.addEventListener('initialized.ableplayer', showPlayer);

  // Si el wrapper/iframe ya están cuando cargamos este script
  function checkNow() {
    var wrap = $(PLAYER_SEL);
    if (wrap && wrap.querySelector('iframe')) {
      showPlayer();
      return true;
    }
    return false;
  }

  // muestra en cuanto aparezca el iframe
  function attachObserver() {
    var target = $('#player');
    if (!target) return;
    var obs = new MutationObserver(function () {
      if (checkNow()) {
        try { obs.disconnect(); } catch (e) {}
      }
    });
    obs.observe(target, { childList: true, subtree: true });
  }

  // d) Respaldo por si todo falla
  function attachFallback() {
    setTimeout(showPlayer, 4000);
  }

  // ===========================
  // 2) Sincronizar idioma (opcional)
  //    Si cambias un selector propio de idioma del transcript,
  //    se fuerza el track de captions correspondiente.
  // ===========================
  var VIDEO_ID = 'video1'; 
  var LANG_SEL = '#lang'; 

  function setCaptionsAndTranscriptLang(langCode) {
    var video = document.getElementById(VIDEO_ID);
    if (!video || !video.textTracks) return;

    for (var i = 0; i < video.textTracks.length; i++) {
      var tr = video.textTracks[i];
      var kind = tr.kind || '';
      var label = (tr.label || tr.language || '').toLowerCase();

      var isCaption = (kind === 'captions' || kind === 'subtitles');
      if (!isCaption) continue;

      if (label.startsWith(langCode.toLowerCase())) {
        tr.mode = 'showing';   
      } else {
        tr.mode = 'disabled'; 
      }
    }
  }

  function wireLanguageSelector() {
    var langSel = $(LANG_SEL);
    if (!langSel) return; 

    langSel.addEventListener('change', function (e) {
      setCaptionsAndTranscriptLang(e.target.value);
    });

    // Inicializa al valor actual del selector (si hay)
    setCaptionsAndTranscriptLang(langSel.value);
  }


  function init() {
    // Fade-in: intenta mostrar si ya está todo
    if (!checkNow()) {
      attachObserver();
      attachFallback();
    }
    // Idioma (opcional)
    wireLanguageSelector();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
