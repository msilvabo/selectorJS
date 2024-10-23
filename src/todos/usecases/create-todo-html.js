import { Todo } from "../models/todo.model";

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = (todo) => {
    if (!todo) throw new Error("todo is requiered");

    const{done, description, id} = todo;

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ done ? 'checked': ''}>
            <label>${description}</label>
            </div>
            <button class="destroy"></button>
        <input class="edit" value=" ${description}">
        `;
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id',id);
    if (done) liElement.classList.add('completed');
    return liElement;
}