import html from "./app.html?raw";
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

const ElementIDs = {
  ClearCompletedButton: '.clear-completed',
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
  TodoFilters: '.filtro',
  PendingCountLabel: '#pending-count',
};

/**
 * Crea el contenido hhml
 * @param { String } elementId 
 */
export const App = ( elementId ) => {

  const displayTodos = () => {
    const todos = todoStore.getTodos( todoStore.getCurrentFilters() );
    renderTodos( ElementIDs.TodoList, todos );
    updatePendingCount();
  };

  /**
   * Actualiza los 'Pending'
   */
  const updatePendingCount = () => {
    renderPending( ElementIDs.PendingCountLabel );
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
  const filtersLIs = document.querySelectorAll(  ElementIDs.TodoFilters );

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

  /**
   * Borrar todos los 'Todos' completados
   * 
   */
  clearCompletedButton.addEventListener( 'click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  /**
   * Filtra los 'Todos'
   * 
   */
  filtersLIs.forEach( element => {
    element.addEventListener( 'click', ( element ) => {
      filtersLIs.forEach( el => el.classList.remove( 'selected' ) );
      element.target.classList.add( 'selected' );

      switch ( element.target.text ) {
        case 'Todo':
          todoStore.setFilters( Filters.All );
        break;

        case 'Pendientes':
          todoStore.setFilters( Filters.Pending );
        break;

        case 'Completados':
          todoStore.setFilters( Filters.Completed );
        break;
      }

      displayTodos();
    });
  });

};