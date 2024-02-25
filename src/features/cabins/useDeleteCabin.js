import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

// Custom Hook
export function useDeleteCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		// mutationFn: (id) => deleteCabin(id),
		mutationFn: deleteCabinApi,
		// tell what to do which refetch with invalidating the query
		onSuccess: () => {
			toast.success("cabin successfully deleted ");

			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => toast.error(err.message),
	});
	return { isDeleting, deleteCabin };
}
