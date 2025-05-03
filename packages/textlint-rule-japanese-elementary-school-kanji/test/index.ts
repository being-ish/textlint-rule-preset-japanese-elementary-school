import TextLintTester from "textlint-tester";
import rule from "../src";

const tester = new TextLintTester();

tester.run("japanese-elementary-school-kanji", rule, {
  valid: [
    "今日はいい天気です。",
    "私は良い学生です。",
    {
      text: "一年生では、かんたんなかん字をならいます。",
      options: { maxGrade: 1 },
    },
  ],
  invalid: [
    {
      // 「彼」と「秀」は小学生で習う範囲外の漢字
      text: "彼は優秀です。",
      errors: [
        { message: "「彼」は小学校 6 年生までに習わない漢字です。" },
        { message: "「秀」は小学校 6 年生までに習わない漢字です。" },
      ],
    },
    {
      text: "一年生では、簡単な漢字を習います。",
      options: {
        maxGrade: 1,
      },
      errors: [
        {
          message: "「簡」は小学校 1 年生までに習わない漢字です。",
        },
        {
          message: "「単」は小学校 1 年生までに習わない漢字です。",
        },
        {
          message: "「漢」は小学校 1 年生までに習わない漢字です。",
        },
        {
          message: "「習」は小学校 1 年生までに習わない漢字です。",
        },
      ],
    },
    {
      text: "これは三年生で習わない漢字が含まれています。",
      options: {
        maxGrade: 3,
      },
      errors: [
        {
          message: "「含」は小学校 3 年生までに習わない漢字です。",
        },
      ],
    },
  ],
});
