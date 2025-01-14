import { useRef, useEffect } from "react";
import { useKey } from "../hooks/useKey";

const Searchbar = ({ query, setQuery }) => {
    const searchbarInputEl = useRef(null);

    const keyAction = () => {
      if(document.activeElement === searchbarInputEl.current) return;
      searchbarInputEl.current.focus();
    }

    useKey("Enter", keyAction);
  
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
