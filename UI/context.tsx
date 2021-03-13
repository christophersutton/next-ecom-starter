import React, { useMemo } from 'react'

export interface State {
    displaySidebar: boolean
    sidebarView: string
    displayModal: boolean
    modalView: string
}

const initialState = {
    displaySidebar: false,
    sidebarView: 'CART',
    displayModal: false,
    modalView: 'LOGIN_VIEW',
}

type Action =
    | {
        type: 'OPEN_SIDEBAR'
    }
    | {
        type: 'CLOSE_SIDEBAR'
    }
    | {
        type: 'SET_SIDEBAR_VIEW'
        value: SIDEBAR_VIEWS
    }
    | {
        type: 'OPEN_MODAL'
    }
    | {
        type: 'CLOSE_MODAL'
    }
    | {
        type: 'SET_MODAL_VIEW'
        view: MODAL_VIEWS
    }


type MODAL_VIEWS = 'SUBSCRIBE'
type SIDEBAR_VIEWS = 'CART'

export const UIContext = React.createContext(initialState)

UIContext.displayName = 'UI'

function uiReducer(state: State, action: Action) {
    switch (action.type) {
        case 'OPEN_SIDEBAR': {
            return {
                ...state,
                displaySidebar: true,
            }
        }
        case 'CLOSE_SIDEBAR': {
            return {
                ...state,
                displaySidebar: false,
            }
        }
        case 'OPEN_MODAL': {
            return {
                ...state,
                displayModal: true,
                displaySidebar: false,
            }
        }
        case 'CLOSE_MODAL': {
            return {
                ...state,
                displayModal: false,
            }
        }
        case 'SET_SIDEBAR_VIEW': {
            return {
                ...state,
                sidebarView: action.view,
            }
        }
        case 'SET_MODAL_VIEW': {
            return {
                ...state,
                modalView: action.view,
            }
        }
    }
}

export const UIProvider = (props) => {
    const [state, dispatch] = React.useReducer(uiReducer, initialState)

    const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' })
    const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' })
    const toggleSidebar = () =>
        state.displaySidebar
            ? dispatch({ type: 'CLOSE_SIDEBAR' })
            : dispatch({ type: 'OPEN_SIDEBAR' })
    
    const openModal = () => dispatch({ type: 'OPEN_MODAL' })
    const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

    const setModalView = (view: MODAL_VIEWS) =>
        dispatch({ type: 'SET_MODAL_VIEW', view })

    const setSidebarView = (view: SIDEBAR_VIEWS) =>
        dispatch({ type: 'SET_SIDEBAR_VIEW', view })

    const value = useMemo(
        () => ({
            ...state,
            openSidebar,
            closeSidebar,
            toggleSidebar,
            setSidebarView,
            openModal,
            closeModal,
            setModalView,
        }),
        [state]
    )

    return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
    const context = React.useContext(UIContext)
    if (context === undefined) {
        throw new Error(`useUI must be used within a UIProvider`)
    }
    return context
}

export const ManagedUIContext = ({ children }) => (
    <UIProvider>
        {children}
    </UIProvider>
)
