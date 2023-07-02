import { Transcription } from './phon-color.mjs';
import * as Ne from '@nianyi-wang/element';
import '../stylesheets/index.scss';
// @ts-ignore
import PhonColorTranscriptionElementStyle from '../stylesheets/phc-tr.scss?inline';

export class PhonColorTranscriptionElement extends HTMLElement {
	#transcription: Transcription | null = null;

	readonly #$ = Ne.Create('div', {
		id: 'root'
	});

	override get innerHTML(): string { return ''; }
	override set innerHTML(value: string) { }

	override get innerText(): string {
		if(!this.transcription)
			return '';
		return this.transcription.toString();
	}
	override set innerText(value: string) {
		this.transcription = Transcription.Parse(value);
	}

	get transcription(): Transcription | null {
		return this.#transcription;
	}
	set transcription(value: Transcription | null) {
		this.#transcription = value;
		Ne.Clear(this.#$);
		if(!value)
			return;
		this.#$.append(value.toString());
	}

	constructor() {
		super();

		const shadowRoot = this.attachShadow({ mode: "closed" });
		const style = Ne.Create('style', {
			text: PhonColorTranscriptionElementStyle
		});
		shadowRoot.appendChild(style);
		shadowRoot.appendChild(this.#$);

		this.innerText = super.innerText;
		super.innerHTML = '';
	}
}

customElements.define('phc-tr', PhonColorTranscriptionElement);
