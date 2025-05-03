# @being-ish/textlint-rule-preset-japanese-elementary-school

小学生が読みやすい文章かどうかをチェックするルールプリセット

## ターゲット

実際のターゲットは小学校 3 年生以降です。

小学校 2 年生まででひらがな、カタカナ、基礎的な語彙や文法を習得するため、それまでは文章を読むのが難しいためです。

## ルール詳細

- [小学校 6 年生までに習う漢字のみ使用可能](/packages/textlint-rule-japanese-elementary-school-kanji/)
- [漢字にはルビが必須](/packages/textlint-rule-kanji-needs-ruby/)
- [1 文の長さはルビを含めて 80 文字以内](https://github.com/textlint-rule/textlint-rule-sentence-length)
  - ルビは読み部分も含めてカウントされる
    - `<ruby>漢字<rt>かんじ</rt></ruby>` -> 漢字かんじ として長さチェックが走る
- [二重否定を使わない](https://github.com/textlint-ja/textlint-rule-no-double-negative-ja)

## 使用方法

次のコマンドでインストールします。

```sh
npm install --save-dev @being-ish/textlint-rule-preset-japanese-elementary-school
```

textlint の設定ファイルに次の指定を追加します。

```json:.textlintrc
{
  "rules": {
    "@being-ish/preset-japanese-elementary-school": true
  }
}
```
