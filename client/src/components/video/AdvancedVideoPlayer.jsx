import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { 
  FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, 
  FiMinimize, FiSettings, FiSkipBack, FiSkipForward 
} from 'react-icons/fi';

const AdvancedVideoPlayer = ({ url, onProgress, initialProgress = 0 }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(initialProgress);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState('auto');
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (initialProgress > 0) {
      playerRef.current?.seekTo(initialProgress);
    }
  }, []);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
    if (onProgress) {
      onProgress(state.played);
    }
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (!fullscreen) {
      document.getElementById('player-container')?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  const skip = (seconds) => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime + seconds);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (playing) {
        setShowControls(false);
      }
    }, 3000);
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = ('0' + date.getUTCSeconds()).slice(-2);
    if (hh) {
      return `${hh}:${('0' + mm).slice(-2)}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <div
      id="player-container"
      className="relative w-full bg-black group touch-manipulation"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
      onTouchStart={() => setShowControls(true)}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onDuration={setDuration}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload'
            }
          }
        }}
      />

      {/* Controls Overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none"
      >
        {/* Play/Pause Button (Center) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePlayPause}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full glass-effect-strong flex items-center justify-center pointer-events-auto"
        >
          {playing ? (
            <FiPause className="text-3xl sm:text-4xl text-white" />
          ) : (
            <FiPlay className="text-3xl sm:text-4xl text-white ml-1" />
          )}
        </motion.button>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 space-y-2 pointer-events-auto">
          {/* Progress Bar */}
          <div className="w-full">
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-sm sm:text-base">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Play/Pause */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handlePlayPause}
                className="text-white hover:text-glacier-400 p-1 sm:p-0"
              >
                {playing ? <FiPause size={20} className="sm:w-6 sm:h-6" /> : <FiPlay size={20} className="sm:w-6 sm:h-6" />}
              </motion.button>

              {/* Skip Buttons - Hidden on mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => skip(-10)}
                className="hidden sm:block text-white hover:text-glacier-400"
              >
                <FiSkipBack size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => skip(10)}
                className="hidden sm:block text-white hover:text-glacier-400"
              >
                <FiSkipForward size={20} />
              </motion.button>

              {/* Volume - Hidden on small mobile */}
              <div className="hidden sm:flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={toggleMute}
                  className="text-white hover:text-glacier-400"
                >
                  {muted ? <FiVolumeX size={18} className="sm:w-5 sm:h-5" /> : <FiVolume2 size={18} className="sm:w-5 sm:h-5" />}
                </motion.button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="hidden md:block w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Time */}
              <span className="text-white text-xs sm:text-sm">
                {formatTime(duration * played)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Settings */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-glacier-400"
                >
                  <FiSettings size={20} />
                </motion.button>

                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-12 right-0 w-48 glass-effect-strong rounded-lg p-3 space-y-2"
                  >
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Playback Speed</p>
                      <select
                        value={playbackRate}
                        onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                        className="w-full px-2 py-1 rounded glass-effect text-white text-sm"
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={0.75}>0.75x</option>
                        <option value={1}>Normal</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Quality</p>
                      <select
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className="w-full px-2 py-1 rounded glass-effect text-white text-sm"
                      >
                        <option value="auto">Auto</option>
                        <option value="1080p">1080p</option>
                        <option value="720p">720p</option>
                        <option value="480p">480p</option>
                        <option value="360p">360p</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Fullscreen */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={toggleFullscreen}
                className="text-white hover:text-glacier-400"
              >
                {fullscreen ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #0ea5e9;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #0ea5e9;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default AdvancedVideoPlayer;
