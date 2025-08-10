// `node:util` モジュールを utilオブジェクトとしてインポートする

import * as util from 'node:util';

// コマンドライン引数を parseArgs 関数でパースする
const {
  values,
  positionals
} = util.parseArgs({
  // オプションやフラグ以外の引数を渡すことを許可する
  allowPositionals: true
});
// console.log(values);  // オプションやフラグを含むオブジェクト
// console.log(positionals);  // フラグ以外の引数の配列

const filePath = positionals[0];
console.log(filePath);

