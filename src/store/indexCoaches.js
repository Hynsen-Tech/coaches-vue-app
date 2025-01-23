//COACHES MUTATIONS
const mutations = {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setLastFetch(state) {
    state.lastFetch = new Date().getTime();
  },
};

//COACHES ACTIONS
const actions = {
  async registerCoach(context, data) {
    const coachId = new Date().getTime(); //context.rootGetters.userId
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.getToken;

    const response = await fetch(
      `https://URL-FIREBASE.firebasedatabase.app/coaches/${coachId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    if (response.ok) {
      context.commit("registerCoach", {
        ...coachData,
        id: coachId,
      });
    } else {
      const error = new Error(response.message || "Something went wrong");
      throw error;
    }
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdateState) {
      return;
    }

    const response = await fetch(
      `https://URL-FIREBASE.firebasedatabase.app/coaches.json`
    );

    //console.log(response)
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    const coaches = [];

    for (const coachId in responseData) {
      const coach = {
        id: coachId,
        firstName: responseData[coachId].firstName,
        lastName: responseData[coachId].lastName,
        description: responseData[coachId].description,
        hourlyRate: responseData[coachId].hourlyRate,
        areas: responseData[coachId].areas,
      };

      coaches.push(coach);
    }

    context.commit("setCoaches", coaches);
    context.commit("setLastFetch");
  },
};

//COACHES GETTERS
const getters = {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },
  shouldUpdateState(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    } else {
      const now = new Date().getTime();
      return (now - lastFetch) / 1000 > 60;
    }
  },
};

//COACHES STORE
export default {
  namespaced: true,
  state() {
    return {
      coaches: [],
      lastFetch: null,
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
};
