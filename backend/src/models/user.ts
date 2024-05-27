export interface user {
    email:string;
    password: string;
    name: string;
    phoneNumber:string;
    isCompany:string;
}
export interface userId{
    id:number
}
export interface check{
    email:string;
    password:string;
}

export interface userChange{
    userId:number;
    password:string;
}