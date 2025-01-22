import { createStore } from "vuex";
import coachesModule from "./indexCoaches.js";
import requestsModule from "./indexRequests.js";
import authModule from "./indexAuth.js";

const store = createStore(
    {
        modules: {
            coaches: coachesModule,
            requests: requestsModule,
            auth: authModule
        },
    }
)

export default store