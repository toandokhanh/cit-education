import { validateSync } from 'class-validator';
import { UserDTO } from './createUser.dto';

describe('Public account roles', () => {
  const account = { firstname: 'Demo', lastname: 'User', email: 'demo@example.com', password: 'local-test-password', gender: 'other' };
  it('rejects self-provisioned administrators', () => {
    const errors = validateSync(Object.assign(new UserDTO(), account, { role: 'admin' }));
    expect(errors.some(error => error.property === 'role')).toBe(true);
  });
  it('accepts the supported public roles', () => {
    for (const role of ['student', 'instructor']) {
      expect(validateSync(Object.assign(new UserDTO(), account, { role }))).toEqual([]);
    }
  });
});
