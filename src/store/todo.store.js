import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: 'all',
  Complited: 'complited',
  Pending: 'pending',
};

const state = {
  todos: [
    new Todo( 'piedra del alma' ),
    new Todo( 'piedra del infinito' ),
    new Todo( 'piedra del tiempo' ),
  ],
  filter: Filters.All,
};

const initStore = () => {
  console.log( state );
  console.log( 'InitStore called' );
};

/**
 * Carga el Store
 */
const loadStore = () => {
  throw new Error( 'Not Implemented' );
};

/**
 * Función para obtener los 'Todo'
 * @param { String } filter 
*/
const getTodo = ( filter = Filters.All ) => {
  switch ( filter ) {
    case Filters.All:
      return [ ...state.todos ];

    case Filters.Complited:
      return state.todos.filter( todo => todo.done );

      case Filters.Pending:
      return state.todos.filter( todo => !todo.done );
  
      default:
      throw new Error( `Option ${ filter } is not valid` );
  }
};

/**
 * Función para agregar Todo
 * @param { String } description 
 */
const addTodo = ( description ) => {
  if ( description ) throw new Error( 'Description is required' );

  state.todos.push( new Todo( description ) );
};

/**
 * Función para saber sin una Todo ya esta 'completed' o no
 * @param { String } todoId 
 */
const toogleTodo = ( todoId ) => {
  throw new Error( 'Not Implemented' );
};

/**
 * Elimina el Todo por 'id'
 * @param { String } todoId 
 */
const deleteTodo = ( todoId ) => {
  state.todos = state.todos.filter( todo => todo.id !== todoId );
};

/**
 * Elimina los Todos 'completed'
 */
const deleteCompleted = () => {
  state.todos = state.todos.filter( todo => todo.done );
};

/**
 * Función para manejar los filtros
 * @param { Filters } newFilters 
 */
const setFilters = ( newFilter = Filters.All ) => {
  state.filter = newFilter;
};

/**
 * Función para controlar el acceso al 'Store'
 */
const getCurrentFilters = () => {
  return state.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilters,
  getTodo,
  initStore,
  loadStore,
  setFilters,
  toogleTodo,
};