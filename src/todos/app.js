import html from "./app.html?raw";
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIDs = {
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
};

/**
 * Crea el contenido hhml
 * @param { String } elementId 
 */
export const App = ( elementId ) => {

  const displayTodos = () => {
    const todos = todoStore.getTodo( todoStore.getCurrentFilters() );
    renderTodos( ElementIDs.TodoList, todos );
  };

  // Cunado la APP se llama
  (() => {
    const app = document.createElement( 'div' );
    app.innerHTML = html;
    document.querySelector( elementId ).append( app );
    displayTodos();
  })();

  // Referencia de HTML
  const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );

  // Listeners
  newDescriptionInput.addEventListener( 'keyup', ( event ) => {
    if ( event.keyCode !== 13 ) return;
    if ( event.target.value.trim().length === 0 ) return;

    todoStore.addTodo( event.target.value );
    displayTodos();
    event.target.value = '';
  });
};