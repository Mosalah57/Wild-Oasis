import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

// to update
export function useUpdateSetting() {
	const queryClient = useQueryClient();

	const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
		mutationFn: updateSettingApi,

		onSuccess: () => {
			toast.success("setting successfully Edited");
			// invalidate so after the mutation of settings the component will re-render
			queryClient.invalidateQueries({ queryKey: "settings" });
			// reset();
		},
		onError: (err) => toast.error(err.message),
	});
	return { isUpdating, updateSetting };
}
