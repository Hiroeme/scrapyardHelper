import { useEffect } from "react";

const useClipboard = (setImage: React.Dispatch<React.SetStateAction<string>>) => {
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      // console.log(items[0].type)
      if (items[0].type.startsWith("image/")) {
        const blob = items[0].getAsFile();
        if (blob) {
          const data = URL.createObjectURL(blob);
          setImage(data);
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [setImage]);
};

export default useClipboard;
