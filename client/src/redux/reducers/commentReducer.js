/* eslint-disable default-case */
const initialValue = {
    isLoading: true,
    comments: [],
};

const commentReducer = (state = initialValue, action) => {
    switch (action.type) {
        case "COMMENT":
            return {
                ...state,
                comments: state.comments.map((comment) => {
                    if (comment.videoId === action.payload.videoId) {
                        return action.payload;
                    }
                    return comment;
                }),
            };
        case "DELETE_COMMENT":
            return {
                ...state,
                comments: state.comments.filter(
                    (comment) => comment._id !== action.payload
                ),
            };
        case "UPDATE_COMMENT":
            return {
                ...state,
                comments: state.comments.map((comment) => {
                    if (comment._id === action.payload._id) {
                        return action.payload;
                    }
                    return comment;
                }),
            };
        default:
            return state;
    }
};

export default commentReducer;
