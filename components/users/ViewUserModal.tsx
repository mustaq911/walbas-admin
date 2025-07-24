import { Button } from "@/components/ui/button";

type User = {
  id: number;
  username: string;
  email: string | null;
  password: string;
};

type ViewUserModalProps = {
  user: User;
  onClose: () => void;
  onEdit: () => void;
};

export default function ViewUserModal({ user, onClose, onEdit }: ViewUserModalProps) {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{user.username}</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Email:</span> {user.email || "Not specified"}
            </div>
            <div>
              <span className="font-medium">User ID:</span> {user.id}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={onEdit}>Edit User</Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}