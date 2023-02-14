import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";

// const comments = [1,2]

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({content, author, publishedAt}:PostProps) {

  const [comments, setComments] = useState([
    "Post muito bacana, hein?!"
  ])

  const [newCommentText, setNewCommentText] = useState('');

  // ** TRABALHANDO COM INTL **
  // const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR', {
  //   day: '2-digit',
  //   month: 'long',
  //   hour: '2-digit',
  //   minute: '2-digit'
  // }).format(publishedAt)

  // USANDO A LIB DATE-FNS
  const publishedDateFormatted = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment (e:FormEvent) {
    e.preventDefault()
  
    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange (e:ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('')
    setNewCommentText(e.target.value)
  }

  function handleNewCommentInvalid (e:InvalidEvent<HTMLTextAreaElement>) {
    console.log(e.target.setCustomValidity('Esse campo é obrigatório'))
  }

  function deleteComment (commentToDelete:string) {
    // imutabilidade => as coisas não sofrem mutação, nós criamos um novo valor (um novo espaço na memória)
    const commentsWithoutDeltedOne = comments.filter(comment => {
      // caso seja true, é pq ele é diferente, logo não removerá, se for false, é pq é igual e ele removerá.
      return comment !== commentToDelete;
    })
    setComments(commentsWithoutDeltedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={author.avatarUrl}
          />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if(line.type === 'paragraph'){
            return <p key={line.content}>{line.content}</p>
          } else {
            return <p key={line.content}><a href='#'>{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu Feedback</strong>

        <textarea 
          required
          placeholder="Deixe um comentário" 
          name='comment' 
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid} 
          value={newCommentText}
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
