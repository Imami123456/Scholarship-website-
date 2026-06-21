// ============================================================================
//  SITE CONFIG — EDIT YOUR LINKS HERE (this is the only file you need to touch)
// ----------------------------------------------------------------------------
//  Paste your real social links below. Leave a value as an empty string ('')
//  and that button/link will automatically hide itself across the whole site.
// ============================================================================

export const siteConfig = {
  name: 'ScholarSphere',
  tagline: 'Fully funded scholarships for students worldwide',

  // The public URL of your site once deployed (used for share links).
  // e.g. 'https://scholarsphere.com'  — fine to leave '' until you deploy.
  siteUrl: '',

  social: {
    // WhatsApp CHANNEL invite link (best for one-to-many announcements).
    // Create one in WhatsApp > Channels > Create, then copy the invite link.
    whatsappChannel: '', // e.g. 'https://whatsapp.com/channel/0029Vxxxxxx'

    // Optional WhatsApp GROUP invite link (for community Q&A).
    whatsappGroup: '', // e.g. 'https://chat.whatsapp.com/Exxxxxx'

    // Your YouTube channel.
    youtube: '', // e.g. 'https://youtube.com/@yourchannel'

    // Your Facebook page.
    facebook: '', // e.g. 'https://facebook.com/yourpage'

    // Optional extras — leave '' to hide.
    telegram: '',
    instagram: '',
    twitter: '',
  },

  contactEmail: '', // e.g. 'hello@scholarsphere.com'

  // Where email signups go. Leave '' → emails are saved locally only and you can
  // view/export them in Admin Panel > Subscribers. For real email delivery, use a
  // free form endpoint:
  //   Web3Forms → 'https://api.web3forms.com/submit' (also set web3formsKey below)
  //   Formspree → 'https://formspree.io/f/yourFormId'
  newsletterEndpoint: '',
  web3formsKey: '', // only for Web3Forms — your access key from web3forms.com
};

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------

/** Build a "share to WhatsApp" link with pre-filled text (and optional URL). */
export const whatsappShareUrl = (text: string, url?: string): string => {
  const message = url ? `${text}\n${url}` : text;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
};

/** Build a "share to Facebook" link for a given URL. */
export const facebookShareUrl = (url: string): string =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

/** Extract a YouTube video ID from a full URL or return the raw ID as-is. */
export const getYouTubeId = (input?: string): string | null => {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  // Already looks like a bare ID (11 chars, no slashes)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

// ---------------------------------------------------------------------------
//  Email subscribers ("get notified")
//  Signups are always stored locally (Admin Panel > Subscribers) and, if a
//  newsletterEndpoint is configured, also forwarded to your email service.
// ---------------------------------------------------------------------------

export interface Subscriber {
  email: string;
  date: string; // ISO timestamp
}

const SUBS_KEY = 'subscribers';

export function getSubscribers(): Subscriber[] {
  try {
    return JSON.parse(localStorage.getItem(SUBS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function removeSubscriber(email: string): Subscriber[] {
  const list = getSubscribers().filter(s => s.email.toLowerCase() !== email.toLowerCase());
  try {
    localStorage.setItem(SUBS_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
  return list;
}

export async function subscribeEmail(
  email: string
): Promise<{ ok: boolean; duplicate?: boolean }> {
  const clean = email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) return { ok: false };

  // Save locally (deduped) so signups are visible/exportable in the Admin panel.
  const list = getSubscribers();
  const duplicate = list.some(s => s.email.toLowerCase() === clean);
  if (!duplicate) {
    list.push({ email: clean, date: new Date().toISOString() });
    try {
      localStorage.setItem(SUBS_KEY, JSON.stringify(list));
    } catch {
      /* ignore */
    }
  }

  // Forward to your email service if one is configured.
  if (siteConfig.newsletterEndpoint) {
    try {
      const body: Record<string, string> = {
        email: clean,
        subject: `New subscriber: ${clean}`,
      };
      if (siteConfig.web3formsKey) body.access_key = siteConfig.web3formsKey;
      await fetch(siteConfig.newsletterEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
    } catch {
      return { ok: true, duplicate };
    }
  }

  return { ok: true, duplicate };
}
