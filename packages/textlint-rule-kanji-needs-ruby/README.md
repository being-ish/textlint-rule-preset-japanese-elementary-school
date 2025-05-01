# @being-ish/textlint-rule-kanji-needs-ruby

漢字にルビが振られているかチェックするルール

## チェック内容

ルビは HTML の [`ruby`](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/ruby) 要素で振ることを前提としています。
また、 ruby 要素の子として [`rt`](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/rt) 要素がなければ意味がないため、 `rt` 要素を持たない `ruby` 要素はエラーとなります。

## 使用方法

次のコマンドでインストールします。

```sh
npm install --save-dev @being-ish/textlint-rule-kanji-needs-ruby
```

textlint の設定ファイルに次の指定を追加します。

```json:.textlintrc
{
  "rules": {
    "@being-ish/kanji-needs-ruby": true
  }
}
```

## 正しい書き方

```
<ruby>漢字<rt>かんじ</rt></ruby>
```

## 間違った書き方

```
漢字
```

ルビが振られていません。

```
<ruby>漢字</ruby>
```

`rt` 要素がないため、有効なルビではありません。
