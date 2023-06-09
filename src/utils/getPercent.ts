export const getPercent = (count: number, totalCount: number) => {
    if(totalCount === 0 || count === 0) return `0%`
    const percent = Math.round(100 / (totalCount / count))
    return `${percent}%`
}