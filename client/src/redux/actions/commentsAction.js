import { comment } from "../axios/axios";

export const addComment = (value) => async (dispatch) => {
    // console.log(value);
    try {
        const { data } = await comment.post(`/`, {
            desc: value.desc,
            videoId: value.videoId,
        });
        dispatch({ type: "COMMENT", payload: data });
        // return data.comments;
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const deleteComment = (value) => async (dispatch) => {
    try {
        const { dataCmt } = await comment.delete(`/${value}`);
        const data = dispatch({ type: "DELETE_COMMENT", payload: value });
        console.log(data.payload);

        return data.payload;
    } catch (err) {
        console.log(err);
    }
};
