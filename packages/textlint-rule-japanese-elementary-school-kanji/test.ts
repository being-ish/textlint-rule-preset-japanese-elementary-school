// textlint-rule-japanese-elementary-school-kanji/test.ts
import TextLintTester from "textlint-tester";
import rule from "./index";

const tester = new TextLintTester();

tester.run("japanese-elementary-school-kanji", rule, {
  valid: ["今日はいい天気です。", "私は学生です。"],
  invalid: [
    {
      text: "彼は優秀です。", // 「彼」「優」「秀」は教育漢字ではない
      errors: [
        { message: "「彼」は小学校で習わない漢字です。" },
        { message: "「優」は小学校で習わない漢字です。" },
        { message: "「秀」は小学校で習わない漢字です。" },
      ],
    },
  ],
});
