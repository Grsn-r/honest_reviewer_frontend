import { useContext, useState } from "react";
import UserContext from "../../context/userContext";

export default function PostReviewPopup() {

    const {handlePostReview} = useContext(UserContext);

    const [data, setData] = useState({title: '', text: '', picture: null});

    let buttonclass = 'popup__form_button'

    if (data.picture === null ) {
        buttonclass += ' popup__form_button-disabled'
    }
    if (data.text.trim() === '' && data.title.trim() === '') {
        buttonclass += ' popup__form_button-disabled'
    }

    const handleData = (e) => {
    const {name, value} = e.target;
    setData(prev => ({
        ...prev, [name]:value,
        }))
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setData(prev => ({
            ...prev, picture: file,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePostReview(data);
    }

    return (
        <form className="popup__form" onSubmit={handleSubmit} >
            <input className="popup__form_input" 
            type="text" 
            name="title" 
            placeholder="Título de la reseña" 
            maxLength={50} 
            minLength={5} 
            onChange={handleData} />
            <input className="popup__form_input" 
            type="file" 
            name="picture" 
            placeholder="sube una imágen (5mb max)" 
            accept="image/*" 
            onChange={handleFile} />
            <textarea className="popup__form_input text" 
            rows={3}
            name="text" 
            maxLength={400}
            placeholder="tienes 400 caracteres, aprovéchalos"
            onChange={handleData} />
            <button className={buttonclass}>Publicar</button>
        </form>
    )
}