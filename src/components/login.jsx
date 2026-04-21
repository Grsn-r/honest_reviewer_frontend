import { Link } from "react-router-dom"

export default function Login({children}) {


    return(
        <div className="login">
            <h1 className="login__title">Inicia sesión</h1>
            <form className="login__form">
                <input className="login__form_input" type="email" required name="email" placeholder="tu correo" />
                <input className="login__form_input" type="password" required name="password" placeholder="tu contraseña" />
                <Link className="login__link" to="/register" className="login__link">¿no tienes cuenta?, REGÍSTRATE</Link>
            </form>
            {children}
        </div>
    )
}