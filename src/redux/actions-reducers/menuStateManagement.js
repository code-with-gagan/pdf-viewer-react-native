import { createSlice } from '@reduxjs/toolkit'

const initialMenuState = {
    resetFlag: false,
    pdfDirection: false,
    showHidePageNumber: false,
    pageNumber: "",
    scalePdf: 1,
    sharePdf: false
}

export const menuStateManagement = createSlice({
    name: 'menuStateManagement',
    initialState: initialMenuState,
    reducers: {
        changeResetFlagState: (state) => {
            state.resetFlag = !state.resetFlag
        },

        changePdfDirection: (state) => {
            state.pdfDirection = !state.pdfDirection
        },

        changeShowHidePageNumber: (state) => {
            state.showHidePageNumber = !state.showHidePageNumber
        },

        changePageNumber: (state, payload) => {
            state.pageNumber = payload.payload
        },

        changePositivePdfScale: (state, payload) => {
            if (payload.payload <= 5) {
                state.scalePdf = payload.payload
            }
        },

        changeNegativePdfScale: (state, payload) => {
            if (payload.payload >= -2) {
                state.scalePdf = payload.payload
            }
        },

        changeSharePdf: (state, payload) => {
            state.sharePdf = payload.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { changeResetFlagState, changePdfDirection, changeShowHidePageNumber, changePageNumber, changeNegativePdfScale, changePositivePdfScale, changeSharePdf } = menuStateManagement.actions

export default menuStateManagement.reducer