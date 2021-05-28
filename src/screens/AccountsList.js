import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    ScrollView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Alert
} from "react-native";
import BackHeader from '../components/BackHeader'
import DeleteModal from '../components/DeleteModal'
import Colors from '../constants/Colors'
import { screenFont, screenWidth } from '../constants/Screen'
import { Icon } from "react-native-elements";
import { Text } from "galio-framework";
import { useSelector, useDispatch } from 'react-redux';

import { removeAccount } from '../redux/actions';

export default function AccountsList(props) {
    const accounts = useSelector((state) => state.accountsReducer.accounts.sort(
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
    ))
    let { navigation } = props;
    let [search, setSearch] = useState('')
    let [deleteModal, setDeleteModal] = useState(false)
    let [accountSelected, setAccountSelected] = useState(0)

    const dispatch = useDispatch();

    const removeFromAccounts = account => dispatch(removeAccount(account))

    updateSearch = (search) => {
        setSearch(search);
    };

    function getParentSize(code) {
        var account = accounts.filter(a => a.parentCode === code)
        return account.length
    }

    const onDelete = async (index) => {
        setAccountSelected(index)
        setDeleteModal(true)
    }

    const onCloseModal = () => {
        setDeleteModal(false)
    }

    const deleteAccount = () => {
        if (getParentSize(accounts[accountSelected].code) > 0)
            return Alert.alert("Aviso", "A conta não está vazia e não pode ser excluída.")
        removeFromAccounts(accounts[accountSelected])
        setDeleteModal(false)
    };

    return (
        <>
            <View style={styles.container}>
                <Modal
                    animationType='none'
                    transparent={true}
                    visible={deleteModal}
                    onRequestClose={() => {
                        setDeleteModal(false)
                    }}
                >
                    <DeleteModal
                        navigation={navigation}
                        account={accounts[accountSelected]}
                        onConfirm={deleteAccount}
                        onCancel={onCloseModal}
                    />
                </Modal>
                <BackHeader navigation={navigation} />
                <View
                    style={styles.inputContainer}
                >
                    <Icon active name='search' style={styles.searchIcon} color={Colors.mainLightGrey} />
                    <TextInput
                        style={styles.filterInput}
                        placeholderTextColor={Colors.mainLightGrey}
                        placeholder="Pesquisar conta"
                        value={search}
                        onChangeText={f => {
                            updateSearch(f)
                        }}
                    />
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.textTitle}>Listagem</Text>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <FlatList
                            data={accounts}
                            //contentContainerStyle={styles.tipo}
                            renderItem={({ item, index, separators }) => (
                                <>
                                    {item.name.includes(search) ? (
                                        <View style={styles.block}>
                                            <View style={styles.textRow}>
                                                <TouchableOpacity
                                                    onPress={item => {
                                                        navigation.navigate('AccountsEdit', { account: accounts[index] })
                                                    }}
                                                >
                                                    <Text style={[styles.textName, item.type == 'Despesa' ? { color: Colors.mainOrange } : { color: Colors.mainGreen }]}>{item.code + ' - ' + item.name}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={item => onDelete(index)}
                                                >
                                                    <Icon active name='delete-outline' style={styles.searchIcon} color={Colors.mainLightGrey} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </>
                            )}
                            keyExtractor={item => item.code}
                        />
                    </ScrollView>
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
    },
    inputContainer: {
        borderColor: Colors.basePurple,
        backgroundColor: Colors.normalWhite,
        borderWidth: 2,
        width: "90%",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 25,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 30,
    },
    filterInput: {
        height: 50,
        fontSize: screenFont + 2,
        flex: 1,
        paddingLeft: 16,
        zIndex: 1,
    },
    searchIcon: {
        position: "relative",
        zIndex: 10,
        color: Colors.normalWhite,
        marginLeft: 16,
    },
    trashIcon: {
        position: "relative",
        zIndex: 10,
        marginRight: 10,
    },
    textTitle: {
        fontWeight: "bold",
        color: Colors.normalBlack,
        fontSize: screenFont + 5,
        marginLeft: '10%',
        marginTop: 20,
        marginBottom: 20,
        width: screenWidth * 0.6,
        height: 25
    },
    block: {
        marginLeft: "8%",
        marginRight: "8%",
        marginBottom: 10,
        backgroundColor: Colors.normalWhite,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center'
    },
    textName: {
        fontSize: screenFont + 2,
        left: 15,
        width: screenWidth * 0.7,
        height: 25
    },
    textRow: {
        flexDirection: "row"
    },
});