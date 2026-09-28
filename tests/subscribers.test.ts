import { describe, it, expect, beforeEach } from 'vitest';
import { getSubscribers, subscribeEmail, removeSubscriber } from '../src/config';

// Polyfill in-memory localStorage for environment reliability
const storageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: storageMock,
  writable: true
});

describe('Subscriber Management', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty array when no subscribers saved', () => {
    expect(getSubscribers()).toEqual([]);
  });

  it('validates email format and rejects invalid emails', async () => {
    const invalidEmails = ['plainaddress', '@missingusername.com', 'user@.com', 'user@domain'];
    for (const email of invalidEmails) {
      const result = await subscribeEmail(email);
      expect(result.ok).toBe(false);
    }
    expect(getSubscribers()).toHaveLength(0);
  });

  it('successfully saves valid email to subscribers list', async () => {
    const result = await subscribeEmail('student@university.edu');
    expect(result.ok).toBe(true);
    expect(result.duplicate).toBe(false);

    const subscribers = getSubscribers();
    expect(subscribers).toHaveLength(1);
    expect(subscribers[0].email).toBe('student@university.edu');
    expect(subscribers[0].date).toBeDefined();
  });

  it('normalizes email to lowercase and trims whitespace', async () => {
    await subscribeEmail('  STUDENT@University.EDU  ');
    const subscribers = getSubscribers();
    expect(subscribers[0].email).toBe('student@university.edu');
  });

  it('detects and flags duplicate subscriptions without duplicating entries', async () => {
    await subscribeEmail('scholar@domain.org');
    const secondResult = await subscribeEmail('scholar@domain.org');

    expect(secondResult.ok).toBe(true);
    expect(secondResult.duplicate).toBe(true);

    const subscribers = getSubscribers();
    expect(subscribers).toHaveLength(1);
  });

  it('removes subscriber by email case-insensitively', async () => {
    await subscribeEmail('alice@test.com');
    await subscribeEmail('bob@test.com');
    expect(getSubscribers()).toHaveLength(2);

    const remaining = removeSubscriber('ALICE@test.com');
    expect(remaining).toHaveLength(1);
    expect(remaining[0].email).toBe('bob@test.com');
    expect(getSubscribers()).toHaveLength(1);
  });
});
