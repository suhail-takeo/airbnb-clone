import { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="flex justify-between px-2 py-2 bg-white shadow-md">
      <img className="w-12" src="/images/logo.png" alt="Logo" />
      <button className="text-xs border border-2 border-blue-500 rounded-md px-4">
        Sign In
      </button>
    </header>
  );
};

export default Header;
