import React from 'react';
import './ImageUpload.css';
import { Button } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export const ImageUpload = ({ image, onImageUpload }) => {
  return (
    <div className="image-container">
      {/* Display the uploaded image */}
      {image && <img src={image} className="recipe-image" />}

      {/* Image upload button */}
      <div>
        <label htmlFor="file-upload" className="upload-button">
          {/* <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="m3 14v6c0 1.1046.89543 2 2 2h14c1.1046 0 2-.8954 2-2v-6" />
              <path d="m12 17v-14m0 0-5 5.44446m5-5.44446 5 5.44444" />
            </g>
          </svg>{' '} */}
          <Button startIcon={<FileUploadOutlinedIcon />} color='success' variant='contained'>Upload image</Button>
          
        </label>

        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="file-input"
          style={{display:'none'}}
        />
      </div>
    </div>
  );
};
