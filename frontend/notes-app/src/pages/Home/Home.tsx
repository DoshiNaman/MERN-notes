import axios from "@/axios";
import { AddEditNote } from "@/components/AddEditNote/AddEditNote";
import Navbar from "@/components/Navbar/Navbar";
import NoteCard from "@/components/NoteCard/NoteCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { toast } from "sonner";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editData, setEditData] = useState();
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNotes = async (query = "") => {
    try {
      const response = query 
        ? await axios.get(`/api/notes/search?query=${query}`) 
        : await axios.get("/api/notes/all");
      setNotes(response.data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  useEffect(()=>{
    setSearchQuery(searchQuery);
    fetchNotes(searchQuery);
  },[searchQuery])

  useEffect(() => {
    fetchNotes();
  }, [open]);

  function handleEdit(id:string, data:any) {
    setEditData(data)
    setEditId(id)
    setIsEdit(true)
    setOpen(true)
  }

  useEffect(()=>{
    if(!open){
      setIsEdit(false)
      setEditId("")
      setEditData()
    }
  },[open])

  const handlePinNote = async (noteId:string, pin:boolean) => {
    try {
      const response = await axios.put(`/api/note/edit/${noteId}`, { isPinned: !pin });
      console.log("Note pinned:", response.data);
      toast.success(`Note ${pin ? "unpinned" : "pinned"} successfully`)
    } catch (error) {
      console.error("Failed to pin note:", error);
      toast.error(`Note ${pin ? "unpinned" : "pinned"} unsuccessfully`)
    } finally {
      fetchNotes()
    }
  };

  const handleDeleteNote = async (noteId:string) => {
    try {
      const response = await axios.delete(`/api/note/delete/${noteId}`);
      toast.success("Note deleted successfully")
    } catch (error) {
      console.error("Failed to pin delete:", error);
      toast.error("Notes deleted unsuccessfully")
    } finally {
      fetchNotes()
    }
  };

  return (
    <>
      <div className="h-full min-h-[100vh] w-full relative">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mt-8 grid-cols-1">
            {notes.map((note, key) => (
              <NoteCard
                key={key}
                title={note.title}
                date={format(new Date(note.date), 'yyyy-MM-dd HH:mm:ss')}
                content={note.content}
                tags={note.tags.map(tag => tag.text).join(", ")}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note._id, note)}
                onDelete={() => handleDeleteNote(note._id)}
                onPinNote={() => handlePinNote(note._id,note.isPinned)}
              />
            ))}
          </div>
        </div>
        <div className="fixed bottom-5 right-10">
          <Button
            variant={"outline"}
            className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white"
            size={"icon"}
            onClick={() => {
              setOpen(true);
              setIsEdit(false);
            }}
          >
            <Plus className="text-xl size-20" />
          </Button>
        </div>
        <AddEditNote
          open={open}
          onOpenChange={(value: boolean) => setOpen(value)}
          setOpen={setOpen}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          editId={editId}
          editData={editData}

        />
      </div>
    </>
  );
};

export default Home;
