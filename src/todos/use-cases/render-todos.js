import { Todo } from '../models/todo.model';
import { createTodoHTML } from './';

/** 
 * Rendereiza los 'Todos'
 * @param { String } elementId
 * @param { Todo } todos
 */
export const renderTodos = ( elementId, todos = [] ) => {

  // TODO: referencia
  const element = document.querySelector( elementId );

  todos.forEach( todo => {
    element.append( createTodoHTML( todo ) );
  });
};