import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import NewBlog from "./NewBlog";

//Mock functions for updateLikes and deleteBlog
const updateLikes = vi.fn();
const deleteBlog = vi.fn();
const blog = {
  title: "Component testing is done with react-testing-library",
  author: "Author Name",
  url: "http://example.com",
  likes: 0,
  id: 101,
  user: { id: 1 },
};

describe("---Display Blog tests---", () => {
  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
        user={{ id: 1 }}
      />
    );
  });

  test("renders content", () => {
    //screen.debug();
    const title = screen.getByText(blog.title, { exact: false });
    //const title = screen.getByText(/Component testing is done with react-testing-library/i);
    expect(title).toBeDefined();

    const author = screen.getByText(blog.author, { exact: false });
    expect(author).toBeDefined();

    const url = screen.queryByText(blog.url);
    expect(url).toBeNull();

    const likes = screen.queryByText(/likes 0/i);
    expect(likes).toBeNull();
  });

  test("clicking the view button, displays blog details", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const url = screen.getByText(blog.url, { exact: false });
    /*  /http:\/\/example.com/i);  */
    expect(url).toBeDefined();

    const likes = screen.getByText(/likes 0/i);
    expect(likes).toBeInTheDocument();
  });

  test("clicking the likes button twice, mock event handler is called twice", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likesButton = screen.getByTestId("likesBtn");
    await user.click(likesButton);
    await user.click(likesButton);
    expect(updateLikes.mock.calls).toHaveLength(2);
  });
});

test("clicking the new blog button, mock event handler receives the details correctly", async () => {
  const createNewBlog = vi.fn();
  render(<NewBlog createNewBlog={createNewBlog} />);

  const title = screen.getByPlaceholderText("Title");
  const author = screen.getByPlaceholderText("Author");
  const url = screen.getByPlaceholderText("https://example.com");
  const createBtn = screen.getByText("Create");

  // Simulate user input
  fireEvent.change(title, { target: { value: "New Blog Title" } });
  fireEvent.change(author, { target: { value: "Blog Author" } });
  fireEvent.change(url, { target: { value: "https://test.com" } });

  // Simulate form submission
  fireEvent.click(createBtn);

  // Check if createNewBlog was called with the correct data
  expect(createNewBlog).toHaveBeenCalledWith({
    title: "New Blog Title",
    author: "Blog Author",
    url: "https://test.com",
  });

  // Optionally, check if the function was called exactly once
  expect(createNewBlog).toHaveBeenCalledTimes(1);

  // const user = userEvent.setup();
  // user.type(title, "Test Title");
  // user.type(author, "Test Author");
  // user.type(url, "http://abc.com");
  // await user.click(createBtn);

  // expect(createNewBlog.mock.calls).toHaveLength(1);
  // console.log(createNewBlog.mock.calls);
  //expect(createNewBlog.mock.calls[0][0].content).toBe('title')
});
