import { writable } from "svelte/store";
import {
  getResponse,
  type ResponseHandlerData,
  type ClientError,
  type IUserRepo,
  type User,
  UserRepo,
  type Token,
  storeTokensInSession,
  setAuthHeader,
} from "../../data/index";

function createUserStore() {
  const store = writable<User | null>(null);
  const { subscribe, set } = store;

  function getUser() {
    const details: ResponseHandlerData<User> = {
      call: UserRepo.getUser,
      onSuccess: (data: User) => {
        set(data);
      },
    };
    return getResponse<User>(details);
  }

  function loginUser(email: string, password: string) {
    const details: ResponseHandlerData<Token> = {
      call: () => UserRepo.login(email, password),
      onSuccess: (data: Token) => {
        if (!storeTokensInSession(data)) return;
        setAuthHeader(data.accessToken);
        return getUser();
      },
    };
    return getResponse<Token>(details);
  }

  return {
    subscribe,
    set,
    getUser: getUser,
    loginUser: loginUser,
  };
}
export const userStore = createUserStore();
