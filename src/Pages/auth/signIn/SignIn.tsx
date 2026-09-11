/**
 * Sign in or create an account: email + password, or Google.
 *
 * Keeps the Follei card styling and switches between the two modes in place,
 * because a separate register page is one more navigation for the same form.
 */
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { coirei } from '../../../api/coirei';
import { storeSession } from '../../../lib/auth';
import { useSession, keys } from '../../../hooks/useProjects';

type Mode = 'signin' | 'register';

export default function SignIn() {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const cache = useQueryClient();
  const session = useSession();

  if (session.data) return <Navigate to="/" replace />;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      const tokens = mode === 'register'
        ? await coirei.register(email, password, fullName)
        : await coirei.signIn(email, password);
      storeSession(tokens);
      await cache.invalidateQueries({ queryKey: keys.session });
      navigate('/', { replace: true });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    try {
      const { authorization_url } = await coirei.googleSignInUrl();
      window.location.assign(authorization_url);
    } catch (error) {
      toast.error((error as Error).message);
      setBusy(false);
    }
  };

  const input =
    'w-full rounded-xl border border-[#E6E6E4] bg-[#F9F9F7] px-3 py-2.5 text-[14px] text-[#16171A] outline-none  focus:border-[#94A3B8]';

  return (
    <div className="grid min-h-screen place-items-center bg-[#F9F9F7] p-6 font-sans antialiased">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-5 rounded-[24px] border border-[#E6E6E4] bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-full bg-[#16171A] text-[13px] font-bold tracking-wider text-white shadow-xs">F</div>
          <span className="text-[15px] font-semibold tracking-tight text-[#16171A]">Follei</span>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-[24px] font-bold tracking-tight text-[#16171A]">
            {mode === 'register' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-[13.5px] text-[#717378]">
            {mode === 'register'
              ? 'Your projects, research and campaigns stay private to your account.'
              : 'Sign in to pick up your research where you left off.'}
          </p>
        </div>

        <button
          type="button"
          onClick={google}
          disabled={busy}
          className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-[#E6E6E4] bg-white py-2.5 text-[14px] font-medium text-[#16171A] hover:bg-[#F8FAFC] ] disabled:opacity-60"
        >
          <svg viewBox="0 0 18 18" className="size-4" aria-hidden="true">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.94v2.33A9 9 0 0 0 9 18Z" />
            <path fill="#FBBC05" d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.95H.94a9 9 0 0 0 0 8.1l3.03-2.33Z" />
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .94 4.95l3.03 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[#EBEBE8]" />
          <span className="text-[11.5px] uppercase tracking-wide text-[#9CA3AF]">or</span>
          <span className="h-px flex-1 bg-[#EBEBE8]" />
        </div>

        {mode === 'register' && (
          <label className="block space-y-1.5">
            <span className="text-[12.5px] font-medium text-[#2C2E31]">Your name</span>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)}
                   autoComplete="name" className={input} />
          </label>
        )}

        <label className="block space-y-1.5">
          <span className="text-[12.5px] font-medium text-[#2C2E31]">Work email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                 autoComplete="email" className={input} />
        </label>

        <label className="block space-y-1.5">
          <span className="text-[12.5px] font-medium text-[#2C2E31]">Password</span>
          <input type="password" required minLength={mode === 'register' ? 8 : 1}
                 value={password} onChange={(e) => setPassword(e.target.value)}
                 autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                 className={input} />
          {mode === 'register' && <span className="text-[11.5px] text-[#9CA3AF]">At least 8 characters.</span>}
        </label>

        <button
          type="submit"
          disabled={busy || !email || !password}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#16171A] py-3 text-[14px] font-medium text-white shadow-xs hover:bg-black ] disabled:cursor-not-allowed disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF]"
        >
          {busy ? 'Please wait…' : mode === 'register' ? 'Create account' : 'Sign in'}
        </button>

        <p className="text-center text-[13px] text-[#717378]">
          {mode === 'register' ? 'Already have an account?' : 'New to Follei?'}{' '}
          <button type="button" onClick={() => setMode(mode === 'register' ? 'signin' : 'register')}
                  className="cursor-pointer font-medium text-[#16171A] hover:underline">
            {mode === 'register' ? 'Sign in' : 'Create one'}
          </button>
        </p>
      </form>
    </div>
  );
}
