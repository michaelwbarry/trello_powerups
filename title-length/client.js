/* global TrelloPowerUp, TrelloHelpers */

// Thresholds — adjust these if you want different cutoffs.
var YELLOW_THRESHOLD = 90;   // titles longer than this get a yellow badge
var RED_THRESHOLD = 130;     // titles longer than this get a red badge

function getLengthBadge(cardName) {
  var len = cardName ? cardName.length : 0;

  if (len > RED_THRESHOLD) {
    return { text: '⚠ ' + len + ' chars', color: 'red' };
  }
  if (len > YELLOW_THRESHOLD) {
    return { text: len + ' chars', color: 'yellow' };
  }
  return null;
}

TrelloPowerUp.initialize({
  'card-badges': function (t, opts) {
    return TrelloHelpers.getCardName(t).then(function (cardName) {
      var badge = getLengthBadge(cardName);
      return badge ? [badge] : [];
    });
  },

  'card-detail-badges': function (t, opts) {
    return TrelloHelpers.getCardName(t).then(function (cardName) {
      var badge = getLengthBadge(cardName);
      if (!badge) return [];
      return [{
        title: 'Title Length',
        text: badge.text,
        color: badge.color
      }];
    });
  }
});
