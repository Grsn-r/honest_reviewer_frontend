import FullReview from './full-review.jsx';
import Review from './review.jsx'
import {Children, useContext} from 'react';
import UserContext from '../../../context/userContext.js';
import edit from '../../../images/edit.svg';
import Popup from '../../popups/Popup.jsx';
import EditUserInfo from '../../popups/editUserInfo.jsx';

function Main({onOpenPopup}) {
    const {user, popup, handleClosePopup} = useContext(UserContext);
    
    const editUserPopup = {title:'Modifica tus datos', children:<EditUserInfo/>}

    return (
        <main>
            <section className='user'>
                <div className='user__info'>
                    <p className='user__info_name'>{user.name}</p>
                    <img className='user__info_edit' src={edit} alt='edit' onClick={() => onOpenPopup(editUserPopup)} />
                </div>
                <p className='user__bio'>{user.bio}</p>
            </section>
            <section className="reviews">
                <Review/>
            </section>
            <FullReview/>
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