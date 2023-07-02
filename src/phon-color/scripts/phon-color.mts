export type PhonemeBorder = {
	target: Phoneme | null;
	continuity: boolean;
};

export class Phoneme {
	previous: PhonemeBorder;
	next: PhonemeBorder;
}

export class Transcription {
	phonemes: Phoneme[] = [];

	static Parse(expr: string): Transcription | null {
		return null;
	}

	toString(): string {
		return '';
	}
}
