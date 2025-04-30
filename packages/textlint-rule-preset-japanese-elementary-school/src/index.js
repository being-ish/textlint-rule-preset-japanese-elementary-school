"use strict";

const { moduleInterop } = require("@textlint/module-interop");

module.exports = {
  rules: {
    "japanese-elementary-school-kanji": moduleInterop(
      require("@being-ish/textlint-rule-japanese-elementary-school-kanji")
    ),
    "kanji-needs-ruby": moduleInterop(
      require("@being-ish/textlint-rule-kanji-needs-ruby")
    ),
  },
  rulesConfig: {
    "japanese-elementary-school-kanji": true,
    "kanji-needs-ruby": true,
  },
};
