import { Type } from "class-transformer";
import { IsBoolean, isBoolean, IsDate, IsNumber, IsString, Min } from "class-validator";

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

    @IsDate()
    deletedAt?: Date; // This field is not
    @IsBoolean()    
    available?: boolean; // This field is not
}
