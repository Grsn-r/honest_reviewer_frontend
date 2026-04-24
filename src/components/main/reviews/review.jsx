import image from '../../../images/review_sample.jpg';
import dlt from '../../../images/delete.svg';

function Review(props) {
    const {onReviewClick} = props;
    const {title, text, picture} = review;
    return (
        <div className="review">
            <img className='review__delete' src={dlt} alt='borrar reseña'/>
            <p className="review__title">{title}</p>
            <img className="review__image" src={picture} alt='review image' />
            <div className='review__footer'>
                <button className='review__footer_reaction'>🚬</button>
                <button className='review__footer_reaction'>💔</button>
            </div>
        </div>
    )
}

export default Review;