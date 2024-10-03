import { useEffect } from "react"

const useClipboard = (setImage) => {
  
  useEffect(() => {

    const pasteImg =  async () => {
      try {
        await navigator.permissions.query({ name: 'clipboard-read'});
        const clipboardItems=  await navigator.clipboard.read();
        const blobOutput = await clipboardItems[0].getType('image/png');
        const data = URL.createObjectURL(blobOutput)
        setImage(data)
      } catch (error) {
        console.log(error)
      }
    }

    document.addEventListener('paste', () => pasteImg());
    return () => {
      document.removeEventListener('paste', () => pasteImg())
    }
  }, [setImage])

};

export default useClipboard;