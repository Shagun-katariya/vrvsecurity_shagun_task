import React, { useEffect, useState } from "react";
import {
  getRoles,
  createUser,
  updateUser,
  getUserById,
} from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import "./UserForm.css";
import Loader from "../loader/Loader.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForm = () => {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Active");
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for form
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchRoles();

    if (id) {
      fetchUser();
      setIsEdit(true);
    }
  }, [id]);

  const fetchRoles = async () => {
    try {
      const { data } = await getRoles();
      setRoles(data);
    } catch (error) {
      toast.error("Error fetching roles")
      console.error("Error fetching roles:", error);
      // setError("Failed to load roles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await getUserById(id);
      setName(data.name);
      setEmail(data.email);
      setRole(data.role._id);
      setStatus(data.status);
    } catch (error) {
      toast.error("Error fetching roles")
      console.error("Error fetching user:", error);
      // setError("Failed to load user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, roleId: role, status };
    setLoading(true);

    try {
      if (isEdit) {
        await updateUser(id, userData);
        toast.success("User update Successfully")
      } else {
        await createUser(userData);
        toast.success("User create Successfully")
      }
      navigate("/users");
    } catch (error) {
      toast.error("Error saving user")
      console.error("Error saving user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>{isEdit ? "Edit" : "Create"} User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter user name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter user email"
              />
            </div>
            <div className="form-group row">
              <div className="form-group">
                <label>Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {isEdit ? "Update" : "Create"} User
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UserForm;
