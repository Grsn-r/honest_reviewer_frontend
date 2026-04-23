
function Header({logged, logout}) {
    return (
        <header className="header">
            <div className="header__text">
                <p className='header__info_element'>DANOS TU OPINIÓN</p>
                <p className='header__info_element'>No te vamos a regañar (tampoco pagar 🙃)</p>
            </div>
            <div className="header__sesion">
                {logged && (<button className="header__sesion_logout" onClick={logout}>Cerrar Sesión</button>)}
            </div>
        </header>
    )
}

export default Header;