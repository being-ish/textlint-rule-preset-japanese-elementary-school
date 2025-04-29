const moduleInterop = require("@textlint/module-interop");

module.exports = {
  rules: {
    "japanese-elementary-school-kanji": moduleInterop.require(
      "textlint-rule-japanese-elementary-school-kanji"
    ),
    "kanji-needs-ruby": moduleInterop.require("textlint-rule-kanji-needs-ruby"),
  },
};
