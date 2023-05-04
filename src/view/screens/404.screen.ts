import {AbstractStaticScreen} from "../../framework/interface/AbstractStaticScreen";

const createError404ScreenTemplate = () => `
<div class="404-screen">
    <h1>Error 404</h1>
    <a href="/">Иди на главную</a>
</div>
`;
export class Error404Screen extends AbstractStaticScreen{
    get template(): string {
        return createError404ScreenTemplate();
    }

}