export const updateUserInfo = ({user = {}}) => {
    return {
        type: 'UPDATE_USER_INFO',
        payload: { user },
    };
};