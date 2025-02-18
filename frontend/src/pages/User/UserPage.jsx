import React, { useState, useEffect } from "react";
import { Table, Alert } from "react-bootstrap";
import TableRow from "../../components/TableRow";
import SearchComponent from "../../components/SearchComponent";
import useUser from "../../hooks/useUser";
import MainLayout from "../../layouts/MainLayout";
import FilterComponent from "../../components/FilterComponent";
import { useNavigate } from "react-router-dom";
import "../../styles/User/user-page.css";

const UserPage = () => {
  const { users, loading, removeUser } = useUser();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [tipoUserFilter, setTipoUserFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const navigate = useNavigate();
  const userPermission = localStorage.getItem("user_permission");

  useEffect(() => {
    if (!users) return;

    const filtered = users?.filter((User) => {
      const matchesTipoUser = tipoUserFilter
        ? User.permission === tipoUserFilter
        : true;
      const matchesSearchTerm = searchTerm
        ? User.username.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchesTipoUser && matchesSearchTerm;
    });

    setFilteredUsers(filtered || []);
  }, [users, tipoUserFilter, searchTerm]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleFilterChange = (filterValue) => {
    setTipoUserFilter(filterValue);
  };

  const handleAddUser = async () => {
    navigate(`/user/add`);
  };

  const handleUpdateUser = async (id_user) => {
    navigate(`/user/update/${id_user}`);
  };

  const handleViewUser = async (id_user) => {
    navigate(`/user/view/${id_user}`);
  };

  const handleDeleteUser = async (id_user) => {
    await removeUser(id_user);
    setAlertMessage("User deleted successfully!");
    setAlertVariant("success");
  };

  const tipoUserOptions = [
    { value: "Admin", label: "Admin" },
    { value: "User", label: "User" },
    { value: "Read", label: "Read" },
  ];

  return (
    <MainLayout>
      <div className="table">
        <div className="header-section">
          <div className="filters-section">
            <FilterComponent
              filterOptions={tipoUserOptions}
              filterLabel="Permission User"
              onFilterChange={handleFilterChange}
              selectedFilter={tipoUserFilter}
            />
          </div>

          <div className="actions-section">
            <SearchComponent
              placeholder="Search users..."
              onSearch={handleSearch}
            />

            {(userPermission === "Admin" || userPermission === "User") && (
              <button
                variant="primary"
                className="custom-button"
                onClick={handleAddUser}
              >
                Add User
              </button>
            )}
          </div>
        </div>

        {alertMessage && (
          <Alert
            className="user-alert-success"
            variant={alertVariant}
            onClose={() => setAlertMessage("")}
          >
            {alertMessage}
          </Alert>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : !Array.isArray(filteredUsers) || filteredUsers.length === 0 ? (
          <Alert className="user-alert-error" variant="warning">
            No users found.
          </Alert>
        ) : (
          <Table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>Permission</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <TableRow
                  id_user={user.id_user}
                  username={user.username}
                  name={user.name}
                  last_name={user.last_name}
                  email={user.email}
                  telephone={user.telephone}
                  permission={user.permission}
                  key={user.id_user}
                  handleView={handleViewUser}
                  handleUpdate={handleUpdateUser}
                  handleDelete={handleDeleteUser}
                />
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </MainLayout>
  );
};

export default UserPage;
