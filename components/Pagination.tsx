"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { formUrlQuery } from "@/lib/url";

import { Button } from "./ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searhcParams = useSearchParams();

  const handleNavigation = (type: "next" | "prev") => {
    const pageNumber = type === "prev" ? page - 1 : page + 1;

    const newUrl = formUrlQuery({
      params: searhcParams.toString(),
      key: "page",
      value: pageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="w-full flex justify-between gap-3 mt-3">
      <Button
        className="p-0 hover:bg-transparent cursor-pointer"
        variant="ghost"
        size="lg"
        disabled={Number(page) <= 1}
        onClick={() => handleNavigation("prev")}
      >
        <Image
          src="/icons/arrow-left.svg"
          alt="arrow"
          width={20}
          height={20}
          className="mr-2"
        />
        Prev
      </Button>
      <p className="text-[14px] flex items-center px-2">
        {page} / {totalPages}
      </p>

      <Button
        size="lg"
        variant="ghost"
        className="p-0 hover:bg-transparent cursor-pointer"
        onClick={() => handleNavigation("next")}
        disabled={Number(page) >= totalPages}
      >
        Next
        <Image
          src="/icons/arrow-left.svg"
          alt="arrow"
          width={20}
          height={20}
          className="ml-2 -scale-x-100"
        />
      </Button>
    </div>
  );
};

export default Pagination;
