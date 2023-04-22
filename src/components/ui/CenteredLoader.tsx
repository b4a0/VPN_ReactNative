import React from "react";
import { View, ActivityIndicator, ColorValue } from "react-native";

interface CenteredLoaderProps {
    size?: number,
    color?: ColorValue
}

export const CenteredLoader: React.FC<CenteredLoaderProps> = ({ size, color }) => {
    return <View className="w-full h-full bg-white flex justify-center items-center">
        <ActivityIndicator size={size} color={color} />
    </View>
}; 