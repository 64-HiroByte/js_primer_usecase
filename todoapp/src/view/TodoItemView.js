import { element } from "./html-util";

export class TodoItemView {
	/**
	 * `todoItemModel` に対応するTodoアイテムのHTML要素を作成して返す
	 * @param {TodoItemModel} todoItem
	 * @param {function({id:number, completed:boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
	 * @param {function({id: number})} onDeleteTodo 削除ボタンのクリックイベントリスナー
	 * @returns {element}
	 */
	createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
		const todoItemElement = todoItem.completed
			? element`<li><input type="checkbox" class="checkbox" checked>
				<s>${item.title}</s>
				<button class='delete'>X</button>
			</li>`
			: element`<li><input type="checkbox" class="checkbox" >
				${item.title}
				<button class='delete'>X</button>
			</li>`;
			const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
			inputCheckboxElement.addEventListener('change', () => {
				// コールバック関数に変更
				onUpdateTodo({
					id: todoItem.id,
					completed: !todoItem.completed
				});
			});
			const deleteButtonElement = todoItemElement.querySelector.querySelector('.delete');
			deleteButtonElement.addEventListener('click', () => {
				// コールバック関数に変更
				onDeleteTodo({
					id: todoItem.id
				});
			});
		// 作成したTodoアイテムのHTML要素を返す
		return todoItemElement;
	}
}