import React, { useContext, useEffect, useState } from 'react';
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import { ArrowLeftOnRectangleIcon, PlusIcon } from "@heroicons/react/24/solid";
import AddNote from "../Notes/AddNote";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import note_animation from '../assets/No_Note.json';
import { fetchNotesFromFirebase, handleAddNote, handleInputChange, emptyTheArrayOnLogOut ,setCurrentEditNoteID, closeDialog, openDialog, removeCurrentNoteID, handleEditNote, changeEditSuccessStatus } from '../Store/Slices/NoteSlice';
import { AuthContext } from '../Context/Context';
import Success from '../assets/Icons/Success';

export default function Profile() {
  const [size, setSize] =useState(null);
  const [open, setOpen] =useState(false); // Refactored alert visibility state

  const dispatch = useDispatch();
  const { note } = useSelector(state => state);
  const { noteList } = note;
  const {dialogOpen,currentNoteEditID,editSuccess }=note;



  
 


function handleDialogOpen() {
  dispatch(openDialog())
}

  const { user, hangleLogOut } = useContext(AuthContext);


  const handleOpen = (value) => setSize(value);

  function userLogOut() {
    hangleLogOut();
    dispatch(emptyTheArrayOnLogOut())

  }

  function onChangeInput(event) {
    dispatch(handleInputChange({
      [event.target.name]: event.target.value
    }));
  }




  useEffect(() => {
    dispatch(fetchNotesFromFirebase());  // Fetch notes when component mounts
  }, [dispatch]);



  function handleOnSubmit(event) {
    event.preventDefault();

    if (currentNoteEditID==null) {
      dispatch(handleAddNote());
    }else{
    dispatch(handleEditNote())
    }

   
    dispatch(handleInputChange({ title: '', description: '' }));

    dispatch(fetchNotesFromFirebase());


    // handleOpen(null);
    handleDialogClose()

    setTimeout(() => {
      setOpen(true);

      // Auto-close the alert after 3 seconds
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }, 100);


    if (editSuccess) {
      dispatch(changeEditSuccessStatus())
    }
  }

  function handleDialogClose() {
    dispatch(closeDialog());
    if (currentNoteEditID!==null) {
      dispatch(removeCurrentNoteID())
     

      dispatch(handleInputChange({ title: '', description: '' }));


    }

}

  return (
    <div className="pt-2 pb-2 h-screen">
      <Navbar variant="gradient" color="blue-gray" className="mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-2" style={{ position: 'sticky', top: '0', zIndex: '10' }}>
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          <Typography as="a" href="#" variant="h6" className="mr-4 ml-2 cursor-pointer py-1.5">Note App</Typography>
          <div className="ml-auto flex gap-1 md:mr-4">
            <div className='border border-white rounded mr-2 ml-2 p-2'>
              <Typography variant="paragraph" color="white">
                {user?.displayName}
              </Typography>

            </div>
            <div class="relative group">
              <IconButton variant="text" onClick={handleDialogOpen} className="hover:text-white">
                <PlusIcon className="h-4 w-4" />
              </IconButton>

              <div class="absolute opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded py-1 px-2 top-full left-1/2 transform -translate-x-1/2 mt-2 transition-opacity duration-300">
                Add New
              </div>
            </div>



            <div class="relative group">
              <IconButton onClick={userLogOut} variant="text" className="hover:text-white">
                <ArrowLeftOnRectangleIcon className="h-4 w-4" />
              </IconButton>

              <div class="absolute opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded py-1 px-2 top-full left-1/2 transform -translate-x-1/2 mt-2 transition-opacity duration-300">
               logout
              </div>
            </div>
          </div>
          {/* <div className="relative flex w-full gap-2 md:w-max">
            <Input type="search" color="white" onChange={filterNote} label="Type here..." className="pr-20" containerProps={{ className: "min-w-[288px]" }} />
            <Button size="sm" color="white" className="!absolute right-1 top-1 rounded">Search</Button>
          </div> */}
        </div>
      </Navbar>

      <div className="min-h-[calc(100vh-70px)] p-4">
        {
          noteList?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {noteList.map((noteListItem) => (
                <AddNote key={noteListItem.id} noteListItem={noteListItem} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <div className="w-24 h-24 mb-4">
                <Lottie animationData={note_animation} loop={true} />
              </div>
              <h1 className="mb-4">No Note Found!!</h1>
              <Button onClick={handleDialogOpen} variant="gradient">
                Add New Note
              </Button>
            </div>
          )
        }
      </div>


      <Dialog open={dialogOpen} size="lg" handler={handleDialogClose}>


         {
          currentNoteEditID===null ?<DialogHeader>Add New Note</DialogHeader>:<DialogHeader>Edit Note</DialogHeader>


         }
        {/* <DialogHeader>Add New Note</DialogHeader> */}
        <DialogBody>
          <form onSubmit={handleOnSubmit}>
            <div className="w-full mb-3">
              <Input
                type="text"
                name="title"
                id="title"
                required
                onChange={onChangeInput}
                value={note?.FormData.title}
                label="Enter Note Title"
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Textarea
                label="Message"
                name="description"
                id="description"
                value={note?.FormData.description}
                onChange={onChangeInput}
              />
            </div>
            <div className='flex justify-end w-full pt-2'>
              <Button variant="text" color="red" onClick={handleDialogClose} className="mr-1">
                <span>Cancel</span>
              </Button>
              <Button type='Submit' variant="gradient" color="black">
                
         {
          currentNoteEditID===null ?<span>Add Note</span>:<span>Update Note</span>


         }
                {/* <span>Add Note</span> */}
              </Button>
            </div>
          </form>
        </DialogBody>

      </Dialog>

      {open && (
       

<div className="bg-green-300 p-4 rounded fixed bottom-4 right-4 w-64 max-w-xs">

  {
    editSuccess ? <Typography color="green-800" className="mt-1 font-normal text-center">
    Note Updated Successfully
    </Typography> : 
    <Typography color="green-800" className="mt-1 font-normal text-center">
    Note Added Successfully
    </Typography>
  }

</div>
      )}
    </div>
  );
}
