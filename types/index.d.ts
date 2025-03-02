interface IAddMarkerDetailsModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category: string;
  setCategory: (category: string) => void;
  title: string;
  setTitle: (title: string) => void;
  desc: string;
  setDesc: (desc: string) => void;
  onSubmit: () => void;
  position: { x: number; y: number } | null;
}