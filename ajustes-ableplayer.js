function adjustPanels() {
  var $player = $('#player');
  var $sign = $player.find('.able-sign-window');
  var $transcript = $player.find('.able-transcript-area');
  var signVisible = $sign.length && $sign.is(':visible');
  var transcriptVisible = $transcript.length && $transcript.is(':visible');

  // Ajustar top de transcript
  if (!signVisible && transcriptVisible) {
    $transcript.css('top', '0px');
  } else {
    $transcript.css('top', '34%');
  }

  // Ajustar ancho del player
  if (!signVisible && !transcriptVisible) {
    $player.css('width', '100%');
  } else {
    $player.css('width', '70%');
  }
}

$(document).on('ableplayer', function () {
  setTimeout(adjustPanels, 350);
  // Reajustar cuando se muestra/oculta paneles
  $(document).on('click', '.able-toolbar button', function () {
    setTimeout(adjustPanels, 200);
  });
});
