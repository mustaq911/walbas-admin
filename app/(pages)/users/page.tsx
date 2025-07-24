"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import AppContent from "@/components/admin/content/app-content";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserList from "@/components/users/UserList";
import CreateUserForm from "@/components/users/CreateUserForm";
import ViewUserModal from "@/components/users/ViewUserModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type User = {
  id: number;
  username: string;
  email: string | null;
  password: string;
};

export default function UserPage() {
  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<"create" | "edit" | "view" | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/user/all");
      if (Array.isArray(response.data)) {
        setUsers(
          response.data.map((u: any) => ({
            id: Number(u.id) || 0,
            username: u.username || "Unknown",
            email: u.email || null,
            password: u.password || "",
          }))
        );
      } else {
        setError("Invalid API response format");
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      setError(error.response?.data?.message || "Failed to load users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (data: any) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    if (data.email) formData.append("email", data.email);

    try {
      const response = await axios.post("/user/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUsers([...users, response.data]);
      setModalOpen(null);
    } catch (error) {
      throw error;
    }
  };

  const handleEditUser = async (data: any) => {
    if (!selectedUser) return;
    const formData = new FormData();
    formData.append("id", selectedUser.id.toString());
    formData.append("username", data.username);
    formData.append("password", data.password);
    if (data.email) formData.append("email", data.email);

    try {
      const response = await axios.post("/user/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUsers(users.map((u) => (u.id === selectedUser.id ? response.data : u)));
      setModalOpen(null);
    } catch (error) {
      throw error;
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setModalOpen("view");
  };

  const handleEditUserOpen = (user: User) => {
    setSelectedUser(user);
    setModalOpen("edit");
  };

  return (
    <AppContent title="Users">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 w-full">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search users..."
            className="pl-8 w-full"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </div>
        <Button onClick={() => setModalOpen("create")} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : (
        <UserList
          searchUser={searchUser}
          users={users}
          setUsers={setUsers}
          onViewUser={handleViewUser}
          onEditUser={handleEditUserOpen}
        />
      )}
      <Dialog open={modalOpen !== null} onOpenChange={() => setModalOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalOpen === "create" ? "Create User" : modalOpen === "edit" ? "Edit User" : "User Details"}
            </DialogTitle>
          </DialogHeader>
          {modalOpen === "view" && selectedUser && (
            <ViewUserModal
              user={selectedUser}
              onClose={() => setModalOpen(null)}
              onEdit={() => setModalOpen("edit")}
            />
          )}
          {(modalOpen === "create" || modalOpen === "edit") && (
            <CreateUserForm
              user={modalOpen === "edit" && selectedUser ? { ...selectedUser } : undefined}
              onSubmit={modalOpen === "create" ? handleCreateUser : handleEditUser}
              onCancel={() => setModalOpen(null)}
              isEdit={modalOpen === "edit"}
            />
          )}
        </DialogContent>
      </Dialog>
    </AppContent>
  );
}