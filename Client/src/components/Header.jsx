import { FaSchool } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaSchool size={26} />
          <span className="hidden sm:block">SchoolMS</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-lg font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
          <Link to="/signup" className="hover:text-yellow-300 transition">Signup</Link>
        </nav>

        {/* Mobile Nav Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 flex flex-col items-center gap-4 py-4">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
        </div>
      )}
    </header>
  );
}
