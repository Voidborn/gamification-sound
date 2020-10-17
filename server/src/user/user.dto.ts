export class UserDTO {
    prolificId: string;
    testgroup: number;
    studyProgress: number;
    imageOrder: string;
    currentImage: number;
}

export class UserRO {
    userId: string;
    token?: string;
}