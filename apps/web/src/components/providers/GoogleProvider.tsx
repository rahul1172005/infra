"use client";

import { GoogleOAuthProvider } from '@react-oauth/google';

export function GoogleProvider({ children }: { children: React.ReactNode }) {
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        console.warn("Google Client ID missing. Google OAuth will not work.");
        return <>{children}</>;
    }
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            {children}
        </GoogleOAuthProvider>
    );
}
