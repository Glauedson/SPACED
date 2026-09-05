import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type MouseEvent,
} from "react";

interface HorizontalScrollAreaProps {
  children: ReactNode;
}

export default function HorizontalScrollArea({
  children,
}: HorizontalScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  const updateFades = useCallback(() => {
    const el = scrollRef.current;

    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    setShowLeftFade(scrollLeft > 4);
    setShowRightFade(
      maxScroll > 4 && scrollLeft < maxScroll - 4
    );
  }, []);

  useEffect(() => {
    updateFades();

    const el = scrollRef.current;

    if (!el) return;

    const resizeObserver = new ResizeObserver(updateFades);

    resizeObserver.observe(el);

    window.addEventListener("resize", updateFades);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateFades);
    };
  }, [updateFades]);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    // Only enable drag scrolling with the left mouse button
    if (event.button !== 0) return;

    const el = scrollRef.current;

    if (!el) return;

    setIsDragging(true);

    dragStartX.current = event.clientX;
    scrollStartX.current = el.scrollLeft;
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const el = scrollRef.current;

    if (!el) return;

    const distance = event.clientX - dragStartX.current;

    el.scrollLeft = scrollStartX.current - distance;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative">
      {/* Left fade - only visible after scrolling */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-8 md:w-11 transition-opacity duration-300 ease-out"
        style={{
          opacity: showLeftFade ? 1 : 0,
          background:
            "linear-gradient(to right, rgb(10,10,12) 0%, rgba(10,10,12,0.85) 40%, transparent 100%)",
        }}
      />

      {/* Right fade - indicates that more content is available */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-9 md:w-11 transition-opacity duration-300 ease-out"
        style={{
          opacity: showRightFade ? 1 : 0,
          background:
            "linear-gradient(to left, rgb(10,10,12) 0%, rgba(10,10,12,0.85) 40%, transparent 100%)",
        }}
      />

      <div
        ref={scrollRef}
        onScroll={updateFades}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className={`flex gap-3 overflow-x-auto pb-2 select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {children}
      </div>
    </div>
  );
}