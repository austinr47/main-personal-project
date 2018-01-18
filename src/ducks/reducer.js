const initialState = {
    user: 'Austin',
    myTestId: '',
}

//action type
const LOGIN = "LOGIN";
const TEST_ID = "TEST_ID";

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TEST_ID:
            return { ...state, myTestId: action.payload }

        case LOGIN:
            return { ...state, user: action.payload }

        default: 
            return state;
    }
};

//action creator
export function login(user) {
    return {
        type: LOGIN,
        payload: user
    }
}

export function testId(myTestId) {
    return {
        type: TEST_ID,
        payload: myTestId
    }
}

