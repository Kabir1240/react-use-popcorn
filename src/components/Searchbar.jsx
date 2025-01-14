import { useRef, useEffect } from "react";

const Searchbar = ({ query, setQuery }) => {
    const searchbarInputEl = useRef(null);

    useEffect(() => {
      const callback = (e) => {
        if(document.activeElement === searchbarInputEl.current) return;
        if(e.code === "Enter") searchbarInputEl.current.focus();
      }

      searchbarInputEl.current.focus();
      document.addEventListener("keydown", callback)
      return () => document.removeEventListener("keydown", callback)
    }, [])
  
    return (
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={searchbarInputEl}
      />
    )
  }

export default Searchbar;
