import { Link } from "react-router-dom"
import { useState } from "react";

export default function Login({handleLogin}) {

    const [data, setData] = useState({email:'', password:''});
    
    const handleData = (e) => {
        const {name, value} = e.target;
        setData(prev => ({
            ...prev, [name]:value,
        }))
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(data);
    }


    return(
        <div className="login">
            <h1 className="login__title">Inicia sesión</h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__form_input" type="email" required name="email" placeholder="tu correo" onChange={handleData}/>
                <input className="login__form_input" type="password" required name="password" placeholder="tu contraseña" onChange={handleData}/>
                <button className="register__button">Iniciar sesión</button>
                <Link className="login__link" to="/register" className="login__link">¿no tienes cuenta?, REGÍSTRATE</Link>
            </form>
        </div>
    )
}