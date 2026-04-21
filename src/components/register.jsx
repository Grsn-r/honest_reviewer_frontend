import { Link } from "react-router-dom"

export default function Register({children}) {


    return(
        <div className="register">
            <h1 className="register__title">Regístrate</h1>
            <form className="register__form">
                <input className="register__form_input" type="text" required name="name" placeholder="Nombre de usuario" />
                <input className="register__form_input" type="email" required name="email" placeholder="introduce un correo, el que sea" />
                <input className="register__form_input" type="password" required name="password" placeholder="tu contraseña" />
                <Link className="register__link" to="/login" className="register__link">¿Ya eres miembro?, INICIA SESIÓN</Link>
            </form>
            {children}
        </div>
    )
}