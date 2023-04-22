class TodoManager {
  constructor() {
    this.form = document.querySelector('#form');
    this.addFormInput = document.querySelector('.form__input');
    this.incompleteTodosList = document.querySelector(
      '.todo-list__incompleted'
    );
    this.completedTodosList = document.querySelector('.todo-list__completed');
    this.todoLists = document.querySelectorAll('.todo-list');
  }

  run() {
    this.todoLists.forEach((list) => {
      list.addEventListener('click', this.onDeletedTodo.bind(this));
      list.addEventListener('click', this.onChangeStatusCompleted.bind(this));
      list.addEventListener('click', this.onEditTodo.bind(this));
    });
    this.form.addEventListener('submit', this.onSubmitForm.bind(this));
  }

  createCheckBox() {
    const result = document.createElement('input');
    result.classList.add('item__radio-input');
    result.type = 'checkbox';
    return result;
  }

  createListItem() {
    let result = document.createElement('li');
    result.classList.add('todo__item', 'row-wrapper');
    return result;
  }

  createLabel(todoString) {
    const result = document.createElement('label');
    result.innerText = todoString;
    result.classList.add('item__label');
    return result;
  }

  createEditInput() {
    const result = document.createElement('input');
    result.classList.add('item__text-input');
    result.type = 'text';
    return result;
  }

  createEditButton() {
    const result = document.createElement('button');
    result.innerText = 'Edit';
    result.classList.add('button', 'button__edit');
    return result;
  }

  createDeleteButton() {
    const result = document.createElement('button');
    result.classList.add('button', 'button__delete');
    result.appendChild(this.createDeleteButtonImg());
    return result;
  }

  createDeleteButtonImg() {
    const result = document.createElement('img');
    result.classList.add('button__delete__img');
    result.src = './remove.svg';
    result.alt = 'Delete button';
    return result;
  }

  createNewTodoElement(todoString) {
    const listItem = this.createListItem();

    listItem.appendChild(this.createCheckBox());
    listItem.appendChild(this.createLabel(todoString));
    listItem.appendChild(this.createEditInput());
    listItem.appendChild(this.createEditButton());
    listItem.appendChild(this.createDeleteButton());

    return listItem;
  }

  onSubmitForm(e) {
    e.preventDefault();
    if (!this.addFormInput.value) return;
    let listItem = this.createNewTodoElement(this.addFormInput.value.trim());

    this.incompleteTodosList.append(listItem);
    this.addFormInput.value = '';
  }

  onDeletedTodo(e) {
    const target = e.target;
    if (
      target.classList.contains('button__delete') ||
      target.closest('.button__delete')
    ) {
      const listItem = target.closest('.todo__item');
      listItem.remove();
    }
  }

  onChangeStatusCompleted(e) {
    if (e.target.classList.contains('item__radio-input')) {
      let listItem = e.target.closest('.todo__item');

      if (e.target.checked) {
        this.completedTodosList.append(listItem);
      } else {
        this.incompleteTodosList.append(listItem);
      }
    }
  }

  onEditTodo(e) {
    if (e.target.classList.contains('button__edit')) {
      let listItemEdit = e.target.closest('.todo__item');
      let label = listItemEdit.querySelector('.item__label');
      let editInput = listItemEdit.querySelector('.item__text-input');
      let editButton = e.target;

      if (!listItemEdit.classList.contains('edit-mode')) {
        editButton.innerText = 'Save';
        editInput.value = label.innerText;
      } else {
        label.innerText = editInput.value;
        editButton.innerText = 'Edit';
      }
      listItemEdit.classList.toggle('edit-mode');
    }
  }
}

let todoManager = new TodoManager();

todoManager.run();
