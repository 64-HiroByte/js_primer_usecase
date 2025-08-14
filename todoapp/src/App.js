import { TodoItemModel } from './model/TodoItemModel.js';
import { TodoListModel } from './model/TodoListModel.js';
import { element, render } from './view/html-util.js';

export class App {
  // 1. TodoListModelの初期化
  #todoListModel = new TodoListModel();

  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');
    // 2.TodoListModelの状態が更新されたら表示を更新する
    this.#todoListModel.onChange(() => {
      // TodoリストをまとめるList要素
      const todoListElement = element`<ul></ul>`;
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#todoListModel.getTodoItems();
      todoItems.forEach(item => {
        // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
        // 削除ボタン（X）をそれぞれ追加する
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked>
            <s>${item.title}</s>
            <button class='delete'>X</button>
          </li>`
          : element`<li><input type="checkbox" class="checkbox" >
            ${item.title}
            <button class='delete'>X</button>
          </li>`;
        // チェックボックスがトグルしたときのイベントリスナー関数を登録
        const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
        inputCheckboxElement.addEventListener('change', () => {
          // 指定したTodoアイテムの完了状態を反転させる
          this.#todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed
          });
        });
        // 削除ボタン（X）がクリックされたときにTodoListModelからアイテムを削除する
        const deleteButtonElement = todoItemElement.querySelector('.delete');
        deleteButtonElement.addEventListener('click', () => {
          this.#todoListModel.deleteTodo({
            id: item.id
          });
        });
        todoListElement.appendChild(todoItemElement);
      });
      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
    });
    // 3. フォームを送信したら、新しいTodoItemModelを追加する
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      // 新しいTodoItemをTodoListへ追加する
      this.#todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
      inputElement.value = '';
    });
  }
}

// // 新しいTodoリストを作成する
// const todoListModel = new TodoListModel();
// // 現在のTodoアイテム数は0
// console.log(todoListModel.getTotalCount());
// // Todoリストが変更されたら呼ばれるイベントリスナーを登録する
// todoListModel.onChange(() => {
//   console.log('TodoListの状態が変わりました');
// });
// // 新しいTodoアイテムを追加する
// // => `onChange` で登録したイベントリスナーが呼び出される
// todoListModel.addTodo(new TodoItemModel({
//   title: '新しいTodoアイテム',
//   completed: false
// }));
// // Todoリストにアイテムが増える
// console,log(todoListModel.getTotalCount());  // => 1

// export class App {
//   // constructor() {
//   //   console.log('App initialized');
//   // }
//   mount() {
//     const formElement = document.querySelector('#js-form');
//     const inputElement =  document.querySelector('#js-form-input');
//     const containerElement = document.querySelector('#js-todo-list');
//     const todoItemCountElement = document.querySelector('#js-todo-count');
//     // TodoリストをまとめるList要素
//     const todoListElement = element`<ul></ul>`;
//     // Todoアイテム数
//     let todoItemCount = 0;

//     formElement.addEventListener('submit', (event) => {
//       // console.log(`入力欄の値: ${inputElement.value}`);

//       // submitイベントの本来の動作を止める
//       event.preventDefault();

//       // 追加するTodoアイテムの要素(li要素）を作成する
//       const todoItemElement = element`<li>${inputElement.value}</li>`;
//       // TodoアイテムをtodoListElementに追加する
//       todoListElement.appendChild(todoItemElement);
//       // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
//       render(todoListElement, containerElement);
//       // Todoアイテムを+1し、表示されてるテキストを更新する
//       todoItemCount += 1;
//       todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
//       // 入力欄を空文字列にしてリセットする
//       inputElement.value = '';
//     });
//   }
// }
