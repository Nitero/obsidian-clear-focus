import {Plugin} from 'obsidian';

const BLUR_ON_UNFOCUS_CONTEXTS = [
	".metadata-container",
	".search-input-container",
	".document-search-container",
];

export default class ClearFocus extends Plugin {
	async onload() {
		this.registerDomEvent(window, "blur", () => {
			const element = document.activeElement;

			if (!(element instanceof HTMLElement)) {
				return;
			}

			const isEditable =
				element.matches("input, textarea, [contenteditable='true']");

			if (!isEditable) {
				return;
			}

			const isInBlurContext = BLUR_ON_UNFOCUS_CONTEXTS.some(
				selector => element.closest(selector) !== null
			);

			if (isInBlurContext) {
				element.blur();
			}
		});
	}
}
