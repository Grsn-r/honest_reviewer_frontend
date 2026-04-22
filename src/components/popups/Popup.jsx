function Popup(props) {
    const {onClose, title, children} = props;
    return (
        <div className="popup">
            <div className="popup__content">
                <button type="button" className="popup__close" aria-label="Close modal" onClick={onClose} />
                <h3 className="popup__title">{title}</h3>
                {children}
            </div>
        </div>
    )
};

export default Popup;