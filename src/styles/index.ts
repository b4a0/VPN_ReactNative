import { Dimensions, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    marginUpBottom: {
        marginBottom:5,
        marginTop:5
    },
    center: {
        height:Dimensions.get('window').height,
        display: "flex",
        justifyContent:'center',
        alignItems:'center',
    },
    flexCenter: {
        display: "flex",
        justifyContent:'center',
        alignItems:'center',
    },
    deviceHeight:{
        height:Dimensions.get('window').height,
    },
    drawerItemStyle: {
        backgroundColor: "white",
        width: "100%",
        borderRadius: 0,
        height: 55,
    
        display: "flex",
        justifyContent: "center",
    
        marginLeft: 0,
        paddingTop: 0,
        marginVertical:2,
    }
  });