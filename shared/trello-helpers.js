/* global TrelloPowerUp */
/*
 * TrelloHelpers — shared utilities for the trello-powerups library.
 * Loaded by each Power-Up's index.html via <script src="../shared/trello-helpers.js">.
 * Attaches to window.TrelloHelpers.
 */
(function (global) {
  'use strict';

  var TrelloHelpers = {
    /**
     * Get the current card's name.
     * @param {object} t - the Trello iframe context
     * @returns {Promise<string>}
     */
    getCardName: function (t) {
      return t.card('name').get('name');
    },

    /**
     * Get a set of fields off the current card in one call.
     * @param {object} t
     * @param {string[]} fields - e.g. ['name', 'desc', 'due']
     * @returns {Promise<object>}
     */
    getCardFields: function (t, fields) {
      return t.card.apply(t, fields);
    },

    /**
     * Build a badge object with sensible defaults.
     * @param {string} text
     * @param {string} [color] - one of: green, yellow, orange, red, purple, blue, sky, lime, pink, black, null
     * @param {string} [icon]
     * @returns {object}
     */
    badge: function (text, color, icon) {
      var b = { text: text };
      if (color) b.color = color;
      if (icon) b.icon = icon;
      return b;
    },

    /**
     * Read a board-shared setting, merged onto a defaults object.
     * Treats missing/empty stored values as "use defaults".
     * @param {object} t - the Trello iframe context
     * @param {string} key
     * @param {object} defaults - shape and default values for the setting
     * @returns {Promise<object>}
     */
    getBoardSetting: function (t, key, defaults) {
      return t.get('board', 'shared', key).then(function (saved) {
        var merged = {};
        var k;
        for (k in defaults) {
          if (Object.prototype.hasOwnProperty.call(defaults, k)) merged[k] = defaults[k];
        }
        if (saved && typeof saved === 'object') {
          for (k in saved) {
            if (Object.prototype.hasOwnProperty.call(saved, k)) merged[k] = saved[k];
          }
        }
        return merged;
      });
    },

    /**
     * Save a board-shared setting (visible to all members of the board).
     * @param {object} t
     * @param {string} key
     * @param {*} value
     * @returns {Promise<void>}
     */
    setBoardSetting: function (t, key, value) {
      return t.set('board', 'shared', key, value);
    },

    /**
     * Remove a board-shared setting so the defaults take over again.
     * @param {object} t
     * @param {string} key
     * @returns {Promise<void>}
     */
    removeBoardSetting: function (t, key) {
      return t.remove('board', 'shared', key);
    }
  };

  global.TrelloHelpers = TrelloHelpers;
})(window);
