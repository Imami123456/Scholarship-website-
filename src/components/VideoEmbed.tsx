import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { getYouTubeId } from '../config';

interface VideoEmbedProps {
  video?: string;       // YouTube ID or full URL
  title?: string;       // accessible label
}

/**
 * Data-light YouTube embed ("lite" facade).
 * Shows only the thumbnail image (~20KB) until the user taps play, then loads
 * the full player. This is deliberate: most of our audience is on budget
 * phones with expensive/limited data — we don't want a 1MB+ iframe on load.
 */
export const VideoEmbed: React.FC<VideoEmbedProps> = ({ video, title = 'Video guide' }) => {
  const [activated, setActivated] = useState(false);
  const id = getYouTubeId(video);

  if (!id) return null;

  return (
    <div
      className="card"
      style={{
        position: 'relative',
        padding: 0,
        overflow: 'hidden',
        aspectRatio: '16 / 9',
        cursor: activated ? 'default' : 'pointer',
        background: '#000'
      }}
      onClick={() => !activated && setActivated(true)}
    >
      {activated ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
        />
      ) : (
        <button
          type="button"
          aria-label={`Play video: ${title}`}
          onClick={() => setActivated(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Dark overlay for contrast */}
          <span
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%)'
            }}
          />
          {/* Play button */}
          <span
            className="flex items-center justify-center"
            style={{
              position: 'relative',
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(255, 0, 0, 0.92)',
              color: '#fff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              transition: 'transform var(--transition-fast)'
            }}
          >
            <Play size={32} fill="#fff" style={{ marginLeft: '4px' }} />
          </span>
        </button>
      )}
    </div>
  );
};

export default VideoEmbed;
