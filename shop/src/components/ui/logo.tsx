import { Image } from "@/components/ui/image";
import cn from "classnames";
import Link from "@/components/ui/link";
import { logoPlaceholder } from "@/lib/placeholders";
import { useSettings } from "@/framework/settings";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const {
    settings: { logo, siteTitle },
  }: any = useSettings();
  return (
    <Link href="/" className={cn("inline-flex", className)} {...props}>
      <span className="relative h-[4.125rem] w-32 overflow-hidden md:w-[8.625rem]">
        <Image
          src={logoPlaceholder}
          alt={"Protein Corner Logo"}
          fill
          sizes="(max-width: 768px) 100vw"
          loading="eager"
          className="object-contain"
        />
      </span>
    </Link>
  );
};

export default Logo;
