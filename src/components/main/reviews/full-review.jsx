import back from '../../../images/back.svg'
export default function FullReview() {
    return (
        <div className="full-review">
            <img className='full-review__close' src={back} alt="cerrar review"/>
            <strong className="full-review__title">review title</strong>
            <p className="full-review__text">
               Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque diam habitasse vulputate, viverra sagittis dictum pretium aliquet fringilla eleifend per pulvinar elementum. Auctor nascetur vivamus convallis scelerisque augue habitant suscipit, gravida praesent pretium placerat arcu varius est, malesuada nec iaculis luctus mi litora. Ut duis blandit consequat metus dictum elementum vulputate vestibulum nisi, semper montes nascetur mollis aliquam est aenean fames.
            </p>
            <form className="full-review__form">
                <input className="full-review__form_input" type='text'placeholder="Comenta" />
                <button className="full-review__form_submit">Comentar</button>
            </form>
            <div className="full-review__comments"></div>
        </div>
    )
}