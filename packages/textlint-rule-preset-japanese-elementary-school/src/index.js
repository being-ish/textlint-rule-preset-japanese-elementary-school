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
    "sentence-length": moduleInterop(require("textlint-rule-sentence-length")),
    "no-double-negative-ja": moduleInterop(
      require("textlint-rule-no-double-negative-ja")
    ),
    "no-mix-dearu-desumasu": moduleInterop(
      require("textlint-rule-no-mix-dearu-desumasu")
    ),
    "no-doubled-joshi": moduleInterop(
      require("textlint-rule-no-doubled-joshi")
    ),
  },
  rulesConfig: {
    "japanese-elementary-school-kanji": true,
    "kanji-needs-ruby": true,
    "sentence-length": {
      /*
        小学校 3 年生レベルだと 1 文 60 文字ていどが良いらしいが、ルビ込みの文字数でカウントされてしまうので、少し長めに設定

        textlint-rule-sentence-length ルールが textlint-util-to-string を使って HTML タグを除外したうえでチェックしているため skipPatterns でのルビ除外はできない模様
        https://github.com/textlint/textlint-util-to-string

        「<ruby>漢字<rt>かんじ</rt></ruby>」が「漢字かんじ」として扱われ、長さチェックされる
      */
      max: 80,
      countBy: "codepoints",
    },
    "no-double-negative-ja": true,
    "no-mix-dearu-desumasu": {
      strict: true,
    },
    "no-doubled-joshi": true,
  },
};
