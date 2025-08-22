// -- ACTION TYPES --
const GET_ALL_FUNDRAISERS = "fundraisers/getAllFundraisers";
const CREATE_A_FUNDRAISER = "fundraisers/createAFundraiser";
const DELETE_A_FUNDRAISER = "fundraisers/deleteAFundraiser";
const GET_ONE_FUNDRAISER = "fundraisers/getOneFundraiser";
const UPDATE_FUNDRAISER = "fundraisers/updateFundraiser";


// -- ACTION CREATOR --
export const getAllFundraisersAction = (data) => ( {
        type: GET_ALL_FUNDRAISERS,
        payload: data
});

export const createAFundraiserAction = (fundraiser) => ({
    type: CREATE_A_FUNDRAISER,
    payload: fundraiser,
});

export const deleteAFundraiserAction = (fundraiserId) => ({
    type: DELETE_A_FUNDRAISER,
    payload: fundraiserId,
});

export const getOneFundraiserAction = (fundraiser) => ({
    type: GET_ONE_FUNDRAISER,
    payload: fundraiser,
});

export const updateFundraiserAction = (fundraiser) => ({
    type: UPDATE_FUNDRAISER,
    payload: fundraiser,
});

// -- THUNK ACTION --
// ✅✅
export const getAllFundraisersThunk = () => async (dispatch) => {
    try{

        const response = await fetch("/api/fundraiser");
        if (response.ok) {
            const data = await response.json();
            dispatch(getAllFundraisersAction(data));
        }else {
            throw response;
        }
    } catch (e){
        console.log(e)
    }
};

// create a post
export const createAFundraiserThunk = (fundraiser) => async (dispatch) => {
    try{
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fundraiser)
        }

        const response = await fetch("/api/fundraiser", options);
        if (response.ok) {
            const data = await response.json();
            dispatch(createAFundraiserAction(data));
            return data;
        }else {
            throw response;
        }
    } catch (e){
        console.log(e)
    }
};

export const deleteAFundraiserThunk = (fundraiserId) => async (dispatch) => {
    const options = {
        method: "DELETE",
    }
    
    const response = await fetch(`/api/fundraiser/${fundraiserId}/hmm`, options);
    
    if (response.ok) {
        console.log("82 of selete fundraiser😜", fundraiserId)
        console.log(response)
            dispatch(deleteAFundraiserAction(fundraiserId, options));
        }else {
            throw response;
        }
};

export const getOneFundraiserThunk = (fundraiserId) => async (dispatch) => {
        const response = await fetch(`/api/fundraiser/${fundraiserId}`);
        console.log("response", response)
        if (response.ok) {
            const data = await response.json();
            dispatch(getOneFundraiserAction(data));
            return data
        }else {
            throw response;
        }
    } 

export const updateFundraiserThunk = (fundraiser) => async (dispatch) => {

        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fundraiser)
        }

        const response = await fetch(`/api/fundraiser/${fundraiser.id}`, options);
        if (response.ok) {
            const data = await response.json();
            dispatch(updateFundraiserAction(data));
        }else {
            throw response;
        }
    } 

// -- REDUCER --

const initialState = {
    allFundraisers: [],
    byId: {},
    singleFundraiser: null,
}

 const fundraisersReducer = (state = initialState, action) => {
    let newState;
    let newById = {...state.byId};
    let newAllFundraisers = [...state.allFundraisers];

    switch(action.type) {
        case GET_ALL_FUNDRAISERS:{
            const fundraisersArr = action.payload;
            newState = { ...state };
            newState.allFundraisers = fundraisersArr;
            for (let serv of fundraisersArr) {
                newById[serv.id] = serv;
            }
            newState.byId = newById;
            return newState;
        }
        case CREATE_A_FUNDRAISER: {
            newState = {...state};
            const newFundraiser = action.payload;
            const newFundraiserId = newFundraiser.id;
            // update byId and allFundraisers
            newById[newFundraiserId] = newFundraiser;
            newState.byId = newById;
            newState.allFundraisers = [...newAllFundraisers, newFundraiser];
            return newState
        }
        case DELETE_A_FUNDRAISER: {
            const fundraiserId = action.payload;
            newState = {...state};
            // delete from byId     
            delete newById[fundraiserId];
            newState.byId = newById;
            // delete from allFundraisers   
            newAllFundraisers = newAllFundraisers.filter((fundraiser) => fundraiser.id !== fundraiserId);
            newState.allFundraisers = newAllFundraisers;
            return newState
        }
        case GET_ONE_FUNDRAISER: {
            const fundraiser = action.payload;
            newState = {...state};
            const newById = {...state.byId}
            //update byId
            newById[fundraiser.id] = fundraiser;
            newState.byId = newById;
            //update singleFundraiser
            newState.singleFundraiser = fundraiser;
            return newState
        }
        case UPDATE_FUNDRAISER: {
            const updatedFundraiser = action.payload;
            newState = {...state};
            newById[updatedFundraiser.id] = updatedFundraiser;
            newState.byId = newById;
            newState.allFundraisers = newAllFundraisers.map(fundraiser => 
                fundraiser.id === updatedFundraiser.id ? updatedFundraiser : fundraiser) 
            if (newState.singleFundraiser && newState.singleFundraiser.id === updatedFundraiser.id) {
                newState.singleFundraiser = updatedFundraiser;
            }   
             return newState; 
        }
        default:
            return state
    }
 };


 export default fundraisersReducer