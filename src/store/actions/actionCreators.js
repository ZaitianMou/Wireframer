// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECDTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

export function registerSuccess() {
    return { type: 'REGISTER_SUCCESS' }
};
export function registerError(error) { 
    return { type: 'REGISTER_ERROR', error }
};
export function loginSuccess() {
    return { type: 'LOGIN_SUCCESS' }
};
export function loginError(error) {
    return { type: 'LOGIN_ERROR', error }
};
export function logoutSuccess() {
    return { type: 'LOGOUT_SUCCESS' }
};

// THESE CREATORS MAKE ACTIONS FOR ASYNCHRONOUS TODO LIST UPDATES
export function createTodoList(todoList) {
    return {type: 'CREATE_TODO_LIST', todoList}
}
export function createTodoListError(error) {
    return {type: 'CREATE_TODO_LIST_ERROR',error}
}

export function editListName(id,newListName){
    return {type:"EDIT_LIST_NAME",id:id,newListName:newListName}
}
export function editListOwner(id,newListOwner){
    return {type:"EDIT_LIST_OWNER", id:id, newListOwner:newListOwner}
}
export function addList(history){
    return { type:"ADD_NEW_LIST",history:history}
}

export function deleteList(id){
    return {type:"DELETE_LIST",id:id}
}
export function addItem(id,todoList){
    return {type:"ADD_NEW_ITEM",id:id,todoList:todoList}
}

export function deleteItem(id,todoList,item){
    return {type:"DELETE_ITEM",id:id,todoList:todoList,item:item}
}

export function moveItemUp(id,todoList,item){
    return {type:"MOVE_ITEM_UP",id:id,todoList:todoList,item:item}
}
export function moveItemDown(id,todoList,item){
    return {type:"MOVE_ITEM_DOWN",id:id,todoList:todoList,item:item}
}