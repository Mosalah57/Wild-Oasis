import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: (user) => {
			// console.log(user);

			// we take the newly login user & add them manually to reactQuery cache
			queryClient.setQueryData(["user"], user.user);
			// replace means going back is no longer available
			navigate("/dashboard", { replace: true });
		},
		onError: (err) => {
			console.log("Error", err);
			toast.error("provided email or password are incorrect");
		},
	});
	return { login, isLoading };
}
