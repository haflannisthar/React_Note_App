import { createSlice } from "@reduxjs/toolkit";
import { db, auth } from '../../firebaseConfig';
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp, deleteDoc,doc } from "firebase/firestore";

const initialState = {
    FormData: {
        title: '',
        description: ''
    },
    noteList: [],
    message : false
};

export const NoteSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        handleInputChange: (state, action) => {
            let cpyFormData = { ...state.FormData };
            cpyFormData = { ...cpyFormData, ...action.payload };
            state.FormData = cpyFormData;
        },

        handleAddNote: (state, action) => {

            console.log("handle Add is called");
            const user = auth.currentUser;
            console.log(user?.uid);

            if (!user) {
                console.error("User is not authenticated!");
                return;
            }

            const noteData = {
                userId: user?.uid,
                title: state.FormData.title,
                description: state.FormData.description,
                createdAt: Timestamp.now(),
            };

            // Add the note to Firestore
            addDoc(collection(db, "notes"), noteData)
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        },

        emptyTheArrayOnLogOut: (state, action) => {
            state.noteList = []

        },

        setNotesOnInitialLoad: (state, action) => {
            const notesWithFormattedDates = action.payload.noteList.map(note => {
                return {
                    ...note,
                    createdAt: note.createdAt.toLocaleString()  // Convert Firestore Timestamp to a formatted string
                };
            });
            state.noteList = notesWithFormattedDates;
        },
        handleNoteDelete: (state, action) => {
            const { currentNoteID } = action.payload;
            state.noteList = state.noteList.filter(note => note.id !== currentNoteID);

        },
        setMessage : (state,action) =>{
            console.log(action);
            
            state.message = action.payload;
        }
        
    }
});

export const { handleInputChange, handleAddNote,setMessage, setNotesOnInitialLoad, emptyTheArrayOnLogOut,handleNoteDelete } = NoteSlice.actions;
export default NoteSlice.reducer;

export const fetchNotesFromFirebase = () => async (dispatch) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error("User is not authenticated!");
            return;
        }

        const notesCollection = collection(db, "notes");
        const q = query(notesCollection, where("userId", "==", user.uid), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const notes = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const createdAt = data.createdAt;
            const date = new Date(createdAt.seconds * 1000);

            notes.push({
                id: doc.id,
                ...data,
                createdAt: date.toLocaleString(),
            });
        });

        dispatch(setNotesOnInitialLoad({ noteList: notes }));  // Dispatching the fetched notes to Redux
    } catch (error) {
        console.error("Error getting notes: ", error);
    }
};


export const deleteNoteFromFirestore = (currentNoteID) => async (dispatch) => {
    try {
        if (!currentNoteID) {
            console.error("Note ID is missing or undefined");
            return;
        }

        const noteRef = doc(db, 'notes', currentNoteID);
        
        await deleteDoc(noteRef);
        console.log('Note deleted successfully');

        dispatch(handleNoteDelete({ currentNoteID }));
       dispatch(setMessage(true))
        dispatch(fetchNotesFromFirebase());

    } catch (error) {
        dispatch(setMessage(false))
        console.error('Error deleting note: ', error);
    }
};