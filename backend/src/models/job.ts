export interface job {
    title:string;
    description:string;
    salary:string;
    skills:string;
    postDate:string;
    company_id:number;
    admin_id:number;
    category_id:number;
    location:string;
    time:string;
    status:number;
}
export interface jobSalary{
    job_id:number;
    salary:string;
}
export interface jobD{
    job_id:number;
}

export interface jobCategory{
    category_id:number;
}


export interface jobCompany{
    company_id:number;
}