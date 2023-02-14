import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./Comment.module.css";
import { Avatar } from './Avatar';
import { useState } from "react";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void
}

export function Comment({content, onDeleteComment}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment () {
    onDeleteComment(content)
  }


  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
         <header>
            <div className={styles.authorAndTime}>
               <strong>Pedro Henrique</strong>
               <time title="16 de Janeiro às 09:34" dateTime="2023/01/16 10:34:00">Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
               <Trash size={24}/>
            </button>
         </header>

         <p>{content}</p>
        </div>

        <footer>
            <button onClick={() => setLikeCount(likeCount + 1)}>
               <ThumbsUp/>
               Aplaudir <span>{likeCount}</span>
            </button>
        </footer>
      </div>
    </div>
  );
}
