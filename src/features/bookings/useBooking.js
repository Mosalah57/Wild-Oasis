// Custom Hook to fetch the data
import { useQuery } from "@tanstack/react-query";

import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
	const { bookingId } = useParams();
	// console.log(bookingId);
	// store data in the cash using useQuery hook
	const {
		isLoading,
		data: booking,
		error,
	} = useQuery({
		queryKey: ["booking", bookingId], // we get an id to make every page unique
		// getting the id from params of the url
		queryFn: () => getBooking(bookingId),
	});
	return { isLoading, error, booking };
}
