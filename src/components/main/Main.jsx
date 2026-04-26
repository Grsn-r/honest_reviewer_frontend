
import Review from './reviews/Review';
import {Children, useContext} from 'react';
import UserContext from '../../context/userContext';
import edit from '../../images/edit.svg';
import setPw from '../../images/setPw.svg';
import Popup from '../popups/Popup';
import EditUserInfo from '../popups/EditUserInfo';
import SetPasswordPopup from '../popups/SetPasswordPopup';
import PostReviewPopup from '../popups/PostReviewPopup';

function Main({onOpenPopup}) {
    const {user, popup, handleClosePopup, reviews} = useContext(UserContext);
    
    const editUserPopup = {title:'Modifica tus datos', children:<EditUserInfo/>}
    const setPasswordPopup = {title: 'Cabia tu contraseña', children: <SetPasswordPopup/>}
    const postReview = {title: 'Haz una reseña', children: <PostReviewPopup/>}

    return (
        <main>
            <section className='user'>
                <div className='user__info'>
                    <p className='user__info_name'>{user.name}</p>
                    <img className='user__info_edit' src={edit} alt='edit' onClick={() => onOpenPopup(editUserPopup)} />
                    <img className='user__info_edit' src={setPw} alt='edit' onClick={() => onOpenPopup(setPasswordPopup)}/>
                </div>
                <button className='user__review-button' onClick={()=> onOpenPopup(postReview)} ></button>
                <p className='user__bio'>{user.bio}</p>
            </section>
            <section>
                <ul className="reviews">
                    {reviews.map(rv => (
                        <Review 
                        key={rv._id}
                        review={rv} 
                        />
                    )
                    )}
                </ul>
            </section>
            {popup && (<Popup
            onClose={handleClosePopup}
            title={popup.title}>
                {popup.children}
            </Popup>
            )}
        </main>
    )
}

export default Main;