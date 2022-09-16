import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  FavoriteMoviesGridScreen,
  HomeScreen,
  MovieDetailScreen,
  PopularMoviesGridScreen,
  SearchScreen,
} from "./src/screens";
import { FavoriteIcon } from "./src/components/common";
import { FavoriteProvider } from "./src/contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function App() {
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
          options={({ route }) => ({
            headerRight: (props) => (
              <FavoriteIcon {...route.params} {...props} />
            ),
          })}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="PopularMoviesGrid"
          component={PopularMoviesGridScreen}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="FavoriteMoviesGrid"
          component={FavoriteMoviesGridScreen}
          options={{
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <FavoriteProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </FavoriteProvider>
);
