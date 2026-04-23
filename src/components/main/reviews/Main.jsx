import FullReview from './full-review.jsx';
import Review from './review.jsx'
import {Children, useContext} from 'react';
import UserContext from '../../../context/userContext.js';
import edit from '../../../images/edit.svg';
import setPw from '../../../images/setPw.svg';
import Popup from '../../popups/Popup.jsx';
import EditUserInfo from '../../popups/editUserInfo.jsx';
import SetPasswordPopup from '../../popups/SetPasswordPopup.jsx';

function Main({onOpenPopup}) {
    const {user, popup, handleClosePopup} = useContext(UserContext);
    
    const editUserPopup = {title:'Modifica tus datos', children:<EditUserInfo/>}
    const setPasswordPopup = {title: 'Cabia tu contraseña', children: <SetPasswordPopup/>}

    return (
        <main>
            <section className='user'>
                <div className='user__info'>
                    <p className='user__info_name'>{user.name}</p>
                    <img className='user__info_edit' src={edit} alt='edit' onClick={() => onOpenPopup(editUserPopup)} />
                    <img className='user__info_edit' src={setPw} alt='edit' onClick={() => onOpenPopup(setPasswordPopup)}/>
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