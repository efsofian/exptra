import { useState } from "react";
import { View, TextInput, StyleSheet, Text, Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/dateformat";
import Button from "../UI/button.component";
import ExpInput from "./expinput.component";

const ExpForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
	const [inputs, setInputs] = useState({
		amount: {
			value: defaultValues ? defaultValues.amount.toString() : "",
			isValid: !!defaultValues,
		},
		date: {
			value: defaultValues ? getFormattedDate(defaultValues.date) : "",
			isValid: !!defaultValues,
		},
		desc: {
			value: defaultValues ? defaultValues.desc : "",
			isValid: !!defaultValues,
		},
	});

	const inputChangeHandler = (inputId, enteredVal) => {
		setInputs((currInputs) => {
			return { ...currInputs, [inputId]: { value: enteredVal, isValid: true } };
		});
	};

	const submitHandler = () => {
		const expenseData = {
			amount: +inputs.amount.value,
			date: new Date(inputs.date.value),
			desc: inputs.desc.value,
		};

		const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid = expenseData.date.toString() !== "Invalid Date";
		const descIsValid = expenseData.desc.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descIsValid) {
			// Alert.alert("Invalid input", "Please check your input values");
			setInputs((currInputs) => {
				return {
					amount: {
						value: currInputs.amount.value,
						isValid: amountIsValid,
					},
					date: {
						value: currInputs.date.value,
						isValid: dateIsValid,
					},
					desc: {
						value: currInputs.desc.value,
						isValid: descIsValid,
					},
				};
			});
		} else {
			onSubmit(expenseData);
		}
	};

	const formIsInvalid =
		!inputs.amount.isValid || !inputs.date.isValid || !inputs.desc.isValid;

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your expenses</Text>
			<View style={styles.inputsRow}>
				<ExpInput
					style={styles.rowInput}
					label="amount"
					invalid={!inputs.amount.isValid}
					textInputCfg={{
						keyboardType: "decimal-pad",
						onChangeText: inputChangeHandler.bind(this, "amount"),
						value: inputs.amount.value,
					}}
				/>
				<ExpInput
					style={styles.rowInput}
					label="date"
					invalid={!inputs.date.isValid}
					textInputCfg={{
						placeholder: "YYYY-MM-DD",
						maxLength: 10,
						onChangeText: inputChangeHandler.bind(this, "date"),
						value: inputs.date.value,
					}}
				/>
			</View>

			<ExpInput
				label="desc"
				invalid={!inputs.desc.isValid}
				textInputCfg={{
					multiline: true,
					onChangeText: inputChangeHandler.bind(this, "desc"),
					value: inputs.desc.value,
					// autoCorrect: false,
					// autoCapitalize: 'none',
				}}
			/>
			{formIsInvalid && (
				<Text style={styles.errorText}>
					Invalid input values - please check your entered data
				</Text>
			)}
			<View style={styles.buttons}>
				<Button style={styles.button} mode="flat" onPress={onCancel}>
					Cancel
				</Button>
				<Button style={styles.button} onPress={submitHandler}>
					{submitButtonLabel ? "Update" : "Add"}
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	form: {
		marginTop: 80,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		marginVertical: 24,
		textAlign: "center",
	},
	inputsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	rowInput: {
		flex: 1,
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
	errorText: {
		textAlign: "center",
		color: GlobalStyles.colors.error500,
		margin: 8,
	},
});

export default ExpForm;
