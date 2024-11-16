import React, { useEffect, useState } from "react";

// @material-tailwind-react
import {
  Card,
  Button,
  CardBody,
  Typography,
  CardFooter, IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeDeleteSuccessStatus, deleteNoteFromFirestore, fetchNotesFromFirebase, handleInputChange, handleNoteDelete, openDialog, setCurrentEditNoteID, setMessage } from "../Store/Slices/NoteSlice";




function AddNote({ noteListItem }) {

  const { note } = useSelector(state => state);
  const { deleteSuccess } = note;
console.log(note);

  console.log(deleteSuccess);
  



  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [deleteNoteID,setDeleteNoteID]=useState(null)



   const dispatch=useDispatch()
   
  const formattedDate = new Date(noteListItem?.createdAt);  
  const formattedDateString = formattedDate.toLocaleString(); 

 function handleOpen(getNoteID) {
  setDeleteNoteID(getNoteID)
  setOpen(!open)
 }

  function onDeleteNote() {
    setOpen(false)
    
    dispatch(deleteNoteFromFirestore(deleteNoteID));



  }


 

  function OnEditNote(getNote) {
     console.log(getNote.id);
     
  
    dispatch(setCurrentEditNoteID({
      currentNoteID :getNote?.id
    }))


  

    dispatch(handleInputChange({
       title: getNote?.title,
        description: getNote?.description
    }))

  dispatch(openDialog())


  }

  return (


    <div>


      {
         deleteSuccess && openDel && (
          <div className="bg-green-300 p-4 rounded fixed bottom-4 right-4 w-64 max-w-xs">
<Typography color="green-800" className="mt-1 font-normal text-center">
Note Deleted Successfully
</Typography>
</div>
        )

      }
 {
        open && (
          <Dialog open={open} handler={handleOpen}>
          <DialogHeader>DELETE</DialogHeader>
          <DialogBody>
            Are you sure to delete
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={onDeleteNote}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
        )

      }

<Card className="shadow-xl">
    <CardBody className="flex flex-col justify-between">
      <div className="grid grid-cols-2 gap-4">
        <Typography variant="h5" color="blue-gray" className="mb-2 col-span-1">
          {noteListItem?.title}
        </Typography>
        <Typography variant="paragraph" color="gray" className="mb-2 col-span-1 text-right">
          {formattedDateString}
        </Typography>
      </div>
  
      {/* Ensure the description only appears if it exists */}
      {noteListItem?.description && (
        <Typography className="mt-2">{noteListItem?.description}</Typography>
      )}
    </CardBody>
    
    <CardFooter className="pt-0 mt-auto">
      <IconButton data-ripple-light="true" onClick={()=>OnEditNote(noteListItem)}  className="me-2" variant="outlined" color="blue">
        <MdEdit />
      </IconButton>
      <IconButton color="red" variant="outlined" onClick={()=>handleOpen(noteListItem?.id)} 
      // onClick={()=>onDeleteNote(noteListItem?.id)}
      >
        <MdDeleteOutline />
      </IconButton>
    </CardFooter>
  </Card>


    </div>
     

  
  
  );
}

export default AddNote;
