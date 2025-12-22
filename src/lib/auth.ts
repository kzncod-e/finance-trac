import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/suppabase";
export const getAuth = () => {
  let token: Session | null;
  supabase.auth.getSession().then(({ data: { session } }) => {
    token = session;
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    token = session;
  });
};
