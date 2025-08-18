import { render } from './view/html-util.js';
import { TodoListView } from './view/TodoListView.js';
import { TodoItemModel } from './model/TodoItemModel.js';
import { TodoListModel } from './model/TodoListModel.js';

export class App {
  #todoListView = new TodoListView();
  #todoListModel = new TodoListModel();

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed:false}));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{ id: number, completed: boolean}}
   */
  handleUpdate({ id, completed }) {
    this.#todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: nuber }}
   */
  handleDelete({ id }) {
    this.#todoListModel.deleteTodo({ id });
  }

  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');
    // TodoListModelの状態が更新されたら表示を更新する
    this.#todoListModel.onChange(() => {
      const todoItems = this.#todoListModel.getTodoItems();
      // const TodoListView = new TodoListView();
      // // todoItemsに対応するTodoListViewを作成する
      const todoListElement = this.#todoListView.createElement(todoItems, {
        // Todoアイテムが更新イベントを発生したときに呼ばれるリスナー関数
        onUpdateTodo: ({ id, completed }) => {
          // this.#todoListModel.updateTodo({ id, completed });
          this.handleUpdate({ id, completed });
        },
        // Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        }
      });
      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
    });

    // フォームを送信したら、新しいTodoItemModelを追加する
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
