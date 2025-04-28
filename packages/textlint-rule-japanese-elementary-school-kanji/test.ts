import TextLintTester from "textlint-tester";
import rule from "./index";

const tester = new TextLintTester();

tester.run("japanese-elementary-school-kanji", rule, {
  valid: ["今日はいい天気です。", "私は学生です。"],
  invalid: [
    {
      // すべて小学生で習う範囲外の漢字
      text: "彼は優秀です。",
      errors: [
        { message: "「彼」は小学校で習わない漢字です。" },
        { message: "「優」は小学校で習わない漢字です。" },
        { message: "「秀」は小学校で習わない漢字です。" },
      ],
    },
  ],
});
