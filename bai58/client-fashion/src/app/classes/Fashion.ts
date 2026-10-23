export class Fashion{
    constructor(
        public _id:any=null,
        public style:string="",
        public fashion_subject:string="",
        public fashion_detail:string="",
        public fashion_image:string="",
        public IdF:number=0){}
    getBase64string(): string
    {
        if(!this.fashion_image.startsWith("data:image")){
            return "data:image/png;base64,"+this.fashion_image;
        }
        return this.fashion_image;
    }
}


export interface IFashion {
    Id: string,
    IdF: number,
    CreatedDate?: string,
    Style: string,
    fashion_subject: string,
    fashion_detail: string,
    Image: string,
    Jaccard: number,
    Cosine: number,
    Similarity: number
}
