// TODO: テスト実装は後で追加
import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();

tester.run("kanji-needs-ruby", rule, {
  valid: [
    // ルビが必要な漢字にルビが付いている例
    "これは<ruby>漢字<rt>かんじ</rt></ruby>です。",
    "- リストでも<ruby>検出<rt>検出</rt></ruby>します。",
    "ルビ<ruby>非対応<rp>(</rp><rt>ひたいおう</rt><rp>)</rp></ruby>ビューアーもいけます。",
  ],
  invalid: [
    {
      // ルビが必要な漢字にルビが付いていない例
      text: "これは漢字です。",
      errors: [
        {
          message: "「漢」にルビを振ってください",
        },
        {
          message: "「字」にルビを振ってください",
        },
      ],
    },
  ],
});
