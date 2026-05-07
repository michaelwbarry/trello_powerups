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
    }
  };

  global.TrelloHelpers = TrelloHelpers;
})(window);
