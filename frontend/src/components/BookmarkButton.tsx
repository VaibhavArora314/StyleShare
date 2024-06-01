import React, { useState } from 'react';

interface BookmarkButtonProps {
  item: string;
  onBookmark: (item: string) => void;
  isBookmarked: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ item, onBookmark, isBookmarked }) => {
  return (
    <button onClick={() => onBookmark(item)}>
      {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    </button>
  );
};

export default BookmarkButton;
