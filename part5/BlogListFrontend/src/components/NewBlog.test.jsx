import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import NewBlog from "./NewBlog";

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
