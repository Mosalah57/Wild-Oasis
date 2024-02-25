import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
	// after fetching the data we get the user into reactQuery
	const { isLoading, data: user } = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});

	return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
