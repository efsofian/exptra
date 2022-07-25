import { View, FlatList, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpList from "./explist.component";
import ExpSummary from "./expsummary.component";

const ExpOutput = ({ expenses, expensesPeriod, fallBackText }) => {
	let content = <Text style={styles.infoText}>{fallBackText}</Text>;
	if (expenses.length > 0) {
		content = <ExpList expenses={expenses} />;
	}
	return (
		<View style={styles.container}>
			<ExpSummary expenses={expenses} periodName={expensesPeriod} />
			{content}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 24,
		paddingBottom: 0,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	infoText: {
		color: "white",
		fontSize: 16,
		textAlign: "center",
		marginTop: 32,
	},
});
export default ExpOutput;
