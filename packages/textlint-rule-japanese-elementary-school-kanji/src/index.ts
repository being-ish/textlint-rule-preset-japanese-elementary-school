import ELEMENTARY_SCHOOL_KANJIS from "../kanjis.json";
import type { TextlintRuleModule } from "@textlint/types";

type Options = {
  maxGrade?: 1 | 2 | 3 | 4 | 5 | 6;
};

const DEFAULT_OPTIONS: Readonly<Required<Options>> = {
  // デフォルトは小学生全学年
  maxGrade: 6,
} as const;

function isValidGrade(grade: unknown): grade is Options["maxGrade"] {
  return (
    typeof grade === "number" &&
    Number.isInteger(grade) &&
    grade >= 1 &&
    grade <= 6
  );
}

const rule: TextlintRuleModule<Options> = (context, options = {}) => {
  const { Syntax, getSource, RuleError, report } = context;
  const actualOptions = { ...DEFAULT_OPTIONS, ...options };
  const { maxGrade } = actualOptions;

  if (!isValidGrade(maxGrade)) {
    throw new Error(
      `maxGrade オプションには 1 〜 6 までの数値を指定してください: ${maxGrade}`
    );
  }

  const allowedKanjis = new Set(
    Object.values(ELEMENTARY_SCHOOL_KANJIS).slice(0, maxGrade).flat()
  );

  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      // Unicode mode regex to find all kanji characters
      const kanjiRegex = /\p{Script=Han}/gu;
      let match: RegExpExecArray | null;
      while ((match = kanjiRegex.exec(text)) !== null) {
        const char = match[0];
        if (!allowedKanjis.has(char)) {
          report(
            node,
            new RuleError(
              `「${char}」は小学校 ${maxGrade} 年生までに習わない漢字です。`,
              {
                index: match.index,
              }
            )
          );
        }
      }
    },
  };
};

export default rule;
