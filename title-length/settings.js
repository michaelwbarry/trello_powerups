/* global TrelloPowerUp, TrelloHelpers */

// Keep DEFAULTS, STORAGE_KEY, and the stored-shape contract in sync with client.js.
var DEFAULTS = {
  warnThreshold: 155,
  warnColor: 'yellow',
  alertThreshold: 200,
  alertColor: 'red'
};
var STORAGE_KEY = 'thresholds';

// Trello's badge color palette. Order matches the docs at
// https://developer.atlassian.com/cloud/trello/power-ups/capabilities/card-badges/
// The empty-string option maps to a stored value of `null` ("no color").
var COLOR_OPTIONS = [
  { value: '',           label: 'None' },
  { value: 'blue',       label: 'Blue' },
  { value: 'green',      label: 'Green' },
  { value: 'orange',     label: 'Orange' },
  { value: 'red',        label: 'Red' },
  { value: 'yellow',     label: 'Yellow' },
  { value: 'purple',     label: 'Purple' },
  { value: 'pink',       label: 'Pink' },
  { value: 'sky',        label: 'Sky' },
  { value: 'lime',       label: 'Lime' },
  { value: 'light-gray', label: 'Light gray' }
];
var VALID_COLORS = COLOR_OPTIONS.map(function (o) { return o.value === '' ? null : o.value; });

var t = TrelloPowerUp.iframe();

function $(id) { return document.getElementById(id); }

function showError(msg) {
  $('error').textContent = msg || '';
}

function populateColorSelect(selectEl) {
  COLOR_OPTIONS.forEach(function (opt) {
    var o = document.createElement('option');
    o.value = opt.value;
    o.textContent = opt.label;
    selectEl.appendChild(o);
  });
}

function selectValueToColor(v) {
  // Empty option means "no color" — stored as null.
  return v === '' ? null : v;
}

function colorToSelectValue(c) {
  return c === null || c === undefined ? '' : c;
}

function validate(cfg) {
  if (!Number.isInteger(cfg.warnThreshold) || !Number.isInteger(cfg.alertThreshold)) {
    return 'Both thresholds must be whole numbers.';
  }
  if (cfg.warnThreshold < 1 || cfg.alertThreshold < 1) {
    return 'Thresholds must be greater than zero.';
  }
  if (cfg.alertThreshold <= cfg.warnThreshold) {
    return 'Alert threshold must be greater than warn threshold.';
  }
  if (VALID_COLORS.indexOf(cfg.warnColor) === -1 || VALID_COLORS.indexOf(cfg.alertColor) === -1) {
    return 'Invalid color choice.';
  }
  return null;
}

// Read raw stored value and translate legacy shape ({yellow, red}) into the
// new shape. Mirrors readConfig() in client.js — keep them in sync.
function loadCurrent() {
  return t.get('board', 'shared', STORAGE_KEY).then(function (saved) {
    var cfg = {
      warnThreshold: DEFAULTS.warnThreshold,
      warnColor: DEFAULTS.warnColor,
      alertThreshold: DEFAULTS.alertThreshold,
      alertColor: DEFAULTS.alertColor
    };
    if (saved && typeof saved === 'object') {
      if (typeof saved.yellow === 'number') cfg.warnThreshold = saved.yellow;
      if (typeof saved.red === 'number') cfg.alertThreshold = saved.red;
      if (typeof saved.warnThreshold === 'number') cfg.warnThreshold = saved.warnThreshold;
      if (typeof saved.alertThreshold === 'number') cfg.alertThreshold = saved.alertThreshold;
      if (Object.prototype.hasOwnProperty.call(saved, 'warnColor')) cfg.warnColor = saved.warnColor;
      if (Object.prototype.hasOwnProperty.call(saved, 'alertColor')) cfg.alertColor = saved.alertColor;
    }
    $('warn-threshold').value = cfg.warnThreshold;
    $('alert-threshold').value = cfg.alertThreshold;
    $('warn-color').value = colorToSelectValue(cfg.warnColor);
    $('alert-color').value = colorToSelectValue(cfg.alertColor);
  });
}

function onSubmit(e) {
  e.preventDefault();
  var cfg = {
    warnThreshold: parseInt($('warn-threshold').value, 10),
    alertThreshold: parseInt($('alert-threshold').value, 10),
    warnColor: selectValueToColor($('warn-color').value),
    alertColor: selectValueToColor($('alert-color').value)
  };
  var err = validate(cfg);
  if (err) { showError(err); return; }
  showError('');
  // Always write the full new shape — this also "migrates" any legacy
  // {yellow, red} record by overwriting it.
  TrelloHelpers.setBoardSetting(t, STORAGE_KEY, cfg)
    .then(function () { return t.closePopup(); });
}

function onReset() {
  TrelloHelpers.removeBoardSetting(t, STORAGE_KEY)
    .then(function () { return t.closePopup(); });
}

document.addEventListener('DOMContentLoaded', function () {
  populateColorSelect($('warn-color'));
  populateColorSelect($('alert-color'));
  $('settings-form').addEventListener('submit', onSubmit);
  $('reset-btn').addEventListener('click', onReset);
  loadCurrent();
});
