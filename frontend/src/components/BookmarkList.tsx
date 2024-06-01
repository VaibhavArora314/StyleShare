import React from 'react';

interface BookmarkListProps {
  bookmarks: string[];
  onRemove: (item: string) => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onRemove }) => {
  return (
    <div>
      <h2>Bookmarked Items</h2>
      <ul>
        {bookmarks.map((bookmark, index) => (
          <li key={index}>
            {bookmark} <button onClick={() => onRemove(bookmark)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkList;
