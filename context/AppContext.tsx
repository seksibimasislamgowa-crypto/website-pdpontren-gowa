
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { VisiMisi, Program, DigitalInnovation, SOP, Institution, InformationSystem, ModalAction, ModalData } from '../types';
import { initialData } from '../data/mockData';

interface AppState {
  visiMisi: VisiMisi;
  programs: Program[];
  innovations: DigitalInnovation[];
  sops: SOP[];
  institutions: Institution[];
  infoSystems: InformationSystem[];
}

interface AuthContextType {
  isAdmin: boolean;
  login: (user: string, pass: string) => void;
  logout: () => void;
}

interface DataContextType {
  appData: AppState;
  updateVisiMisi: (type: 'visi' | 'misi', content: string[]) => void;
  addProgram: (program: Omit<Program, 'id'>) => void;
  updateProgram: (program: Program) => void;
  deleteProgram: (id: string) => void;
  addInnovation: (innovation: Omit<DigitalInnovation, 'id'>) => void;
  updateInnovation: (innovation: DigitalInnovation) => void;
  deleteInnovation: (id: string) => void;
  addSop: (sop: Omit<SOP, 'id'>) => void;
  updateSop: (sop: SOP) => void;
  deleteSop: (id: string) => void;
  addInstitution: (institution: Omit<Institution, 'id'>) => void;
  updateInstitution: (institution: Institution) => void;
  deleteInstitution: (id: string) => void;
  addInfoSystem: (system: Omit<InformationSystem, 'id'>) => void;
  updateInfoSystem: (system: InformationSystem) => void;
  deleteInfoSystem: (id: string) => void;
}

interface ModalContextType {
  openModal: (action: ModalAction, data?: ModalData) => void;
  closeModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const DataContext = createContext<DataContextType | undefined>(undefined);
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const AppContextProvider = ({ children, modalContextValue }: { children: ReactNode, modalContextValue: ModalContextType }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [appData, setAppData] = useState<AppState>(initialData);

  const login = useCallback((user: string, pass: string) => {
    // In a real app, you'd verify credentials
    if (user === 'seksipdpontrengowa' && pass === '11september') {
      setIsAdmin(true);
    }
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
  }, []);

  // CRUD Functions
  const updateVisiMisi = (type: 'visi' | 'misi', content: string[]) => {
    setAppData(prev => ({ ...prev, visiMisi: { ...prev.visiMisi, [type]: content }}));
  };
  
  const addProgram = (program: Omit<Program, 'id'>) => {
    setAppData(prev => ({...prev, programs: [...prev.programs, { ...program, id: Date.now().toString() }]}));
  };

  const updateProgram = (updatedProgram: Program) => {
    setAppData(prev => ({ ...prev, programs: prev.programs.map(p => p.id === updatedProgram.id ? updatedProgram : p)}));
  };

  const deleteProgram = (id: string) => {
    setAppData(prev => ({ ...prev, programs: prev.programs.filter(p => p.id !== id) }));
  };
  
  // Innovation CRUD
    const addInnovation = (innovation: Omit<DigitalInnovation, 'id'>) => {
        setAppData(prev => ({ ...prev, innovations: [...prev.innovations, { ...innovation, id: Date.now().toString() }] }));
    };
    const updateInnovation = (updated: DigitalInnovation) => {
        setAppData(prev => ({ ...prev, innovations: prev.innovations.map(i => i.id === updated.id ? updated : i) }));
    };
    const deleteInnovation = (id: string) => {
        setAppData(prev => ({ ...prev, innovations: prev.innovations.filter(i => i.id !== id) }));
    };

    // SOP CRUD
    const addSop = (sop: Omit<SOP, 'id'>) => {
        setAppData(prev => ({ ...prev, sops: [...prev.sops, { ...sop, id: Date.now().toString() }] }));
    };
    const updateSop = (updated: SOP) => {
        setAppData(prev => ({ ...prev, sops: prev.sops.map(s => s.id === updated.id ? updated : s) }));
    };
    const deleteSop = (id: string) => {
        setAppData(prev => ({ ...prev, sops: prev.sops.filter(s => s.id !== id) }));
    };

    // Institution CRUD
    const addInstitution = (institution: Omit<Institution, 'id'>) => {
        setAppData(prev => ({ ...prev, institutions: [...prev.institutions, { ...institution, id: Date.now().toString() }] }));
    };
    const updateInstitution = (updated: Institution) => {
        setAppData(prev => ({ ...prev, institutions: prev.institutions.map(i => i.id === updated.id ? updated : i) }));
    };
    const deleteInstitution = (id: string) => {
        setAppData(prev => ({ ...prev, institutions: prev.institutions.filter(i => i.id !== id) }));
    };

    // Info System CRUD
    const addInfoSystem = (system: Omit<InformationSystem, 'id'>) => {
        setAppData(prev => ({ ...prev, infoSystems: [...prev.infoSystems, { ...system, id: Date.now().toString() }] }));
    };
    const updateInfoSystem = (updated: InformationSystem) => {
        setAppData(prev => ({ ...prev, infoSystems: prev.infoSystems.map(s => s.id === updated.id ? updated : s) }));
    };
    const deleteInfoSystem = (id: string) => {
        setAppData(prev => ({ ...prev, infoSystems: prev.infoSystems.filter(s => s.id !== id) }));
    };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      <DataContext.Provider value={{ 
          appData, updateVisiMisi, 
          addProgram, updateProgram, deleteProgram,
          addInnovation, updateInnovation, deleteInnovation,
          addSop, updateSop, deleteSop,
          addInstitution, updateInstitution, deleteInstitution,
          addInfoSystem, updateInfoSystem, deleteInfoSystem
      }}>
        <ModalContext.Provider value={modalContextValue}>
          {children}
        </ModalContext.Provider>
      </DataContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within a AppContextProvider');
  return context;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a AppContextProvider');
  return context;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) throw new Error('useModal must be used within a AppContextProvider');
  return context;
};