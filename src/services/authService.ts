import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase';
import type { UserRole } from '../types';

// ─── Role Detection from Email ────────────────────────────────────────────────
// Maps email prefixes/patterns to roles.
// You can later replace this with Firestore user document lookup.
export function detectRoleFromEmail(email: string): UserRole {
  const lower = email.toLowerCase();
  if (lower.startsWith('admin')) return 'admin';
  if (lower.startsWith('faculty') || lower.startsWith('teacher')) return 'faculty';
  if (lower.startsWith('coordinator') || lower.startsWith('club')) return 'club_coordinator';
  if (lower.startsWith('visitor') || lower.startsWith('prospect')) return 'public';
  return 'student'; // default for all other emails
}

// ─── Login ────────────────────────────────────────────────────────────────────
export async function loginWithEmail(
  email: string,
  password: string
): Promise<{ user: User; role: UserRole }> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const role = detectRoleFromEmail(credential.user.email ?? '');
  return { user: credential.user, role };
}

// ─── Register ─────────────────────────────────────────────────────────────────
export async function registerWithEmail(
  email: string,
  password: string
): Promise<{ user: User; role: UserRole }> {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const role = detectRoleFromEmail(credential.user.email ?? '');
  return { user: credential.user, role };
}

// ─── Logout ───────────────────────────────────────────────────────────────────
export async function logout(): Promise<void> {
  await signOut(auth);
}

// ─── Auth State Listener ──────────────────────────────────────────────────────
export function onAuthStateChange(
  callback: (user: User | null, role: UserRole | null) => void
) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const role = detectRoleFromEmail(user.email ?? '');
      callback(user, role);
    } else {
      callback(null, null);
    }
  });
}
