const template = (message: string, isSuccess: boolean): string => `
    <div class="toaster ${isSuccess ? 'toaster--success' : 'toaster--error'}">
        <span class="toaster__message">${message}</span>
    </div>
`;

export class Toaster {

}