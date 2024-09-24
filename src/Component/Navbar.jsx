import React, { useState } from 'react';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTasks, FaPlus, FaSync } from 'react-icons/fa';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const Navbar = ({ onSaveTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState({
    name: '',
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    description: '',
  });
  const [error, setError] = useState('');

  const handleModalOpen = () => {
    setTaskData({
      name: '',
      assignedTo: '',
      status: '',
      dueDate: '',
      priority: '',
      description: '',
    });
    setError('');
    setShowModal(true);
  };

  const handleModalClose = () => {
    setError('');
    setShowModal(false);
  };

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
    onSaveTask(taskData);
    handleModalClose();
    setTaskData({
      name: '',
      assignedTo: '',
      status: '',
      dueDate: '',
      priority: '',
      description: '',
    });
  };

  return (
    <div className="navbar-container">
      {/* First Row: Left Multi-select Icon, Task Name, and Buttons */}
      <div className="navbar-row">
        <div className="left-section">
          <FaTasks className="multi-select-icon" />
          <span className="task-name">Task</span>
        </div>
        
        <div className="right-section">
          <button className="btn btn-primary new-task-btn" onClick={handleModalOpen}>
            <FaPlus /> New Task
          </button>
          <button className="btn btn-secondary refresh-btn" onClick={() => window.location.reload()}>
            <FaSync /> Refresh
        </button>

        </div>
      </div>

      {/* Second Row: Search Bar */}
      <div className="navbar-row search-bar-row">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search tasks..."
        />
      </div>

      {/* Modal for creating/updating tasks */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <div className="row">
              <Form.Group className="col-md-6">
                <Form.Label><span className="required">*</span> Assigned To</Form.Label>
                <Form.Control
                  as="select"
                  name="assignedTo"
                  value={taskData.assignedTo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select user</option>
                  <option value="User 1">User 1</option>
                  <option value="User 2">User 2</option>
                  <option value="User 3">User 3</option>
                  <option value="User 4">User 4</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label><span className="required">*</span> Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Process">In Process</option>
                  <option value="Completed">Completed</option>
                </Form.Control>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="col-md-6">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={taskData.dueDate}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label><span className="required">*</span> Priority</Form.Label>
                <Form.Control
                  as="select"
                  name="priority"
                  value={taskData.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select priority</option>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </Form.Control>
              </Form.Group>
            </div>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={taskData.description}
                onChange={handleChange}
                placeholder="Enter task description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Navbar;
