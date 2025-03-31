const Header = () => {
  return (
    <header className="h-20 w-full bg-gray-800 shadow-md flex items-center px-4 pl-16">
      {/* Logo e Identidad */}
      <div className="flex items-center pl-8">
        <img
          src="./img/trello.png"
          alt="Trello Logo"
          className="w-10 h-10 md:w-12 md:h-12"
        />
        <h1 className="text-white text-lg md:text-xl font-bold ml-3 pl-6">
          Trello
        </h1>
      </div>

    </header>
  );
};

export default Header;
