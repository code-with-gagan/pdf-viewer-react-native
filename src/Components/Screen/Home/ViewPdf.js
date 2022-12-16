import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Pdf from 'react-native-pdf';
import PdfUrlModal from './PdfUrlModal';
import { Button, Box, Spinner, Heading, VStack } from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import { useSelector, useDispatch } from 'react-redux'
import { changePageNumber, changeSharePdf } from '@redux/actions-reducers/menuStateManagement';
import { primary_color } from "@Utils/ColorUtility";
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { useToast } from 'native-base';

const scaleDropdown = [
    { value: 0.2, id: -2 },
    { value: 0.5, id: -1 },
    { value: 0.8, id: 0 },
    { value: 1, id: 1 },
    { value: 1.2, id: 2 },
    { value: 1.4, id: 3 },
    { value: 1.6, id: 4 },
    { value: 1.8, id: 5 }
]

const ViewPdf = () => {
    const dispatch = useDispatch()
    const toast = useToast();
    const id = "test-toastify";
    const scalePdf = useSelector(state => state.menuStateManagement.scalePdf)
    const pageNumber = useSelector(state => state.menuStateManagement.pageNumber)
    const resetFlag = useSelector(state => state.menuStateManagement.resetFlag)
    const pdfDirection = useSelector(state => state.menuStateManagement.pdfDirection)
    const showHidePageNumber = useSelector(state => state.menuStateManagement.showHidePageNumber)
    const sharePdf = useSelector(state => state.menuStateManagement.sharePdf)
    const [pdfUrlModalIsOpen, setPdfUrlModalIsOpen] = useState(false)
    const [pdfUrl, setPdfUrl] = useState("")
    const source = { uri: pdfUrl, cache: true };
    const [loadPercentage, setLoadPercentage] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [base64FileUrl, setBase64FileUrl] = useState("")

    useEffect(() => {
        setPdfUrl("")
    }, [resetFlag])

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
            setPdfUrl(res[0].uri)
        } catch (err) {
            setPdfUrl("")
            if (DocumentPicker.isCancel(err)) {
                // alert('Canceled');
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const handleShare = async () => {
        if (base64FileUrl) {

            const shareOptions = {
                title: 'Share via',
                url: base64FileUrl,
                filename: "PdfViewer_file"
            };
            const t1 = await Share.open(shareOptions)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    err && console.log(err);
                });
        } else {
            if (!toast.isActive(id)) {
                toast.show({
                    id,
                    title: "Error",
                    description: "Please open pdf first",
                    duration: 2000
                })
            }
        }
        dispatch(changeSharePdf(false))
    }


    const handlePageNumber = (pageNumber) => {
        if (pageNumber) {
            if (Number(pageNumber) > 0 && Number(pageNumber) < Number(totalPages)) {
                return Number(pageNumber)
            } else {
                dispatch(changePageNumber(currentPage))
                return Number(currentPage)
            }
        } else {
            return 0
        }
    }

    useEffect(() => {
        if (pdfUrl) {
            RNFS.readFile(pdfUrl, 'base64')
                .then(res => {
                    const base64 = "data:application/pdf;base64," + res
                    setBase64FileUrl(base64)
                }).catch(er => {
                    console.log("err", er)
                    setBase64FileUrl("")
                })
        } else {
            setBase64FileUrl("")
        }
    }, [pdfUrl])

    useEffect(() => {
        if (sharePdf) {
            handleShare()
        }
    }, [sharePdf])


    return (<>

        {loadPercentage !== 0 && (<>
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
                <VStack space={2} justifyContent="center">
                    <Spinner size="lg" accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="lg">
                        {loadPercentage}% Loading
                    </Heading>
                </VStack>
            </Box>
        </>)}

        {pdfUrl && (<>
            <View style={styles.container}>
                {showHidePageNumber && (<>
                    <View >
                        <Text style={{ color: "black" }}>
                            {currentPage} / {totalPages}
                        </Text>
                    </View>
                </>)}
                <Pdf
                    source={source}
                    trustAllCerts={false}
                    horizontal={pdfDirection}
                    page={handlePageNumber(pageNumber)}
                    // fitWidth={true}
                    scale={scaleDropdown.filter(io => io.id === scalePdf)[0].value}
                    enablePaging={true}
                    onLoadProgress={e => {
                        setLoadPercentage(Math.floor(e * 100));
                    }}
                    spacing={2}
                    // fitPolicy={2}
                    onLoadComplete={(numberOfPages, filePath) => {
                        setLoadPercentage(0)
                        setTotalPages(numberOfPages)
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        setCurrentPage(page)
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
        </>)}

        {(!pdfUrl && loadPercentage === 0) && (<>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                <View>
                    <Button
                        onPress={() => selectFile()}
                    >Open PDF File</Button>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button
                        colorScheme={"primary"}
                        onPress={() => setPdfUrlModalIsOpen(true)}
                    >
                        Open PDF Url
                    </Button>
                </View>
            </View>

            <PdfUrlModal
                pdfUrlModalIsOpen={pdfUrlModalIsOpen}
                setPdfUrlModalIsOpen={setPdfUrlModalIsOpen}
                pdfUrl={pdfUrl}
                setPdfUrl={setPdfUrl}
            />
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