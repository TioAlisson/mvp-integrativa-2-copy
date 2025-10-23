'use client';

interface HamburgerButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
};


const commonSpanClasses = 'h-1 bg-secondary-500 transition-all duration-300 ease-in-out rounded-xl';
const commonContainerClasses = 'relative w-8 h-6 flex flex-col justify-between items-end cursor-pointer transition-all duration-300 ease-in-out';

export default function HamburgerButton({ isOpen, toggleMenu }: HamburgerButtonProps) {

  return (
    <button
      className="bg-transparent hover:bg-transparent z-50 shadow-none lg:hidden"
      onClick={toggleMenu}
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
    >
      <div className={`${commonContainerClasses} ${isOpen ? 'open' : ''}`}>
        <span className={`w-full transform ${commonSpanClasses} ${isOpen ? '-rotate-45 translate-y-2.5' : ''}`}></span>
        <span className={`${commonSpanClasses} ${isOpen ? 'opacity-0 w-full' : 'w-3/4'}`}></span>
        <span className={`transform ${commonSpanClasses} ${isOpen ? 'rotate-45 -translate-y-2.5 w-full' : 'w-2/4'}`}></span>
      </div>
    </button>
  );
}