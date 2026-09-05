export function formatTodayLabel(locale = "pt-BR") {
    return new Date().toLocaleDateString(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export function formatTodayDate(locale = "pt-BR") {
    return new Date().toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}