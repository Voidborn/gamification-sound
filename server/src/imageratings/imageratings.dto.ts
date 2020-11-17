export interface ImageratingsDTO {
    userId: string,
    imageId: string,
    testgroup: number,
    markedArray: string,
    pointsArray: string,
    receivedPoints: number,
    responseTime?: Date
}