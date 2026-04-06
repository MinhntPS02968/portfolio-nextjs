// useActiveClass.ts
"use client";
import { usePathname, useSearchParams } from "next/navigation";

interface UseActiveClassOptions {
  // Check N query params (không giới hạn số lượng)
  // Object với key-value pairs: { "type": "commission-ib", "status": "active", ... }
  queryParams?: Record<string, string>;
}

/**
 * Hook kiểm tra pathname và query parameters để trả về active class
 *
 * @param path - Đường dẫn cần kiểm tra (ví dụ: "/crm/account/report")
 * @param activeClass - Class name trả về khi match (mặc định: "active")
 * @param options - Options để kiểm tra query parameters
 *
 * @example
 * // Cách 1: Chỉ check pathname
 * useActiveClass("/crm/account/report")
 * // URL: /crm/account/report → trả về "active"
 *
 * @example
 * // Cách 2: Check 1 query param
 * useActiveClass("/crm/account/report", "active", {
 *   queryParams: {
 *     type: "commission-ib"
 *   }
 * })
 * // URL: /crm/account/report?type=commission-ib → trả về "active"
 *
 * @example
 * // Cách 3: Check N query params (không giới hạn số lượng)
 * useActiveClass("/crm/account/report", "active", {
 *   queryParams: {
 *     type: "commission-ib",
 *     status: "active",
 *     page: "1",
 *     filter: "all"
 *   }
 * })
 * // URL: /crm/account/report?type=commission-ib&status=active&page=1&filter=all → trả về "active"
 * // Tất cả params phải khớp mới trả về "active"
 *
 * @example
 * // Check nhiều params với các giá trị khác nhau
 * useActiveClass("/crm/account/report", "active", {
 *   queryParams: {
 *     type: "commission-ib",
 *     tab: "history",
 *     view: "list"
 *   }
 * })
 * // URL: /crm/account/report?type=commission-ib&tab=history&view=list → trả về "active"
 */
export function useActiveClass(
  path: string,
  activeClass = "active",
  options?: UseActiveClassOptions
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Kiểm tra pathname có khớp không
  const pathMatches = pathname === path;

  // Nếu không có options hoặc không có query params → chỉ check pathname
  if (!options || !options.queryParams) {
    return pathMatches ? activeClass : "";
  }

  // Kiểm tra N query params - tất cả params phải khớp
  const allParamsMatch = Object.entries(options.queryParams).every(
    ([key, value]) => {
      const queryValue = searchParams.get(key);
      return queryValue === value;
    }
  );

  // Chỉ trả về active class khi pathname khớp VÀ tất cả params khớp
  return pathMatches && allParamsMatch ? activeClass : "";
}
