"use client";

import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function GoogleLoginButton({
  isLoading,
  setIsLoading
}: {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}) {
    const { login } = useAuthStore();
    const router = useRouter();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/auth/google', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: tokenResponse.access_token }),
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    console.log('--- LOGIN SUCCESSFUL ---', result.user.email);
                    if (login) login(result.user, result.access_token);
                    router.push('/');
                } else {
                    console.error('CRITICAL: Login failed:', result.message || 'Unknown error');
                    alert(`Login failed: ${result.message || 'Verification error'}`);
                }
            } catch (err) {
                console.error('CRITICAL: Fetch failed for Google login:', {
                    error: err,
                    message: err instanceof Error ? err.message : String(err)
                });
                alert('Connection error. Check your internet or if the server is running.');
            } finally {
                setIsLoading(false);
            }
        },
        onError: (error) => {
            console.error('Google Login Error:', error);
            setIsLoading(false);
        },
    });

    return (
        <button
            className="w-full flex items-center justify-center gap-4 px-8 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.5em] hover:bg-[#E81414] hover:text-white transition-all group rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => googleLogin()}
            disabled={isLoading}
        >
            {isLoading ? 'INITIATING...' : 'SIGN IN WITH GOOGLE'}
        </button>
    );
}
