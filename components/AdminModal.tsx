
import React, { useState, useEffect } from 'react';
import { useData } from '../context/AppContext';
import { ModalAction, ModalData, Program, DigitalInnovation, SOP, Institution, InformationSystem, InstitutionCategory } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: ModalAction | null;
  initialData?: ModalData;
}

const isProgram = (data: any): data is Program => data && 'title' in data && 'icon' in data;
const isInnovation = (data: any): data is DigitalInnovation => data && 'name' in data && 'link' in data;
const isSop = (data: any): data is SOP => data && 'fileUrl' in data;
const isInstitution = (data: any): data is Institution => data && 'category' in data;
const isInfoSystem = (data: any): data is InformationSystem => data && 'name' in data && 'logo' in data;
const isVisiMisi = (data: any): data is { type: 'visi' | 'misi', content: string[] } => data && 'type' in data && 'content' in data;

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, action, initialData }) => {
  const { 
    updateVisiMisi, 
    addProgram, updateProgram, deleteProgram,
    addInnovation, updateInnovation, deleteInnovation,
    addSop, updateSop, deleteSop,
    addInstitution, updateInstitution, deleteInstitution,
    addInfoSystem, updateInfoSystem, deleteInfoSystem
  } = useData();

  const [formData, setFormData] = useState<any>({});
  const [visiMisiText, setVisiMisiText] = useState('');

  useEffect(() => {
    if (initialData) {
      if(isVisiMisi(initialData)) {
        setVisiMisiText(initialData.content.join('\n'));
      } else {
        setFormData(initialData);
      }
    } else {
      setFormData({});
      setVisiMisiText('');
    }
  }, [initialData, isOpen]);

  if (!isOpen || !action) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    switch(action) {
        case 'edit-visi':
            updateVisiMisi('visi', visiMisiText.split('\n').filter(line => line.trim() !== ''));
            break;
        case 'edit-misi':
            updateVisiMisi('misi', visiMisiText.split('\n').filter(line => line.trim() !== ''));
            break;
        case 'add-program':
            addProgram(formData);
            break;
        case 'edit-program':
            updateProgram(formData as Program);
            break;
        case 'delete-program':
            if(isProgram(initialData)) deleteProgram(initialData.id);
            break;
        case 'add-inovasi':
            addInnovation(formData);
            break;
        case 'edit-inovasi':
            updateInnovation(formData as DigitalInnovation);
            break;
        case 'delete-inovasi':
            if(isInnovation(initialData)) deleteInnovation(initialData.id);
            break;
        case 'add-sop':
            addSop(formData);
            break;
        case 'edit-sop':
            updateSop(formData as SOP);
            break;
        case 'delete-sop':
            if(isSop(initialData)) deleteSop(initialData.id);
            break;
        case 'add-lembaga':
            addInstitution(formData);
            break;
        case 'edit-lembaga':
            updateInstitution(formData as Institution);
            break;
        case 'delete-lembaga':
            if(isInstitution(initialData)) deleteInstitution(initialData.id);
            break;
        case 'add-sistem':
            addInfoSystem(formData);
            break;
        case 'edit-sistem':
            updateInfoSystem(formData as InformationSystem);
            break;
        case 'delete-sistem':
            if(isInfoSystem(initialData)) deleteInfoSystem(initialData.id);
            break;
    }
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const renderFormFields = () => {
    if (action?.startsWith('edit-visi') || action?.startsWith('edit-misi')) {
        return <textarea name="content" value={visiMisiText} onChange={(e) => setVisiMisiText(e.target.value)} className="w-full p-2 border rounded min-h-[200px]" placeholder="Satu poin per baris"></textarea>;
    }
    if (action?.includes('program')) {
      return (
        <>
          <input name="title" value={formData.title || ''} onChange={handleChange} placeholder="Judul Program" className="w-full p-2 border rounded" />
          <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Deskripsi" className="w-full p-2 border rounded"></textarea>
          <input name="icon" value={formData.icon || ''} onChange={handleChange} placeholder="Nama Ionicon (e.g., ribbon-outline)" className="w-full p-2 border rounded" />
        </>
      );
    }
    if (action?.includes('inovasi') || action?.includes('sistem')) {
      return (
        <>
          <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Nama" className="w-full p-2 border rounded" />
          <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Deskripsi" className="w-full p-2 border rounded"></textarea>
          <input name="link" value={formData.link || ''} onChange={handleChange} placeholder="URL/Link" className="w-full p-2 border rounded" />
          <input name="logo" value={formData.logo || ''} onChange={handleChange} placeholder="URL Logo" className="w-full p-2 border rounded" />
        </>
      );
    }
    if (action?.includes('sop')) {
        return (
          <>
            <input name="title" value={formData.title || ''} onChange={handleChange} placeholder="Judul SOP" className="w-full p-2 border rounded" />
            <input name="fileUrl" value={formData.fileUrl || ''} onChange={handleChange} placeholder="URL File" className="w-full p-2 border rounded" />
          </>
        );
    }
    if (action?.includes('lembaga')) {
        return (
          <>
            <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Nama Lembaga" className="w-full p-2 border rounded" />
            <textarea name="address" value={formData.address || ''} onChange={handleChange} placeholder="Alamat" className="w-full p-2 border rounded"></textarea>
            <input name="leader" value={formData.leader || ''} onChange={handleChange} placeholder="Nama Pimpinan" className="w-full p-2 border rounded" />
            <select name="category" value={formData.category || ''} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Pilih Kategori</option>
                {Object.values(InstitutionCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </>
        );
    }
    return null;
  };
  
  const isDeleteAction = action?.startsWith('delete');
  const title = action?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className={`text-2xl font-bold mb-4 ${isDeleteAction ? 'text-red-600' : 'text-gray-800'}`}>{title}</h2>
        {isDeleteAction ? (
          <p>Apakah Anda yakin ingin menghapus item ini?</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {renderFormFields()}
          </form>
        )}
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Batal</button>
          <button onClick={handleSubmit} className={`${isDeleteAction ? 'bg-red-500 hover:bg-red-700' : 'bg-kemenag-green hover:bg-kemenag-green-dark'} text-white font-bold py-2 px-4 rounded`}>
            {isDeleteAction ? 'Hapus' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
};
