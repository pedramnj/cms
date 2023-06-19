//Component representing the page for creating a new page.
/*
the CreatePage component allows users to create a new page by providing a title, adding multiple content blocks,
and selecting an image from a list of preloaded images. It uses the useState hook to manage the state of the title,
blocks, selected image,
and the list of preloaded images.
The useEffect hook is used to fetch the preloaded images when the component mounts using the fetchImages function.
The component provides input fields for the title and dynamically renders input fields for each block.
Users can add new blocks by clicking the "Add Block" button and remove blocks by clicking the "Remove Block" button 
associated with each block.
The handleTitleChange function updates the title state when the input field value changes. 
The handleBlockChange function updates the content of a specific block based on its index. 
The handleAddBlock function adds a new block to the blocks state array, 
and the handleRemoveBlock function removes a block based on its index.
The handleImageChange function updates the selected image state when the user selects an
image from the dropdown menu.
The handleSubmit function is called when the form is submitted.
It creates a new page by calling the createPage function (from the api.js service)
with the provided title, blocks, and selected image. After successful creation,
it redirects the user to the page list.
*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPage } from '../../services/api';
import './CreatePage.css'
const CreatePage = () => {
  const history = useNavigate();
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch preloaded images
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      // Fetch images from API
      const imagesData = await getImages();
      setImages(imagesData);
    } catch (error) {
      console.log('Fetch images failed:', error.message);
      // Handle fetch images error (display error message, etc.)
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBlockChange = (index, content) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = content;
    setBlocks(updatedBlocks);
  };

  const handleAddBlock = () => {
    setBlocks([...blocks, '']);
  };

  const handleRemoveBlock = (index) => {
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index, 1);
    setBlocks(updatedBlocks);
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create the page with the provided data
      await createPage({ title, blocks, selectedImage });
      // Redirect to the page list
      history.push('/pages');
    } catch (error) {
      console.log('Create page failed:', error.message);
      // Handle create page error (display error message, etc.)
    }
  };

  return (
    <div className="container">
      <h2 className="title">Create Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} className="input" required />
        </div>
        <div className="form-group">
          <label className="label">Blocks:</label>
          {blocks.map((block, index) => (
            <div className="form-group" key={index}>
              <input
              className="label"
                type="text"
                value={block}
                onChange={(e) => handleBlockChange(index, e.target.value)}
                required
              />
              <button type="button" className="button" onClick={() => handleRemoveBlock(index)}>
                Remove Block
              </button>
            </div>
          ))}
          <button type="button" className="button" onClick={handleAddBlock}>
            Add Block
          </button>
        </div>
        <div className="form-group">
          <label className="label">Select Image:</label>
          <select value={selectedImage} onChange={handleImageChange} className="input" required>
            <option value="">Select an image</option>
            {images.map((image) => (
              <option key={image.id} value={image.src}>
                {image.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="button">Create Page</button>
      </form>
    </div>
  );
};

export default CreatePage;
