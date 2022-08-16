import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, DevSettings, TextInput, Share } from 'react-native'
import ViewPdf from './Components/ViewPdf/ViewPdf';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { primary_color } from './Utils/ColorUtility';
import Modal from "react-native-modal"
import Test from './Components/ViewPdf/Test';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSearchModalIsOpen, setPageSearchModalIsOpen] = useState(false)
  const [pageNumberInput, setPageNumberInput] = useState("")
  const [pdfDirection, setPdfDirection] = useState("swap-vertical-circle")
  const [pdfUrl, setPdfUrl] = useState("")
  const [pdfUrlModalIsOpen, setPdfUrlModalIsOpen] = useState(false)
  const [drawerMenuIsOpen, setDrawerMenuIsOpen] = useState(false)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const MyViewPdf = () => {
    return (<>
      <ViewPdf
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setTotalPages={setTotalPages}
        totalPages={totalPages}
        pdfDirection={pdfDirection}
        pdfUrl={pdfUrl}
        setPdfUrl={setPdfUrl}
        setPdfUrlModalIsOpen={setPdfUrlModalIsOpen}
      />
    </>)
  }

  const handleInputPageNumber = () => {
    if (pageNumberInput >= 1 && pageNumberInput <= totalPages) {
      setCurrentPage(Number(pageNumberInput))
      setPageSearchModalIsOpen(!pageSearchModalIsOpen)
      setPageNumberInput("")
    } else {
      alert("Page number is not valid")
    }
  }

  const onShare = async () => {
    try {
      const result = await Share.share({ message: pdfUrl });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (<>
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen
          name="PDF-VIEW-COMPONENT"
          component={MyViewPdf}
          options={{
            title: 'Pdf Viewer',
            // headerShown: false,
            headerRight: () => (<>
              <View style={{ marginRight: 10 }}>
                <Text>
                  <TouchableOpacity disabled={currentPage === 1} onPress={() => handlePreviousPage()}>
                    <MaterialCommunityIcons name="page-previous" size={25} color={primary_color} />
                  </TouchableOpacity>
                </Text>
              </View>
              <View style={{ marginRight: 10 }}>
                <Text>
                  <TouchableOpacity disabled={currentPage === totalPages} onPress={() => handleNextPage()}>
                    <MaterialCommunityIcons name="page-next" size={25} color={primary_color} />
                  </TouchableOpacity>
                </Text>
              </View>

              {/* <View style={{ marginRight: 10 }}>
                <Text>
                  <TouchableOpacity onPress={() => DevSettings.reload()}>
                    <EvilIcons name="refresh" size={40} color={primary_color} />
                  </TouchableOpacity>
                </Text>
              </View> */}

              <View style={{ marginRight: 10 }}>
                <Text>
                  <TouchableOpacity onPress={() => setPageSearchModalIsOpen(!pageSearchModalIsOpen)}>
                    <Foundation name="page-search" size={30} color={primary_color} />
                  </TouchableOpacity>
                </Text>
              </View>

              <View style={{ marginRight: 10 }}>
                <Text>
                  <TouchableOpacity onPress={() => setPdfDirection(pdfDirection === "swap-vertical-circle" ? "swap-horizontal-circle" : "swap-vertical-circle")}>
                    <MaterialCommunityIcons name={pdfDirection === "swap-vertical-circle" ? "swap-horizontal-circle" : "swap-vertical-circle"} size={30} color={primary_color} />
                  </TouchableOpacity>
                </Text>
              </View>

              <View style={{ marginRight: 10 }}>
                <Text>
                  <TouchableOpacity onPress={() => onShare()}>
                    <MaterialCommunityIcons name="share-variant" size={30} color={primary_color} />
                  </TouchableOpacity>
                </Text>
              </View>

              <View>
                <Text>
                  <TouchableOpacity onPress={() => setPdfUrlModalIsOpen(true)}>
                    <Fontisto name="link" size={30} color={primary_color} />
                  </TouchableOpacity>
                </Text>
              </View>

              <View>
                <Modal
                  isVisible={pageSearchModalIsOpen}
                  coverScreen={true}
                  hasBackdrop={true}
                  backdropColor={'white'}
                  backdropOpacity={1}
                  onBackButtonPress={() => setPageSearchModalIsOpen(false)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "black" }}>Enter Page Number</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', color: "black", borderWidth: 1 }}
                      placeholder="Page Number"
                      keyboardType="numeric"
                      onChangeText={(e) => setPageNumberInput(e)}
                      value={pageNumberInput}
                    />
                    <View style={{ marginTop: 10 }}>
                      <Button title="Search Page" onPress={() => handleInputPageNumber()} />
                    </View>
                  </View>
                </Modal>
              </View>

              <View>
                <Modal
                  isVisible={pdfUrlModalIsOpen}
                  coverScreen={true}
                  hasBackdrop={true}
                  backdropColor={'white'}
                  backdropOpacity={1}
                  onBackButtonPress={() => setPdfUrlModalIsOpen(false)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "black" }}>Enter Pdf Url</Text>
                    <TextInput
                      style={{ height: 40, borderColor: 'gray', color: "black", borderWidth: 1 }}
                      placeholder="Pdf Url"
                      keyboardType="url"
                      onChangeText={(e) => setPdfUrl(e)}
                      value={pdfUrl}
                    />
                    <View style={{ marginTop: 10 }}>
                      <Button title="Submit" onPress={() => setPdfUrlModalIsOpen(false)} />
                    </View>

                    <View style={{ marginTop: 10 }}>
                      <Button title="Clear Text" onPress={() => setPdfUrl("")} />
                    </View>
                  </View>
                </Modal>
              </View>
            </>)
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  </>)
}



export default App