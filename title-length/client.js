/* global TrelloPowerUp, TrelloHelpers */

// Defaults — used when the board hasn't saved custom thresholds via the
// Power-Up's gear icon. Edit the live values from the settings popup, not here.
var DEFAULTS = { yellow: 155, red: 200 };
var STORAGE_KEY = 'thresholds';

function getThresholds(t) {
  return TrelloHelpers.getBoardSetting(t, STORAGE_KEY, DEFAULTS);
}

function getLengthBadge(cardName, thresholds) {
  var len = cardName ? cardName.length : 0;

  if (len > thresholds.red) {
    return { text: '⚠ ' + len + ' chars', color: 'red' };
  }
  if (len > thresholds.yellow) {
    return { text: len + ' chars', color: 'yellow' };
  }
  return null;
}

TrelloPowerUp.initialize({
  'card-badges': function (t, opts) {
    return Promise.all([
      TrelloHelpers.getCardName(t),
      getThresholds(t)
    ]).then(function (results) {
      var badge = getLengthBadge(results[0], results[1]);
      return badge ? [badge] : [];
    });
  },

  'card-detail-badges': function (t, opts) {
    return Promise.all([
      TrelloHelpers.getCardName(t),
      getThresholds(t)
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
      height: 260
    });
  }
});
