import { useState, useEffect, useRef } from "react";

const StreamingMessage = ({ content, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!content || isComplete) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= content.length) {
          clearInterval(intervalRef.current);
          setIsComplete(true);
          setTimeout(() => {
            onComplete?.();
          }, 100);
          return prevIndex;
        }

        const nextIndex = prevIndex + 1;
        setDisplayedText(content.substring(0, nextIndex));
        return nextIndex;
      });
    }, 25); // Slightly faster for better UX

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [content, isComplete, onComplete]);

  // Reset when content changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsComplete(false);
  }, [content]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-start mb-2">
      <div className="rounded-2xl py-3 px-5 max-w-[70%] bg-[#D9D9D9]/5 text-white">
        <span>{displayedText}</span>
        {!isComplete && <span className="animate-pulse text-[#3CBFAE]">|</span>}
      </div>
    </div>
  );
};

export default StreamingMessage;
