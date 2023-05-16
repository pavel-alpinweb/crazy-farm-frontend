export function updateFarmState(): Promise<FarmState> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                containers: [
                    {
                        isEmpty: false,
                        isBlocked: false,
                        name: 'central',
                        character: {
                            type: 'potato',
                            stage: 1,
                        },
                    }
                ]
            });
        }, 2000);
    });
}