import {AbstractView} from "../../framework/interface/AbstractView";
import {$t} from "../../utils/helpers";
import {eventBusAlmanac} from "../../model/almanac.model";

const createAlmanacTemplate = (state: AlmanacState) => `
    <div class="almanac ${state.isShow ? 'active' : ''}">
        <div class="almanac__text">${ $t(state.currentTextKey) }</div>
        <div class="almanac__buttons">
            ${ state.currentActions.map((button) => `
                <button class="button green" data-action-${button}>${ $t(`almanacActions.${button}`) }</button> 
            `).join('')}
        </div>
    </div>
`;

export class AlmanacComponent extends AbstractView {
    protected state: AlmanacState = {
        isActive: false,
        isShow: false,
        currentTextKey: 'tools.shovel',
        currentActions: ['show', 'close'],
    };
    constructor(props: AlmanacState) {
        super();
        this.setState(props);
        this.setEvents();
    }

    protected setEvents(): void {
        const updateAlmanac = (data: AlmanacState) => {
            this.state = data;
            this.state.isShow
                ? this.element?.classList.add("active")
                : this.element?.classList.remove("active");
            setTimeout(() => {
                this.rerenderElement();
            }, 1000);
        }
        eventBusAlmanac.off("Almanac:toggleView", updateAlmanac);
        eventBusAlmanac.on("Almanac:toggleView", updateAlmanac);
    }

    protected setState(props: AlmanacState): void {
        this.state = props;
    }

    get template(): string {
        return createAlmanacTemplate(this.state);
    }
}