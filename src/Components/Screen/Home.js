import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ViewPdf from './ViewPdf';
import GoToPageModal from './GoToPageModal';
import { useSelector, useDispatch } from 'react-redux'
import { changeResetFlagState, changePdfDirection, changeShowHidePageNumber, changeNegativePdfScale, changePositivePdfScale, changeSharePdf } from '@redux/actions-reducers/menuStateManagement';
import { Box } from 'native-base';
import { View, TouchableOpacity } from 'react-native'
import { Menu, Pressable } from 'native-base';
import { primary_color } from '@Utils/ColorUtility';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from "react-native-vector-icons/dist/MaterialCommunityIcons"
import Foundation from "react-native-vector-icons/dist/Foundation"
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons"
import Fontisto from "react-native-vector-icons/dist/Fontisto"
import { useToast } from 'native-base';

const Stack = createStackNavigator();

const Home = () => {
    const toast = useToast();
    const id = "test-toast";
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);
    const scalePdf = useSelector(state => state.menuStateManagement.scalePdf)
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    const [gotoPageModalIsOpen, setGotoPageModalIsOpen] = useState(false)
    const pdfDirection = useSelector(state => state.menuStateManagement.pdfDirection)
    const showHidePageNumber = useSelector(state => state.menuStateManagement.showHidePageNumber)

    return (<>
        <Stack.Navigator>
            <Stack.Screen
                name="Pdf Viewer"
                // component={PdfViewScreen}
                component={ViewPdf}
                options={{
                    headerShown: true,
                    headerRight: () => {
                        return (<>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Box>
                                    <TouchableOpacity onPress={() => {
                                        const val = scalePdf - 1
                                        dispatch(changeNegativePdfScale(val))
                                        if (val < -2) {
                                            if (!toast.isActive(id)) {
                                                toast.show({
                                                    id,
                                                    title: "Error",
                                                    description: "You don't reduce size",
                                                    duration: 2000
                                                })
                                            }
                                        }
                                    }}>
                                        <Fontisto
                                            name="zoom-minus"
                                            size={22}
                                            color={primary_color}
                                        />
                                    </TouchableOpacity>
                                </Box>

                                <Box mx={5}>
                                    <TouchableOpacity onPress={() => {
                                        const val = scalePdf + 1
                                        dispatch(changePositivePdfScale(val))
                                        if (val > 5) {
                                            if (!toast.isActive(id)) {
                                                toast.show({
                                                    id,
                                                    title: "Error",
                                                    description: "You don't increase size",
                                                    duration: 2000
                                                })
                                            }
                                        }
                                    }}>
                                        <Fontisto
                                            name="zoom-plus"
                                            size={22}
                                            color={primary_color}
                                        />
                                    </TouchableOpacity>
                                </Box>

                                <Menu
                                    w="250"
                                    m="1"
                                    isOpen={visible}
                                    closeOnSelect={true}
                                    onClose={hideMenu}
                                    trigger={(triggerProps, io) => {
                                        return (<>
                                            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                                <TouchableOpacity
                                                    onPress={showMenu}
                                                    style={{ marginRight: 20 }}
                                                >
                                                    <Entypo
                                                        name="dots-three-vertical"
                                                        size={20}
                                                        color={primary_color}

                                                    />
                                                </TouchableOpacity>
                                            </Pressable>
                                        </>)
                                    }}>
                                    <Menu.Item
                                        onPress={() => dispatch(changeResetFlagState())}
                                    >
                                        <Ionicons
                                            name="reload"
                                            size={22}
                                            color={primary_color}
                                        />
                                        Reload App
                                    </Menu.Item>

                                    <Menu.Item
                                        onPress={() => dispatch(changePdfDirection())}
                                    >
                                        <MaterialCommunityIcons
                                            name={pdfDirection ? "swap-vertical" : "swap-horizontal"}
                                            size={22}
                                            color={primary_color}
                                        />
                                        Pdf Direction
                                    </Menu.Item>
                                    <Menu.Item
                                        onPress={() => dispatch(changeShowHidePageNumber())}
                                    >
                                        <Foundation
                                            name="page-pdf"
                                            size={22}
                                            color={primary_color}
                                        />
                                        {showHidePageNumber ? "Hide Page Number" : "Show Page Number"}
                                    </Menu.Item>
                                    <Menu.Item
                                        onPress={() => setGotoPageModalIsOpen(true)}
                                    >
                                        <MaterialIcons
                                            name="find-in-page"
                                            size={22}
                                            color={primary_color}
                                        />
                                        Go To Page
                                    </Menu.Item>
                                    <Menu.Item
                                        onPress={() => dispatch(changeSharePdf(true))}
                                    >
                                        <Entypo
                                            name="share"
                                            size={22}
                                            color={primary_color}
                                        />
                                        Share Pdf
                                    </Menu.Item>
                                    {/* <Menu.Item isDisabled>Share App</Menu.Item> */}
                                </Menu>
                            </View>
                            <GoToPageModal
                                gotoPageModalIsOpen={gotoPageModalIsOpen}
                                setGotoPageModalIsOpen={setGotoPageModalIsOpen}
                            />
                        </>)
                    }
                }}
            />
        </Stack.Navigator>
    </>)
}

export default Home