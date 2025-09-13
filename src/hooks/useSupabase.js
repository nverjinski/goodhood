import { useContext } from "react";
import { SupabaseContext } from "@contexts/SupabaseContext";

// Consumes the supabase context and exposes data within the context via a hook.
export const useSupabase = () => useContext(SupabaseContext);
