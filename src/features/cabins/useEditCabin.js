import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

// to update
export function useEditCabin() {
	const queryClient = useQueryClient();

	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		// mutationFn: createCabin,
		onSuccess: () => {
			toast.success("cabin successfully Edited");
			// invalidate so after the mutation of cabins the component will re-render
			queryClient.invalidateQueries({ queryKey: "cabins" });
			// reset();
		},
		onError: (err) => toast.error(err.message),
	});
	return { isEditing, editCabin };
}
