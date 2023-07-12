import html from "./app.html?raw";
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIDs = {
  ClearCompletedButton: '.clear-completed',
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
  const todoListUL = document.querySelector( ElementIDs.TodoList );
  const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton ); 

  // Listeners
  /**
   * Listener para agregar 'Todo'
   * @param { Event } event 
   */
  newDescriptionInput.addEventListener( 'keyup', ( event ) => {
    if ( event.keyCode !== 13 ) return;
    if ( event.target.value.trim().length === 0 ) return;

    todoStore.addTodo( event.target.value );
    displayTodos();
    event.target.value = '';
  });

  /**
   * Listener para hacer 'Toggle' a los 'Todos'
   * @param { Event } event
   */
  todoListUL.addEventListener( 'click', ( event ) => {
    const element = event.target.closest( '[data-id]' );
    todoStore.toggleTodo( element.getAttribute( 'data-id' ) );
    displayTodos();
  });

  /**
   * Listener para eliminar 'Todo'
   * @param { Event } event
   */
  todoListUL.addEventListener( 'click', ( event ) => {
    const isDestroyElement = event.target.className === 'destroy';
    const element = event.target.closest( '[data-id]' );

    if ( !element || !isDestroyElement ) return;

    todoStore.deleteTodo( element.getAttribute( 'data-id' ) );
    displayTodos();
  });

  clearCompletedButton.addEventListener( 'click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  });


};