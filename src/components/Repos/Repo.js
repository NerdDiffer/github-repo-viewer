import React from 'react';

const Repo = ({ data }) => {
  const  { id, name, description, language, watchers_count, watchers, size, created_at, updated_at, pushed_at, html_url } = data;

  return (
    <div className="repo">
    </div>
  );
};

export default Repo;
