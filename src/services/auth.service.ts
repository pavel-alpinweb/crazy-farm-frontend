declare global {
    interface UserResponse {
        jws: string;
        user: UserData;
    }
}