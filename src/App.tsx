/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusTodo, setStatusTodo] = useState('all');

  const hasCompletedTodos = todos.some(
    todoCompleted => todoCompleted.completed,
  );

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todoV =>
        todoV.id === id ? { ...todoV, completed: !todoV.completed } : todoV,
      ),
    );
  };

  const filteredTodos = todos.filter(todo => {
    return (
      statusTodo === 'all' ||
      (statusTodo === 'active' && !todo.completed) ||
      (statusTodo === 'completed' && todo.completed)
    );
  });

  const activeTodos = todos.filter(todo => !todo.completed);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/*this button should have `active` class only if all todos are completed*/}
          {/*ця кнопка повинна мати клас `active`, лише якщо всі завдання виконано*/}
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames(
                !hasCompletedTodos
                  ? 'todoapp__toggle-all'
                  : 'todoapp__toggle-all active',
              )}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          {/* Додати завдання під час надсилання форми */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={classNames('todo', { completed: todo.completed })}
            >
              {/*This is a completed todo*/}
              {/*Це виконане завдання*/}
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
              </label>
              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              {/*  /!* Remove button appears only on hover *!/*/}
              {/*  /!* Кнопка «Видалити» відображається лише наведенням курсора *!/*/}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/*  /!* overlay will cover the todo while it is being deleted or updated *!/*/}
              {/*  /!* накладання перекриватиме завдання під час його видалення або оновлення *!/*/}
              <div data-cy="TodoLoader" className="modal owerlay">
                <div className="modal-background has-background-white-ter">
                  <div className="loader" />
                </div>
              </div>

              {/* This todo is an active todo */}
              {/* Це завдання є активним */}
              {/*<div data-cy="Todo" className="todo">*/}
              {/*  <label className="todo__status-label">*/}
              {/*    <input*/}
              {/*      data-cy="TodoStatus"*/}
              {/*      type="checkbox"*/}
              {/*      className="todo__status"*/}
              {/*    />*/}
              {/*  </label>*/}
              {/*</div>*/}

              {/*<span data-cy="TodoTitle" className="todo__title">*/}
              {/*  {todo.title}*/}
              {/*</span>*/}
              {/*<button*/}
              {/*  type="button"*/}
              {/*  className="todo__remove"*/}
              {/*  data-cy="TodoDelete"*/}
              {/*>*/}
              {/*  ×*/}
              {/*</button>*/}
              {/*<div data-cy="TodoLoader" className="modal overlay">*/}
              {/*  <div className="modal-background has-background-white-ter">*/}
              {/*    <div className="loader" />*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/* This todo is being edited */}
              {/* Це завдання редагується */}
              {/*<div data-cy="Todo" className="todo__status-label">*/}
              {/*  <label className="todo__status-label">*/}
              {/*    <input*/}
              {/*      data-cy="TodoStstus"*/}
              {/*      type="checkbox"*/}
              {/*      className="todo__status"*/}
              {/*    />*/}
              {/*  </label>*/}
              {/*</div>*/}

              {/* This form is shown instead of the title and remove button */}
              {/* Ця форма відображається замість заголовка та кнопки «Видалити» */}
              {/*<form>*/}
              {/*  <input*/}
              {/*    data-cy="TodoTitleField"*/}
              {/*    type="text"*/}
              {/*    className="todo__title-field"*/}
              {/*    placeholder="Empty todo will be deleted"*/}
              {/*    value="Todo is bein edited now"*/}
              {/*  />*/}
              {/*</form>*/}

              {/*<div data-cy="TodoLoader" className="modal overlay">*/}
              {/*  <div className="modal-background has-background-white-ter">*/}
              {/*    <div className="loader" />*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/* This todo is in loadind state */}
              {/* Це завдання завантажується */}
              {/*<div data-cy="Todo" className="todo">*/}
              {/*  <label className="todo__status-label">*/}
              {/*    <input*/}
              {/*      data-cy="TodoStatus"*/}
              {/*      type="checkbox"*/}
              {/*      className="todo__status"*/}
              {/*    />*/}
              {/*  </label>*/}

              {/*  <span data-cy="TodoTitle" className="todo__title">*/}
              {/*    {todo.completed}*/}
              {/*  </span>*/}

              {/*  <button*/}
              {/*    type="button"*/}
              {/*    className="todo__remove"*/}
              {/*    data-cy="TodoDelete"*/}
              {/*  >*/}
              {/*    ×*/}
              {/*  </button>*/}

              {/*  /!*  /!* 'is-active' class puts this modal on top of the todo *!/*!/*/}
              {/*  /!*  /!* Клас 'is-active' розміщує це модальне вікно поверх списку завдань *!/*!/*/}
              {/*  <div data-cy="TodoLoader" className="modal overlay is-active">*/}
              {/*    <div className="modal-background has-background-white-ter" />*/}
              {/*    <div className="loader" />*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {/* Приховати нижній колонтитул, якщо немає завдань */}
        {/*{!hasCompletedTodos && (*/}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos.length} items left
            </span>

            {/*Active link should have the 'selected' class */}
            {/*Активне посилання повинно мати клас «вибрано» */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: statusTodo === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setStatusTodo('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: statusTodo === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setStatusTodo('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: statusTodo === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setStatusTodo('completed')}
              >
                Completed
              </a>
            </nav>

            {/*  /!* this button should be disabled if there are no completed todos *!/*/}
            {/*  /!* цю кнопку слід вимкнути, якщо немає виконаних завдань *!/*/}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/*DON'T use conditional rendering to hide the notification */}
      {/*НЕ використовуйте умовний рендеринг, щоб приховати сповіщення */}
      {/*Add the 'hidden' class to hide the message smoothly */}
      {/*Додайте клас «hidden», щоб плавно приховати повідомлення */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/*show only one message at a time*/}
        {/*   показувати лише одне повідомлення за раз */}
        {errorMessage}
      </div>
    </div>
  );
};
