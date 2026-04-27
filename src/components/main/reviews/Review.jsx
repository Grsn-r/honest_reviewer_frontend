import dlt from '../../../images/delete.svg';
import { useContext, useState } from 'react';
import UserContext from '../../../context/userContext';

function Review(props) {
    
    const {handleReviewDelete, handlePopup, handleLike, handleDislike} = useContext(UserContext);
   
    const {review} = props;

    const {title, text, pictureUrl, comments, likes, dislikes} = review;

    const getFullReview = () => {
        handlePopup({reviewId: review._id});
    }

    return (
        <div className="review">
            <img className='review__delete' src={dlt} alt='borrar reseña' onClick={() => handleReviewDelete(review)} />
            <p className="review__title">{title}</p>
            <img className="review__image" src={pictureUrl} alt='review image' onClick={() => getFullReview()} />
            <div className='review__footer'>
                <button className='review__footer_like' onClick={() => handleLike(review._id)} >🚬 {likes.length}</button>
                <button className='review__footer_dislike' onClick={() => handleDislike(review._id)} >{dislikes.length}💔</button>
            </div>
        </div>
    )
}

export default Review;