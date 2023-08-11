import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const ModalView = (props) => {

    const { openModal, currentValue } = props;
    return (
        <div className='show-book-modal-view'>
            <div className='book-modal-view'>
                <span className='modal-cross-icon' onClick={() => openModal(false)}><RxCrossCircled /></span>
                <img className='book-image-modal-view' src={currentValue.photo} alt='book img not show' />
                <h3 className='book-name'>{currentValue.bookName}</h3>
                <span className='book-author'>{currentValue.author}</span>
                <p className="discription">{currentValue.description}</p>
                <button className="button-close-reading" onClick={() => openModal(false)}>Close</button>
                <button className="button-close-reading continue-button" onClick={() => openModal(false)}>Continue Reading</button>
            </div>
        </div>
    )
};

export default ModalView;