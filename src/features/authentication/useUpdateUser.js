import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { updateCurrentUser } from "../../services/apiAuth";

// to update
export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		// mutationFn: createCabin,
		onSuccess: (user) => {
			toast.success("user account successfully Updated");
			// Imp. the queryKey should be an array of strings
			queryClient.setQueryData("user", user); // update user manually

			// invalidate so after the mutation of cabins the component will re-render
			queryClient.invalidateQueries({ queryKey: "user" });
			// reset();
		},
		onError: (err) => toast.error(err.message),
	});
	return { isUpdating, updateUser };
}
