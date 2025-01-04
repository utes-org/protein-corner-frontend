import { NextSeo, NextSeoProps } from "next-seo";
interface SeoProps extends NextSeoProps {
  url?: string;
  images?: any[] | null;
}
const Seo = ({ title, description, images, url, ...props }: SeoProps) => {
  return (
    <NextSeo
      title={"Protein Corner"}
      openGraph={{
        ...(Boolean(url) && {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${url}`,
        }),
        title,
        description,
        ...(Boolean(images) && {
          images: images?.map((item) => ({
            url: "https://res.cloudinary.com/dz1dlvfef/image/upload/v1736000531/ut6ipkxvl5afcshruvyt.png",
            alt: "protein_corner_uttara",
          })),
        }),
      }}
      {...props}
    />
  );
};

export default Seo;
