import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './Slices/NoteSlice';

const store = configureStore({
  reducer: {
    note: noteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['blog/setNotesOnInitialLoad'],
      },
    }),
});

export default store;
