import React, { Component } from "react";

import { StyleSheet, TouchableOpacity } from "react-native";

import { Header, Icon } from "react-native-elements";

import Colors from "../constants/Colors";
import { screenWidth, screenFont } from "../constants/Screen";

export default class BackHeader extends Component {
    render() {
        var { navigation, text, goTo } = this.props;
        return (
            <>
                <Header
                    leftComponent={
                        text ? (
                            <TouchableOpacity
                                onPress={() => {
                                    goTo
                                        ? this.props.navigation.navigate(goTo)
                                        : navigation.goBack();
                                }}
                            >
                                <Icon name="chevron-left" size={32} color={Colors.normalWhite} />
                            </TouchableOpacity>
                        ) : (<></>)
                    }
                    centerComponent={{
                        text: text ? text : "Plano de Contas",
                        style: {
                            color: Colors.normalWhite,
                            fontSize: screenFont + 8,
                            fontWeight: 'bold',
                            width: screenWidth * 0.6,
                            textAlign: "center"
                        }
                    }}
                    rightComponent={
                        !text ? (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('AccountsNew')
                                }}
                            >
                                <Icon name="add" size={28} color={Colors.normalWhite} />
                            </TouchableOpacity>
                        ) : (<></>)
                    }
                    backgroundColor={Colors.basePurple}
                    barStyle={"light-content"}
                    containerStyle={{ borderBottomWidth: 0 }}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        paddingTop: -10,
        height: 50
    }
});
