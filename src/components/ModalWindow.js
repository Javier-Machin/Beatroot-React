import React, { useState } from 'react';
import ReactModal from 'react-modal';
import TrackForm from './TrackForm';
import './css/modal.css';

const ModalWindow = (props) => {
  const { track } = props;
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleModalOpen = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <section className="modal-container">
      <button
        className="modal-open-button"
        type="button"
        onClick={handleModalOpen}
      >
        Add New Track
      </button>
      <ReactModal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        contentLabel="Form Modal"
      >
        <button type="button" onClick={handleModalOpen}>
            Close Modal
        </button>
        <TrackForm track={track} />
      </ReactModal>
    </section>
  );
};

export default ModalWindow;
