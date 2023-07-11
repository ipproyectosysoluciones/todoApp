import { Todo } from '../models/todo.model';

/** 
 * Crea el  HTML del 'element' para los 'Todos'
 * @param { Todo } todo
 */
export const createTodoHTML = ( todo ) => {
  if ( !todo ) throw new Error( 'A TODO is required' );

  const html = `<h1>${ todo.description }</h1>`;

  const liElement = document.createElement( 'li' );
  liElement.innerHTML = html;

  return liElement;
};