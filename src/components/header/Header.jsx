import logo from '../../images/pageLogo.svg'

function Header({logged, logout}) {
    return (
        <header className="header">
             <img src={logo} alt='logo' />
            <div className="header__text">
                <p className='header__info_element'>Haz una reseña HONESTA</p>
            </div>
           
            <div className="header__sesion">
                {logged && (<button className="header__sesion_logout" onClick={logout}>Cerrar Sesión</button>)}
            </div>
        </header>
    )
}

export default Header;