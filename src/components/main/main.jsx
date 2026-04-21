import FullReview from './reviews/full-review.jsx';
import Review from './reviews/review.jsx'
function Main() {
    return (
        <main>
            <div className='user'>
                <p>Datos de usuario</p>
            </div>
            <section className="reviews">
                <Review/>
            </section>
            <FullReview/>
        </main>
    )
}

export default Main;