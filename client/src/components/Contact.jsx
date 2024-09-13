import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className='bg-gradient-to-r from-cyan-100 to-blue-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto my-4'>
          <p className='text-lg font-semibold text-gray-800 mb-4'>
            Contact <span className='font-bold text-blue-600'>{landlord.username}</span> for{' '}
            <span className='font-bold text-blue-600'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='4'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border border-gray-300 p-4 rounded-lg mb-4 text-gray-800 placeholder-gray-500'
          ></textarea>

          <a
            href={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='block bg-blue-600 text-white text-center p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300'
          >
            Send Message
          </a>
        </div>
      )}
    </>
  );
}
