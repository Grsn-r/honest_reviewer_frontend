import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register({children, handleRegister}) {

const [data, setData] = useState({name:'', email:'', password:''});

const handleData = (e) => {
    const {name, value} = e.target;
    setData(prev => ({
        ...prev, [name]:value,
    }))
};

const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(data);
}

    return(
        <div className="register">
            <h1 className="register__title">Regístrate</h1>
            <form className="register__form" onSubmit={handleSubmit}>
                <input className="register__form_input" type="text" required name="name" placeholder="Nombre de usuario" onChange={handleData} />
                <input className="register__form_input" type="email" required name="email" placeholder="introduce un correo, el que sea" onChange={handleData}/>
                <input className="register__form_input" type="password" required name="password" placeholder="tu contraseña" onChange={handleData}/>
                <button className="register__button">Registrarse</button>
                <Link className="register__link" to="/login" className="register__link">¿Ya eres miembro?, INICIA SESIÓN</Link>
            </form>
            {children}
        </div>
    )
}