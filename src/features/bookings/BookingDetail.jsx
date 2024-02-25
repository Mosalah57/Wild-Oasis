import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import useCheckOut from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "../bookings/useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	// const booking = {};
	const { isLoading, booking } = useBooking();
	const { isDeleting, deleteBooking } = useDeleteBooking();
	const { isCheckingOut, checkout } = useCheckOut();
	const navigate = useNavigate();

	// const status = "checked-in";

	const moveBack = useMoveBack();

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};
	if (isLoading) return <Spinner />;
	if (!booking) return <Empty resourceName="booking" />;

	const { status, id: bookingId } = booking;

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === "unconfirmed" && (
					<Button onClick={() => navigate(`/checkin/${bookingId}`)}>
						Check In
					</Button>
				)}

				<Modal>
					<Modal.Open opens="delete">
						<Button variation="danger">Delete booking</Button>
					</Modal.Open>

					<Modal.Window name="delete">
						<ConfirmDelete
							resourceName="bookings"
							disabled={isDeleting}
							onConfirm={() =>
								deleteBooking(bookingId, {
									onSettled: () => navigate(-1),
								})
							}
						/>
					</Modal.Window>
				</Modal>
				{status === "checked-in" && (
					<Button
						icon={<HiArrowUpOnSquare />}
						onClick={() => checkout(bookingId)}
						disabled={isCheckingOut}>
						Check out
					</Button>
				)}
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
