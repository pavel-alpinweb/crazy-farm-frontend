import { sound } from '@pixi/sound';
import {AUDIO_URL} from "../utils/constants";

export class SoundFarmComposition {
    static init():void {
        sound.add('bailer', `${AUDIO_URL}/bailer.mp3`);
        sound.add('click', `${AUDIO_URL}/click.mp3`);
        sound.add('fertilizer', `${AUDIO_URL}/fertilizer.mp3`);
        sound.add('seeds', `${AUDIO_URL}/seeds.mp3`);
        sound.add('shovel', `${AUDIO_URL}/shovel.mp3`);
        sound.add('sprayer', `${AUDIO_URL}/sprayer.mp3`);
    }
    static playClickSound():void {
        sound.play('click');
    }
    static playToolSound(tool: tool):void {
        sound.play(tool);
    }
}