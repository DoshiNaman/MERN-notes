import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Tag, TagInput } from "emblor";
import { useEffect, useState } from "react";
import axios from "@/axios";
import { toast } from "sonner";

export function AddEditNote({ open, onOpenChange, isEdit, setOpen, setIsEdit, editData, editId }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  function handleClickEvent() {
    if (title.length <= 0) {
      setError("please fill title");
    } else if (content.length <= 0) {
      setError("please fill content");
      if (isEdit) {
        axios.put(`/api/note/edit/${editId}`, { title, content, tags })
          .then(response => {
            console.log("Note updated:", response.data);
            toast.success("Note edited successfullly")
            setOpen(false)
            setIsEdit(false)
          })
          .catch(error => {
            setError("Failed to update note");
            toast.error("Note edited unsuccessfully")
            console.error(error);
          });
      } else {
        axios.post("/api/note/create", { title, content, tags })
          .then((response) => {
            console.log("Note created:", response.data);
            toast.success("Note created successfullly")
            setOpen(false)
            setIsEdit(false)
          })
          .catch((error) => {
            setError("Failed to create note");
            toast.error("Note created unsuccessfully")
            console.error(error);
          });
      }
    }
  }

  useEffect(()=>{
    if(isEdit && editData){
      setTitle(editData.title)
      setContent(editData.content)
      setTags(editData.tags)
      setActiveTagIndex(editData.tags.length)
    }
    else if(!isEdit){
      setTitle("")
      setContent("")
      setTags([])
      setActiveTagIndex(null)
    }
  },[isEdit])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit note" : "Add new note"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea
              id="content"
              className="col-span-3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></Textarea>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <div className="col-span-3 h-auto">
              <TagInput
                placeholder="Enter a tags"
                tags={tags}
                setTags={(newTags) => {
                  setTags(newTags);
                  console.log(newTags);
                }}
                className=""
                activeTagIndex={activeTagIndex}
                setActiveTagIndex={setActiveTagIndex}
              />
            </div>
          </div>
        </div>
        {error && error.length > 0 && (
          <span className="text-sm text-red-500 capitalize ml-2">{error}</span>
        )}
        <DialogFooter>
          <Button type="submit" onClick={handleClickEvent}>
            {isEdit ? "Save changes" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
