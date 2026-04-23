import { useContext, useState } from "react";
import UserContext from "../../context/userContext";

export default function SetPasswordPopup() {

    const {handlesSetPassword} = useContext(UserContext);

    const [data, setData] = useState({password: '', newPassword: ''});

    let buttonClass = 'popup__form_button';

    if (data.password.trim() === '' && data.newPassword.trim() === '') {
        buttonClass += ' popup__form_button-disabled'
    } 

    const handleData = (e) => {
    const {name, value} = e.target;
    setData(prev => ({
        ...prev, [name]:value,
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handlesSetPassword(data);
    }

    return (
        <form className="popup__form" onSubmit={handleSubmit} >
            <input className="popup__form_input" type="password" name="password" placeholder="contraseña actual" onChange={handleData} />
            <input className="popup__form_input" type="password" name="newPassword" placeholder="contraseña nueva" onChange={handleData} />
            <button className={buttonClass} >cambiar contraseña</button>
        </form>
    )
}