import back from '../../../images/back.svg'
import { useState } from 'react'


export default function FullReview({review}) {
    const handlesubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="full-review">
            <p className="full-review__text">
            {review.text}
            </p>
            <form className="full-review__form" onSubmit={handlesubmit} >
                <input className="full-review__form_input" type='text'placeholder="Comenta" />
                <button className="full-review__form_submit">Comentar</button>
            </form>
            <div className="full-review__comments"></div>
        </div>
    )
}