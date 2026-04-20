import image from '../../../images/review_sample.jpg'

function Review(props) {
    return (
        <div className="review">
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