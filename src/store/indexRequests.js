//REQUESTS MUTATIONS
const mutations = {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
};

//REQUESTS ACTIONS
const actions = {
  async contactCoach(context, payload) {
    const newRequest = {
      email: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://URL.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );

    console.log(response);

    const responseData = response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Something went wrong!");
      throw error;
    }

    context.commit("addRequest", {
      ...newRequest,
      id: responseData.name,
      coachId: payload.coachId,
    });
  },
  async loadRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.getToken;
    const response = await fetch(
      `https://URL.firebasedatabase.app/requests/${coachId}.json?auth=${token}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Something went wrong!");
      throw error;
    }

    const requests = [];

    for (const index in responseData) {
      const request = {
        id: index,
        coachId: coachId,
        email: responseData[index].email,
        message: responseData[index].message,
      };

      requests.push(request);
    }

    context.commit("setRequests", requests);
  },
};

//REQUESTS GETTERS
const getters = {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((request) => request.coachId === coachId);
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
  getUserId(_, _2, _3, rootGetters) {
    return rootGetters.userId;
  },
};

//REQUESTS STATE
export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations,
  actions,
  getters,
};
