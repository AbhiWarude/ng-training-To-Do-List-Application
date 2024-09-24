import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmationModal({ show, onConfirm, onCancel, assignedTo }) {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
      <Modal.Title style={{ backgroundColor: 'red', color: 'white' }}>Delete</Modal.Title>

      </Modal.Header>
      <Modal.Body>
        {`Do you want to delete the task assigned to ${assignedTo}?`}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          No
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
