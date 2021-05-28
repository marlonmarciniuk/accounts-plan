import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Alert
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import BackHeader from '../components/BackHeader'
import Colors from '../constants/Colors'
import { screenFont, screenWidth } from '../constants/Screen'
import { typeList, entryList } from '../constants/InternalLists'
import { Button, Icon, Text, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Picker from 'react-native-picker-select'

import { addAccount } from '../redux/actions';

export default function AccountsNew(props) {
    let { navigation } = props
    const accounts = useSelector((state) => state.accountsReducer.accounts)
    let [parentCode, setParentCode] = useState('')
    let [code, setCode] = useState('')
    let [name, setName] = useState('')
    let [type, setType] = useState('')
    let [entry, setEntry] = useState('')
    let [parentCodeList, setParentCodeList] = useState([])

    const dispatch = useDispatch();
    const addAccountToList = account => dispatch(addAccount(account))

    useEffect(() => {
        loadParentCodes()
    }, []);

    function getAccountByCode(code) {
        var account = accounts.filter(a => a.code === code)
        return account[0] ? account[0] : null
    }

    function nextCode(value) {
        var accountList = accounts.filter(a => a.parentCode === value)
        if (accountList.length == 0) return '1'
        var listSorted = accountList.sort(
            function (a, b) {
                let index = 0
                let la = a.code.split('.')
                let lb = b.code.split('.')
                let na = 0
                let nb = 0
                let result = 0
                while (true) {
                    na = parseFloat(la[index] ? la[index] : 0)
                    nb = parseFloat(lb[index] ? lb[index] : 0)
                    result = na - nb
                    if (result != 0) return result
                    index++
                }
            }
        )
        if (listSorted == []) return '1'
        let iAux = value === '' ? 0 : (value.split('.')).length
        let ls = (listSorted[listSorted.length - 1]).code.split('.')
        var i = parseFloat(ls[iAux]) + 1
        if (i > 999)
            return Alert.alert("Aviso", "A conta atingiu o índice máximo de subconta (999).")
        return i.toString()
    }

    const loadParentCodes = () => {
        let list = []
        accounts.map(account => {
            if (account.entry === 'Não')
                list.push({
                    label: account.code + ' - ' + account.name,
                    value: account.code
                })
        })
        setParentCodeList(list)
    }

    const handleParentCode = (value) => {
        setParentCode(value)
        setCode(nextCode(value))
    }

    const handleSave = () => {
        let account = {
            code: parentCode === '' ? code : + parentCode + '.' + code,
            parentCode: parentCode,
            type: type,
            name: name,
            entry: entry
        }

        if (code === '' || type === '' || name === '' || entry === '')
            return Alert.alert("Aviso", "Os campos com * são obrigatórios.")
        if (parseFloat(code) > 999 || parseFloat(code) < 1)
            return Alert.alert("Aviso", "Utilize número de 1 a 999 no campo código.")
        let a = getAccountByCode(parentCode)
        if (a !== null)
            if (type !== getAccountByCode(parentCode).type)
                return Alert.alert("Aviso", "A nova conta deve ser do mesmo tipo da conta pai.")
        if (getAccountByCode(parentCode + '.' + code) !== null)
            return Alert.alert("Aviso", "Código da conta existente. Insira um novo.")
        addAccountToList(account)
        navigation.goBack()
    }

    return (
        <>
            <View style={styles.container}>
                <BackHeader navigation={navigation} text='Nova Conta' />
                <View style={styles.mainView}>
                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={styles.formStyle}
                        scrollEnabled={true}
                    >
                        <Text style={styles.textTitle}>Conta Pai</Text>
                        <Picker
                            onValueChange={(value) => handleParentCode(value)}
                            placeholder={{ label: "Lançamento base", value: "" }}
                            items={parentCodeList}
                            style={{
                                inputAndroid: styles.pickerList
                            }}
                            value={parentCode}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return < Icon
                                    name="arrow-drop-down"
                                    color={Colors.mainLightGrey}
                                    iconStyle={{ marginRight: '20%', marginTop: 5 }}
                                    size={35}
                                />
                            }}
                        />
                        <Text style={styles.textTitle}>Código *</Text>
                        <TextInput
                            style={styles.inputStyle}
                            maxLength={3}
                            keyboardType="number-pad"
                            onChangeText={text => setCode(text.replace(/[^0-9]/g, ''))}
                            value={code}
                            returnKeyType={"next"}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.textTitle}>Nome *</Text>
                        <TextInput
                            style={styles.inputStyle}
                            autoCapitalize="sentences"
                            keyboardType="default"
                            onChangeText={text => setName(text)}
                            inputStyle={styles.textInput}
                            value={name}
                            returnKeyType={"next"}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.textTitle}>Tipo *</Text>
                        <Picker
                            onValueChange={(value) => setType(value)}
                            placeholder={{ label: "Selecione um tipo", value: "default" }}
                            items={typeList}
                            style={{
                                inputAndroid: styles.pickerList
                            }}
                            value={type}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return < Icon
                                    name="arrow-drop-down"
                                    color={Colors.mainLightGrey}
                                    iconStyle={{ marginRight: '20%', marginTop: 5 }}
                                    size={35}
                                />
                            }}
                        />
                        <Text style={styles.textTitle}>Aceita lançamentos *</Text>
                        <Picker
                            onValueChange={(value) => setEntry(value)}
                            placeholder={{ label: "Selecione uma opção", value: "default" }}
                            items={entryList}
                            style={{
                                inputAndroid: styles.pickerList
                            }}
                            value={entry}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return < Icon
                                    name="arrow-drop-down"
                                    color={Colors.mainLightGrey}
                                    iconStyle={{ marginRight: '20%', marginTop: 5 }}
                                    size={35}
                                />
                            }}
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
        alignSelf: 'center',
        color: Colors.normalBlack
    }
});
