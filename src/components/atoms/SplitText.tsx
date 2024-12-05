interface SplitTextType {
	chars: HTMLSpanElement[];
	words: HTMLSpanElement[];
	lines: HTMLSpanElement[];
}

export const SplitText = (element: HTMLElement): SplitTextType => {
	const chars: HTMLSpanElement[] = [];
	const words: HTMLSpanElement[] = [];
	const lines: HTMLSpanElement[] = [];

	const originalText = element.innerHTML;
	const linesContainer = document.createElement("div");
	linesContainer.style.position = "relative";
	linesContainer.style.display = "inline-block";
	linesContainer.style.width = "100%";
	linesContainer.style.whiteSpace = "pre-wrap";

	// Membagi berdasarkan baris dengan elemen <div> untuk setiap baris
	element.innerHTML = originalText.replace(/<br\s*\/?>/g, "\n");
	element.innerHTML.split("\n").forEach((lineText) => {
		const lineDiv = document.createElement("div");
		lineDiv.classList.add("line");
		lineDiv.style.display = "block";
		lineDiv.style.position = "relative";

		// Membagi berdasarkan kata dengan elemen <span> untuk setiap kata
		lineText.split(" ").forEach((wordText, wordIndex) => {
			const wordSpan = document.createElement("span");
			wordSpan.classList.add("word");
			wordSpan.style.whiteSpace = "nowrap";

			// Menambahkan kata dan spasi
			const wordContent = wordIndex > 0 ? " " + wordText : wordText;
			wordSpan.innerText = wordContent;
			lineDiv.appendChild(wordSpan);
			words.push(wordSpan);

			// Membagi berdasarkan karakter dengan elemen <span> untuk setiap karakter
			wordContent.split("").forEach((char) => {
				const charSpan = document.createElement("span");
				charSpan.classList.add("char");
				charSpan.innerText = char === " " ? "\u00A0" : char; // Tangani spasi
				wordSpan.appendChild(charSpan);
				chars.push(charSpan);
			});
		});

		linesContainer.appendChild(lineDiv);
		lines.push(lineDiv);
	});

	// Replace elemen dengan hasil split
	element.innerHTML = "";
	element.appendChild(linesContainer);

	return { chars, words, lines };
};

export const SplitToChars = (element: HTMLElement): HTMLSpanElement[] => {
	const chars: HTMLSpanElement[] = [];
	const text = element.innerText;
	element.innerHTML = "";
	text.split("").forEach((char) => {
		const span = document.createElement("span");
		span.classList.add("char");
		span.innerText = char;
		// span.innerText = char === " " ? "\u00A0" : char;
		element.appendChild(span);
		chars.push(span);
	});

	return chars;
};

export const SplitToWords = (element: HTMLElement): HTMLSpanElement[] => {
	const words: HTMLSpanElement[] = [];
	const text = element.innerText;

	element.innerHTML = "";
	text.split(/(\s+)/).forEach((word) => {
		const span = document.createElement("span");
		span.classList.add("word");

		span.innerText = word === " " ? "\u00A0" : word;
		element.appendChild(span);
		words.push(span);
	});

	return words;
};
