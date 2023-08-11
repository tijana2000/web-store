export interface Item{
    id: number,
    quantity: number,
    articleName: string,
}
export interface HistoryItem{
    id: number,
    quantity: number,
    articleName: string,
}
export interface ActiveItem{
    id: number,
    quantity: number,
    articleName: string,
}
export interface MakeItem{
    quantity: number,
    articleId: number,
}