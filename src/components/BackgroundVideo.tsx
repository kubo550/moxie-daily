import backgroundVideo from '/smoke_background.mp4';
import bgImage from '/smoke_background.png';
import { CSSProperties } from 'react';

const styles = {
  videoContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: -1,
    background: `url(${bgImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  } as CSSProperties,
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  } as CSSProperties,
};

export const BackgroundVideo = () => {
  return (
    <div style={styles.videoContainer}>
      <video autoPlay loop muted style={styles.video}>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </div>
  );
};
