import { after, before, it } from 'node:test';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

let app: INestApplication;
before(async () => {
  const moduleFixture = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleFixture.createNestApplication();
  await app.init();
});
after(async () => { await app?.close(); });
it('serves the public health response', async () => {
  await request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
});
