import { TextlintRuleModule } from "@textlint/types";

// ルビ要素の範囲を取得
function getRubyRanges(text: string): [number, number][] {
  const ranges: [number, number][] = [];
  // <ruby>タグ全体を取得
  const rubyRegex = /<ruby>[\s\S]*?<\/ruby>/g;
  let match;
  while ((match = rubyRegex.exec(text)) !== null) {
    // <rt>要素が含まれている場合のみルビ範囲とみなす
    if (/<rt>[\s\S]*?<\/rt>/.test(match[0])) {
      ranges.push([match.index, match.index + match[0].length]);
    }
  }
  return ranges;
}

// その位置がルビ範囲内か判定
function isInRubyRanges(index: number, ranges: [number, number][]) {
  return ranges.some(([start, end]) => index >= start && index < end);
}

const rule: TextlintRuleModule = (context) => {
  const { Syntax, getSource, report, RuleError } = context;
  return {
    [Syntax.Paragraph](node) {
      const text = getSource(node);
      const rubyRanges = getRubyRanges(text);
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        // すべての漢字かつルビ範囲外
        if (/\p{Script=Han}/u.test(char) && !isInRubyRanges(i, rubyRanges)) {
          report(
            node,
            new RuleError(`「${char}」にルビを振ってください`, { index: i })
          );
        }
      }
    },
  };
};

export default rule;
