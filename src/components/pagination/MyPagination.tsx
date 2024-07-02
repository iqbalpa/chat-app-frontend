import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface IMyPagination {
	currentPage: number;
	maxPage: number;
	handleClickPrev: () => void;
	handleClickNext: () => void;
}

const MyPagination: React.FC<IMyPagination> = ({ currentPage, maxPage, handleClickPrev, handleClickNext }) => {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem className="hover:cursor-pointer">
					<PaginationPrevious onClick={handleClickPrev} />
				</PaginationItem>
				{currentPage > 1 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				<PaginationItem>
					<PaginationLink>{currentPage}</PaginationLink>
				</PaginationItem>
				{maxPage && currentPage < maxPage && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				<PaginationItem className="hover:cursor-pointer">
					<PaginationNext onClick={handleClickNext} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default MyPagination;
