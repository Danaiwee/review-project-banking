import { TRANSACTION_CATEGORY_STYLES } from "@/constants";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    TRANSACTION_CATEGORY_STYLES[
      category as keyof typeof TRANSACTION_CATEGORY_STYLES
    ] || TRANSACTION_CATEGORY_STYLES.default;

  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

export default CategoryBadge;
