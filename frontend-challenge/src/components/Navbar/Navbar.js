import React, { useEffect, useState } from 'react';
import {
  auth,
  signInWithGoogle,
  registerWithEmailAndPassword,
  db,
} from '../../services/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useHistory } from 'react-router-dom';
import Search from '../Search/Search';
import { query, collection, getDocs, where } from 'firebase/firestore';
import LogoImage from '../../assets/images/logo.png';


import './styles.css';

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const navigate = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/');
    fetchUserName();
  }, [user, loading]);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      console.log('An error occured while fetching user data');
    }
  };

  console.log(user);
  return (
    <>
      <div className='main-container'>
        <div className='logo-container'>
          <img src={LogoImage} width={300} height={180} />
        </div>

        <div className='search-container'>
          <div className='search-bar'>
            <div className='ui container' style={{ marginTop: '1em' }}>
              <Search />
            </div>
          </div>
          <div className='link-container'>
            <a href='#'>Home</a> |<a href='#'>Videos</a> |
            <a href='#'>Channels</a>
          </div>
        </div>
        <div className='login-main-container'>
          <div className='login-container'>
            <a href='#'>Create Account</a>  or 
            <Link onClick={signInWithGoogle}>
              <a href='#'>Sign-In</a>
            </Link>
          </div>
          <div className='login-bottom-container'>
            <a href='#'>Subscritions</a>
            <a href='#'>History</a>
            <a href='#'>Upload</a>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

export default Navbar;
