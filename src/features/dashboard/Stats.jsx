import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ confirmedStays, bookings, numDays, cabinCount }) {
	// 1.
	const numBookings = bookings.length;
	// 2.
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
	// 3.
	const checkins = confirmedStays.length;
	// 4.
	const occupation =
		confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
		(numDays * cabinCount);
	// num Checked in nights / all available nights (num days * num cabins)

	return (
		<>
			<Stat
				title="Bookings"
				icon={<HiOutlineBriefcase />}
				color="blue"
				value={numBookings}
			/>
			<Stat
				title="Sales"
				icon={<HiOutlineBanknotes />}
				color="green"
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check ins"
				icon={<HiOutlineCalendarDays />}
				color="indigo"
				value={checkins}
			/>
			<Stat
				title="Occupancy rate"
				icon={<HiOutlineChartBar />}
				color="yellow"
				value={Math.round(occupation * 100) + "%"}
			/>
		</>
	);
}

export default Stats;
