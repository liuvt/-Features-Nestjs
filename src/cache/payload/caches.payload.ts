import { IsNotEmpty } from 'class-validator';
export class CrudMongoDto {
    @IsNotEmpty()
    key: string;

    @IsNotEmpty()
    value: string;
}
