export function getUserDataMock(): Promise<UserData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        login: "Bakuard",
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
