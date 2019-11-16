import { getFirestore } from 'redux-firestore';
import { get } from 'http';
import { firestore } from 'firebase';

const initState = {
    todoLists: []
};


const todoListReducer = (state = initState, action) => {
    
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */
        case "ADD_NEW_LIST":
            const fireStore=getFirestore();
            fireStore.collection('todoLists').add({
                "key":0,
                "name": "UNKNOWN",
                "owner": "",
                "items": []
            }).then(x=>{
                console.log("!"+x.id);
                action.history.push('/todoList/'+x.id);
            })
            
            return state;
            break;
        case "DELETE_LIST":
            const fireStore2=getFirestore();
            fireStore2.collection('todoLists').get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                    if (doc.id==action.id){
                        fireStore2.collection('todoLists').doc(doc.id).delete();
                    }
                })
            });
            return state;
            break;
        case "EDIT_LIST_NAME":
            const fireStore4=getFirestore();
            fireStore4.collection('todoLists').doc(action.id).update({
                    "name": action.newListName   
            })
            return state;
        case "EDIT_LIST_OWNER":
            const fireStore5=getFirestore();
            fireStore5.collection('todoLists').doc(action.id).update({
                    "owner": action.newListOwner 
            })
            return state;

        case "ADD_NEW_ITEM":
            const fireStore6=getFirestore();
            const todoList=fireStore6.collection("todoLists").doc(action.id);
            todoList.get().then(doc=>{
                const data=doc.data().items;
                todoList.update({
                    "items": [...data,{}]
                })
            });
            return state;
        case "DELETE_ITEM":
            const index=action.todoList.items.indexOf(action.item);
            const fireStore7=getFirestore();
            const todoListOfCloud=fireStore7.collection("todoLists").doc(action.id);
            todoListOfCloud.get().then(doc=>{
                const data=doc.data().items;
                data.splice(index,1);
                todoListOfCloud.update({
                    "items": [...data]
                })
            });
            return state;
            
        case "MOVE_ITEM_UP":
            const indexForMoveUp=action.todoList.items.indexOf(action.item);
            if (indexForMoveUp===0){
                return state;
            }
            const fireStore8=getFirestore();
            const todoListForMoveUp=fireStore8.collection("todoLists").doc(action.id);
            todoListForMoveUp.get().then(doc=>{
                const data=doc.data().items;

                const temp=data[indexForMoveUp-1];
                data[indexForMoveUp-1]=data[indexForMoveUp];
                data[indexForMoveUp]=temp;
                todoListForMoveUp.update({
                    "items": [...data]
                })
            });
            return state;

        case "MOVE_ITEM_DOWN":
            const indexForMoveDown=action.todoList.items.indexOf(action.item);
            if (indexForMoveDown===action.todoList.items.length-1){
                return state;
            }
            const fireStore9=getFirestore();
            const todoListForMoveDown=fireStore9.collection("todoLists").doc(action.id);
            todoListForMoveDown.get().then(doc=>{
                const data=doc.data().items;

                const temp=data[indexForMoveDown+1];
                data[indexForMoveDown+1]=data[indexForMoveDown];
                data[indexForMoveDown]=temp;
                todoListForMoveDown.update({
                    "items": [...data]
                })
            });
            return state;
        case "SORT_ITEMS":
            const fireStore10=getFirestore();
            const todoListForSort=fireStore10.collection("todoLists").doc(action.id);
            if (action.sortingType==="description"){
                todoListForSort.get().then(doc=>{
                    const data=doc.data().items;
                    data.sort(compareByDescription);
                    todoListForSort.update({
                        "items":[...data]
                    })
                })
                if (window.currentSortByDescription==="sortByItemDescriptionDecrease"){
                    window.currentSortByDescription="sortByItemDescriptionIncrease";
                }
                else {
                    window.currentSortByDescription="sortByItemDescriptionDecrease";
                }
                
            }
            else if (action.sortingType==="due_date"){
                todoListForSort.get().then(doc=>{
                    const data=doc.data().items;
                    data.sort(compareByDueDate);
                    todoListForSort.update({
                        "items":[...data]
                    })
                })
                if (window.currentSortByDueDate==="sortByItemDuaDateDecrease"){
                    window.currentSortByDueDate="sortByItemDueDateIncrease";
                }
                else {
                    window.currentSortByDueDate="sortByItemDuaDateDecrease";
                }

            }
            else if (action.sortingType==="completed"){
                todoListForSort.get().then(doc=>{
                    const data=doc.data().items;
                    data.sort(compareByCompleted);
                    todoListForSort.update({
                        "items":[...data]
                    })
                })
                if (window.currentSortByCompleted==="sortByItemCompletedDecrease"){
                    window.currentSortByCompleted="sortByItemCompletedIncrease";
                }
                else {
                    window.currentSortByCompleted="sortByItemCompletedDecrease";
                }
            }
            else {
                alert("!!!!This should not happen!!!")
            }
            return state;
        case "EDIT_ITEM":
            break;
        default:
            return state;
    }
    
};
const compareByDescription = (item1, item2) => {
    if (window.currentSortByDescription == "sortByItemDescriptionDecrease") {

        if (item1.description < item2.description)
            return -1;
        else if (item1.description > item2.description)
            return 1;
        else
            return 0;
        
    }
    else {
        if (item1.description < item2.description)
            return 1;
        else if (item1.description > item2.description)
            return -1;
        else
            return 0;
    }
}
const compareByDueDate=(item1, item2) =>{
    if (window.currentSortByDueDate == "sortByItemDueDateIncrease") {
        if (item1.due_date < item2.due_date)
            return -1;
        else if (item1.due_date > item2.due_date)
            return 1;
        else
            return 0;
    }
    else {
        if (item1.due_date < item2.due_date)
            return 1;
        else if (item1.due_date > item2.due_date)
            return -1;
        else
            return 0;
    }
}
const compareByCompleted=(item1, item2)=>{
    if (window.currentSortByCompleted == "sortByItemCompletedIncrease") {
        if (item1.completed < item2.completed)
            return -1;
        else if (item1.completed > item2.completed)
            return 1;
        else
            return 0;
    }
    else {
        if (item1.completed < item2.completed)
            return 1;
        else if (item1.completed > item2.completed)
            return -1;
        else
            return 0;
    }
}


export default todoListReducer;