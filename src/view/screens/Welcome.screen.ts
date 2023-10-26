import {AbstractStaticScreen} from "../../framework/interface/AbstractStaticScreen";

const createWelcomeScreenTamplate = () => `
    <div class="welcome-screen">
        <h1>Welcome</h1>
    </div>
`;

export class WelcomeScreen extends AbstractStaticScreen{
    get template(): string {
        return createWelcomeScreenTamplate();
    }
}