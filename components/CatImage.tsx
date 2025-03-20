import React from "react";
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have `expo/vector-icons` installed

export default function CatImage({
	uri,
	showDeleteIcon,
	onRemove,
}: {
	uri: string;
	showDeleteIcon: boolean;
	onRemove: () => void;
}) {
	return (
		<View style={{ position: "relative" , }}>
			{/* Delete Icon */}
			{showDeleteIcon && (
				<TouchableOpacity style={styles.closeButton} onPress={onRemove}>
					<Ionicons name="close-circle" size={24} color="red" />
				</TouchableOpacity>
			)}
			{/* Image */}
			<Image source={{ uri }} style={styles.image} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 8,
		alignItems: "center",
		position: "relative", // Ensure absolute positioning works for children
	},
	image: {
		width: 200,
		height: 100,
		borderRadius: 10,
	},
	closeButton: {
		position: "absolute",
		top: 5,
		right: 5,
		zIndex: 10, // Ensures the button is on top
		backgroundColor: "rgba(255,255,255,0.7)",
		borderRadius: 12,
		padding: 2, // Small padding for better tap area
	},
});
