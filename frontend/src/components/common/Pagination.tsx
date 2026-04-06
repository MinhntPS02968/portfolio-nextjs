"use client";

import React from "react";

interface PaginationProps {
    // Current page number (1-based)
    currentPage: number;
    // Total number of items
    totalItems?: number;
    // Number of items per page
    itemsPerPage: number;
    // Callback when page changes
    onPageChange: (page: number) => void;
    // Optional: Show total items count
    showTotal?: boolean;
    // Optional: Custom className
    className?: string;
    // Optional: Disable pagination
    disabled?: boolean;
    // Optional: Has next page (if totalItems is not provided, use this)
    hasNextPage?: boolean;
}

/**
 * Reusable Pagination Component
 * 
 * @example
 * <Pagination
 *   currentPage={1}
 *   itemsPerPage={10}
 *   totalItems={100}
 *   onPageChange={(page) => setPage(page)}
 * />
 */
export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    showTotal = false,
    className = "",
    disabled = false,
    hasNextPage,
}) => {
    // Calculate total pages if totalItems is provided
    const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : undefined;
    
    // Determine if there's a next page
    const canGoNext = totalPages 
        ? currentPage < totalPages 
        : hasNextPage !== undefined 
            ? hasNextPage 
            : true; // Default to true if not provided
    
    // Determine if there's a previous page
    const canGoPrevious = currentPage > 1;
    
    // Handle previous page
    const handlePrevious = () => {
        if (canGoPrevious && !disabled) {
            onPageChange(currentPage - 1);
        }
    };
    
    // Handle next page
    const handleNext = () => {
        if (canGoNext && !disabled) {
            onPageChange(currentPage + 1);
        }
    };
    
    return (
        <div className={`d-flex justify-content-between align-items-center p-3 ${className}`}>
            <button
                className="btn btn-sm btn-outline-secondary"
                disabled={!canGoPrevious || disabled}
                onClick={handlePrevious}
                type="button"
            >
                Previous
            </button>
            
            <div className="d-flex align-items-center gap-2">
                <span className="text-sm">
                    Page {currentPage}
                    {showTotal && totalPages && ` of ${totalPages}`}
                    {showTotal && totalItems && ` (${totalItems} items)`}
                </span>
            </div>
            
            <button
                className="btn btn-sm btn-outline-secondary"
                disabled={!canGoNext || disabled}
                onClick={handleNext}
                type="button"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;

