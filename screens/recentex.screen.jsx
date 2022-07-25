import { useContext } from "react";
import { Text } from "react-native";
import ExpOutput from "../components/ExpOutput/expoutput.component";
import { ExpenseContext } from "../state/context/expenses.context";
import { getDateMinusDay } from "../utils/dateformat";

const RecentEx = ({ expensesPeriod }) => {
	const ctx = useContext(ExpenseContext);
	const recentExp = ctx.expenses.filter((exp) => {
		const today = new Date();
		const date7daysago = getDateMinusDay(today, 7);
		console.log(exp);
		return exp.date >= date7daysago;
	});

	return (
		<ExpOutput
			expensesPeriod="Last 7 days"
			expenses={recentExp}
			fallBackText="No expenses registered in the last 7 days"
		/>
	);
};

export default RecentEx;
