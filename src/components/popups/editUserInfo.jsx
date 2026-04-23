import { useContext, useState } from "react"
import UserContext from "../../context/userContext"

export default function EditUserInfo() {

    const {user, handleUpdateInfo} = useContext(UserContext);

    const [data, setData] = useState({name:'', bio:''})

    let buttonClass = 'popup__form_button';

    if (data.name.trim() === '' && data.bio.trim() === '') {
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
        handleUpdateInfo({name: data.name ? data.name : user.name, bio: data.bio ? data.bio : user.bio });
    }

    return (
        <form className="popup__form" onSubmit={handleSubmit}>
            <input className="popup__form_input" type="text" name="name" placeholder="Nuevo nombre o alias" onChange={handleData}/>
            <input className="popup__form_input" type="text" name="bio" placeholder="escribe algo sobre tí" onChange={handleData} />
            <button className={buttonClass} >Guardar</button>
        </form>
    )
}