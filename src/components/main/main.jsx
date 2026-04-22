import FullReview from './reviews/full-review.jsx';
import Review from './reviews/review.jsx'
import {useContext} from 'react';
import UserContext from '../../context/userContext.js';

function Main() {
    const {user} = useContext(UserContext);
    console.log(`el nombre es ${user.name}`);
    return (
        <main>
            <section className='user'>
                <p className='user__name'>{user.name}</p>
                <p className='user__bio'>{user.bio}</p>
            </section>
            <section className="reviews">
                <Review/>
            </section>
            <FullReview/>
        </main>
    )
}

export default Main;