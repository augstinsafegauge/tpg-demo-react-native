import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import {
	useDeleteCatPhotoMutation,
	useFetchUploadedCatsPhotosQuery,
	useUploadCatsPhotoMutation,
} from "../features/gallery-slice";
import CatImage from "@/components/CatImage";
import { useMemo, useState } from "react";

export default function TabTwoScreen() {
	const images = useMemo(
		() => [
			require("@/assets/images/cat1.jpg").uri,
			require("@/assets/images/cat2.jpg").uri,
			require("@/assets/images/cat3.jpg").uri,
			require("@/assets/images/cat4.jpg").uri,
			require("@/assets/images/cat5.jpg").uri,
			require("@/assets/images/cat6.jpg").uri,
			require("@/assets/images/cat7.jpg").uri,
			require("@/assets/images/cat8.jpg").uri,
			require("@/assets/images/cat9.jpg").uri,
			require("@/assets/images/cat10.jpg").uri,
			require("@/assets/images/cat11.jpg").uri,
			require("@/assets/images/cat12.jpg").uri,
			require("@/assets/images/cat13.jpg").uri,
			require("@/assets/images/cat14.jpg").uri,
			require("@/assets/images/cat15.jpg").uri,
			require("@/assets/images/cat16.jpg").uri,
			require("@/assets/images/cat17.jpg").uri,
			require("@/assets/images/cat18.jpg").uri,
			require("@/assets/images/cat19.jpg").uri,
			require("@/assets/images/cat20.jpg").uri,
		],
		[]
	);
	const numColumns = 4;
	const { data = [], isFetching, refetch } = useFetchUploadedCatsPhotosQuery();
	const [deleteCatPhoto] = useDeleteCatPhotoMutation();
	const [uploadCatPhoto] = useUploadCatsPhotoMutation();
	const [isUploading, setisUploading] = useState(false);

	if (isFetching && data.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ThemedText>Loading...</ThemedText>
			</View>
		);
	}
	const handleDelete = async (id: string) => {
		try {
			await deleteCatPhoto(id);
			refetch();

			alert("Cat photo deleted successfully");
		} catch (err) {
			console.error("Failed to delete:", err);
		}
	};

	const handleAddCat = async () => {
		setisUploading(true);
		// Generate a random cat image file name
		const randomIndex = Math.floor(Math.random() * 20) + 1;

		const response = await fetch(images[randomIndex]);

		console.log(randomIndex);
		// Fetch the image as a Blob
		const blob = await response.blob();
		const formData = new FormData();

		formData.append("file", blob);

		// Upload logic
		try {
			await uploadCatPhoto(formData);
			refetch();
			setisUploading(false);
			alert("Cat photo uploaded successfully");
		} catch (error) {
			setisUploading(false);
			console.error("Failed to upload:", error);
			alert("Failed to upload cat photo");
		}
	};
	return (
		<>
			<View style={styles.stepContainer}>
				<ThemedText>Number of cats: {data.length}</ThemedText>
			</View>
			<View style={styles.topButtonContainer}>
				<TouchableOpacity style={styles.button} onPress={handleAddCat}>
					<ThemedText style={styles.buttonText}>
						{isUploading ? "Uploading..." : "Add Cat"}
					</ThemedText>
				</TouchableOpacity>
			</View>
			{/* Cat Photos Grid */}
			<FlatList
				data={data}
				numColumns={numColumns}
				columnWrapperStyle={{
					gap: 40,
					padding: 20,
					margin: 5,
				}}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<CatImage
						uri={item.url}
						showDeleteIcon={true}
						onRemove={() => {
							console.log("Delete button pressed for item:", item.id);
							handleDelete(item.id);
						}}
					/>
				)}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	topButtonContainer: {
		alignItems: "center",
		marginVertical: 10, // Adds spacing at the top
	},
	button: {
		backgroundColor: "#4CAF50",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
});
