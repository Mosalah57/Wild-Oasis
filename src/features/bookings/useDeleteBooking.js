import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

// Custom Hook
export function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		// mutationFn: (id) => deleteBooking(id),
		mutationFn: deleteBookingApi,
		// tell what to do which refetch with invalidating the query
		onSuccess: () => {
			toast.success("booking successfully deleted ");

			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
		},
		onError: (err) => toast.error(err.message),
	});
	return { isDeleting, deleteBooking };
}
