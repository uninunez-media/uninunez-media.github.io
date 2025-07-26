function adjustPanels() {
  var $player = $('#player');
  var $wrapper = $('#wrapper');
  var $sign = $player.find('.able-sign-window');
  var $transcript = $player.find('.able-transcript-area');
  var signVisible = $sign.length && $sign.is(':visible');
  var transcriptVisible = $transcript.length && $transcript.is(':visible');

  // Ajustar ancho de #player según visibilidad de .able-sign-window
  if (signVisible) {
    $player.css('width', '60%');
  } else {
    $player.css('width', '100%');
  }

  // Ajustar top de transcript
  if (!signVisible && transcriptVisible) {
    $transcript.css('top', '0px');
  } else {
    $transcript.css('top', '34%');
  }

}

$(document).on('ableplayer', function () {
  setInter(adjustPanels, 350);
  // Reajustar cuando se muestra/oculta paneles
  $(document).on('click', '.able-toolbar button', function () {
    setTimeout(adjustPanels, 200);
  });
});
