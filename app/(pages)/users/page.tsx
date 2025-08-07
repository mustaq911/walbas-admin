"use client";
import { useState, useEffect } from "react";
import Axi from "@/services/interceptors/Axi";
import Cookies from "js-cookie";
import { toast } from "sonner";
import AppContent from "@/components/admin/content/app-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash, Filter } from "lucide-react";

type User = {
  id: number;
  username: string;
  email: string | null;
  password: string;
  role: string;
};

export default function UserManagementPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState("all");
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "CUSTOMER" });
  const [editUser, setEditUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.warn("No username found in cookies");
      toast.error("User not authenticated. Please log in.");
    }
    fetchRoles();
    fetchUsers();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await Axi.get("/api/user/roles");
      console.log('Fetch roles response:', response.data);
      if (Array.isArray(response.data)) {
        setRoles(response.data);
      } else {
        setError("Invalid roles response format");
        toast.error("Invalid roles response format");
      }
    } catch (error: any) {
      console.error("Error fetching roles:", error);
      toast.error("Failed to load roles");
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Axi.get("/api/user/all");
      console.log('Fetch users response:', response.data);
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setError("Invalid users response format");
        toast.error("Invalid users response format");
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      const message = error.response?.status === 401
        ? "Unauthorized: Invalid or missing token. Please log in again."
        : error.response?.data?.message || "Failed to load users. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleAddUser = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await Axi.post("/api/user/register", {
  //       username: newUser.username,
  //       email: newUser.email,
  //       password: newUser.password,
  //       role: newUser.role,
  //     });
  //     console.log('Add user response:', response.data);
  //     setUsers([...users, response.data]);
  //     setNewUser({ username: "", email: "", password: "", role: "CUSTOMER" });
  //     toast.success("User added successfully");
  //   } catch (error: any) {
  //     console.error("Error adding user:", error);
  //     toast.error(error.response?.data?.message || "Failed to add user");
  //   }
  // };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Axi.get(`/api/user/register?username=${newUser.username}&password=${newUser.password}&email=${newUser.email}&role=${newUser.role}`);
      console.log('Add user response:', response.data);
      setUsers([...users, response.data]);
      setNewUser({ username: "", email: "", password: "", role: "CUSTOMER" });
      toast.success("User added successfully");
    } catch (error: any) {
      console.error("Error adding user:", error);
      toast.error(error.response?.data?.message || "Failed to add user");
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    try {
      const response = await Axi.post("/api/user/update", {
        id: editUser.id,
        username: editUser.username,
        email: editUser.email,
        role: editUser.role,
      });
      console.log('Update user response:', response.data);
      setUsers(users.map(u => u.id === editUser.id ? response.data : u));
      setEditUser(null);
      setModalOpen(false);
      toast.success("User updated successfully");
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await Axi.delete(`/api/user/${id}`);
        setUsers(users.filter(u => u.id !== id));
        toast.success("User deleted successfully");
      } catch (error: any) {
        console.error("Error deleting user:", error);
        toast.error(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const filteredUsers = selectedRole === "all" ? users : users.filter(user => user.role === selectedRole);

  return (
    <AppContent title="User Management">
      {/* {username && (
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Welcome, {username}!</h2>
          <p className="mt-2 text-muted-foreground">Manage users below.</p>
        </div>
      )} */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="p-2 text-left text-sm font-semibold text-gray-700">Username</th>
                  <th className="p-2 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="p-2 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="p-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="p-2 text-sm text-gray-800">{user.id}</td>
                    <td className="p-2 text-sm text-gray-600">{user.username}</td>
                    <td className="p-2 text-sm text-gray-600">{user.email || "N/A"}</td>
                    <td className="p-2 text-sm text-gray-600">{user.role}</td>
                    <td className="p-2 flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setEditUser(user); setModalOpen(true); }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-md w-full max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={editUser ? handleUpdateUser : handleAddUser} className="space-y-4 p-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={editUser?.username || newUser.username}
                  onChange={(e) => editUser ? setEditUser({ ...editUser, username: e.target.value }) : setNewUser({ ...newUser, username: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editUser?.email || newUser.email || ""}
                  onChange={(e) => editUser ? setEditUser({ ...editUser, email: e.target.value }) : setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              {!editUser && (
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={editUser?.role || newUser.role}
                  onValueChange={(value) => editUser ? setEditUser({ ...editUser, role: value }) : setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                {editUser ? "Update User" : "Add User"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppContent>
  );
}