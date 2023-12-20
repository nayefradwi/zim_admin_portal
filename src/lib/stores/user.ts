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
  return {
    subscribe,
    set,
    getUser: () => GetUser(UserRepo),
    loginUser: (email: string, password: string) =>
      LoginUser(UserRepo, email, password),
  };
}
export const userStore = createUserStore();

function GetUser(userRepo: IUserRepo) {
  const details: ResponseHandlerData<User> = {
    call: userRepo.getUser,
    onSuccess: (data: User) => {
      userStore.set(data);
    },
  };
  return getResponse<User>(details);
}

function LoginUser(userRepo: IUserRepo, email: string, password: string) {
  const details: ResponseHandlerData<Token> = {
    call: () => userRepo.login(email, password),
    onSuccess: (data: Token) => {
      if (!storeTokensInSession(data)) return;
      setAuthHeader(data.accessToken);
      return GetUser(userRepo);
    },
  };
  return getResponse<Token>(details);
}
