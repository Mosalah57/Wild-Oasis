import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignup() {
	const { mutate: signup, isLoading } = useMutation({
		mutationFn: signUpApi,
		onSuccess: (user) => {
			console.log(user);
			toast.success(
				"Account successfully created! please verify the new account from the user's email"
			);
		},
	});

	return { signup, isLoading };
}
