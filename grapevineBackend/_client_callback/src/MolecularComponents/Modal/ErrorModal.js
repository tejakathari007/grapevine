import React from 'react'
import { Button , Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';

const ErrorModal = ({message, setErrMessage }) => {
    const handleClose = () => setErrMessage(null);
    return ReactDOM.createPortal(
        <Modal show={ message ? true : false} onHide={handleClose} centered={true}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      , document.getElementById('portal')
    );
  }


export default ErrorModal;

