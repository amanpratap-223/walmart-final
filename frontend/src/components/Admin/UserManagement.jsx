import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Customer'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    console.log('Adding user:', formData)
    const newUser = { ...formData, id: Date.now() }
    setUsers((prev) => [...prev, newUser])
    setFormData({ name: '', email: '', password: '', role: 'Customer' })
  }

  const handleDelete = (id) => {
    console.log('Deleting user id:', id)
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  const handleRoleChange = (id, newRole) => {
    console.log(`User ${id} role changed to`, newRole)
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Add New User Form */}
      <form onSubmit={handleAddUser} className="space-y-4 mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Add New User</h2>
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="new-password"
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option>Customer</option>
            <option>Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Add User
        </button>
      </form>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="border border-gray-300 rounded p-1"
                    >
                      <option>Customer</option>
                      <option>Admin</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No users added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement
