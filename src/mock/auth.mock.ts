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
