import { useSettings } from "@/framework/settings";
import { DefaultSeo as NextDefaultSeo } from "next-seo";

const DefaultSeo = () => {
  const { settings }: any = useSettings();
  return (
    <NextDefaultSeo
      additionalMetaTags={[
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1 maximum-scale=1",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
      ]}
      additionalLinkTags={[
        {
          rel: "apple-touch-icon",
          href: "icons/apple-icon-180.png",
        },
        {
          rel: "manifest",
          href: "/manifest.json",
        },
      ]}
      title={"Protein Corner"}
      // titleTemplate={`${
      //   settings?.seo?.metaTitle || settings?.siteTitle || 'E-Commerce'
      // } | %s`}
      titleTemplate={"Protein Corner"}
      // defaultTitle="PickBazar"
      description={"Fresh, Premium-Quality Protein Delivered to Your Door"}
      canonical={settings?.seo?.canonicalUrl}
      openGraph={{
        title:
          "Protein Corner: Fresh, Premium-Quality Protein Delivered to Your Door",
        description:
          "Explore a variety of fresh, high-quality protein-rich foods, including chicken and other top-tier protein options. Shop online for guaranteed freshness, great value, and convenient delivery. Elevate your meals and stay nourished with Protein Corner!",
        type: "website",
        locale: "en_US",
        site_name: "Protein Corner",
        images: [
          {
            url: "https://res.cloudinary.com/dz1dlvfef/image/upload/v1736000531/ut6ipkxvl5afcshruvyt.png",
            width: 800,
            height: 600,
            alt: "protein_corner_uttara",
          },
        ],
      }}
      // twitter={{
      //   handle: settings?.seo?.twitterHandle,
      //   site: settings?.siteTitle,
      //   cardType: settings?.seo?.twitterCardType,
      // }}
    />
  );
};

export default DefaultSeo;
