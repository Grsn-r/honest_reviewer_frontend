import UserContext from '../../../context/userContext';
import back from '../../../images/back.svg'
import { useState, useContext } from 'react';
import cmntEraser from '../../../images/eraseCmnt.svg';


export default function FullReview({review}) {

    const {handleComment, handleCommentDelete } = useContext(UserContext);
    const [data, setData] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleComment(review, data);
        setData('');
    }

    return (
        <div className="full-review" >
            <p className="full-review__text">
            {review.text}
            </p>
            <form className="full-review__form" onSubmit={handleSubmit} >
                <input className="full-review__form_input" type='text'placeholder="comenta" value={data} onChange={(e) => setData(e.target.value)} />
                <button className="full-review__form_submit">Comentar</button>
            </form>
            <div className="full-review__comments">
                {review.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(cmnt => {
                    return (<div key={cmnt._id} className='full-review__comments_comment' >
                        <img className='full-review__comments_comment_eraser' src={cmntEraser} alt='borrar' onClick={() => handleCommentDelete(review._id, cmnt._id)} />
                        <p className='full-review__comments_comment_text' >{cmnt.author.name} : {cmnt.text}</p>
                    </div>)
                })}
            </div>
        </div>
    )
}