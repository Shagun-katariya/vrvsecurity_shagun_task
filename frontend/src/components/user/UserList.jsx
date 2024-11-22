import React, { useEffect, useState, useCallback } from "react";
import {
  getUsers,
  deleteUser,
  searchUsers,
  getRoles,
} from "../../services/api";
import { Link } from "react-router-dom";
import "./UserList.css";
import Loader from "../loader/Loader.jsx";
import { FaSyncAlt } from "react-icons/fa";
import { debounce } from "lodash"; // Debounce utility
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // General loading state
  const [searchLoading, setSearchLoading] = useState(false); // Separate loading state for search
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [noUsersFound, setNoUsersFound] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // Fetch roles data
  const fetchRoles = useCallback(async () => {
    try {
      const { data } = await getRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, []);

  // Fetch users based on filters
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getUsers();
      setUsers(data);
      if (data.length == 0) {
        setNoUsersFound(true);
      }
    } catch (error) {
      toast.error("Error fetching users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle deleting a user
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteUser(id);
      fetchUsers(); // Fetch users after deletion
      toast.success("User delete successfully");
    } catch (error) {
      toast.error("Error deleteing user");
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle resetting the search and filters
  const handleResetSearch = () => {
    setStatus("");
    setRole("");
    setSearch("");
    fetchUsers();
    setNoUsersFound(false);
  };

  // Handle search with debounce
  const handleSearch = useCallback(
    debounce(async () => {
      setSearchLoading(true);
      try {
        const filteredUsers = await searchUsers({
          status,
          role,
          name: search,
        });

        const usersWithFullRole = filteredUsers.data.users.map((user) => {
          const roleObj = roles.find((role) => role._id === user.role);
          return {
            ...user,
            role: roleObj || {
              _id: user.role,
              name: "Unknown",
              permissions: [],
            },
          };
        });

        setUsers(usersWithFullRole);
        setNoUsersFound(usersWithFullRole.length === 0);
      } catch (error) {
        toast.error("Error fetching filtered users");
        console.error("Error fetching filtered users:", error);
      } finally {
        setSearchLoading(false);
      }
    }, 500), // Delay of 500ms before triggering the API call
    [roles, search, status, role]
  );

  return (
    <div className="user-list">
      {loading || searchLoading ? (
        <Loader />
      ) : (
        <>
          <div className="search-header">
            <button className="add-btn">
              <Link to="/users/create">Add New User</Link>
            </button>

            <div className="search-container">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="status-dropdown"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="role-dropdown"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Search by username"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="search-input"
              />

              <div className="button-wrapper">
                <button onClick={handleSearch} className="search-btn">
                  Search
                </button>
                <button onClick={handleResetSearch} className="refresh-btn">
                  <FaSyncAlt size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="user-cards">
            {noUsersFound ? (
              <div className="no-users-container">
                <p className="no-users-message">No User Found</p>
              </div>
            ) : (
              users.map((user) => (
                <div className="user-card" key={user._id}>
                  <div className="user-info">
                    <h3>{user?.name || "No name available"}</h3>{" "}
                    {/* Optional chaining */}
                    <p>Email: {user?.email || "No email available"}</p>
                    <p>Role: {user?.role?.name || "No role available"}</p>{" "}
                    {/* Optional chaining */}
                    <p>Status: {user?.status || "No status available"}</p>
                  </div>
                  <div className="user-actions">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/users/edit/${user._id}`} className="edit-btn">
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
