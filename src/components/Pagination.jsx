import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({ pageLimit = 10 }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [pageOffset, setPageOffset] = useState(() => {
		return +searchParams.get("page") || 1;
	});

	const next = () => {
		if (pageOffset === pageLimit) return;
		setPageOffset(pageOffset + 1);
	};

	const prev = () => {
		if (pageOffset === 1) return;
		setPageOffset(pageOffset - 1);
	};

	useEffect(() => {
		setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: pageOffset })
	}, [pageOffset])

	useEffect(() => {
		setPageOffset(+searchParams.get("page") || 1)
	}, [searchParams])


	return (
		<div className="flex items-center justify-center gap-8">
			<IconButton
				size="sm"
				variant="outlined"
				onClick={prev}
				disabled={pageOffset === 1}
			>
				<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
			</IconButton>
			<Typography color="gray" className="font-normal">
				Page <strong className="text-gray-900">{pageOffset}</strong>
			</Typography>
			<IconButton
				size="sm"
				variant="outlined"
				onClick={next}
				disabled={pageOffset === pageLimit}
			>
				<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
			</IconButton>
		</div>
	);
}