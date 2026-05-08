/* global TrelloPowerUp, TrelloHelpers */

var DEFAULTS = { yellow: 155, red: 200 };
var STORAGE_KEY = 'thresholds';

var t = TrelloPowerUp.iframe();

function $(id) { return document.getElementById(id); }

function showError(msg) {
  $('error').textContent = msg || '';
}

function validate(yellow, red) {
  if (!Number.isInteger(yellow) || !Number.isInteger(red)) {
    return 'Both thresholds must be whole numbers.';
  }
  if (yellow < 1 || red < 1) {
    return 'Thresholds must be greater than zero.';
  }
  if (red <= yellow) {
    return 'Red threshold must be greater than yellow threshold.';
  }
  return null;
}

function loadCurrent() {
  return TrelloHelpers.getBoardSetting(t, STORAGE_KEY, DEFAULTS).then(function (cfg) {
    $('yellow').value = cfg.yellow;
    $('red').value = cfg.red;
  });
}

function onSubmit(e) {
  e.preventDefault();
  var yellow = parseInt($('yellow').value, 10);
  var red = parseInt($('red').value, 10);
  var err = validate(yellow, red);
  if (err) { showError(err); return; }
  showError('');
  TrelloHelpers.setBoardSetting(t, STORAGE_KEY, { yellow: yellow, red: red })
    .then(function () { return t.closePopup(); });
}

function onReset() {
  TrelloHelpers.removeBoardSetting(t, STORAGE_KEY)
    .then(function () { return t.closePopup(); });
}

document.addEventListener('DOMContentLoaded', function () {
  $('settings-form').addEventListener('submit', onSubmit);
  $('reset-btn').addEventListener('click', onReset);
  loadCurrent();
});
