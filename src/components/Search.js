import { useEffect, useRef } from "react";
import { useKey } from "../customHooks/useKey";

export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(() => inputEl.current.focus(), []);

  useKey("enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
