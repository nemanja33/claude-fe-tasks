import { SanitizeHTML } from "../../components/sanitizeHTML/SanitizeHTML";
import { selectNotes } from "../../redux/features/user/userSlice";
import { useAppSelector } from "../../redux/hooks";
import { Note } from "../../widgets/note/Note";
import './userDetail.css'

const UserDetailPage = () => {
  const notes = useAppSelector(selectNotes)

  return (
    <div className="user-detail">
      <h1 className="user-detail__title">user</h1>
      <Note />
      {
        notes.length > 0 && (
          <div className="user-detail__content">
            <h2>Notes</h2>
            <ol className="user-detail__notes">
              {
              notes.map((note, idx) => { 
                return (
                  <li className="user-detail__note" key={idx}>
                    <SanitizeHTML node={note} />
                  </li>
                )})
              }
            </ol>
          </div>
        )
      }
    </div>
  )
};

export default UserDetailPage