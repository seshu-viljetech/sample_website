import { Dropdown } from 'react-bootstrap'; // Importing Bootstrap Dropdown
import { FaUserCircle } from 'react-icons/fa'; // Font Awesome icon for the
import { useNavigate } from 'react-router-dom';


function Dropdownmenu({ setShowModal, Userdata }) {
    const navigate = useNavigate()
    const handleLogoutAccount = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleEditUser = () => {
        navigate("/edituser"); // You can replace with your edit page
    };

    return (
        <div>
            <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="user-dropdown" className="text-white d-flex align-items-center  fw-semibold text-decoration-none">
                    <FaUserCircle size={40} className="me-2" />
                    <span>{Userdata.name}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleEditUser}>
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item className="" onClick={handleLogoutAccount}>
                        Logout
                    </Dropdown.Item>

                    <Dropdown.Item className="text-danger" onClick={() => setShowModal(true)}>
                        Delete Account
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
export default Dropdownmenu