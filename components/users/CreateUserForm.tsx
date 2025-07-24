import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

type User = {
  id?: number;
  username: string;
  email: string | null;
  password: string;
};

type CreateUserFormProps = {
  user?: User;
  onSubmit: (data: User) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
};

export default function CreateUserForm({ user, onSubmit, onCancel, isEdit = false }: CreateUserFormProps) {
  const [formData, setFormData] = useState<User>(
    user || {
      username: "",
      email: "",
      password: "",
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(formData);
    } catch (error: any) {
      setError(error.response?.data?.message || `Failed to ${isEdit ? "update" : "create"} user. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <ScrollArea className="h-[300px]">
        <div className="grid gap-4 py-4 px-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Username
            </Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="col-span-2"
              required
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="password" className="text-left">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="col-span-2"
              required
            />
          </div>
        </div>
      </ScrollArea>
      <div className="flex justify-end gap-4 mt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update User" : "Create User"}
        </Button>
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}