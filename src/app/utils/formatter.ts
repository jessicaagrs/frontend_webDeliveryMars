export function setRandomNumber() {
	return Math.floor(Math.random() * 5) + 1;
}

export function setDateNow() {
	const data = new Date();

	const dataFormatada = data.toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	return dataFormatada;
}

export function setFormatTelephone(value: String | undefined) {
	if (!value) return "";

	return value
		.replace(/[\D]/g, "")
		.replace(/(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{5})(\d)/, "$1-$2")
		.replace(/(-\d{4})(\d+?)/, "$1");
}
