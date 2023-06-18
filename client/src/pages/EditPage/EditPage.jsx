//Component representing the page for editing an existing page.
/*
the EditPage component that fetches the page data for editing using the useParams hook to get
the pageId parameter from the URL. It also fetches the preloaded images using the fetchImages function.
The component uses the useState hook to manage the state of the title, blocks, selectedImage, and images.
The useEffect hook is used to fetch the page data and preloaded images when the component mounts.
The handleTitleChange function updates the title state when the input field value changes.
The handleBlockChange function updates the content of a specific block based on its index.
The handleAddBlock function adds a new block to the blocks state array, 
and the handleRemoveBlock function removes a block based on its index.
The handleImageChange function updates the selected image state when the user selects an image from the dropdown menu.
The handleSubmit function is called when the form is submitted.
It updates the page with the provided data by calling the updatePage function
(from the api.js service) with the page ID and the updated title, blocks, and selected image.
After successful update, it redirects the user to the page detail.
*/

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPageById, updatePage } from '../../services/api';

const EditPage = () => {
  const { pageId } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch page data and preloaded images
    fetchData();
    fetchImages();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch page data from API
      const pageData = await getPageById(pageId);
      setTitle(pageData.title);
      setBlocks(pageData.blocks);
      setSelectedImage(pageData.selectedImage);
    } catch (error) {
      console.log('Fetch page failed:', error.message);
      // Handle fetch page error (display error message, etc.)
    }
  };

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
      // Update the page with the provided data
      await updatePage(pageId, { title, blocks, selectedImage });
      // Redirect to the page detail
      history.push(`/pages/${pageId}`);
    } catch (error) {
      console.log('Update page failed:', error.message);
      // Handle update page error (display error message, etc.)
    }
  };

  return (
    <div>
      <h2>Edit Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} required />
        </div>
        <div>
          <label>Blocks:</label>
          {blocks.map((block, index) => (
            <div key={index}>
              <input
                type="text"
                value={block}
                onChange={(e) => handleBlockChange(index, e.target.value)}
                required
              />
              <button type="button" onClick={() => handleRemoveBlock(index)}>
                Remove Block
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddBlock}>
            Add Block
          </button>
        </div>
        <div>
          <label>Select Image:</label>
          <select value={selectedImage} onChange={handleImageChange} required>
            <option value="">Select an image</option>
            {images.map((image) => (
              <option key={image.id} value={image.url}>
                {image.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update Page</button>
      </form>
    </div>
  );
};

export default EditPage;
