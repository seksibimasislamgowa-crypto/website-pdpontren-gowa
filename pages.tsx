import React, { useState } from 'react';
import { useData, useModal } from './context/AppContext';
import { Card } from './components/Card';
import { AdminControls } from './components/AdminControls';
import { InstitutionCategory } from './types';

export const HomePage = () => (
    <div className="space-y-8">
        <Card className="bg-kemenag-green text-white p-8">
            <h2 className="text-4xl font-extrabold mb-2">Selamat Datang!</h2>
            <p className="text-lg text-kemenag-gold-light">Di Portal Resmi Seksi Pendidikan Diniyah dan Pondok Pesantren (PD Pontren)
                Kementerian Agama Kabupaten Gowa.</p>
        </Card>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon="school-outline" label="Lembaga Pendidikan" value="150+" />
            <StatCard icon="people-outline" label="Santri & Siswa" value="12,000+" />
            <StatCard icon="library-outline" label="Program Unggulan" value="5" />
        </div>
    </div>
);

const StatCard = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
    <Card className="p-6 flex items-center space-x-4">
        <div className="bg-kemenag-green-light text-white p-4 rounded-full">
            
            <ion-icon name={icon} className="text-3xl"></ion-icon>
        </div>
        <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </Card>
);

export const VisiMisiPage = () => {
  const { appData } = useData();
  const { openModal } = useModal();
  const { visi, misi } = appData.visiMisi;

  return (
    <div className="space-y-8">
      <Card>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-kemenag-green-dark mb-4">Visi</h3>
          {visi.map((item, index) => <p key={index} className="text-gray-700 italic text-lg">"{item}"</p>)}
           <AdminControls onEdit={() => openModal('edit-visi', { type: 'visi', content: visi })} />
        </div>
      </Card>
      <Card>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-kemenag-green-dark mb-4">Misi</h3>
          <ul className="list-decimal list-inside space-y-2 text-gray-700">
            {misi.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
           <AdminControls onEdit={() => openModal('edit-misi', { type: 'misi', content: misi })} />
        </div>
      </Card>
    </div>
  );
};

export const StrukturOrganisasiPage = () => (
    <Card>
        <div className="p-6">
             <p className="text-gray-600 mb-4">Berikut adalah struktur organisasi Seksi PD Pontren Kemenag Gowa.</p>
            <img src="https://picsum.photos/seed/struktur/800/600" alt="Struktur Organisasi" className="w-full rounded-lg shadow-md" />
        </div>
    </Card>
);


export const ProgramUnggulanPage = () => {
  const { appData: { programs } } = useData();
  const { openModal } = useModal();

  return (
    <div>
        <AdminControls onAdd={() => openModal('add-program')} addLabel="Tambah Program" className="justify-end mb-4" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(program => (
                <Card key={program.id} className="flex flex-col">
                    <div className="p-6 flex-grow">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="bg-kemenag-green-light text-white p-3 rounded-full">
                                
                                <ion-icon name={program.icon} className="text-3xl"></ion-icon>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{program.title}</h3>
                        </div>
                        <p className="text-gray-600">{program.description}</p>
                    </div>
                    <div className="p-4 bg-gray-50">
                       <AdminControls 
                            onEdit={() => openModal('edit-program', program)}
                            onDelete={() => openModal('delete-program', program)}
                        />
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
};

export const InovasiDigitalPage = () => {
    const { appData: { innovations } } = useData();
    const { openModal } = useModal();

    return (
        <div>
            <AdminControls onAdd={() => openModal('add-inovasi')} addLabel="Tambah Inovasi" className="justify-end mb-4" />
            <div className="grid md:grid-cols-2 gap-6">
                {innovations.map(inovasi => (
                    <Card key={inovasi.id} className="p-5 flex items-start space-x-4">
                        <img src={inovasi.logo} alt={inovasi.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800">{inovasi.name}</h3>
                            <p className="text-gray-600 mb-2">{inovasi.description}</p>
                            <a href={inovasi.link} target="_blank" rel="noopener noreferrer" className="text-kemenag-green hover:underline font-semibold">Kunjungi</a>
                             <AdminControls 
                                onEdit={() => openModal('edit-inovasi', inovasi)}
                                onDelete={() => openModal('delete-inovasi', inovasi)}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export const SOPPage = () => {
    const { appData: { sops } } = useData();
    const { openModal } = useModal();
    return (
        <Card>
            <div className="p-6">
                <AdminControls onAdd={() => openModal('add-sop')} addLabel="Tambah SOP" className="justify-end mb-4" />
                <ul className="space-y-3">
                    {sops.map(sop => (
                        <li key={sop.id} className="border p-4 rounded-lg flex justify-between items-center bg-gray-50">
                            <div className="flex items-center space-x-3">
                                
                                <ion-icon name="document-outline" className="text-2xl text-kemenag-green"></ion-icon>
                                <span>{sop.title}</span>
                            </div>
                            <div className="flex items-center gap-4">
                               <a href={sop.fileUrl} target="_blank" rel="noopener noreferrer" className="bg-kemenag-green text-white px-3 py-1 rounded-md text-sm hover:bg-kemenag-green-dark">Unduh</a>
                               <AdminControls onEdit={() => openModal('edit-sop', sop)} onDelete={() => openModal('delete-sop', sop)} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
};

export const LembagaPendidikanPage = () => {
    const { appData: { institutions } } = useData();
    const { openModal } = useModal();
    const [selectedCategory, setSelectedCategory] = useState<InstitutionCategory>(InstitutionCategory.PONDOK_PESANTREN);
    const [searchQuery, setSearchQuery] = useState('');

    const categories = Object.values(InstitutionCategory);

    const filteredInstitutions = institutions
        .filter(inst => inst.category === selectedCategory)
        .filter(inst =>
            inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inst.address.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
                <div className="relative w-full md:w-auto">
                     <label htmlFor="category-filter" className="sr-only">Filter Kategori</label>
                    <select
                        id="category-filter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as InstitutionCategory)}
                        className="w-full appearance-none bg-white py-2 pl-3 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-kemenag-green"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                     <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ion-icon name="chevron-down-outline"></ion-icon>
                    </span>
                </div>

                <div className="relative w-full md:flex-grow">
                    <label htmlFor="search-input" className="sr-only">Cari Lembaga</label>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        
                        <ion-icon name="search-outline" className="text-gray-400"></ion-icon>
                    </span>
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Cari berdasarkan nama atau alamat..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-kemenag-green"
                        aria-label="Cari lembaga pendidikan"
                    />
                </div>
                 <div className="w-full md:w-auto">
                    <AdminControls onAdd={() => openModal('add-lembaga')} addLabel="Tambah Lembaga" />
                </div>
            </div>


            <div className="space-y-4">
                {filteredInstitutions.length > 0 ? (
                    filteredInstitutions.map(inst => (
                        <Card key={inst.id} className="p-4">
                            <h3 className="font-bold text-lg">{inst.name}</h3>
                            <p className="text-sm text-gray-500">{inst.address}</p>
                            <p className="text-sm text-gray-700">Pimpinan: {inst.leader}</p>
                            <AdminControls onEdit={() => openModal('edit-lembaga', inst)} onDelete={() => openModal('delete-lembaga', inst)} />
                        </Card>
                    ))
                ) : (
                    <Card className="text-center p-8">
                        <p className="text-gray-500">
                            {searchQuery ? `Tidak ada hasil untuk "${searchQuery}" dalam kategori ${selectedCategory}.` : `Belum ada data untuk kategori ${selectedCategory}.`}
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export const SistemInformasiPage = () => {
    const { appData: { infoSystems } } = useData();
    const { openModal } = useModal();

    return (
        <div>
            <AdminControls onAdd={() => openModal('add-sistem')} addLabel="Tambah Sistem" className="justify-end mb-4" />
            <div className="grid md:grid-cols-2 gap-6">
                {infoSystems.map(system => (
                    <Card key={system.id} className="p-5 flex items-start space-x-4">
                        <img src={system.logo} alt={system.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800">{system.name}</h3>
                            <p className="text-gray-600 mb-2">{system.description}</p>
                            <a href={system.link} target="_blank" rel="noopener noreferrer" className="text-kemenag-green hover:underline font-semibold">Kunjungi Sistem</a>
                            <AdminControls 
                                onEdit={() => openModal('edit-sistem', system)}
                                onDelete={() => openModal('delete-sistem', system)}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};