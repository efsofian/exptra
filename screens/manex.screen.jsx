import { useLayoutEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ExpenseContext } from "../state/context/expenses.context";
import IconButton from "../components/UI/iconbutton.component";
import { GlobalStyles } from "../constants/styles";
import ExpForm from "../components/ExpMan/expform.component";

const Manex = ({ route, navigation }) => {
	const ctx = useContext(ExpenseContext);
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;
	const selectedExp = ctx.expenses.find((exp) => exp.id === editedExpenseId);

	const cancelHandler = () => {
		navigation.goBack();
	};

	const confirmHandler = (expenseData) => {
		if (isEditing) {
			ctx.updateExpense(editedExpenseId, expenseData);
		} else {
			ctx.addExpense(expenseData);
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
			<ExpForm
				onCancel={cancelHandler}
				submitButtonLabel={isEditing ? "Update" : "Add"}
				onSubmit={confirmHandler}
				defaultValues={selectedExp}
			/>

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

	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: "center",
	},
});

export default Manex;
