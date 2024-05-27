export interface appId{
    company_id:number;
}
export interface appId2{
    application_id:number;
}
export interface appUserId{
    user_id:number;
}
export interface updateStatus{
    application_id:number;
    status:string;
}

export interface application{
    status:string;
    appliedDate:string;
    user_id:number;
    company_id:number;
    jobName:string;
    userName:string;
    phone:string;
    email:string;
    Description:string;
}