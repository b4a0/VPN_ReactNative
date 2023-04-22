import { View } from "react-native";
import { WebView } from "react-native-webview";
import React from "react";
import { themeEnum } from "../../constants/themeEnum";
import withInternetChecking from "../../hoc/withInternetChecking";
import { CenteredLoader } from "./CenteredLoader";

interface CustomWebviewProps {
  url: string
}
const CustomWebview: React.FC<CustomWebviewProps> = ({ url }) => {

  return (
    <View className="h-full w-full ">
      <WebView
        bounces={false}
        startInLoadingState={true}
        renderLoading={() =>
          <CenteredLoader size={50} color={themeEnum.DARK_TEXT_COLOR} />
        }
        source={{
          uri: url,
        }}
      />
    </View>
  );
};

export default withInternetChecking(CustomWebview);
