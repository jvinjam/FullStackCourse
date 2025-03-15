const NewBlog = ({ title, setTitle, author, setAuthor, url, setUrl, createNewBlog }) => {
  return (
    <>
    <h1>Create new</h1>
    <form onSubmit={createNewBlog}> 
      <div>
        Title: 
        <input type="text" value={title} onChange={ ({target}) => setTitle(target.value) } />
      </div>
      <div>
        Author: 
        <input type="text" value={author} onChange={ ({target}) => setAuthor(target.value) } />
      </div>
      <div>
        Url: 
        <input type="url" placeholder="https://example.com" value={url} onChange={ ({target}) => setUrl(target.value) } />
      </div>
      <button type="submit">Create</button>
    </form>
    </>
  )
}

export default NewBlog