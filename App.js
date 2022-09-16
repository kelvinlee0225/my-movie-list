import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, MovieDetailScreen } from "./src/screens";
import { FavoriteIcon } from "./src/components/common";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{
            headerRight: (props) => <FavoriteIcon {...props} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
