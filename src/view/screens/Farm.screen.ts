import { AbstractStaticScreen } from "../../framework/interface/AbstractStaticScreen";

const createFarmScreenTemplate = () => `
<div class="farm-screen">
    <h1>Farm screen</h1>
</div>
`;
export class FarmScreen extends AbstractStaticScreen {
  get template(): string {
    return createFarmScreenTemplate();
  }
}
