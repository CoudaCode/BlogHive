import { ApiProperty } from '@nestjs/swagger';

export class profileDto {
  @ApiProperty({
    example: 'John',
    required: true,
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    required: true,
  })
  lastName: string;

  @ApiProperty({
    example: 'M',
    required: true,
  })
  sex: string;

  @ApiProperty({
    example: '1995-09-20T00:00:00.000Z',
    required: true,
  })
  birthDate: Date;

  @ApiProperty({
    example: 'This is a bio',
    required: true,
  })
  bio: string;
}
