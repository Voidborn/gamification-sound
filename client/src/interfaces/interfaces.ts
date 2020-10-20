export interface Image {
    name: string,
    points: number[],
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