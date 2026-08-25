import { useContext } from 'react';
import logo from '../../images/pageLogo.svg'
import UserContext from '../../context/userContext';

function Header({logged, logout}) {

    const frases = [
        "Aquí nadie se salva de una reseña.",
        "La verdad duele... pero tiene estrellas.",
        "¿Película, juego o tu compa? Todo merece opinión.",
        "Califica sin filtros."
    ];

    const frase = frases[Math.floor(Math.random() * frases.length)];

    return (
        <header className="header">
           
            <div className="header__text">
                {frase}
            </div>
           
            <div className="header__sesion">
                {logged && (<button className="header__sesion_logout" onClick={logout}>Cerrar Sesión</button>) }
            </div>
        </header>
    )
}

export default Header;