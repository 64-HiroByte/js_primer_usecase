console.log('index.js: loaded');

// CSSセレクタを使ってDOMツリー中のh2要素を取得する
const heading = document.querySelector('h2');

// h2要素に含まれるテキストコンテンツを取得する
const headingText = heading.textContent;

// button要素を作成する
const button = document.createElement('button');
button.textContent = 'Push Me';

// body要素の子要素としてbuttonを挿入する
document.body.appendChild(button);

const userID = 'js-primer-example';
fetch(`https://api.github.com/users/${encodeURIComponent(userID)}`)
  .then(response => {
    console.log(response.status);
    return response.json().then(userInfo => {
      // JSONパースされたオブジェクトが渡される
      console.log(userInfo);
    });
  });
