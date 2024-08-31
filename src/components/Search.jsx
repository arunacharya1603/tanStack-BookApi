import React, { useState } from 'react';

const Search = ({ query }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    query(value); // Pass the updated search query back to the parent
  };

  return (
    <div className='w-full'>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={handleChange} // Properly call handleChange on input change
        className="p-2 border rounded w-full"
        placeholder="Search for books..."
      />
    </div>
  );
};

export default Search;
