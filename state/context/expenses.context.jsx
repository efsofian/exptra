import { createContext, useReducer } from "react";

const dummyExp = [
	{
		id: "e1",
		desc: "a pair of shoes",
		amount: 59.99,
		date: new Date("2021-12-19"),
	},
	{
		id: "e2",
		desc: "a pair of scissor",
		amount: 12.99,
		date: new Date("2021-12-23"),
	},
	{
		id: "e3",
		desc: "bananas",
		amount: 2.2,
		date: new Date("2021-12-27"),
	},
	{
		id: "e4",
		desc: "a Book",
		amount: 15.9,
		date: new Date("2021-12-27"),
	},
	{
		id: "e5",
		desc: "Parfume",
		amount: 39.99,
		date: new Date("2021-12-30"),
	},
	{
		id: "e6",
		desc: "ps5",
		amount: 299.99,
		date: new Date("2022-08-20"),
	},
];

export const ExpenseContext = createContext({
	expenses: [],
	addExpense: ({ description, amount, date }) => {},
	deleteExpense: (id) => {},
	updateExpense: (id, { description, amount, date }) => {},
});

const expenseReducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			const id = new Date().toString() + Math.random().toString();
			return [...state, { ...action.payload, id }];
		case "DELETE":
			return state.filter((expense) => expense.id !== action.payload);
		case "UPDATE":
			const updatableExpenseIndex = state.findIndex(
				(expense) => expense.id === action.payload.id
			);
			const updatableExpense = state[updatableExpenseIndex];
			const updatedItem = { ...updatableExpense, ...action.payload.data };
			const updatedExpenses = [...state];
			updatedExpenses[updatableExpenseIndex] = updatedItem;
			return updatedExpenses;
		default:
			return state;
	}
};
const ExpenseProvider = ({ children }) => {
	const [expenseState, dispatch] = useReducer(expenseReducer, dummyExp);

	const addExpense = (expenseData) => {
		dispatch({
			type: "ADD",
			payload: expenseData,
		});
	};

	const deleteExpense = (id) => {
		dispatch({
			type: "DELETE",
			payload: id,
		});
	};

	const updateExpense = (id, expenseData) => {
		dispatch({
			type: "UPDATE",
			payload: { id, data: expenseData },
		});
	};

	const value = {
		expenses: expenseState,
		addExpense,
		deleteExpense,
		updateExpense,
	};
	return (
		<ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
	);
};

export default ExpenseProvider;
