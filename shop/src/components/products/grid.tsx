import { useTranslation } from "next-i18next";
import cn from "classnames";
import Button from "@/components/ui/button";
import ProductLoader from "@/components/ui/loaders/product-loader";
import NotFound from "@/components/ui/not-found";
import rangeMap from "@/lib/range-map";
import ProductCard from "@/components/products/cards/card";
import ErrorMessage from "@/components/ui/error-message";
import { useProducts } from "@/framework/product";
import { PRODUCTS_PER_PAGE } from "@/framework/client/variables";
import type { Product } from "@/types";
import { useSettings } from "@/framework/settings";

interface Props {
  limit?: number;
  sortedBy?: string;
  orderBy?: string;
  column?: "five" | "six" | "auto";
  shopId?: string;
  gridClassName?: string;
  products: Product[] | undefined;
  isLoading?: boolean;
  error?: any;
  loadMore?: any;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  className?: string;
}

export function Grid({
  className,
  gridClassName,
  products,
  isLoading,
  error,
  loadMore,
  isLoadingMore,
  hasMore,
  limit = PRODUCTS_PER_PAGE,
  column = "auto",
}: Props) {
  const { t } = useTranslation("common");
  const { settings } = useSettings();

  // TODO: get maintenance description from settings temporarily
  const maintenanceDesc: string = settings?.maintenance?.description;

  if (error) return <ErrorMessage message={error.message} />;

  function MaintenanceComp() {
    return (
      <div className="w-full max-w-3xl">
        <div className="overflow-hidden bg-white border border-indigo-100 shadow-xl rounded-2xl">
          {/* Header Section */}
          <div className="px-6 py-8 bg-red-500 sm:px-10">
            <div className="flex items-center justify-center mb-4 space-x-3">
              {/* <WrenchIcon className="w-10 h-10 text-indigo-100 animate-pulse" /> */}
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Site Maintenance
              </h1>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 py-8 sm:p-10">
            <div className="space-y-6 text-center">
              {/* Main Message */}
              <p className="text-lg leading-relaxed text-gray-700 sm:text-xl">
                We are currently undergoing essential maintenance to elevate
                your browsing experience.
              </p>

              {/* Details */}
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  Our team is working diligently to implement improvements that
                  will bring you an even more seamless and enjoyable interaction
                  with our site.
                </p>
                <p className="leading-relaxed">
                  During this period, you may experience temporary
                  inconveniences.
                </p>
              </div>

              {/* Thank You Message */}
              <div className="pt-6 space-y-2">
                <p className="font-medium text-red-600">
                  We appreciate your patience and understanding.
                </p>
                <p className="text-gray-500">
                  Thank you for being a part of our community, and we look
                  forward to unveiling the enhanced features and content soon.
                </p>
              </div>
            </div>
          </div>
        </div>
        <></>
      </div>
    );
  }

  if (!isLoading && !products?.length) {
    return (
      <div className="flex justify-center w-full min-h-full px-4 pt-6 pb-8 lg:p-8">
        {/* // <p>{maintenanceDesc}</p> */}
        {/* <NotFound text="text-not-found" className="w-7/12 mx-auto" /> */}
        <MaintenanceComp />
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          {
            "grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3":
              column === "auto",
            "grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 xl:gap-y-11 2xl:grid-cols-5 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]":
              column === "five",
            "grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 md:gap-6 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] 2xl:grid-cols-5 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]":
              column === "six",
          },
          gridClassName
        )}
      >
        {isLoading && !products?.length
          ? rangeMap(limit, (i) => (
              <ProductLoader key={i} uniqueKey={`product-${i}`} />
            ))
          : products?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8 mb-4 sm:mb-6 lg:mb-2 lg:mt-12">
          <Button
            loading={isLoadingMore}
            onClick={loadMore}
            className="text-sm font-semibold h-11 md:text-base"
          >
            {t("text-load-more")}
          </Button>
        </div>
      )}
    </div>
  );
}
interface ProductsGridProps {
  className?: string;
  gridClassName?: string;
  variables?: any;
  column?: "five" | "auto";
}
export default function ProductsGrid({
  className,
  gridClassName,
  variables,
  column = "auto",
}: ProductsGridProps) {
  const { products, loadMore, isLoadingMore, isLoading, hasMore, error } =
    useProducts(variables);

  const productsItem: any = products;
  return (
    <Grid
      products={productsItem}
      loadMore={loadMore}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      error={error}
      className={className}
      gridClassName={gridClassName}
      column={column}
    />
  );
}
