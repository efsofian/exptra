import { useContext } from "react";
import { Text } from "react-native";
import ExpOutput from "../components/ExpOutput/expoutput.component";
import { ExpenseContext } from "../state/context/expenses.context";

const Totex = ({ expensesPeriod }) => {
	const ctx = useContext(ExpenseContext);
	return (
		<ExpOutput
			expensesPeriod="Total"
			expenses={ctx.expenses}
			fallBackText="No registered expenses."
		/>
	);
};

export default Totex;
