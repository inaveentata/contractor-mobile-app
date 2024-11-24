import { supabase } from '@/src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: any;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  setSession: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);


  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        // fetch current user
        const { data } = await supabase.from('profiles').select('*').eq('auth_id', session.user.id).single();
        setProfile(data || null);

        if (!data) {
          const { data } = await supabase.from('profiles').insert({ email: session.user.email, auth_id: session.user.id });
          setProfile(data || null);
        }
      }
      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);



  return (
    <AuthContext.Provider
      value={{ session, loading, profile, setSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);