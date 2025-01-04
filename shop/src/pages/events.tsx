import type { NextPageWithLayout } from "@/types";
import Seo from "@/components/seo/seo";
import { useTranslation } from "next-i18next";

import dynamic from "next/dynamic";
import { getLayoutWithFooter } from "@/components/layouts/layout-with-footer";
import PageBanner from "@/components/banners/page-banner";
import { Image } from "@/components/ui/image";
export { getStaticProps } from "@/framework/coupon.ssr";

const CartCounterButton = dynamic(
  () => import("@/components/cart/cart-counter-button"),
  { ssr: false }
);

const EventsPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Seo title="Events" url="events" />
      <PageBanner
        title={t("text-events-title")}
        breadcrumbTitle={t("text-home")}
      />

      {/* <div className="w-full overflow-x-hidden"> */}
      {/* <div className="w-full h-full "> */}
      <Image
        src={
          "https://res.cloudinary.com/dz1dlvfef/image/upload/v1736000531/ut6ipkxvl5afcshruvyt.png"
        }
        alt={"protein_corner_uttara"}
        width={1920}
        height={350}
        objectFit="cover"
        className="overflow-x-hidden"
      />
      {/* </div> */}
      {/* </div> */}

      <CartCounterButton />
    </>
  );
};

EventsPage.getLayout = getLayoutWithFooter;

export default EventsPage;
