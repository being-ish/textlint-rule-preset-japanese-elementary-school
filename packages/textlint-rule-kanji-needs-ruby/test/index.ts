// TODO: テスト実装は後で追加
import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();

tester.run("kanji-needs-ruby", rule, {
  valid: [
    "これは<ruby>漢字<rt>かんじ</rt></ruby>です。",
    "これは<ruby>漢字<rt>**かんじ**</rt></ruby>です。",
    "ルビ<ruby>非対応<rp>(</rp><rt>ひたいおう</rt><rp>)</rp></ruby>ビューアーもいけます。",
    "- リストでも<ruby>検出<rt>検出</rt></ruby>します。",
    "# <ruby>見出<rt>みだ</rt>し</ruby>も OK 。",
    `| <ruby>表<rt>ひょう</rt></ruby> |
|---|
| テーブルにも<ruby>対応<rt>たいおう</rt></ruby> |`,
    "<ruby>`漢字`<rt>`かんじ`</rt></ruby>はコードですがルビが<ruby>必要<rt>ひつよう</rt></ruby>です。",
  ],
  invalid: [
    {
      text: "これは漢字です。",
      errors: [
        {
          message: "「これは漢字です。」にルビを振ってください",
        },
      ],
    },
    {
      // rt 要素がない ruby 要素の場合
      text: "これは<ruby>漢字</ruby>です。",
      errors: [
        {
          message: "「漢字」にルビを振ってください",
        },
      ],
    },
    {
      // rt 要素が空の ruby 要素の場合
      text: "これは<ruby>漢字<rt></rt></ruby>です。",
      errors: [
        {
          message: "「漢字」にルビを振ってください",
        },
      ],
    },
  ],
});
