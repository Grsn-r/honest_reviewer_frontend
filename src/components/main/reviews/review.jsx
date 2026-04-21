import image from '../../../images/review_sample.jpg';
import dlt from '../../../images/delete.svg';

function Review(props) {
    const {onReviewClick} = props;
    return (
        <div className="review">
            <img className='review__delete' src={dlt} alt='borrar reseña'/>
            <p className="review__title">review title by Autor</p>
            <img className="review__image" src={image} alt='review image' />
            <div className='review__footer'>
                <button className='review__footer_reaction'>🚬</button>
                <button className='review__footer_reaction'>💔</button>
            </div>
        </div>
    )
}

export default Review;