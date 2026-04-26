import UserContext from '../../../context/userContext';
import back from '../../../images/back.svg'
import { useContext, useState } from 'react'


export default function FullReview({review}) {
    const {handleComment} = useContext(UserContext)
    const [data, setData] = useState('')

    const handleData = (e) => {
        setData(e.target.value);
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        handleComment(review, data);
    }
    return (
        <div className="full-review">
            <p className="full-review__text">
            {review.text}
            </p>
            <form className="full-review__form" onSubmit={handlesubmit} >
                <input className="full-review__form_input" type='text'placeholder="comenta" onChange={handleData} />
                <button className="full-review__form_submit">Comentar</button>
            </form>
            <div className="full-review__comments">
                {review.comments.map(cmnt => (
                    <p className='full-review__coments_coment'>{cmnt.text}</p>
                ))}
            </div>
        </div>
    )
}