import { getFirestore } from 'redux-firestore';
import { get } from 'http';

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
            console.log(action.todoList.items);
            //action.todoList.items.push({});
            // const x=fireStore6.collection('todoLists').doc(action.id).once('value');
            // console.log(x);

            // fireStore6.collection('todoLists').doc(action.id).update({
            //     "items": [...action.todoList.items,{}]
            // });
            
            fireStore6.collection('todoLists').doc(action.id).items.push({}
            )
            return state;
        case "DELETE_NEW_ITEM":
            break;
        case "EDIT_NEW_ITEM":
            break;
        default:
            return state;
            break;
    }
};

export default todoListReducer;