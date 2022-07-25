import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/dateformat";

const ExpItem = ({ id, desc, amount, date }) => {
	const navigation = useNavigation();

	const expensePressHandler = () => {
		navigation.navigate("ManageExpense", {
			expenseId: id,
		});
	};

	return (
		<Pressable
			onPress={expensePressHandler}
			style={({ pressed }) => pressed && styles.pressed}>
			<View style={styles.expenseItem}>
				<View>
					<Text style={[styles.text, styles.desc]}>{desc}</Text>
					<Text style={styles.text}>{getFormattedDate(date)}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>{amount.toFixed(2)}</Text>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	expenseItem: {
		padding: 12,
		marginVertical: 8,
		backgroundColor: GlobalStyles.colors.primary500,
		flexDirection: "row",
		justifyContent: "space-between",
		borderRadius: 6,
		elevation: 3,
		shadowColor: GlobalStyles.colors.gray500,
		shadowRadius: 4,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
	},
	pressed: {
		opacity: 0.75,
	},
	text: {
		color: GlobalStyles.colors.primary50,
	},
	desc: {
		fontSize: 16,
		marginBottom: 4,
		fontWeight: "bold",
	},
	amountContainer: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
	},
	amount: {
		textAlign: "center",
		color: GlobalStyles.colors.primary500,
		fontWeight: "bold",
		minWidth: 80,
	},
});

export default ExpItem;
