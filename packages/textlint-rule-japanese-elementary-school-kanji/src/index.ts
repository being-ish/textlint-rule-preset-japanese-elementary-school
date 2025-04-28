/**
 * textlint rule: japanese-elementary-school-kanji
 * 小学校で習う漢字のみが使われているかどうかをチェックする
 */

import kanjisJson from "../kanjis.json";
import type { TextlintRuleModule } from "@textlint/types";

const kanjis = new Set<string>(Object.values(kanjisJson).flat());

const rule: TextlintRuleModule = (context) => {
  const { Syntax, getSource, RuleError, report } = context;
  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      // Unicode mode regex to find all kanji characters
      const kanjiRegex = /\p{Script=Han}/gu;
      let match: RegExpExecArray | null;
      while ((match = kanjiRegex.exec(text)) !== null) {
        const char = match[0];
        if (!kanjis.has(char)) {
          report(
            node,
            new RuleError(`「${char}」は小学校で習わない漢字です。`, {
              index: match.index,
            })
          );
        }
      }
    },
  };
};

export default rule;
