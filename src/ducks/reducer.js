const initialState = {
    user: 'Austin',
}

//action type
const LOGIN = "LOGIN";

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
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
