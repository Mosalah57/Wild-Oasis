import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
	// set the state
	const [value, setValue] = useState(function () {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialState;
	});
	// then sync with localStorage
	useEffect(
		function () {
			localStorage.setItem(key, JSON.stringify(value));
		},
		[value, key]
	);

	return [value, setValue];
}
