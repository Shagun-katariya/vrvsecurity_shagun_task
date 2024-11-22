import React, { useEffect, useState, useCallback } from "react";
import { getRoles, deleteRole } from "../../services/api";
import { Link } from "react-router-dom";
import "./RoleList.css";
import Loader from "../loader/Loader.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getRoles();
      setRoles(data);
    } catch (err) {
      toast.error("Error fetching roles");
      console.error("Error fetching roles:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    setLoading(true); // Set loading state while deleting
    try {
      await deleteRole(id);
      setRoles((prevRoles) => prevRoles.filter((role) => role._id !== id)); // Optimistic UI update
      toast.success("Role delete Successfully");
    } catch (err) {
      toast.error("Error deleting role");
      console.error("Error deleting role:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <div className="role-list">
      {loading ? (
        <Loader /> // Show loader while fetching
      ) : (
        <>
          <div className="role-list-header">
            <button className="add-btn">
              <Link to="/roles/create">Add New Role</Link>
            </button>
          </div>
          <table className="role-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Permissions</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.length === 0 ? (
                <tr>
                  <td colSpan="4">No roles available</td>
                </tr>
              ) : (
                roles.map((role) => (
                  <tr key={role._id}>
                    <td>{role.name}</td>
                    <td>{role.permissions.join(", ")}</td>
                    <td>{role.description}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(role._id)}
                      >
                        Delete
                      </button>
                      <Link to={`/roles/edit/${role._id}`} className="edit-btn">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default RoleList;
