import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  .thumb {
    width: 100%;
    height: 200px;
    object-fit: cover;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    display: flex;
  }

  .video-info-container {
    display: flex;
    margin-top: 0.3rem;
  }

  .channel-avatar img {
    position: relative;
    top: 5px;
  }

  .video-info span {
    font-size: 0.9rem;
    padding-right: 0.1rem;
  }

  @media screen and (max-width: 600px) {
    .thumb {
      height: 250px;
    }
  }

  @media screen and (max-width: 420px) {
    .thumb {
      height: 200px;
    }
  }
`;

const VideoCard = ({ video }) => {
  return (
    <Wrapper>
      <img
        className='thumb'
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.description}
      />
      <div className='video-info-container'>
        <div className='video-info'>
          <h4>
            {video.snippet.title.length > 30
              ? video.snippet.title.substring(0, 40) + '...'
              : video.snippet.title}
          </h4>

          
        </div>
      </div>
    </Wrapper>
  );
};

export default VideoCard;
