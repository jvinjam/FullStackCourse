import { useState } from "react";
import "../App.css";

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes || 0);
  const buttonLabel = showDetails ? "hide" : "view";

  const increaseLikes = () => {
    blog.likes = likes + 1;
    setLikes(likes + 1);
    updateLikes(blog);
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
    }
  };

  const blogDesc = () => {
    return (
      <div className="blogStyle">
        {blog.title} {blog.author}{" "}
        <button onClick={() => setShowDetails(true)}>{buttonLabel}</button>
      </div>
    );
  };

  const blogDetails = () => {
    return (
      <div className="blogStyle">
        <div>
          {blog.title}{" "}
          <button onClick={() => setShowDetails(false)}>{buttonLabel}</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={increaseLikes}>likes</button>{" "}
        </div>
        <div>{blog.author}</div>
        {user.id === blog.user.id && (
          <button onClick={removeBlog}>Remove</button>
        )}
      </div>
    );
  };

  return showDetails ? blogDetails() : blogDesc();
};

export default Blog;
