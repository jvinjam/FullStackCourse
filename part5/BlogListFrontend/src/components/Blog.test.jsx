import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

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
