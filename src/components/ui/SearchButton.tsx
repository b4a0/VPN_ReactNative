import React from "react";
import { View, TouchableHighlight } from "react-native";
import { themeEnum } from "../../constants/themeEnum";

interface SearchButtonProps {
    IconComponent: any
    name: string,
    size: number,
    togleSearch: () => void
}

const SearchButton: React.FC<SearchButtonProps> = ({ IconComponent, name, size, togleSearch }) => <View>
    <TouchableHighlight
        underlayColor="transparent"
        onPress={togleSearch}
        style={{ marginRight: 20 }}
    >
        <IconComponent
            name={name}
            color={themeEnum.FOCUSED_TEXT_COLOR}
            size={size}
        />
    </TouchableHighlight>
</View>

export default SearchButton;