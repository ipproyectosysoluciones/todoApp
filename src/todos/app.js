import html from "./app.html?raw";
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIDs = {
  TodoList: '.todo-list',
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
};