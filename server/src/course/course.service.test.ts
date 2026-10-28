import { it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { NotFoundException } from '@nestjs/common';
import { CourseService } from './course.service';

it('does not update or delete an unowned course', async () => {
  const courses = { findOne: mock.fn(async (_query: unknown) => null), update: mock.fn(), delete: mock.fn() };
  const service = new CourseService(courses as any, {} as any, {} as any, {} as any, {} as any);
  await assert.rejects(service.updateCourse(9, { title: 'Changed' }, 2), NotFoundException);
  await assert.rejects(service.deleteCourse(9, 2), NotFoundException);
  assert.deepEqual(courses.findOne.mock.calls[0].arguments[0], { where: { id: 9, creator: { id: 2 } } });
  assert.equal(courses.update.mock.callCount(), 0);
  assert.equal(courses.delete.mock.callCount(), 0);
});
