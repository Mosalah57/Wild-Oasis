// Custom Hook to fetch the data
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
	// store data in the cash using useQuery hook
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ["cabins"],
		queryFn: getCabins,
	});
	return { isLoading, error, cabins };
}
