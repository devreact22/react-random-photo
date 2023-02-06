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
      const response = await fetch('https://picsum.photos/v2/list');
      const data = await response.json();
      setPhotos(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleFetchNewPhotos = async () => {
    setIsLoading(true);
    const response = await fetch('https://picsum.photos/v2/list');
    const data = await response.json();
    setPhotos(data);
    setIsLoading(false);
  };

  const handleLoadMorePhotos = () => {
    setVisiblePhotos(visiblePhotos + 4);
  };

  return (
    <div className='p-20' >
      <div >
      <label  htmlFor="grayscale-toggle">Grayscale: </label>
      <input
        type="checkbox"
        id="grayscale-toggle"
        checked={isGrayscale}
        onChange={() => setIsGrayscale(!isGrayscale)}
      />
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
              <img
                key={photo.id}
                src={`https://picsum.photos/id/${photo.id}/300/300`}
                alt={photo.author}
                className="photo"
                style={{ filter: isGrayscale ? 'grayscale(100%)' : 'none' }}
              />
            ))}
        </div>
      )}
      <button type="button" className="btn btn-info " onClick={handleLoadMorePhotos}>Load More Photos</button>
    </div>
  );
}

export default RandomPhotos;
