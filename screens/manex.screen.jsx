import { useLayoutEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ExpenseContext } from "../state/context/expenses.context";
import Button from "../components/UI/button.component";
import IconButton from "../components/UI/iconbutton.component";
import { GlobalStyles } from "../constants/styles";

const Manex = ({ route, navigation }) => {
	const ctx = useContext(ExpenseContext);
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;

	const cancelHandler = () => {
		navigation.goBack();
	};

	const confirmHandler = () => {
		if (isEditing) {
			ctx.updateExpense(editedExpenseId, {
				id: "e1",
				desc: "test",
				amount: 19.99,
				date: new Date("2022-06-20"),
			});
		} else {
			ctx.addExpense({
				id: "xxx",
				desc: "test",
				amount: 19.99,
				date: new Date("2022-07-20"),
			});
		}
		navigation.goBack();
	};

	const deleteExpenseHandler = () => {
		ctx.deleteExpense(editedExpenseId);
		navigation.goBack();
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [navigation, isEditing]);

	return (
		<View style={styles.container}>
			<View style={styles.buttons}>
				<Button style={styles.button} mode="flat" onPress={cancelHandler}>
					Cancel
				</Button>
				<Button style={styles.button} onPress={confirmHandler}>
					{isEditing ? "Update" : "Add"}
				</Button>
			</View>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon="trash"
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: "center",
	},
});

export default Manex;
