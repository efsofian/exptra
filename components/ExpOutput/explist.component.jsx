import { FlatList, Text } from "react-native";
import ExpItem from "./expitem.component";

const renderExpenseItem = (itemData) => {
	return <ExpItem {...itemData.item} />;
};

const ExpList = ({ expenses }) => {
	return (
		<FlatList
			data={expenses}
			keyExtractor={(item) => item.id}
			renderItem={renderExpenseItem}
		/>
	);
};

export default ExpList;
