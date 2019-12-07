import { getFirestore } from 'redux-firestore';
import { get } from 'http';
import { firestore } from 'firebase';

const initState = {
    todoLists: []
};


const wireframerReducer = (state = initState, action) => {

    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */
        case "ADD_NEW_LIST":
            const fireStore = getFirestore();
            const dt = new Date();
            const time = dt.toUTCString();
            fireStore.collection('todoLists').add({
                "key": 0,
                "name": "UNKNOWN",
                "owner": "",
                "items": [],
                "lastOpened": { time }
            }).then(x => {
                console.log("!" + x.id);
                action.history.push('/todoList/' + x.id);
            })

            return state;
            break;
        case "EDIT_ITEM":
            break;
        default:
            return state;
    }
};
export default wireframerReducer;