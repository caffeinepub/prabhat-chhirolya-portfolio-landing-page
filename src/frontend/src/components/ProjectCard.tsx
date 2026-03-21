import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useRef, useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  thumbnail: string;
  details: {
    paragraphs: string[];
    images?: string[];
    links?: { label: string; url: string }[];
    liveProjectUrl?: string;
    youtubeUrl?: string;
    role?: string;
    tools?: string;
    results?: string;
  };
  isProfessional?: boolean;
}

export default function ProjectCard({
  title,
  description,
  thumbnail,
  details,
  isProfessional = false,
}: ProjectCardProps) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const imageCarouselRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => setIsOverlayOpen(true);
  const handleCloseOverlay = () => setIsOverlayOpen(false);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!imageCarouselRef.current) return;
    const scrollAmount = imageCarouselRef.current.clientWidth * 0.8;
    imageCarouselRef.current.scrollTo({
      left:
        imageCarouselRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount),
      behavior: "smooth",
    });
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&"'>]+)/,
    );
    if (videoIdMatch?.[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return null;
  };

  const youtubeEmbedUrl = details.youtubeUrl
    ? getYouTubeEmbedUrl(details.youtubeUrl)
    : null;

  return (
    <>
      {/* Card — use a button so it's natively keyboard-accessible */}
      <button
        type="button"
        onClick={handleCardClick}
        className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] max-w-3xl cursor-pointer group text-left"
      >
        <div className="project-card-gradient-border rounded-lg p-[1px] transition-all duration-500">
          <div className="relative overflow-hidden rounded-lg bg-card/40 backdrop-blur-sm transition-all duration-500 group-hover:bg-card/50 project-card-elevation">
            <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-muted/20">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <h4 className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-foreground mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-accent-bright">
                {title}
              </h4>
              <p className="text-sm sm:text-base font-light tracking-wide text-foreground/70 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </button>

      {/* Overlay */}
      {isOverlayOpen && (
        <>
          {/* Dimming Backdrop */}
          <button
            type="button"
            aria-label="Close overlay"
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm animate-in fade-in duration-500 cursor-default"
            onClick={handleCloseOverlay}
          />

          {/* Overlay Content Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 md:px-8 pointer-events-none">
            {/* Overlay Content — stop-propagation wrapper */}
            <div className="relative w-full max-w-4xl max-h-[85vh] bg-card/95 backdrop-blur-md rounded-lg border border-foreground/20 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 pointer-events-auto">
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseOverlay}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-foreground/10 text-foreground/70 transition-all duration-300 hover:bg-background/80 hover:text-accent-bright hover:border-accent-bright/30 hover:scale-110"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Scrollable Content */}
              <div
                className="overflow-y-auto max-h-[85vh] p-6 sm:p-8 md:p-10"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-foreground mb-6 sm:mb-8 pr-12">
                  {title}
                </h3>

                {/* Professional Metadata */}
                {isProfessional &&
                  (details.role || details.tools || details.results) && (
                    <div className="space-y-3 mb-8 sm:mb-10 p-6 rounded-lg border border-foreground/10 bg-background/30">
                      {details.role && (
                        <div>
                          <p className="text-xs sm:text-sm font-light tracking-wider text-accent-bright/80 mb-1">
                            Role
                          </p>
                          <p className="text-sm sm:text-base font-light tracking-wide text-foreground/80">
                            {details.role}
                          </p>
                        </div>
                      )}
                      {details.tools && (
                        <div>
                          <p className="text-xs sm:text-sm font-light tracking-wider text-accent-bright/80 mb-1">
                            Tools & Technologies
                          </p>
                          <p className="text-sm sm:text-base font-light tracking-wide text-foreground/80">
                            {details.tools}
                          </p>
                        </div>
                      )}
                      {details.results && (
                        <div>
                          <p className="text-xs sm:text-sm font-light tracking-wider text-accent-bright/80 mb-1">
                            Results & Impact
                          </p>
                          <p className="text-sm sm:text-base font-light tracking-wide text-foreground/80">
                            {details.results}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                {/* Paragraphs */}
                <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                  {details.paragraphs.map((paragraph, index) => (
                    <p
                      key={`para-${paragraph.substring(0, 20)}-${index}`}
                      className="text-sm sm:text-base md:text-lg font-light tracking-wide text-foreground/80 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* YouTube Embed */}
                {youtubeEmbedUrl && (
                  <div className="relative mb-8 sm:mb-10 w-full">
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      <iframe
                        src={youtubeEmbedUrl}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full rounded-lg border border-foreground/10 bg-muted/20"
                      />
                    </div>
                  </div>
                )}

                {/* Image Carousel */}
                {details.images && details.images.length > 0 && (
                  <div className="relative mb-8 sm:mb-10">
                    {details.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => scrollCarousel("left")}
                          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/20 text-foreground/70 transition-all duration-300 hover:bg-background/95 hover:text-accent-bright hover:border-accent-bright/30 hover:scale-110"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollCarousel("right")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/20 text-foreground/70 transition-all duration-300 hover:bg-background/95 hover:text-accent-bright hover:border-accent-bright/30 hover:scale-110"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}

                    <div
                      ref={imageCarouselRef}
                      className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {details.images.map((image) => (
                        <div
                          key={image}
                          className="flex-shrink-0 w-[85%] sm:w-[75%] md:w-[65%] lg:w-[60%] snap-center"
                        >
                          <div className="relative overflow-hidden rounded-lg border border-foreground/10 bg-muted/20 p-2 md:p-3">
                            <img
                              src={image}
                              alt={`${title} screenshot`}
                              className="w-full h-auto object-contain opacity-80"
                              style={{ maxHeight: "60vh" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Live Project Link */}
                {details.liveProjectUrl && (
                  <div className="mb-8 sm:mb-10">
                    <a
                      href={details.liveProjectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-foreground/20 bg-background/30 backdrop-blur-sm text-sm sm:text-base font-light tracking-wide text-foreground/80 transition-all duration-300 hover:border-accent-bright/50 hover:bg-accent-bright/10 hover:text-accent-bright hover:scale-105"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Project Link
                    </a>
                  </div>
                )}

                {/* Links */}
                {details.links && details.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {details.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-foreground/20 bg-background/30 backdrop-blur-sm text-sm sm:text-base font-light tracking-wide text-foreground/80 transition-all duration-300 hover:border-accent-bright/50 hover:bg-accent-bright/10 hover:text-accent-bright hover:scale-105"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
