import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

function SearchBar({ onSearchChange, placeholder = "Search by name..." }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      onSearchChange?.(inputValue);
    }, 400); // debounce

    return () => clearTimeout(id);
  }, [inputValue, onSearchChange]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        style={{
          minWidth: "230px",
          maxWidth: "280px",
          height: "2.4rem",
          borderRadius: "999px",
          border: "1px solid rgba(148,163,184,0.6)",
          padding: "0 2.4rem 0 1rem",
          fontSize: "0.9rem",
          outline: "none",
          color: "#0f172a",
          background: "rgba(248,250,252,0.9)",
        }}
      />
      <span
        style={{
          position: "absolute",
          right: "0.85rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
          pointerEvents: "none",
        }}
      >
        <HiMagnifyingGlass size={16} />
      </span>
    </div>
  );
}

export default SearchBar;
