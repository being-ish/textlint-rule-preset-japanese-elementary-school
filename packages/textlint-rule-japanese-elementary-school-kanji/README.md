# @being-ish/textlint-rule-japanese-elementary-school-kanji

小学校で習う漢字のみが使われているかどうかをチェックするルール

## チェック内容

文部科学省の配当表に記載のない漢字が使われていたらエラーとする。

https://www.mext.go.jp/a_menu/shotou/new-cs/youryou/syo/koku/001.htm

## 使用方法

次のコマンドでインストールします。

```sh
npm install --save-dev @being-ish/textlint-rule-japanese-elementary-school-kanji
```

textlint の設定ファイルに次の指定を追加します。

```json:.textlintrc
{
  "rules": {
    "@being-ish/japanese-elementary-school-kanji": true
  }
}
```

### オプション

`maxGrade` で指定した学年までに習う漢字が使われているかどうかをチェックします。

次の設定例は小学校 3 年生までに習う漢字を OK とし、それ以外の漢字は NG とします。

```json:.textlintrc
{
  "rules": {
    "@being-ish/japanese-elementary-school-kanji": {
      "maxGrade": 3
    }
  }
}
```

## 正しい書き方

```
これは正しい書き方です。
```

## 間違った書き方

### オプションなしの場合

```
これは間違っている書き方です。
```

「違」は小学校で習う範囲に入っていません。

### オプションを指定した場合

オプションに `"maxGrade": 3` を指定したとき、次はエラーとなります。

```
これは三年生で習わない漢字が含まれています。
```
