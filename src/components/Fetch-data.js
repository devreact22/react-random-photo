import React, { useState, useEffect } from 'react';
import './Fetch.css';
import 'bootstrap/dist/css/bootstrap.css';

function RandomPhotos() {
  const [photos, setPhotos] = useState([]);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [visiblePhotos, setVisiblePhotos] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setTimeout(async () => {
        const response = await fetch('https://picsum.photos/v2/list');
        const data = await response.json();
        console.log(data);
        setPhotos(data);
        setIsLoading(false);
      }, 1000);
    }
    fetchData();
  }, []);

  const handleFetchNewPhotos = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const response = await fetch('https://picsum.photos/v2/list');
      const data = await response.json();
      setPhotos(data);
      setIsLoading(false);
    }, 1000);
  };

  const handleLoadMorePhotos = () => {
    setVisiblePhotos(visiblePhotos + 4);
  };

  return (
    <div>
      <div className='butt1' >
      <div className="form-check form-switch">
      <input  
        type="checkbox"
        className="form-check-input"
        role="switch"
        id="grayscale-toggle"
        checked={isGrayscale}
        onChange={() => setIsGrayscale(!isGrayscale)}
      />
       <label htmlFor="grayscale-toggle">Make photo grayscale </label>
      </div>
      <button type="button" className="btn btn-primary" onClick={handleFetchNewPhotos}>Fetch New Photos</button>
      </div>

      {isLoading ? (
        <div class="spinner-border text-primary"></div>
      ) : (
        <div className="photos-container">
          {photos
            .sort(() => 0.5 - Math.random())
            .slice(0, visiblePhotos)
            .map(photo => (
              <div key={photo.id} className="photo-with-text">
              <img
                src={`https://picsum.photos/id/${photo.id}/300/300`}
                alt={photo.author}
                className="photo"
                style={{ filter: isGrayscale ? 'grayscale(100%)' : 'none' }}
              />
              <div className="photo-text">{photo.author}</div>
              </div>
            ))}
        </div>
      )}
      <div className='butt2'>
      <button type="button" className="btn btn-info" onClick={handleLoadMorePhotos}>Load More Photos</button>
      </div>
    </div>
  );
}

export default RandomPhotos;
