const initialState = {
    user: 'Austin',
    category: '',

}

//action type
const LOGIN = "LOGIN";
const UPDATECATEGORY = "UPDATECATEGORY";

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, user: action.payload }

        case UPDATECATEGORY:
            return { ...state, category: action.payload }

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

export function updateCategory(category) {
    return {
        type: UPDATECATEGORY,
        payload: category
    }
}
