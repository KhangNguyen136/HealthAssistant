
export const outputDate = (date) => {
    const str = date.toISOString().slice(0, 16).replace(/-/g, "-").replace("T", " ");
    return str
}
