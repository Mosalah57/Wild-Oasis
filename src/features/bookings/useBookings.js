// Custom Hook to fetch the data
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
	const queryClient = useQueryClient();

	// we can use it in bookingTable but it will add a step
	// we can't use it in apiBookings(regular function)
	const [searchParams] = useSearchParams();

	// we want to get filter/sort in the fetching process not after loading
	// 1) Filter
	const filterValue = searchParams.get("status");
	// console.log(filterValue);
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue, method: "eq" };
	// : { field: "totalPrice", value: 5000, method: "gte" };
	// if we want more than one condition of filtering then we passIn an Array of objects

	// 2) sort
	const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
	const [field, direction] = sortByRaw.split("-");
	const sortBy = { field, direction };

	const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

	// store data in the cash using useQuery hook
	// Query
	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		// we can add anyThing (filter) which will work as dependency array
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	// Pre-Fetching
	const pageCount = Math.ceil(count / PAGE_SIZE);

	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});
	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});

	return { isLoading, error, bookings, count };
}
