import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import closeIcon from '../assets/delete.png';
import './css/modal.css';

const ModalWindow = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const {
    withOpenButton,
    openButtonText,
    children
  } = props;

  const handleModalOpen = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // Pass state of modal and ability to change it to modal children
  const childrenWithProps = React.Children.map(
    children,
    child => React.cloneElement(child, { modalIsOpen, setModalIsOpen })
  );

  return (
    <section className="modal-container">
      {withOpenButton && (
        <button
          className="modal-open-button"
          type="button"
          onClick={handleModalOpen}
        >
          {openButtonText}
        </button>
      )}
      <ReactModal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        contentLabel="Form Modal"
      >
        <button
          className="modal-close-button"
          type="button"
          onClick={handleModalOpen}
        >
          <img
            className="icon icon-delete"
            alt="close modal icon"
            src={closeIcon}
          />
        </button>
        {childrenWithProps}
      </ReactModal>
    </section>
  );
};

ModalWindow.propTypes = {
  withOpenButton: PropTypes.bool,
  openButtonText: PropTypes.string,
  children: PropTypes.object.isRequired
};

ModalWindow.defaultProps = {
  withOpenButton: false,
  openButtonText: ''
};

export default ModalWindow;
