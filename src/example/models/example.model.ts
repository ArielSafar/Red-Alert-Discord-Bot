import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class Example {
    @ApiProperty({ required: true })
    @IsInt()
    @Field(type => Int)
    id: number;

    @ApiProperty({ required: true })
    @IsString()
    @Field()
    name: string;
}