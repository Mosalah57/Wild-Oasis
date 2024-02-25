import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	// 1.load the authenticated user
	const { isAuthenticated, isLoading } = useUser();

	// 2.if there is no auth user ,redirect to login
	useEffect(
		function () {
			// after login we don't auth right away but after loading
			if (!isAuthenticated && !isLoading) navigate("/login");
		},
		[isAuthenticated, isLoading, navigate]
	);

	// 3.while loading, show a spinner
	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	if (isAuthenticated) return children;
}

export default ProtectedRoute;
