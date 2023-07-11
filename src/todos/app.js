import html from "./app.html?raw";
/**
 * Crea el contenido hhml
 * @param { String } elementId 
 */
export const App = ( elementId ) => {

  // Cunado la APP se llama
  (() => {
    const app = document.createElement( 'div' );
    app.innerHTML = html;
    document.querySelector( elementId ).append( app );
  })();
};