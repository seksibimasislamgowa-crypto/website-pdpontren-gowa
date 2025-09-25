
import { VisiMisi, Program, DigitalInnovation, SOP, Institution, InformationSystem, InstitutionCategory } from '../types';

export const initialData: {
  visiMisi: VisiMisi;
  programs: Program[];
  innovations: DigitalInnovation[];
  sops: SOP[];
  institutions: Institution[];
  infoSystems: InformationSystem[];
} = {
  visiMisi: {
    visi: ["Terwujudnya Masyarakat Kabupaten Gowa yang Taat Beragama, Rukun, Cerdas, dan Sejahtera Lahir Batin"],
    misi: [
      "Meningkatkan kualitas kehidupan beragama",
      "Meningkatkan kualitas kerukunan umat beragama",
      "Meningkatkan kualitas pendidikan agama dan keagamaan",
      "Meningkatkan kualitas penyelenggaraan ibadah haji",
      "Mewujudkan tata kelola kepemerintahan yang bersih dan berwibawa"
    ]
  },
  programs: [
    { id: 'prog1', title: 'Penguatan Moderasi Beragama', description: 'Program untuk meningkatkan pemahaman dan praktik moderasi beragama di kalangan santri dan pengajar.', icon: 'people-circle-outline' },
    { id: 'prog2', title: 'Digitalisasi Pesantren', description: 'Membantu pondok pesantren dalam mengadopsi teknologi digital untuk administrasi dan pembelajaran.', icon: 'laptop-outline' },
    { id: 'prog3', title: 'Kemadirian Pesantren', description: 'Program pemberdayaan ekonomi untuk menciptakan kemandirian finansial bagi pondok pesantren.', icon: 'wallet-outline' },
  ],
  innovations: [
    { id: 'inno1', name: 'SIPINTAR', description: 'Sistem Informasi Pesantren Terintegrasi.', link: '#', logo: 'https://picsum.photos/seed/sipintar/100' },
    { id: 'inno2', name: 'DICINIMI TPQ', description: 'Digitalisasi Data Guru Mengaji TPQ.', link: '#', logo: 'https://picsum.photos/seed/dicinimitpq/100' },
    { id: 'inno3', name: 'DICINIMI MDT', description: 'Digitalisasi Data Guru Mengaji MDT.', link: '#', logo: 'https://picsum.photos/seed/dicinimimdt/100' },
    { id: 'inno4', name: 'PADAIDI', description: 'Pendataan Diniyah Terintegrasi.', link: '#', logo: 'https://picsum.photos/seed/padaidi/100' },
    { id: 'inno5', name: 'PADAELO', description: 'Pendataan Online Lembaga Keagamaan.', link: '#', logo: 'https://picsum.photos/seed/padaelo/100' },
  ],
  sops: [
    { id: 'sop1', title: 'SOP Izin Operasional Pondok Pesantren', fileUrl: '#' },
    { id: 'sop2', title: 'SOP Pendaftaran Bantuan Pesantren', fileUrl: '#' },
    { id: 'sop3', title: 'SOP Pelaporan Dana BOS', fileUrl: '#' },
  ],
  institutions: [
    { id: 'inst1', name: 'Ponpes Al-Ikhlas', address: 'Jl. Malino No. 10, Gowa', leader: 'Dr. H. Ahmad', category: InstitutionCategory.PONDOK_PESANTREN },
    { id: 'inst2', name: 'TPQ An-Nur', address: 'Jl. Merdeka No. 5, Gowa', leader: 'Ust. Fatimah', category: InstitutionCategory.TPQ_TPA },
    { id: 'inst3', name: 'MDT Miftahul Ulum', address: 'Jl. Pendidikan No. 1, Gowa', leader: 'Drs. H. Muhammad', category: InstitutionCategory.MADRASAH_DINIYAH },
  ],
  infoSystems: [
      { id: 'sys1', name: 'EMIS', description: 'Education Management Information System.', link: '#', logo: 'https://picsum.photos/seed/emis/100' },
      { id: 'sys2', name: 'IZOPMDT', description: 'Izin Operasional Madrasah Diniyah Takmiliyah.', link: '#', logo: 'https://picsum.photos/seed/izop/100' },
      { id: 'sys3', name: 'SITREN', description: 'Sistem Informasi Pesantren.', link: '#', logo: 'https://picsum.photos/seed/sitren/100' },
      { id: 'sys4', name: 'SIPDAR', description: 'Sistem Informasi Pendidikan Agama dan Keagamaan.', link: '#', logo: 'https://picsum.photos/seed/sipdar/100' },
      { id: 'sys5', name: 'SIMBA', description: 'Sistem Informasi Manajemen Bantuan.', link: '#', logo: 'https://picsum.photos/seed/simba/100' },
      { id: 'sys6', name: 'SIKAP', description: 'Sistem Informasi Ketenagaan Pendidikan Agama.', link: '#', logo: 'https://picsum.photos/seed/sikap/100' },
  ]
};
