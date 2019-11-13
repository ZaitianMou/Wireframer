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
            // return {
            //     todoLists: [...state.todoLists, {
            //         "key": 5,
            //         "name": "T",
            //         "owner": "No One",
            //         "items": [
            //             {
            //                 "key": 0,
            //                 "description": "FUCK You Up",
            //                 "due_date": "2019-09-30",
            //                 "assigned_to": "Mou",
            //                 "completed": true
            //             }
            //         ]
            //     }]
            // }
            break;
        case "DELETE_LIST":
            //console.log("ID passed to reducer"+action.id)
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
        case "EDIT_LIST(":
            alert("!!!!EditList>>>>>>FROM todoListReducer.js!!!")
            if (action.editionType="owner"){
                fireStore.collection('todoLists').description=action.newOwner;
            }
            else if (action.editionType="name"){
                fireStore.collection('todoLists').name=action.newName;
            }

            break;
        case "ADD_NEW_ITEM":
            break;
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