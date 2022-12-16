import React, { useState } from 'react'
import { FormControl, Input, Modal, Button, Box } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const PdfUrlModal = ({ pdfUrlModalIsOpen, setPdfUrlModalIsOpen, pdfUrl, setPdfUrl }) => {
    const [urlIsInvallid, setUrlIsInvallid] = useState(false)
    const [pdfLink, setPdfLink] = useState("")

    const handleSubmit = () => {
        if (pdfLink.length > 0) {
            if (pdfLink.includes('http') && pdfLink.includes('.pdf')) {
                setPdfUrlModalIsOpen(false)
                setPdfUrl(pdfLink)
                setPdfLink("")
            } else {
                setUrlIsInvallid(true)
            }
        }
    }

    return (<>
        <Modal isOpen={pdfUrlModalIsOpen} onClose={() => setPdfUrlModalIsOpen(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>
                    Enter PDF URL
                </Modal.Header>
                <Modal.Body>
                    <FormControl isInvalid={urlIsInvallid} isRequired={true}>
                        <FormControl.Label>Paste / Type PDF Url&nbsp;</FormControl.Label>
                        <Input
                            placeholder='Paste PDF Url'
                            onChangeText={(e) => setPdfLink(e)}
                            value={pdfLink}
                        />
                        <FormControl.ErrorMessage
                            leftIcon={<MaterialIcons name="error-outline" color={"red"} size={16} />}
                        >
                            Please Enter a valid PDF Url
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Box style={{ flex: 1, justifyContent: "space-between", flexDirection: "row" }}>
                        <Button.Group>
                            <Button disabled={pdfLink.length === 0} colorScheme="secondary" onPress={() => {
                                setPdfLink("");
                                setUrlIsInvallid(false)
                            }}>
                                Reset
                            </Button>
                        </Button.Group>
                        <Button.Group space={3}>
                            <Button disabled={pdfLink.length === 0} onPress={() => {
                                handleSubmit()
                            }}>
                                Submit
                            </Button>
                        </Button.Group>
                    </Box>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </>)
}

export default PdfUrlModal