import { createSlice } from "@reduxjs/toolkit";
import { db, auth } from '../../firebaseConfig';
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";

const initialState = {
    FormData: {
        title: '',
        description: ''
    },
    noteList: [],
    message: false,
    currentNoteEditID: null,
    dialogOpen: false,
    editSuccess: false,
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
       
        setMessage: (state, action) => {
            console.log(action);

            state.message = action.payload;
        },
        setCurrentEditNoteID: (state, action) => {
            console.log("current edit id  ", action.payload);
            const { currentNoteID } = action.payload
            state.currentNoteEditID = currentNoteID

        },
        removeCurrentNoteID: (state, action) => {
            state.currentNoteEditID = null
        },
        handleEditNote: (state, action) => {
            console.log("handle edit is called");
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
            console.log(state.currentNoteEditID);

            console.log(noteData);


            const docRef = doc(db, 'notes', state.currentNoteEditID)
            try {
                const docSnap = getDoc(docRef)

                if (docSnap != null) {

                    updateDoc(docRef, noteData)
                    console.log("Document updated successfully!");
                    state.editSuccess = true

                } else {
                    console.log("No such document exists!");

                }


            } catch (error) {
                console.error("Error getting or updating document:", error);

            }





        },
        changeEditSuccessStatus: (state) => {
            state.editSuccess = false
        },
        openDialog: (state) => {
            state.dialogOpen = true;
        },
        closeDialog: (state) => {
            state.dialogOpen = false;
        },



    }
});

export const { handleInputChange, setCurrentEditNoteID, handleAddNote, setMessage, handleEditNote, changeEditSuccessStatus,
    setNotesOnInitialLoad, emptyTheArrayOnLogOut, handleNoteDelete, openDialog, closeDialog, removeCurrentNoteID, changeDeleteSuccessStatus } = NoteSlice.actions;
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



// export const UpdateFromFireBase=(currentUpdateNote)=>async (dispatch)=>{
// console.log(currentUpdateNote);

// }