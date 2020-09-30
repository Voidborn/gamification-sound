export interface userExport {
    userId: number,
    prolificId: string,
    progress: number,
}

export interface imageExport {
    path: string,
    points: number[],
    marked: boolean[]
}