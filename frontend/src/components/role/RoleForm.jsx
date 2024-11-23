import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createRole, updateRole, getRoleById } from "../../services/api";
import "./RoleForm.css";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select"; // Library for multi-select dropdown
import makeAnimated from "react-select/animated"; // For animation
import Loader from "../loader/Loader.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RoleForm = () => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [customPermissions, setCustomPermissions] = useState([
    { value: "Read", label: "Read" },
    { value: "Write", label: "Write" },
    { value: "Delete", label: "Delete" },
  ]);
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // Separate loading for data fetch
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsFetching(true);
        setIsEdit(true);
        try {
          const { data } = await getRoleById(id);
          setName(data.name);
          setPermissions(
            data.permissions.map((perm) => ({ value: perm, label: perm }))
          );
          setDescription(data.description);
        } catch (error) {
          console.error("Error fetching role:", error);
          toast.error("Error fetching role data");
        } finally {
          setIsFetching(false);
        }
      }
    };

    fetchData();
  }, [id]);

  // Handle permissions selection
  const handlePermissionsChange = useCallback((selectedOptions) => {
    setPermissions(selectedOptions || []);
  }, []);

  // Add custom permissions without submitting the form
  const handleAddCustomPermission = useCallback(
    (e) => {
      if (e.key === "Enter" && e.target.value.trim()) {
        e.preventDefault(); // Prevent form submission on pressing Enter
        const newPermissionValue = e.target.value.trim().toLowerCase();
        const newPermission = {
          value: newPermissionValue,
          label: e.target.value.trim(), // Use the original input for label
        };

        // Check if the permission already exists
        const permissionExists = customPermissions.some(
          (perm) => perm.value.toLowerCase() === newPermissionValue
        );

        if (permissionExists) {
          toast.warning("Permission already exists. Please select it directly");
        } else {
          setCustomPermissions((prevPermissions) => [
            ...prevPermissions,
            newPermission,
          ]);
          setPermissions((prevPermissions) => [
            ...prevPermissions,
            newPermission,
          ]); // Automatically select the newly added permission
        }

        e.target.value = ""; // Clear input field
      }
    },
    [customPermissions, permissions]
  );

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const roleData = {
      name,
      permissions: permissions.map((perm) => perm.value), // Extract permission values
      description,
    };
    

    try {
      if (isEdit) {
        await updateRole(id, roleData);
        toast.success("Role updated successfully!");
      } else {
        await createRole(roleData);
        toast.success("Role created successfully!");
      }
      navigate("/roles");
    } catch (error) {
      console.error("Error saving role:", error);
      toast.error("Error saving role data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const permissionsOptions = useMemo(() => {
    // Normalize the case of selected permissions to lowercase
    const normalizedSelectedPermissions = permissions.map((perm) =>
      perm.value.toLowerCase()
    );

    // Filter out permissions that are already selected and normalize the case of options
    return customPermissions.filter(
      (perm) =>
        !normalizedSelectedPermissions.includes(perm.value.toLowerCase())
    );
  }, [customPermissions, permissions]);

  const loading = isFetching || isSubmitting;

  return (
    <div className="role-form">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>{isEdit ? "Edit" : "Create"} Role</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Role Name"
                required
              />
            </div>
            <div className="form-group permissions-group">
              <label className="permissions-label">Permissions</label>
              <div className="select-container">
                <Select
                  className="react-select-container"
                  options={permissionsOptions}
                  isMulti
                  value={permissions}
                  onChange={handlePermissionsChange}
                  components={animatedComponents}
                  placeholder="Select or add permissions"
                />
              </div>
              <div className="custom-permission-container">
                <input
                  className="custom-permission-input"
                  type="text"
                  placeholder="Add custom permission and press Enter"
                  onKeyDown={handleAddCustomPermission}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
              />
            </div>

            <button type="submit" className="submit-btn">
              {isEdit ? "Update" : "Create"} Role
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default RoleForm;
