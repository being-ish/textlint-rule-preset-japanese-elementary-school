/**
 * textlint rule: japanese-elementary-school-kanji
 * 小学校で習う漢字のみが使われているかどうかをチェックする
 */

// 教育漢字リスト（例: ここでは一部のみ。実際は全リストを用意してください）
const kyoikuKanji = new Set<string>([
  "一",
  "右",
  "雨",
  "円",
  "王",
  "音",
  "下",
  "火",
  "花",
  "貝",
  "学",
  "気",
  "九",
  "休",
  "玉",
  "金",
  "空",
  "月",
  "犬",
  "見",
  "五",
  "口",
  "校",
  "左",
  "三",
  "山",
  "子",
  "四",
  "糸",
  "字",
  "耳",
  "七",
  "車",
  "手",
  "十",
  "出",
  "女",
  "小",
  "上",
  "森",
  "人",
  "水",
  "正",
  "生",
  "青",
  "夕",
  "石",
  "赤",
  "千",
  "川",
  "先",
  "早",
  "草",
  "足",
  "村",
  "大",
  "男",
  "竹",
  "中",
  "虫",
  "町",
  "天",
  "田",
  "土",
  "二",
  "日",
  "入",
  "年",
  "白",
  "八",
  "百",
  "文",
  "木",
  "本",
  "名",
  "目",
  "立",
  "力",
  "林",
  "六",
  "今",
  "私",
  // ...（省略: 実際は全1026字をここに記載）
]);

import type { TextlintRuleModule } from "@textlint/types";

const rule: TextlintRuleModule = (context) => {
  const { Syntax, getSource, RuleError, report } = context;
  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      // 漢字のUnicode範囲
      const kanjiRegex = /[一-龯々]/g;
      let match: RegExpExecArray | null;
      while ((match = kanjiRegex.exec(text)) !== null) {
        const char = match[0];
        if (!kyoikuKanji.has(char)) {
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
