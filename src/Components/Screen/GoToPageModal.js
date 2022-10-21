import React, { useState } from 'react'
import { FormControl, Input, Modal, Button, Box } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { useDispatch } from 'react-redux'
import { changePageNumber } from '@redux/actions-reducers/menuStateManagement';

const GoToPageModal = ({ gotoPageModalIsOpen, setGotoPageModalIsOpen }) => {
    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState("")
    const [pageNumberIsInvallid, setPageNumberIsInvallid] = useState(false)

    const handleSubmit = () => {
        if (pageNumber) {
            if (isNaN(pageNumber) === false) {
                dispatch(changePageNumber(pageNumber))
                setGotoPageModalIsOpen(false)
                setPageNumber("")
            } else {
                setPageNumberIsInvallid(true)
            }
        }
    }

    return (<>
        <Modal isOpen={gotoPageModalIsOpen} onClose={() => setGotoPageModalIsOpen(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>
                    Enter Page Number
                </Modal.Header>
                <Modal.Body>
                    <FormControl isInvalid={pageNumberIsInvallid} isRequired={true}>
                        <FormControl.Label>Type Page Number&nbsp;</FormControl.Label>
                        <Input
                            placeholder='Page Number'
                            onChangeText={(e) => setPageNumber(e)}
                            value={pageNumber}
                            keyboardType='numeric'
                            type="text"
                        />
                        <FormControl.ErrorMessage
                            leftIcon={<MaterialIcons name="error-outline" color={"red"} size={16} />}
                        >
                            Please Enter a valid page number
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Box style={{ flex: 1, justifyContent: "space-between", flexDirection: "row" }}>
                        <Button.Group>
                            <Button disabled={String(pageNumber).length === 0} colorScheme="secondary" onPress={() => {
                                setPageNumber("");
                                setPageNumberIsInvallid(false)
                            }}>
                                Reset
                            </Button>
                        </Button.Group>
                        <Button.Group space={3}>
                            <Button colorScheme="blueGray" onPress={() => {
                                setGotoPageModalIsOpen(false)
                            }}>
                                Cancel
                            </Button>
                            <Button disabled={String(pageNumber).length === 0} onPress={() => {
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

export default GoToPageModal