import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    ScrollView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    RefreshControl
} from "react-native";
import Colors from '../constants/Colors'
import { screenFont, screenWidth, screenHeight } from '../constants/Screen'
import { Button, Icon, Text, Input } from "react-native-elements";

export default function DeleteModal(props) {
    let { navigation, account, onConfirm, onCancel } = props

    return (
        <>
            <View style={styles.container}>
                <Icon active name='delete-outline' size={80} style={styles.deleteIcon} color={Colors.mainPink} />
                <Text style={styles.textTitle}>Deseja excluir a conta</Text>
                <Text style={styles.textAccount}>{account.code + ' - ' + account.name + '?'}</Text>
                <View style={styles.buttonRow}>
                    <Button
                        title="Não!"
                        buttonStyle={styles.buttonCancel}
                        titleStyle={styles.textCancel}
                        onPress={() => onCancel()}
                    />
                    <Button
                        title="Com certeza"
                        buttonStyle={styles.buttonConfirm}
                        titleStyle={styles.textConfirm}
                        onPress={() => onConfirm()}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth / 1.3,
        backgroundColor: Colors.normalWhite,
        alignSelf: 'center',
        marginTop: screenHeight * 0.3,
        paddingBottom: 20,
        borderColor: Colors.mainIce,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center'
    },
    textTitle: {
        color: Colors.normalBlack,
        fontSize: screenFont + 3,
        marginTop: 20,
        marginBottom: 5,
    },
    textAccount: {
        fontWeight: 'bold',
        color: Colors.normalBlack,
        fontSize: screenFont + 3,
        marginTop: 5,
        marginBottom: 5,
    },
    buttonRow: {
        flexDirection: "row",
        marginBottom: 30
    },
    buttonConfirm: {
        marginTop: 20,
        width: screenWidth * 0.3,
        alignSelf: 'center',
        height: 50,
        backgroundColor: Colors.mainPink,
        borderRadius: 25,
    },
    textConfirm: {
        fontSize: 16,
        color: Colors.normalWhite,
    },
    buttonCancel: {
        marginTop: 20,
        width: screenWidth * 0.2,
        alignSelf: 'center',
        height: 50,
        backgroundColor: Colors.normalWhite,
        borderRadius: 25,
    },
    textCancel: {
        fontSize: 16,
        color: Colors.mainPink,
    },
    deleteIcon: {
        marginTop: 30,
    }
});
