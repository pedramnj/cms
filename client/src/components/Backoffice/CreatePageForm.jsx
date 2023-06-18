//Component for rendering the form to create a new page.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPage } from '../../services/api';

const CreatePageForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the API to create a new page with the entered title and content
      await createPage(title, content);
      history.push('/back-office'); // Redirect to the back-office page after creating the page
    } catch (error) {
      console.log('Create page failed:', error.message);
      // Handle create page error (display error message, clear form, etc.)
    }
  };

  return (
    <div>
      <h2>Create Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          ></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePageForm;


/*  the CreatePageForm component is a form that allows the user to create a new page. 
It uses the useState hook to manage the form state,
 and the useHistory hook from React Router to handle navigation after creating a page.
The form has an onSubmit event handler that calls the createPage function
 (from the api.js service) with the entered title and content. If the page creation is successful,
  the user is redirected to the back-office page (/back-office route). 
If an error occurs during page creation, it is logged to the console for demonstration purposes. */