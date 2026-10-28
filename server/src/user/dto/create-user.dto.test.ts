import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateSync } from 'class-validator';
import { UserDTO } from './create-user.dto';

describe('Public account roles', () => {
  const account = { firstname: 'Demo', lastname: 'User', email: 'demo@example.com', password: 'local-test-password', gender: 'other' };
  it('rejects self-provisioned administrators', () => {
    const errors = validateSync(Object.assign(new UserDTO(), account, { role: 'admin' }));
    assert.ok(errors.some(error => error.property === 'role'));
  });
  it('accepts the supported public roles', () => {
    for (const role of ['student', 'instructor']) {
      assert.deepEqual(validateSync(Object.assign(new UserDTO(), account, { role })), []);
    }
  });
});
