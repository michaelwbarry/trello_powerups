/* global TrelloPowerUp, TrelloHelpers */

// Defaults — used when the board hasn't saved custom config via the
// Power-Up's gear icon. Edit the live values from the settings popup, not here.
//
// Stored shape under STORAGE_KEY:
//   {
//     warnThreshold:  Number,
//     warnColor:      String|null,  // one of Trello's badge colors, or null for no color
//     alertThreshold: Number,
//     alertColor:     String|null
//   }
//
// Legacy shape (pre-customizable-colors): { yellow: Number, red: Number }
// — readConfig() translates this into the new shape transparently. Boards
// with legacy data keep working until someone saves from the settings popup,
// at which point the new shape is written and the legacy keys disappear.
var DEFAULTS = {
  warnThreshold: 155,
  warnColor: 'yellow',
  alertThreshold: 200,
  alertColor: 'red'
};
var STORAGE_KEY = 'thresholds';

function readConfig(t) {
  return t.get('board', 'shared', STORAGE_KEY).then(function (saved) {
    var cfg = {
      warnThreshold: DEFAULTS.warnThreshold,
      warnColor: DEFAULTS.warnColor,
      alertThreshold: DEFAULTS.alertThreshold,
      alertColor: DEFAULTS.alertColor
    };
    if (saved && typeof saved === 'object') {
      // Legacy shape — { yellow: N, red: N } — only thresholds, colors stay default.
      if (typeof saved.yellow === 'number') cfg.warnThreshold = saved.yellow;
      if (typeof saved.red === 'number') cfg.alertThreshold = saved.red;
      // New shape — overrides legacy if both happen to be present.
      if (typeof saved.warnThreshold === 'number') cfg.warnThreshold = saved.warnThreshold;
      if (typeof saved.alertThreshold === 'number') cfg.alertThreshold = saved.alertThreshold;
      // Colors: explicit null is a valid stored value (= "no color"), so check
      // for the key's presence rather than truthiness.
      if (Object.prototype.hasOwnProperty.call(saved, 'warnColor')) cfg.warnColor = saved.warnColor;
      if (Object.prototype.hasOwnProperty.call(saved, 'alertColor')) cfg.alertColor = saved.alertColor;
    }
    return cfg;
  });
}

function getLengthBadge(cardName, cfg) {
  var len = cardName ? cardName.length : 0;

  if (len > cfg.alertThreshold) {
    return { text: '⚠ ' + len + ' chars', color: cfg.alertColor };
  }
  if (len > cfg.warnThreshold) {
    return { text: len + ' chars', color: cfg.warnColor };
  }
  return null;
}

TrelloPowerUp.initialize({
  'card-badges': function (t, opts) {
    return Promise.all([
      TrelloHelpers.getCardName(t),
      readConfig(t)
    ]).then(function (results) {
      var badge = getLengthBadge(results[0], results[1]);
      return badge ? [badge] : [];
    });
  },

  'card-detail-badges': function (t, opts) {
    return Promise.all([
      TrelloHelpers.getCardName(t),
      readConfig(t)
    ]).then(function (results) {
      var badge = getLengthBadge(results[0], results[1]);
      if (!badge) return [];
      return [{
        title: 'Title Length',
        text: badge.text,
        color: badge.color
      }];
    });
  },

  'show-settings': function (t, opts) {
    return t.popup({
      title: 'Title Length Settings',
      url: './settings.html',
      height: 380
    });
  }
});
