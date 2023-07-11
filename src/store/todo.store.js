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
 * Función para agregar Todo
 * @param { String } description 
 */
const addTodo = ( description ) => {
  throw new Error( 'Not Implemented' );
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
  throw new Error( 'Not Implemented' );
};

/**
 * Elimina los Todos 'completed'
 */
const deleteCompleted = () => {
  throw new Error( 'Not Implemented' );
};

/**
 * Función para manejar los filtros
 * @param { String } newFilters 
 */
const setFilters = ( newFilters = Filters.All ) => {
  throw new Error( 'Not Implemented' );
};

/**
 * Función para controlar el acceso al 'Store'
 */
const getCurrentFilters = () => {
  throw new Error( 'Not Implemented' );
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilters,
  initStore,
  loadStore,
  setFilters,
  toogleTodo,
};