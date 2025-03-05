const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2">
                <div className="m-4 cursor-pointer p-1 md:ml-0 ml-4 md:pl-0 pl-10 text-2xl flex justify-center items-center font-extrabold">
                    <span className="text-cyan-500 hover:text-violet-300">T</span> <span className="text-blue-600 hover:text-violet-400">-</span> <span className="text-indigo-700 hover:text-orange-300">Post</span>
                </div>
                <ul className="flex space-x-8 font-medium">
                    {["Home"].map((item, index) => (
                        <li key={index}>
                            <a
                                href="/"
                                className="py-2 px-3 rounded-sm text-cyan-500 hover:text-violet-300"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
