export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="container mx-auto text-center p-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} School Management System. All rights reserved.</p>
      </div>
    </footer>
  );
}
