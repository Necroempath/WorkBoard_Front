import { useNavigate } from "react-router-dom";
import { authStorage } from "../../auth/auth.storage";

type Props = {
  onClose: () => void;
};

export function UserDropdown({ onClose }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStorage.clearToken();
    onClose();
    navigate("/login");
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-400 rounded-xl shadow-lg p-2 z-50">
      <div className="px-3 py-2 text-sm text-gray-500 border-b">Signed in</div>

      <button
        onClick={handleLogout}
        className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
