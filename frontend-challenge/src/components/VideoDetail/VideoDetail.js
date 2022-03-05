import React from 'react';
import styled, { css } from 'styled-components';
import { timeSince } from '../../utils/time';
import { Link } from 'react-router-dom';
import VideoCard from '../VideoCard/VideoCard';
import { LikeIcon, DislikeIcon } from '../Icons/Icons';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-gap: 2rem;
  padding: 1.3rem;
  padding-bottom: 7rem;

  .video-container .video-info {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  iframe {
    width: 100%;
    height: 400px;
  }

  .video-info span {
    color: ${(props) => props.theme.secondaryColor};
  }

  .video-info-stats {
    display: flex;
    align-items: center;
  }

  .video-info-stats div {
    margin-left: 6rem;
    position: relative;
    top: -2px;
  }

  .channel-info-description {
    padding-top: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    border-top: 1px solid ${(props) => props.theme.darkGrey};
  }

  .channel-info-description p {
    font-size: 0.9rem;
    padding: 1rem 0;
  }

  .related-videos img {
    height: 140px;
  }

  .related-videos div {
    margin-bottom: 1rem;
  }

  svg {
    fill: ${(props) => props.theme.darkGrey};
  }

  ${(props) =>
    props.filledLike &&
    css`
      .like svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

  ${(props) =>
    props.filledDislike &&
    css`
      .dislike svg {
        fill: ${(props) => props.theme.blue};
      }
    `}
   
	@media screen and (max-width: 930px) {
    grid-template-columns: 90%;
    .related-videos {
      display: none;
    }
  }

  @media screen and (max-width: 930px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 425px) {
    .video-info-stats div {
      margin-left: 1rem;
    }
  }
`;

const VideoDetail = ({ video, videos, handleVideoSelect }) => {
  const selectedVideoUrl = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <Wrapper>
      <div className='video-container'>
        <div className='video'>
          <iframe src={selectedVideoUrl} allowFullScreen title='Video player' />
        </div>

        <div className='video-info'>
          <h3>{video.snippet.title}</h3>

          <div className='video-info-stats'>
            <p>
              <span>{video.snippet.views} views</span> <span>•</span>{' '}
              <span>{timeSince(video.snippet.publishTime)} ago</span>
            </p>

            <div className='likes-dislikes flex-row'>
              <span className='flex-row like'>
                <LikeIcon onClick={''} />{' '}
                <span>{video.snippet.likesCount}</span>
              </span>
              <span
                className='flex-row dislike'
                style={{ marginLeft: '1.5rem' }}
              >
                <DislikeIcon onClick={''} />{' '}
                <span>{video.snippet.dislikesCount}</span>
              </span>
            </div>
          </div>
        </div>

        <div className='channel-info-description'>
          <p>{video.snippet.description}</p>
        </div>
      </div>
      <div className='related-videos'>
        <h3 style={{ marginBottom: '1rem' }}></h3>
        {videos
          .filter((vid) => vid.id !== video.id)
          .slice(0, 3)
          .map((video) => (
            <Link key={video.id} onClick={ () => handleVideoSelect(video)}>
            <VideoCard key={video.id} video={video} />
          </Link>
          ))}
      </div>
    </Wrapper>
  );
};

export default VideoDetail;
