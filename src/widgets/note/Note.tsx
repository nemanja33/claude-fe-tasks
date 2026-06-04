import { SyntheticEvent, useState } from "react";
import { Button } from "../../components/button/button";
import { Textarea } from "../../components/textarea/textarea";
import { useAppDispatch } from "../../redux/hooks";
import { addNote } from "../../redux/features/user/userSlice";

const Note = () => {
  const [ field, setField ] = useState<string>("");
  const dispatch = useAppDispatch();

  function submitNote(e: SyntheticEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!field) return;

    dispatch(addNote(field))

    setField("")
  }

  return (
    <form onSubmit={submitNote}>
      <Textarea label="Add Note" hint="Enter a note" value={field} onChange={(e) => setField(e.target.value)} />
      <Button variant="primary" size="md" type="submit" disabled={!field}>Submit</Button>
    </form>
  )
};

export { Note }