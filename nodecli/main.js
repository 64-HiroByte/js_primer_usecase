// `node:util` モジュールを utilオブジェクトとしてインポートする
import * as util from 'node:util';

// 非同期APIを提供するfs/promisesモジュールを読み込む
import * as fs from 'node:fs/promises';

// md2htmlモジュールからmd2html関数をインポートする
import { md2html } from './md2html.js'


// コマンドライン引数を parseArgs 関数でパースする
const { 
  values,
  positionals
} = util.parseArgs({
  // オプションやフラグ以外の引数を渡すことを許可する
  allowPositionals: true,
  options: {
    // gfmフラグを定義する
    gfm: {
      // オプションの型をbooleanに指定
      type: 'boolean',
      // --gfmフラグがない場合のデフォルト値をfalseにする
      default: false,
    }
  }
});
// console.log(values);  // オプションやフラグを含むオブジェクト
// console.log(positionals);  // フラグ以外の引数の配列

const filePath = positionals[0];
// console.log(filePath);


fs.readFile(filePath, { encoding: 'utf8'}).then(file => {
  // MarkdownファイルをHTML文字列に変換する
  const html = md2html(file, {
    // gfmフラグのパース結果をオプションとして渡す
    gfm: values.gfm
  });
  console.log(html);
}).catch(err => {
  console.error(err.message);
  process.exit(1);
});
