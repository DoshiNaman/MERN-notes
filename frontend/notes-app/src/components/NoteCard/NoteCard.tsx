import { Pen, Pin, PinOff, Trash2 } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

const NoteCard = ({
  title,
  content,
  date,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}: any) => {
  return (
    <div>
      <Card className="">
        <CardHeader className="">
          <CardTitle className="flex justify-between items-start">
            <span>{title}</span>
            {isPinned ? (
              <PinOff className="size-4 cursor-pointer" onClick={onPinNote} />
            ) : (
              <Pin className="size-4 cursor-pointer" onClick={onPinNote} />
            )}
          </CardTitle>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        <CardContent>{content?.slice(0, 60)}</CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs">{tags}</div>
          <div className="flex gap-2">
            <Button variant="outline" size={"icon"} onClick={onEdit}>
              <Pen className="size-4" />
            </Button>
            <Button variant="outline" size={"icon"} onClick={onDelete}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoteCard;
