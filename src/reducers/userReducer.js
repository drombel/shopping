const initial_state = {name: '', surname: '', email: '', address: '', phone: ''};

const userReducer = (state = initial_state, action) => {
    switch(action.type){
        case "UPDATE_USER_INFO":
            return {...state, ...action.payload.user};
        default:
            return state;
    }
};

export default userReducer;