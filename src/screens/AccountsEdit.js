import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    StyleSheet,
} from "react-native";
import BackHeader from '../components/BackHeader'
import Colors from '../constants/Colors'
import { screenFont, screenWidth } from '../constants/Screen'
import { Button, Icon, Text, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function AccountsEdit(props) {
    let { navigation, route } = props
    let [parentCode, setParentCode] = useState([])
    let [code, setCode] = useState([])
    let [name, setName] = useState([])
    let [type, setType] = useState([])
    let [entry, setEntry] = useState([])

    useEffect(() => {
        setCode(route.params.account.code)
        setParentCode(route.params.account.parentCode)
        setName(route.params.account.name)
        setType(route.params.account.type)
        setEntry(route.params.account.entry)
    }, []);

    const handleSave = () => {
        navigation.goBack()
    }

    return (
        <>
            <View style={styles.container}>
                <BackHeader navigation={navigation} text='Editar Conta' />
                <View style={styles.mainView}>
                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={styles.formStyle}
                        scrollEnabled={true}
                    >
                        <Text style={styles.textTitle}>Conta Pai</Text>
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType="numeric"
                            onChangeText={text => setParentCode(text)}
                            inputStyle={styles.textInput}
                            value={parentCode}
                            editable={false}
                            returnKeyType={"done"}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.textTitle}>Código</Text>
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType="numeric"
                            onChangeText={text => setCode(text)}
                            inputStyle={styles.textInput}
                            value={code}
                            editable={false}
                            returnKeyType={"done"}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.textTitle}>Nome</Text>
                        <TextInput
                            style={styles.inputStyle}
                            autoCapitalize="sentences"
                            keyboardType="default"
                            onChangeText={text => setName(text)}
                            inputStyle={styles.textInput}
                            value={name}
                            editable={false}
                            returnKeyType={"done"}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.textTitle}>Tipo</Text>
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType="default"
                            onChangeText={text => setType(text)}
                            inputStyle={styles.textInput}
                            value={type}
                            editable={false}
                            returnKeyType={"done"}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.textTitle}>Aceita lançamentos</Text>
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType="default"
                            onChangeText={text => setEntry(text)}
                            inputStyle={styles.textInput}
                            value={entry}
                            editable={false}
                            returnKeyType={"done"}
                            blurOnSubmit={false}
                        />
                        <Button
                            title="Salvar"
                            buttonStyle={styles.buttonSave}
                            titleStyle={styles.textSave}
                            onPress={() => handleSave()}
                        />
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.basePurple,
    },
    mainView: {
        flex: 1,
        backgroundColor: Colors.mainIce,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: 5,
        width: '100%'
    },
    textTitle: {
        fontWeight: "bold",
        color: Colors.normalBlack,
        fontSize: screenFont + 1,
        marginLeft: '10%',
        marginTop: 10,
        marginBottom: 2,
        //width: screenWidth * 0.6,
        height: 20
    },
    inputStyle: {
        height: 45,
        borderRadius: 15,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: Colors.normalWhite,
        width: screenWidth * 0.8,
        alignSelf: 'center',
        backgroundColor: Colors.normalWhite,
        fontSize: screenFont + 2,
    },
    textInput: {
        fontSize: 14
    },
    formStyle: {
        marginTop: 25,
        //height: 350,
    },
    buttonSave: {
        marginTop: 20,
        width: screenWidth * 0.4,
        alignSelf: 'center',
        height: 50,
        backgroundColor: Colors.mainPink,
        borderRadius: 25,
    },
    textSave: {
        fontSize: 16,
        color: 'white',
    },
    pickerList: {
        height: 45,
        borderRadius: 15,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: Colors.normalWhite,
        width: screenWidth * 0.8,
        backgroundColor: Colors.normalWhite,
        fontSize: screenFont + 2,
        alignSelf: 'center'
    }
});
