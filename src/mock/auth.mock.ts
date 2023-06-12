export function getUserDataMock(): Promise<UserData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userId: "BakuardId",
        loggin: "Bakuard",
        password: "Pelmesh",
        email: "bakuard@pelmesh.bro",
      });
    }, 100);
  });
}

export function updateUserDataMock(data: UserData): Promise<UserData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
}

export function registrationFirstStep(
  data: UserData,
  isSuccess = true
): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve("Confirmation email sent to email");
      } else {
        reject({
          timestamp: "yyyy-MM-dd hh:mm:ss.SSS",
          httpStatus: "http status short description",
          httpErrorCode: 400,
          reasons: [
            {
              message: "string",
            },
          ],
        });
      }
    }, 2000);
  });
}

export function registrationFinalStep(
  token: string,
  isSuccess = true
): Promise<UserResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve({
          jws: "token-value",
          user: {
            userId: "uuid",
            loggin: "login",
            email: "user@email.com",
          },
        });
      } else {
        reject({
          timestamp: "yyyy-MM-dd hh:mm:ss.SSS",
          httpStatus: "http status short description",
          httpErrorCode: 400,
          reasons: [
            {
              message: "string",
            },
          ],
        });
      }
    }, 2000);
  });
}

export function enter(data: UserData, isSuccess = true): Promise<UserResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve({
          jws: "token-value",
          user: {
            userId: "uuid",
            loggin: "login",
            email: "user@email.com",
          },
        });
      } else {
        reject({
          timestamp: "yyyy-MM-dd hh:mm:ss.SSS",
          httpStatus: "http status short description",
          httpErrorCode: 400,
          reasons: [
            {
              message: "string",
            },
          ],
        });
      }
    }, 2000);
  });
}
