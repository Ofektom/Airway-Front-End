import React from 'react';
import './LandingPageDestination.css';
const Gallery = () => (
    <div className="dest-container">
      <div className="htop1">Top Destinations/Cities</div> 
      <div className="gallery">
        <div className="item">
          <img className='dest-item-image' src="../src/assets/KanoCard.png" alt="Kano" />
          <div className="caption"></div>
        </div>
        <div className="item">
          <img className='dest-item-image' src="../src/assets/BenueCard.png" alt="Benue" />
          <div className="caption"></div>
        </div>
        <div className="item">
          <img className='dest-item-image' src="../src/assets/AngolaCard.png" alt="Angola" />
          <div className="caption"></div>
        </div>
        <div className="item">
          <img className='dest-item-image' src="../src/assets/KenyaCard.png" alt="Kenya" />
          <div className="caption"></div>
        </div>
        <div className="item">
          <img className='dest-item-image' src="../src/assets/GhanaCard.png" alt="Ghana" />
          <div className="caption"></div>
        </div>
        <div className="item">
          <img className='dest-item-image' src="../src/assets/MoroviaCard.png" alt="Morovia" />
          <div className="caption"></div>
        </div>
      </div>
    </div>
);
export default Gallery;