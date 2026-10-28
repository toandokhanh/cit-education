import { IsArray, IsInt, Min } from 'class-validator';
export class UpdateSubtitleDTO {
  @IsInt()
  @Min(1)
  lessonId: number;
  @IsArray()
  data: Array<{ startTime: string; endTime: string; text: string }>;
}
