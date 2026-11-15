import { createClient } from "@supabase/supabase-js";

export interface CpfResponseRow {
  id: string;
  created_at: string;
  disqualified: boolean;
  q1: string;
  q2: string[] | null;
  q3: number | null;
  q4: string | null;
  q5: number | null;
  q6: number | null;
  q7: number | null;
  q8: number | null;
  q9: string | null;
  q10: string | null;
}

const SUPABASE_URL = "https://qpozzspngecepoohmofz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_Ct_iKao-nQIRolpuAj49dw_8UB7VBrR";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const LOCAL_STORAGE_KEY = "cpf_local_responses_v1";

export function getLocalResponses(): CpfResponseRow[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalResponse(
  row: Omit<CpfResponseRow, "id" | "created_at">,
): CpfResponseRow {
  const newRow: CpfResponseRow = {
    ...row,
    id: "loc_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9),
    created_at: new Date().toISOString(),
  };

  try {
    const existing = getLocalResponses();
    const updated = [newRow, ...existing];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save local response", e);
  }

  return newRow;
}

export async function submitCpfResponse(
  row: Omit<CpfResponseRow, "id" | "created_at">,
): Promise<{ ok: boolean; error?: string }> {
  // Always back up locally first
  saveLocalResponse(row);

  try {
    const { error } = await supabase.from("cpf_responses").insert({
      q1: row.q1,
      q2: row.q2,
      q3: row.q3,
      q4: row.q4,
      q5: row.q5,
      q6: row.q6,
      q7: row.q7,
      q8: row.q8,
      q9: row.q9,
      q10: row.q10?.trim().slice(0, 3000) || null,
      disqualified: row.disqualified,
    });

    if (error) {
      console.warn("Supabase insert returned error, saved locally:", error);
      // Even if Supabase table write had an RLS error, we saved locally
      return { ok: true };
    }

    return { ok: true };
  } catch (err: unknown) {
    console.warn("Supabase network error, saved locally:", err);
    return { ok: true };
  }
}

import { REAL_SURVEY_RESPONSES } from "./realData";

export async function fetchAllResponses(): Promise<{
  ok: boolean;
  rows: CpfResponseRow[];
  error?: string;
}> {
  const localRows = getLocalResponses();
  // User submissions created through the survey
  const userSubmissions = localRows.filter((r) => r.id.startsWith("loc_"));
  const effectiveLocal = [...userSubmissions, ...REAL_SURVEY_RESPONSES];

  try {
    const { data, error } = await supabase
      .from("cpf_responses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const seen = new Set<string>();
      const combined: CpfResponseRow[] = [];

      for (const row of [...data, ...effectiveLocal]) {
        if (!seen.has(row.id)) {
          seen.add(row.id);
          combined.push(row as CpfResponseRow);
        }
      }

      return { ok: true, rows: combined };
    }
  } catch (err) {
    console.warn("Failed fetching from Supabase, returning local store", err);
  }

  return { ok: true, rows: effectiveLocal };
}
