import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import AccountsList from '../screens/AccountsList'
import AccountsNew from '../screens/AccountsNew'
import AccountsEdit from '../screens/AccountsEdit'

const Stack = createStackNavigator();

export default function StackAccounts() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='AccountsList' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AccountsList" component={AccountsList} />
                <Stack.Screen name="AccountsNew" component={AccountsNew} />
                <Stack.Screen name="AccountsEdit" component={AccountsEdit} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}