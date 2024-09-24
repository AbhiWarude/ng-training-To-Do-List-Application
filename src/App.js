import React, { useState } from 'react';
import Navbar from './Component/Navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Add your custom CSS styles
import { Dropdown } from 'react-bootstrap';
import EditTaskModal from './Component/EditTaskModal'; // Import the Edit Task modal component
import ConfirmationModal from './Component/ConfirmationModal'; // Import the Confirmation modal component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faAngleDoubleUp, faChevronUp, faChevronDown, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State to track current page

  const handleSaveTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.name === updatedTask.name ? updatedTask : task)));
    setShowEditModal(false);
    setTaskToEdit(null);
  };

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setShowConfirmModal(true);
  };

  const confirmDeleteTask = () => {
    setTasks(tasks.filter(task => task !== taskToDelete));
    setShowConfirmModal(false);
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setTaskToDelete(null);
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setShowEditModal(true);
  };

  const handlePageIncrement = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePageDecrement = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const scrollToNextSection = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    window.history.go(-1);
  };

  return (
    <div className="App">
      <Navbar onSaveTask={handleSaveTask} />

      {/* Task List Section */}
      <div className="task-list-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"><i className="fa fa-check-square" aria-hidden="true"></i></th>
              <th scope="col">Assigned To</th>
              <th scope="col">Due Date</th>
              <th scope="col">Priority</th>
              <th scope="col">Comments</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{task.assignedTo}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.description}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-basic">▼</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => openEditModal(task)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteTask(task)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Task Modal */}
      {showEditModal && (
        <EditTaskModal
          task={taskToEdit}
          onHide={() => setShowEditModal(false)}
          onSave={handleEditTask}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmModal}
        onConfirm={confirmDeleteTask}
        onCancel={cancelDelete}
        assignedTo={taskToDelete?.assignedTo}  // Pass the assignedTo user
      />

      {/* Pagination Section */}
      <nav aria-label="Page navigation example" className="mt-3">
        <div className="pagination-container d-flex align-items-center justify-content-between">
          {/* Left Side Pagination Controls */}
          <div className="d-flex align-items-center">
          <div className="page-number-box mx-2">
              <span className="page-number">{currentPage}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30px', border: '1px solid gray', borderRadius: '5px', padding: '2px', backgroundColor: 'lightgray' }}>
          <button 
            className="btn btn-light" 
            onClick={handlePageIncrement} 
            style={{ width: '20px', height: '20px', padding: '0', fontSize: '10px', marginBottom: '2px' }}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <button 
            className="btn btn-light" 
            onClick={handlePageDecrement} 
            style={{ width: '20px', height: '20px', padding: '0', fontSize: '10px' }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
          </div>
    
          {/* Right Side Pagination Controls */}
          <ul className="pagination justify-content-end mb-0">
            <li className="page-item">
              <button className="page-link" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faAngleDoubleUp} /> First
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={goToPreviousPage}>
                <FontAwesomeIcon icon={faChevronLeft} /> Previous
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={scrollToNextSection}>
                {currentPage}
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={scrollToBottom}>
                <FontAwesomeIcon icon={faChevronRight} /> Next
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={scrollToNextSection}>
                <FontAwesomeIcon icon={faAngleDoubleDown} /> Last
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default App;
