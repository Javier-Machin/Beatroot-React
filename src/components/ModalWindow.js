import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import closeIcon from '../assets/delete.png';
import './css/modal.css';

const ModalWindow = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const {
    withOpenButton,
    openButtonText,
    tracks,
    children
  } = props;

  const handleModalOpen = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // Any change on tracks will close the modal, meaning a new track has been created or edited
  // useEffect(() => {
  //   if (modalIsOpen) {
  //     setModalIsOpen(false);
  //   }
  // }, [tracks]);

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
        {children}
      </ReactModal>
    </section>
  );
};

ModalWindow.propTypes = {
  tracks: PropTypes.array.isRequired,
  withOpenButton: PropTypes.bool,
  openButtonText: PropTypes.string,
  children: PropTypes.object.isRequired
};

ModalWindow.defaultProps = {
  withOpenButton: false,
  openButtonText: ''
};

export default ModalWindow;
