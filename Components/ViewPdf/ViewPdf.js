import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import Pdf from 'react-native-pdf';
import DocumentPicker from 'react-native-document-picker';
import { primary_color } from "../../Utils/ColorUtility";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Test from './Test';
import { set } from 'react-native-reanimated';
const Drawer = createDrawerNavigator();
const ViewPdf = (props) => {
    const url2 = props.pdfUrl
    const source = { uri: url2, cache: true };
    const [load, setLoad] = useState(false)
    const [loadPercentage, setLoadPercentage] = useState(0)
    const selectFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                // There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            props.setPdfUrl(res[0].uri)
        } catch (err) {
            props.setPdfUrl("")
            if (DocumentPicker.isCancel(err)) {
                // alert('Canceled');
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    return (<>
        <Text style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {loadPercentage !== 0 && (<>
                Load: {loadPercentage}
            </>)}
        </Text>
        {url2 ? (<>
            <View style={styles.container}>
                <View style={{ marginRight: 10 }} >
                    <Text style={{ color: "black" }}>{props.currentPage} / {props.totalPages}</Text>
                </View>
                <Pdf
                    source={source}
                    trustAllCerts={false}
                    horizontal={props.pdfDirection === "swap-vertical-circle" ? false : true}
                    // page={props.currentPage}
                    // fitWidth={false}
                    // scale={1.9}
                    enablePaging={true}
                    onLoadProgress={e => {
                        setLoadPercentage(Math.floor(e * 100));
                    }}
                    spacing={2}
                    fitPolicy={2}
                    onLoadComplete={(numberOfPages, filePath) => {
                        props.setTotalPages(numberOfPages)
                        // setLoad(false);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        // props.setCurrentPage(page)
                    }}
                    onError={(error) => {
                        // alert(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}
                />
            </View>
        </>) : (<>
            {/* {load === false && (<> */}
            <View style={styles.noPdfContainer}>
                <View style={{ marginTop: 10 }}>
                    <Button title="Select PDF" onPress={selectFile} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button title='PDF Url' onPress={() => props.setPdfUrlModalIsOpen(true)} />
                </View>
            </View>
            {/* </>)} */}
        </>)}
    </>)
}

export default ViewPdf

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    noPdfContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noPdf: {
        color: primary_color
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    }
});