import React from "react";

const TableRow = ({
  id_user,
  username,
  name,
  last_name,
  email,
  telephone,
  permission,
  handleDelete,
  handleUpdate,
  handleView,
}) => {
  const userPermission = localStorage.getItem("user_permission");

  return (
    <tr>
      <td>{id_user}</td>
      <td>{username}</td>
      <td>{name}</td>
      <td>{last_name}</td>
      <td>{email}</td>
      <td>{telephone}</td>
      <td>{permission}</td>
      <td>
        <button
          onClick={() => handleView(id_user)}
          className="btn btn-outline-success btn-sm mr-2"
        >
          View
        </button>

        {(userPermission === "Admin" ||
          (userPermission === "User" && permission !== "Admin")) && (
          <button
            onClick={() => handleUpdate(id_user)}
            className="btn btn-outline-info btn-sm ml-1 mr-2"
          >
            Update
          </button>
        )}

        {userPermission === "Admin" && (
          <button
            onClick={() => handleDelete(id_user)}
            className="btn btn-outline-danger btn-sm mr-2"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
