const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white sticky bottom-0 w-full h-20 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between py-4">
            {/* Texto copyright */}
            <div className="mb-4 md:mb-0">
              <p className="text-sm font-medium">
                © 2025 Trello. Casi todos los derechos reservados.
              </p>
            </div>
  
            {/* Menú de enlaces */}
            <nav className="flex space-x-6">
              <a 
                href="#" 
                className="text-sm font-medium flex items-center space-x-2 hover:text-gray-400 transition-colors duration-200"
              >
                <span>Política de privacidad</span>
              </a>
              <a 
                href="#" 
                className="text-sm font-medium flex items-center space-x-2 hover:text-gray-400 transition-colors duration-200"
              >
                <span>Términos de uso</span>
              </a>
              <a 
                href="#" 
                className="text-sm font-medium flex items-center space-x-2 hover:text-gray-400 transition-colors duration-200"
              >
                <span>Soporte</span>
              </a>
            </nav>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  