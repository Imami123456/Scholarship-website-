import { describe, it, expect } from 'vitest';
import { getYouTubeId, whatsappShareUrl, facebookShareUrl } from '../src/config';

describe('Site Config Helpers', () => {
  describe('getYouTubeId', () => {
    it('extracts ID from standard watch URL', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      expect(getYouTubeId(url)).toBe('dQw4w9WgXcQ');
    });

    it('extracts ID from youtu.be short URL', () => {
      const url = 'https://youtu.be/dQw4w9WgXcQ';
      expect(getYouTubeId(url)).toBe('dQw4w9WgXcQ');
    });

    it('extracts ID from embed URL', () => {
      const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      expect(getYouTubeId(url)).toBe('dQw4w9WgXcQ');
    });

    it('extracts ID from shorts URL', () => {
      const url = 'https://www.youtube.com/shorts/dQw4w9WgXcQ';
      expect(getYouTubeId(url)).toBe('dQw4w9WgXcQ');
    });

    it('returns 11-char bare ID as-is', () => {
      expect(getYouTubeId('dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    });

    it('handles whitespace in input', () => {
      expect(getYouTubeId('  dQw4w9WgXcQ  ')).toBe('dQw4w9WgXcQ');
    });

    it('returns null for empty, undefined, or invalid inputs', () => {
      expect(getYouTubeId('')).toBeNull();
      expect(getYouTubeId(undefined)).toBeNull();
      expect(getYouTubeId('not-a-youtube-url')).toBeNull();
      expect(getYouTubeId('https://google.com')).toBeNull();
    });
  });

  describe('whatsappShareUrl', () => {
    it('generates correct share URL with text only', () => {
      const result = whatsappShareUrl('Check this scholarship out!');
      expect(result).toBe('https://wa.me/?text=Check%20this%20scholarship%20out!');
    });

    it('generates share URL with text and URL combined', () => {
      const result = whatsappShareUrl('Check this scholarship:', 'https://example.com/scholarship/1');
      expect(result).toContain('https://wa.me/?text=');
      expect(decodeURIComponent(result)).toBe('https://wa.me/?text=Check this scholarship:\nhttps://example.com/scholarship/1');
    });
  });

  describe('facebookShareUrl', () => {
    it('generates correct Facebook sharer URL', () => {
      const url = 'https://example.com/scholarship/1';
      expect(facebookShareUrl(url)).toBe('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com%2Fscholarship%2F1');
    });
  });
});
