import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {    
    @IsString({
        message:"Name must be a string",

    })
    public name:string;    
    @IsNumber(
        {maxDecimalPlaces:2}
        
    )
    @Min(0)
    @Type(() => Number)
    public price:number;
}
