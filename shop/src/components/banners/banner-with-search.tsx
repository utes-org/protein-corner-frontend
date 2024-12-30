import cn from "classnames";
import { Swiper, SwiperSlide, Navigation } from "@/components/ui/slider";
import { Image } from "@/components/ui/image";
import { productPlaceholder } from "@/lib/placeholders";
import Search from "@/components/ui/search/search";
import type { Banner } from "@/types";
import { useHeaderSearch } from "@/layouts/headers/header-search-atom";
import { useIntersection } from "react-use";
import { useEffect, useMemo, useRef, useState } from "react";
import { useIsRTL } from "@/lib/locals";
import { ArrowNext, ArrowPrev } from "@/components/icons";
import { useTranslation } from "next-i18next";
import { useReverse } from "@/lib/reverse";
import { VideoPlayer } from "../ui/video-player/video-player";
import ReactPlayer from "react-player";

interface BannerProps {
  banners: Banner[] | undefined;
  layout?: string;
}

const BannerWithSearch: React.FC<BannerProps> = ({ banners, layout }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { showHeaderSearch, hideHeaderSearch } = useHeaderSearch();
  const intersectionRef = useRef(null);
  const { t } = useTranslation("common");
  const { isRTL } = useIsRTL();
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      hideHeaderSearch();
      return;
    }
    if (intersection && !intersection.isIntersecting) {
      showHeaderSearch();
    }
  }, [intersection]);

  // const reverseBanners = useReverse({ items: banners as Banner[] });

  if (!isClient) {
    return null;
  }
  return (
    <div
      className={cn("textClass relative mt-16", {
        "!block": layout === "minimal",
      })}
    >
      <VideoPlayer url="https://res.cloudinary.com/dz1dlvfef/video/upload/v1734718499/protein-corner-intro_ldmi2r.mp4" />
      {/* <div className="overflow-hidden -z-1">
        <div className="relative">
          <Swiper
            id="banner"
            // loop={true}
            modules={[Navigation]}
            resizeObserver={true}
            allowTouchMove={false}
            slidesPerView={1}
            navigation={{
              nextEl: ".banner-next",
              prevEl: ".banner-prev",
            }}
          >
            {reverseBanners?.map((banner, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className={cn("relative h-screen w-full", {
                    "max-h-140": layout === "standard",
                    "max-h-[320px] md:max-h-[680px]": layout === "minimal",
                  })}
                >
                  <Image
                    className="object-cover w-full h-full min-h-140"
                    src={banner?.image?.original ?? productPlaceholder}
                    alt={banner?.title ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 mt-8 flex w-full flex-col items-center justify-center p-5 text-center md:px-20 lg:space-y-10",
                      {
                        "space-y-5 md:!space-y-8": layout === "minimal",
                      }
                    )}
                  >
                    <h1
                      className={cn(
                        "text-2xl font-bold tracking-tight text-heading lg:text-4xl xl:text-5xl",
                        {
                          "!text-accent": layout === "minimal",
                        }
                      )}
                    >
                      {banner?.title}
                    </h1>
                    <p className="text-sm text-heading lg:text-base xl:text-lg">
                      {banner?.description}
                    </p>
                    <div className="w-full max-w-3xl" ref={intersectionRef}>
                      <Search label="search" />
                    </div>
                  </div>
                </div>
                //{" "}
              </SwiperSlide>
            ))}
          </Swiper>
          {banners && banners?.length > 1 ? (
            <>
              <div
                className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full cursor-pointer banner-prev top-2/4 border-border-200 border-opacity-70 bg-light text-heading shadow-200 ltr:left-4 rtl:right-4 md:-mt-5 ltr:md:left-5 rtl:md:right-5"
                role="button"
              >
                <span className="sr-only">{t("text-previous")}</span>

                {isRTL ? (
                  <ArrowNext width={18} height={18} />
                ) : (
                  <ArrowPrev width={18} height={18} />
                )}
              </div>
              <div
                className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full cursor-pointer banner-next top-2/4 border-border-200 border-opacity-70 bg-light text-heading shadow-200 ltr:right-4 rtl:left-4 md:-mt-5 ltr:md:right-5 rtl:md:left-5"
                role="button"
              >
                <span className="sr-only">{t("text-next")}</span>
                {isRTL ? (
                  <ArrowPrev width={18} height={18} />
                ) : (
                  <ArrowNext width={18} height={18} />
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div> */}
    </div>
  );
};

export default BannerWithSearch;
