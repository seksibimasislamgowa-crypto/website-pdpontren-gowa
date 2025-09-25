
// FIX: Correctly typed the 'ion-icon' custom element to be recognized by TypeScript's JSX parser across the application.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.HTMLAttributes<HTMLElement> & {
        name: string;
      };
    }
  }
}

export interface VisiMisi {
  visi: string[];
  misi: string[];
}

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface DigitalInnovation {
  id: string;
  name: string;
  description: string;
  link: string;
  logo: string;
}

export interface SOP {
  id: string;
  title: string;
  fileUrl: string;
}

export enum InstitutionCategory {
  PONDOK_PESANTREN = "Pondok Pesantren",
  TPQ_TPA = "TPQ/TPA",
  MADRASAH_DINIYAH = "Madrasah Diniyah Takmiliyah",
  RUMAH_TAHFIDZ = "Rumah Tahfidz Al Quran",
  PAUDQU = "PAUDQU"
}

export interface Institution {
  id: string;
  name: string;
  address: string;
  leader: string;
  category: InstitutionCategory;
}

export interface InformationSystem {
    id: string;
    name: string;
    description: string;
    link: string;
    logo: string;
}

export type ModalData = Program | DigitalInnovation | SOP | Institution | InformationSystem | { type: 'visi' | 'misi', content: string[] };

export type ModalAction = 
  | 'edit-visi' 
  | 'edit-misi'
  | 'add-program' 
  | 'edit-program' 
  | 'delete-program'
  | 'add-inovasi'
  | 'edit-inovasi'
  | 'delete-inovasi'
  | 'add-sop'
  | 'edit-sop'
  | 'delete-sop'
  | 'add-lembaga'
  | 'edit-lembaga'
  | 'delete-lembaga'
  | 'add-sistem'
  | 'edit-sistem'
  | 'delete-sistem';