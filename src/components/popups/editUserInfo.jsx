import { useContext, useState } from "react"
import UserContext from "../../context/userContext"

export default function EditUserInfo() {

    const {user, setUser, handleUpdateInfo} = useContext(UserContext);

    const [data, setData] = useState({name:'', bio:''})

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
            <input className="popup__form_input" type="text" name="name"  onChange={handleData}/>
            <input className="popup__form_input" type="text" name="bio" onChange={handleData} />
            <button className="popup__form_button" >Guardar</button>
        </form>
    )
}