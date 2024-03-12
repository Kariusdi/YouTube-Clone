import { useEffect, useRef, useState } from "react";
import Button from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT: number = 200;

function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [translate, setTranslate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // See if any width of category bar changed, then show the arrow left and right
    useEffect(() => {
      if (containerRef.current == null) return;

      const observer = new ResizeObserver(entries => {
        const container = entries[0]?.target;
        if (container == null) return;

        setIsLeftVisible(translate > 0);
        setIsRightVisible(
          translate + container.clientWidth < container.scrollWidth
        );
      });

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      }

    }, [categories, translate]);

  const MoveLeft = () => {
    setTranslate((translate) => {
      const newTranslate = translate - TRANSLATE_AMOUNT;
      return newTranslate <= 0 ? 0 : newTranslate;
    });
  };

  const MoveRight = () => {
    setTranslate((translate) => {
      if (containerRef.current == null) {
        return translate;
      }

      const newTranslate = translate + TRANSLATE_AMOUNT;
      const edge = containerRef.current.scrollWidth; // The width of an actual size of parent container including overflow
      const width = containerRef.current.clientWidth; // The width of an child container that's showing on the screen
      console.log(edge, width);

      if (newTranslate + width >= edge) {
        return edge - width;
      }
      return newTranslate;
    });
  };

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      {/* Category list */}
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category, idx) => (
          <Button
            key={idx}
            onClick={() => onSelect(category)}
            variant={selectedCategory === category ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
      {/* End */}

      {/* Category Moving Arrow */}
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-full aspect-square w-auto p-1.5"
            onClick={MoveLeft}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="flex justify-end absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-full aspect-square w-auto p-1.5"
            onClick={MoveRight}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      {/* End */}
    </div>
  );
}

export default CategoryPills;
