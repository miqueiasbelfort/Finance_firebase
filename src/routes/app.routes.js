import React from "react"
import {createDrawerNavigator} from "@react-navigation/drawer"

import Home from "../pages/Home"
import Profile from "../pages/Profile"
import New from "../pages/New"

const AppDrawer = createDrawerNavigator()

function AppRoutes(){
    return (
        <AppDrawer.Navigator
            screenOptions={{
                drawerLabelStyle: {
                    fontWeight: 'bold'
                },
                drawerActiveTintColor: '#fff',
                drawerActiveBackgroundColor: '#00b94a',
                drawerInactiveBackgroundColor: '#000',
                drawerInactiveTintColor: '#ddd',
                drawerItemStyle: {
                    marginVertical: 5
                },
                drawerStyle: {
                    backgroundColor: '#171717'
                },
                headerShown: false,
            }}
        >
            <AppDrawer.Screen
                name="Home" component={Home}
                options={{
                    drawerLabel: 'Principal'
                }}
            />
            <AppDrawer.Screen
                name="New" component={New}
                options={{
                    drawerLabel: 'Registrar'
                }}
            />
            <AppDrawer.Screen
                name="Profile" component={Profile}
                options={{
                    drawerLabel: 'Perfil'
                }}
            />
        </AppDrawer.Navigator>
    )
}

export default AppRoutes