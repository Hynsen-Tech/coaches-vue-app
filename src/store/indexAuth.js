var timer = null;

//AUTH MUTATIONS
const mutations = {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
  },
};

//AUTH ACTIONS
const actions = {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    var url = "https://URL:";
    if (payload.mode === "signup") {
      url = url + `signUp?key=KEY`;
    } else {
      url = url + `signInWithPassword?key=KEY`;
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    console.log(responseData);

    if (!response.ok) {
      const error = new Error(
        responseData.error.message || "Failed to authenticate!!"
      );
      throw error;
    }

    const expiresIn = +responseData.tokenExpiration * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(function () {
      context.dispatch("logout");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getDate();

    if (expiresIn < 0) {
      return;
    } else {
      timer = setTimeout(function () {
        context.dispatch("logout");
      }, expiresIn);
    }

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    context.commit("setUser", {
      token: null,
      userId: null,
    });

    clearTimeout(timer);
  },
};

//AUTH GETTERS
const getters = {
  userId(state) {
    return state.userId;
  },
  getUserInformation(state) {
    return {
      userId: state.userId,
      token: state.token,
      tokenExpiration: state.tokenExpiration,
    };
  },
  getToken(state) {
    return state.token;
  },
  isAuthenticate(state) {
    return !!state.token;
  },
};

//AUTH STORE
export default {
  namespaced: false,
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  mutations,
  actions,
  getters,
};
