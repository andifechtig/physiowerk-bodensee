import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type TreatmentImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

type TreatmentImageCarouselProps = {
  images: readonly TreatmentImage[];
  label: string;
};

export function TreatmentImageCarousel({ images, label }: TreatmentImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const selectSlide = useCallback(() => {
    if (api) setActiveIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    selectSlide();
    api.on("select", selectSlide);
    api.on("reInit", selectSlide);
    return () => {
      api.off("select", selectSlide);
      api.off("reInit", selectSlide);
    };
  }, [api, selectSlide]);

  useEffect(() => {
    if (!api || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => api.scrollNext(), 5200);
    return () => window.clearInterval(timer);
  }, [api, isPaused]);

  return (
    <div
      className="treatment-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      aria-label={label}
    >
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.src}>
              <figure>
                <img
                  className="treatment-carousel-image"
                  src={image.src}
                  alt={image.alt}
                  style={{ objectPosition: image.objectPosition ?? "50% 50%" }}
                  width="1600"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <button className="treatment-carousel-control treatment-carousel-control-prev" type="button" onClick={() => api?.scrollPrev()} aria-label="Vorheriges Bild anzeigen">
          <ChevronLeft aria-hidden="true" />
        </button>
        <button className="treatment-carousel-control treatment-carousel-control-next" type="button" onClick={() => api?.scrollNext()} aria-label="Nächstes Bild anzeigen">
          <ChevronRight aria-hidden="true" />
        </button>
      </Carousel>
      <div className="treatment-carousel-dots" role="tablist" aria-label="Bilder auswählen">
        {images.map((image, index) => (
          <button
            key={image.src}
            className={index === activeIndex ? "is-active" : undefined}
            type="button"
            role="tab"
            aria-label={`Bild ${index + 1} von ${images.length} anzeigen`}
            aria-selected={index === activeIndex}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
