import { useEffect, useState, RefObject } from "react";

const useDetectClose = (elem: RefObject<HTMLElement>, initialState: boolean = false): [boolean, (value: boolean) => void] => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  useEffect(() => {

    const onClick = (e: MouseEvent) => {
      if (elem.current && !elem.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen, elem]);

  return [isOpen, setIsOpen];
};

export default useDetectClose;
