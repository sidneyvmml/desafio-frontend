import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import VideoGrid from '../styles/VideoGrid';
import youtube from '../services/youtube';
import VideoCard from '../components/VideoCard/VideoCard';
import Navbar from '../components/Navbar/Navbar';
import VideoDetail from '../components/VideoDetail/VideoDetail';
import { Link } from 'react-router-dom';
import Skeleton from "../styles/Skeleton";

import './styles.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [video, selectedVideo] = useState([]);
  const [recents, setRecents] = useState([]);

  const { searchterm } = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await youtube.get('/search', {
        params: {
          q: searchterm,         
        },
      });

      setVideos(response.data.items);
      selectedVideo(response.data.items[0]);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  const recentsearch = () => {
    if (searchterm !== undefined) {
      setRecents([...recents, searchterm]);
      let recent = JSON.stringify(recents);
      window.localStorage.setItem('recents', recent);
    }
  };

  useEffect(() => {
    recentsearch();
    fetchData();
  }, [searchterm]);

  useEffect(() => {
    let history = window.localStorage.getItem('recents');
    let recent = history === null ? [] : JSON.parse(history);
    setRecents(recent);
    fetchData();
  }, []);

  const handleVideoSelect = (video) => {
    selectedVideo(video);
  };

  if (loading) {
    return <Skeleton title={true} />;
  }
 
  return (
    <div>
      <Navbar handleFormSubmit={fetchData} />
      
      <div className='most-recent-container'>
        <div className='most-recent-list'>
          <div className='more-videos-grid'>
            <VideoDetail
              video={video}
              videos={videos}
              handleVideoSelect={handleVideoSelect}
            />
          </div>
          <VideoGrid>
            {!loading &&
              videos.map((video) => (
                <Link key={video.id} onClick={() => handleVideoSelect(video)}>
                  <VideoCard video={video} />
                </Link>
              ))}
          </VideoGrid>
        </div>
      </div>
    </div>
  );
};

export default Home;
