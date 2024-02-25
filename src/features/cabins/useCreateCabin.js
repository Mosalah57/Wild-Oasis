import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
	const queryClient = useQueryClient();

	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		// mutationFn: (newCabin) => createCabin(newCabin),
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success("New cabin successfully created");
			// invalidate so after the mutation of cabins the component will re-render
			queryClient.invalidateQueries({ queryKey: "cabins" });
			// reset() we return it to the createCabin mutate
		},
		onError: (err) => toast.error(err.message),
	});
	return { isCreating, createCabin };
}
