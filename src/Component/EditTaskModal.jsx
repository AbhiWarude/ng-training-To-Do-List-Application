import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const EditTaskModal = ({ task, onHide, onSave }) => {
  const [taskData, setTaskData] = useState(task);
  const [error, setError] = useState('');

  useEffect(() => {
    setTaskData(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = () => {
    const { assignedTo, status, priority } = taskData;

    // Validation: Check if Priority, Status, and Assigned To are selected
    if (!assignedTo || !status || !priority) {
      setError('Please select Assigned To, Status, and Priority.');
      return;
    }

    // If validation passes, save the task data
    onSave(taskData);
  };

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group>
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              as="select"
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleChange}
            >
              <option value="">Select user</option>
              <option value="User 1">User 1</option>
              <option value="User 2">User 2</option>
              <option value="User 3">User 3</option>
              <option value="User 4">User 4</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={taskData.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
