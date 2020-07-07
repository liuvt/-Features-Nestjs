import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CrudPayload {
    @IsNotEmpty()
    @IsMongoId()
    mongoid: string;

    @IsNotEmpty()
    data: IDataPayload[];

}

class IDataPayload {
    @IsNotEmpty()
    key: string;

    @IsNotEmpty()
    value: string;
}