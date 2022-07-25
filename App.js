import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Manex from "./screens/manex.screen";
import RecentEx from "./screens/recentex.screen";
import Totex from "./screens/totex.screen";
import Bottom from "./navigation/bottom.navigation";
import Stack from "./navigation/stack.navigation";
import IconButton from "./components/UI/iconbutton.component";
import ExpenseProvider from "./state/context/expenses.context";
import { GlobalStyles } from "./constants/styles";

const ExpOverview = () => {
	return (
		<Bottom.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
				headerTintColor: "white",
				tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				headerRight: ({ tintColor }) => (
					<IconButton
						icon="add"
						size={24}
						color={tintColor}
						onPress={() => {
							navigation.navigate("ManageExpense");
						}}
					/>
				),
			})}>
			<Bottom.Screen
				name="RecentExpense"
				component={RecentEx}
				options={{
					title: "Recent Expenses",
					tabBarLabel: "Recent",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="hourglass" size={size} color={color} />
					),
				}}
			/>
			<Bottom.Screen
				name="TotalExpense"
				component={Totex}
				options={{
					title: "Total Expenses",
					tabBarLabel: "Total",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="calendar" size={size} color={color} />
					),
				}}
			/>
		</Bottom.Navigator>
	);
};

export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<ExpenseProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
							headerTintColor: "white",
						}}>
						<Stack.Screen
							name="ExpOverview"
							component={ExpOverview}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="ManageExpense"
							component={Manex}
							options={{
								presentation: "modal",
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpenseProvider>
		</>
	);
}
