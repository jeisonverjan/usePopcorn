import { useState } from "react";

export function Box({ children, reference }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box" ref={reference}>
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
