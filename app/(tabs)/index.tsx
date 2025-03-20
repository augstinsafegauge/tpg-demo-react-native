import {
	FlatList,
	Image,
	View,
	StyleSheet,
	Dimensions,
	Platform,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
	useFetchRandomCatsPhotosQuery,
	useDeleteCatPhotoMutation,
} from "../features/gallery-slice";
import CatImage from "@/components/CatImage";

export default function HomeScreen() {
	const { data = [], isFetching, refetch } = useFetchRandomCatsPhotosQuery();

	if (isFetching) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ThemedText>Loading...</ThemedText>
			</View>
		);
	}
	// Grid layout settings
	const numColumns = 4;
	return (
		<>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Welcome!</ThemedText>
				<HelloWave />
			</ThemedView>
			<View style={styles.stepContainer}>
				<ThemedText>Number of cats: {data.length}</ThemedText>
			</View>

			{/* Cat Photos Grid */}
			<FlatList
				columnWrapperStyle={{
					gap: 40,
					padding: 20,
					margin: 5,
				}}
				data={data}
				numColumns={numColumns}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<CatImage uri={item.url} showDeleteIcon={false} onRemove={() => {}} />
				)}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
