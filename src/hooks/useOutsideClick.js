import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
	const ref = useRef();

	useEffect(
		function () {
			function handleClick(e) {
				if (ref.current && !ref.current.contains(e.target)) {
					// console.log("clicked outside");
					// close();
					handler();
				}
			}
			// passing a third argument to get the event captured down the tree not the wayUp
			document.addEventListener("click", handleClick, listenCapturing);

			return () =>
				document.removeEventListener("click", handleClick, listenCapturing);
		},
		[handler, listenCapturing]
	);
	return ref;
}
