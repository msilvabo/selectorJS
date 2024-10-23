import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos, renderPending } from './usecases';


const ElementIds = {
    TodoList : '.todo-list',
    NewTodoInput: '#new-todo-input',
    destroy: '.destroy',
    clearCompleted: '.clear-completed',
    Filters: '.filtro',
    PendingCountLabel: '#pending-count'
}
/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) =>{

    
    const displayTodos = ()=>{
        const Todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, Todos );
        updatePendingCount();
    }

    const updatePendingCount = () =>{
        renderPending(ElementIds.PendingCountLabel);
    };

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // Referencia input HTML
    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);
    const clearComplete = document.querySelector(ElementIds.clearCompleted);
    const filterLIs = document.querySelectorAll(ElementIds.Filters);
    
    

    //Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode != 13) return;
        if (event.target.value.trim() === 0) return;
        todoStore.addTodo( event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        // console.log(element);
        todoStore.toggleTodo( element.getAttribute('data-id'));
        // displayTodos();   
    })

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if (!element || !isDestroyElement) return;
        console.log({isDestroyElement});
        todoStore.deleteTodo( element.getAttribute('data-id'));
        displayTodos();    
    })

    clearComplete.addEventListener('click', (event) => {
        todoStore.deleteCompleted();
        displayTodos();
    })

    filterLIs.forEach((element) => {
        element.addEventListener('click', (event) => {

            filterLIs.forEach((el) => el.classList.remove('selected'))
            event.target.classList.add('selected');
            switch(event.target.text){
                case 'Todos':
                    todoStore.setSelectFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setSelectFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setSelectFilter(Filters.Completed);
                    break;
            }
            displayTodos();
        })
    })
}