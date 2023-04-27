export function getUserDataMock(): Promise<userData> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                login: 'Bakuard',
                password: 'Pelmesh',
                email: 'bakuard@pelmesh.bro',
            })
        }, 1000);
    });
}

export function updateUserDataMock(): Promise<userData> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                login: 'BakuardUpdate',
                password: 'PelmeshUpgrade',
                email: 'bakuard@pelmesh.pro',
            });
        }, 2000);
    });
}
