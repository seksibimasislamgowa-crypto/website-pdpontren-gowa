

import React, { useState, useCallback, useMemo } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AppContextProvider, useAuth } from './context/AppContext';
import { HomePage, VisiMisiPage, StrukturOrganisasiPage, ProgramUnggulanPage, InovasiDigitalPage, SOPPage, LembagaPendidikanPage, SistemInformasiPage } from './pages';
import { AdminModal } from './components/AdminModal';
import { ModalAction, ModalData } from './types';

const navLinks = [
  { path: '/', label: 'Beranda', icon: 'home-outline' },
  { path: '/visi-misi', label: 'Visi & Misi', icon: 'flag-outline' },
  { path: '/struktur-organisasi', label: 'Struktur Organisasi', icon: 'people-outline' },
  { path: '/program-unggulan', label: 'Program Unggulan', icon: 'ribbon-outline' },
  { path: '/inovasi-digital', label: 'Inovasi Digital', icon: 'hardware-chip-outline' },
  { path: '/sop', label: 'SOP', icon: 'document-text-outline' },
  { path: '/lembaga-pendidikan', label: 'Lembaga Pendidikan', icon: 'school-outline' },
  { path: '/sistem-informasi', label: 'Sistem Informasi', icon: 'server-outline' },
];

const Header = () => {
    const { isAdmin, login, logout } = useAuth();
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-kemenag-green text-white shadow-md p-4 flex justify-between items-center sticky top-0 z-30">
            <div className="flex items-center space-x-3">
                <img src="https://picsum.photos/40/40" alt="Logo Kemenag" className="h-10 w-10 rounded-full" />
                <div>
                    <h1 className="text-xl font-bold">PD Pontren</h1>
                    <p className="text-xs text-kemenag-gold-light">Kementerian Agama Kabupaten Gowa</p>
                </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
                <button
                    onClick={() => isAdmin ? logout() : login('seksipdpontrengowa', '11september')}
                    className="bg-kemenag-gold hover:bg-kemenag-gold-dark text-kemenag-green-dark font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                    {isAdmin ? 'Logout Admin' : 'Login Admin'}
                </button>
            </div>
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!isMenuOpen)}>
                    {/* FIX: Changed 'class' to 'className' for JSX compatibility. */}
                    <ion-icon name={isMenuOpen ? "close-outline" : "menu-outline"} className="text-3xl"></ion-icon>
                </button>
            </div>
            {isMenuOpen && (
                 <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2 z-40 md:hidden">
                     <button
                        onClick={() => {
                            isAdmin ? logout() : login('seksipdpontrengowa', '11september');
                            setMenuOpen(false);
                        }}
                        className="w-full text-left bg-kemenag-gold hover:bg-kemenag-gold-dark text-kemenag-green-dark font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                         {isAdmin ? 'Logout Admin' : 'Login Admin'}
                    </button>
                 </div>
            )}
        </header>
    );
};


const Sidebar = () => {
  return (
    <aside className="w-64 bg-white text-gray-800 p-4 space-y-2 hidden md:block shadow-lg">
      <nav>
        <ul>
          {navLinks.map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition duration-200 hover:bg-kemenag-green-light hover:text-white ${
                    isActive ? 'bg-kemenag-green text-white font-bold' : 'text-gray-600'
                  }`
                }
              >
                {/* FIX: Changed 'class' to 'className' for JSX compatibility. */}
                <ion-icon name={link.icon} className="text-2xl"></ion-icon>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const MobileNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] md:hidden z-30">
        <ul className="flex justify-around items-center h-16">
            {navLinks.slice(0, 5).map(link => (
                <li key={link.path}>
                    <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center space-y-1 transition duration-200 ${
                                isActive ? 'text-kemenag-green' : 'text-gray-500 hover:text-kemenag-green-light'
                            }`
                        }
                    >
                        {/* FIX: Changed 'class' to 'className' for JSX compatibility. */}
                        <ion-icon name={link.icon} className="text-2xl"></ion-icon>
                        <span className="text-xs">{link.label}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    </nav>
);

const PageTitle = () => {
    const location = useLocation();
    const currentLink = navLinks.find(link => link.path === location.pathname);
    return <h2 className="text-3xl font-bold text-gray-800 mb-6">{currentLink ? currentLink.label : 'Beranda'}</h2>;
};


function App() {
  const [modalState, setModalState] = useState<{ isOpen: boolean; action: ModalAction; data?: ModalData }>({ isOpen: false, action: null });

  const openModal = useCallback((action: ModalAction, data?: ModalData) => {
    setModalState({ isOpen: true, action, data });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, action: null, data: undefined });
  }, []);

  const modalContextValue = useMemo(() => ({
    openModal,
    closeModal,
  }), [openModal, closeModal]);

  return (
    <AppContextProvider modalContextValue={modalContextValue}>
      <HashRouter>
        <div className="flex flex-col min-h-screen font-sans">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto mb-16 md:mb-0">
              <PageTitle />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/visi-misi" element={<VisiMisiPage />} />
                <Route path="/struktur-organisasi" element={<StrukturOrganisasiPage />} />
                <Route path="/program-unggulan" element={<ProgramUnggulanPage />} />
                <Route path="/inovasi-digital" element={<InovasiDigitalPage />} />
                <Route path="/sop" element={<SOPPage />} />
                <Route path="/lembaga-pendidikan" element={<LembagaPendidikanPage />} />
                <Route path="/sistem-informasi" element={<SistemInformasiPage />} />
              </Routes>
            </main>
          </div>
          <MobileNav />
        </div>
        <AdminModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          action={modalState.action}
          initialData={modalState.data}
        />
      </HashRouter>
    </AppContextProvider>
  );
}

export default App;