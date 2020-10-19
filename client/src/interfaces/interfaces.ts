export interface Image {
    path: string,
    points: number[],
    marked: boolean[]
}

export interface UserInfo {
    studyProgress: number,
    testgroup: number
}

export interface Response {
    studyProgress: number,
    questionId: string,
    answer: string
}