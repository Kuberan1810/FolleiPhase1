import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

/** Landing page configured as GMAIL_OAUTH_SUCCESS_URL in the backend. */
export const AuthCallback = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const status = params.get('gmail_oauth');
    if (status === 'connected') {
      toast.success(`Google Workspace connected${params.get('email') ? ` for ${params.get('email')}` : ''}`);
    } else {
      toast.error('Google Workspace connection could not be completed');
    }
    window.history.replaceState({}, document.title, window.location.pathname);
    navigate('/onboarding/connect-tools', { replace: true });
  }, [navigate, params]);

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex items-center justify-center">
      <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
        <div className="w-10 h-10 mx-auto border-4 border-slate-200 border-t-black rounded-full animate-spin" />
        <p className="mt-4 text-sm text-slate-600">Finishing Google Workspace connection…</p>
      </div>
    </div>
  );
};

export default AuthCallback;
