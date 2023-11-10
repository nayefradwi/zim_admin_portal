import { writable } from 'svelte/store';
import {
    getResponse,
    type ResponseHandlerData,
    type ClientError,
    type IUserRepo,
    type User
} from '../../data/index';

export const userStore = writable<User>(undefined);

function GetUser(userRepo: IUserRepo) {
    const details: ResponseHandlerData<User> = {
        call: () => userRepo.getUser(),
        onSuccess: (data: User) => {
            // TODO remove
            console.log(data);
            userStore.set(data);
        },
        onError: (error: ClientError) => {
            console.error(error);
        }
    }
    return getResponse<User>(details);
}
