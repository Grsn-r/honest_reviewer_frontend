import image from '../../../images/review_sample.jpg';
import dlt from '../../../images/delete.svg';
import { useContext } from 'react';
import UserContext from '../../../context/userContext';

function Review(props) {
    const {handleReviewDelete} = useContext(UserContext);
    const {onReviewClick, review} = props;
    const {title, text, pictureUrl} = review;
    return (
        <div className="review">
            <img className='review__delete' src={dlt} alt='borrar reseña' onClick={() => handleReviewDelete(review)} />
            <p className="review__title">{title}</p>
            <img className="review__image" src={pictureUrl} alt='review image' />
            <div className='review__footer'>
                <button className='review__footer_reaction'>🚬</button>
                <button className='review__footer_reaction'>💔</button>
            </div>
        </div>
    )
}

export default Review;