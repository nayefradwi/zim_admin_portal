import { writable } from 'svelte/store';
import {
    getResponse,
    type ResponseHandlerData,
    type ClientError,
    type IUserRepo,
    type User,
    UserRepo,
    type Token
} from '../../data/index';


function createUserStore() {
    const store = writable<User>(undefined);
    const { subscribe, set } = store;
    return {
        subscribe,
        set,
        getUser: GetUser(UserRepo),
        loginUser: (email: string, password: string) =>
            LoginUser(UserRepo, email, password),
    }
}
export const userStore = createUserStore();

function GetUser(userRepo: IUserRepo) {
    const details: ResponseHandlerData<User> = {
        call: () => userRepo.getUser(),
        onSuccess: (data: User) => {
            // TODO remove
            console.log(data);
            userStore.set(data);
        },
        onError: (error: ClientError) => {
            console.log("failed to get user")
        }
    }
    return getResponse<User>(details);
}


function LoginUser(userRepo: IUserRepo, email: string, password: string) {
    const details: ResponseHandlerData<Token> = {
        call: () => userRepo.login(email, password),
        onSuccess: (data: Token) => {
            // TODO: save token
            // TODO: set header
            console.log(data);
            return GetUser(userRepo);
        },
        onError: (error: ClientError) => {
            console.log("failed to login user")
        }
    }
}
