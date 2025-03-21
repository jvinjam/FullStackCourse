import { useState, useEffect } from "react";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import "./App.css";

const Notification = ({ notification }) => {
  const { message, isError } = notification;

  if (!message || message.length <= 0) return;

  return (
    <div style={{ color: isError ? "red" : "green" }} className="notification">
      {message}
    </div>
  );
};

const Header = ({ user }) => {
  return user === null ? <h1>Log in to application</h1> : <h1>Blogs</h1>;
};

const App = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ message: null });
  const [newBlogFormVisible, setNewBlogFormVisible] = useState(false);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ userName, password });
      if (user) {
        setUser(user);
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
        blogService.setToken(user.token);
      }
    } catch (error) {
      notifyUser(error.message, true);
    }
    setUserName("");
    setPassword("");
  };

  const logoutUer = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setBlogs([]);
    blogService.setToken(null);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        try {
          const blogs = await blogService.getAll();
          setBlogs(blogs);
        } catch (error) {
          notifyUser(error.message, true);
        }
      }
    };

    fetchBlogs();
  }, [user]);

  const notifyUser = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification({ message: null }), 5000);
  };

  const createNewBlog = async (newBlog) => {
    const savedBlog = await blogService.createBlog(newBlog);
    if (savedBlog) {
      setBlogs(blogs.concat(savedBlog));
      notifyUser(`A new blog ${savedBlog.title} by ${savedBlog.author} added`);
    }
    setNewBlogFormVisible(false);
  };

  const updateLikes = async (updateBlog) => {
    await blogService.updateBlog(updateBlog.id, updateBlog);
  };

  const deleteBlog = async (id) => {
    const response = await blogService.deleteBlog(id);
    if (response.status == 204) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } else {
      notifyUser("Failed to delete the blog", true);
    }
  };

  const createNewBlogForm = () => {
    const hideWhenVisible = { display: newBlogFormVisible ? "none" : "" };
    const showWhenVisible = { display: newBlogFormVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogFormVisible(true)}>New blog</button>
        </div>
        <div style={showWhenVisible}>
          <NewBlog createNewBlog={createNewBlog} />
          <button onClick={() => setNewBlogFormVisible(false)}>Cancel</button>
        </div>
      </div>
    );
  };

  blogs.sort((a, b) => a.likes - b.likes);

  return (
    <div>
      <Header user={user} />
      <Notification notification={notification} />
      {user === null && (
        <Login
          userName={userName}
          password={password}
          setUserName={setUserName}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      {user !== null && (
        <div>
          <p>
            {user.name} logged in
            <button type="button" onClick={logoutUer}>
              {" "}
              logout{" "}
            </button>
          </p>
          {createNewBlogForm()}
          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
