import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [updatedRole, setUpdatedRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUsers(res.data.data);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (userId, currentRole) => {
    setEditUserId(userId);
    setUpdatedRole(currentRole);
  };

  const handleSave = async (userId) => {
    try {
      await axios.put(
        `http://localhost:3000/user/${userId}`,
        { role: updatedRole },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: updatedRole } : user
        )
      );
      setEditUserId(null);
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  return (
    <div className="mt-[80px] px-4 flex justify-center">
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-center">User Management</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-emerald-100 text-center">
              <tr>
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Lastname</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="text-sm hover:bg-gray-50 text-center">
                    <td className="p-2 border">{user.username}</td>
                    <td className="p-2 border">{user.name}</td>
                    <td className="p-2 border">{user.lastname}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">
                      {editUserId === user._id ? (
                        <select
                          value={updatedRole}
                          onChange={(e) => setUpdatedRole(e.target.value)}
                          className="border rounded px-1 py-0.5 text-sm"
                        >
                          <option value="user">user</option>
                          <option value="editor">editor</option>
                          <option value="admin">admin</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="p-2 border">
                      <div className="flex justify-center">
                        {editUserId === user._id ? (
                          <button
                            className="text-green-600 hover:underline text-sm"
                            onClick={() => handleSave(user._id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => handleEditClick(user._id, user.role)}
                          >
                            <MdEdit />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
