import { NotFoundException } from '@nestjs/common';
import { CourseService } from './course.service';

describe('Course ownership', () => {
  it('does not update or delete an unowned course', async () => {
    const courses = { findOne: jest.fn().mockResolvedValue(null), update: jest.fn(), delete: jest.fn() };
    const service = new CourseService(courses as any, {} as any, {} as any, {} as any, {} as any);
    await expect(service.updateCourse(9, { title: 'Changed' }, 2)).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.deleteCourse(9, 2)).rejects.toBeInstanceOf(NotFoundException);
    expect(courses.findOne).toHaveBeenCalledWith({ where: { id: 9, creator: { id: 2 } } });
    expect(courses.update).not.toHaveBeenCalled();
    expect(courses.delete).not.toHaveBeenCalled();
  });
});
