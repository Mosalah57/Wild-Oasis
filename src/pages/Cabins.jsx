import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getCabins } from "../services/apiCabins";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
	// experiment
	// useEffect(function () {
	// 	getCabins().then((data) => console.log(data));
	// }, []);

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<CabinTableOperations />
			</Row>
			<Row>
				<CabinTable />
				<AddCabin />
			</Row>
		</>
	);
}

export default Cabins;
