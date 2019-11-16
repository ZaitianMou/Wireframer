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
        case "EDIT_ITEM":
            break;
        default:
            return state;
    }
};

export default todoListReducer;