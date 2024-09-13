import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-gradient-to-r from-cyan-400 to-blue-600 py-4'>
      <div className='flex justify-between items-center max-w-6xl mx-auto px-8 py-4 bg-transparent rounded-full'>
        <Link to='/'>
          <h1 className='font-bold text-xl sm:text-3xl tracking-wide bg-clip-text text-white'>
            Indian<span className='text-black'>Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-transparent rounded-full flex items-center border border-cyan-200'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-32 sm:w-64 text-white placeholder-gray-300 p-2'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='p-2'>
            <FaSearch className='text-cyan-200' />
          </button>
        </form>
        <ul className='flex gap-8 items-center'>
          <Link to='/'>
            <li className='hidden sm:inline text-white text-lg hover:text-cyan-200 transition-colors duration-300'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-white text-lg hover:text-cyan-200 transition-colors duration-300'>
              About
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-10 w-10 object-cover border-2 border-white'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='text-white text-lg hover:text-cyan-200 transition-colors duration-300'>
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
