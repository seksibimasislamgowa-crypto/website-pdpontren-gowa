import React from 'react';
import { useAuth } from '../context/AppContext';

interface AdminControlsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  addLabel?: string;
  className?: string;
}

export const AdminControls: React.FC<AdminControlsProps> = ({ onEdit, onDelete, onAdd, addLabel = "Tambah Baru", className = '' }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  return (
    <div className={`flex items-center gap-2 mt-4 ${className}`}>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1 bg-kemenag-green hover:bg-kemenag-green-dark text-white font-bold py-1 px-3 rounded-md text-sm transition-colors"
        >
          <ion-icon name="add-circle-outline"></ion-icon>
          {addLabel}
        </button>
      )}
       {onEdit && (
        <button
          onClick={onEdit}
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md text-sm transition-colors"
        >
          <ion-icon name="create-outline"></ion-icon>
          Edit
        </button>
       )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md text-sm transition-colors"
        >
          <ion-icon name="trash-outline"></ion-icon>
          Hapus
        </button>
      )}
    </div>
  );
};
