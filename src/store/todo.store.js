import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: 'all',
  Completed: 'Completed',
  Pending: 'Pending',
};

const state = {
  todos: [
    new Todo( 'piedra del alma' ),
    new Todo( 'piedra del infinito' ),
    new Todo( 'piedra del tiempo' ),
    new Todo( 'piedra del poder' ),
    new Todo( 'piedra de la realidad' ),
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log( 'InitStore called' );
};

/**
 * Carga el Store
 */
const loadStore = () => {
  if ( !localStorage.getItem( 'state' ) ) return;

  const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem( 'state' ) );
  state.todos = todos;
  state.filter = filter;
};

/**
 * Guardar en el 'localStorage'
 * 
 */
const saveStateToLocalStorage = () => {
  localStorage.setItem( 'state', JSON.stringify( state ) );
};

/**
 * Función para obtener los 'Todo'
 * @param { String } filter 
*/
const getTodo = ( filter = Filters.All ) => {
  switch ( filter ) {
    case Filters.All:
      return [ ...state.todos ];

    case Filters.Completed:
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

  saveStateToLocalStorage();
};

/**
 * Función para saber sin una Todo ya esta 'completed' o no
 * @param { String } todoId 
 */
const toggleTodo = ( todoId ) => {
  state.todos = state.todos.map( todo => {
    if ( todo.id === todoId ) {
      todo.done = !todo.done;
    }
    return todo;
  });

  saveStateToLocalStorage();
};

/**
 * Elimina el Todo por 'id'
 * @param { String } todoId 
 */
const deleteTodo = ( todoId ) => {
  state.todos = state.todos.filter( todo => todo.id !== todoId );

  saveStateToLocalStorage();
};

/**
 * Elimina los Todos 'completed'
 */
const deleteCompleted = () => {
  state.todos = state.todos.filter( todo => !todo.done );

  saveStateToLocalStorage();
};

/**
 * Función para manejar los filtros
 * @param { Filters } newFilters 
 */
const setFilters = ( newFilter = Filters.All ) => {
  state.filter = newFilter;

  saveStateToLocalStorage();
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
  toggleTodo,
};