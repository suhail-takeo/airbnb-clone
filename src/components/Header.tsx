import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const Header: FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if (user?.email) {
        setDisplayName(user.displayName!);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        setDisplayName('');
      }
    });
  }, []);

  const logOut = async () => {
    const auth = getAuth();
    auth
      .signOut()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="flex justify-between px-2 py-2 bg-white shadow-md">
      <Link to="/">
        <img className="w-12" src="/images/logo.png" alt="Logo" />
      </Link>

      {!authenticated ? (
        <Link
          to="/login"
          className="flex items-center justify-center text-xs border-2 border-blue-500 rounded-md px-4"
        >
          Login
        </Link>
      ) : (
        <div className="flex items-center justify-between">
          <p className="font-bold mr-4">{displayName}</p>
          <button
            onClick={logOut}
            className="text-xs border-2 border-blue-500 rounded-md px-4"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
