export interface Image {
    name: string,
    points: number[],
}

export interface UserInfo {
    studyProgress: number,
    audiofile: string
}

export interface Response {
    studyProgress: number,
    questionId: string,
    answer: string
}