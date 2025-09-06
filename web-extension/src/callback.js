import { supabase } from './supabaseClient.js';

async function completeAuth() {
  const root = document.getElementById('root');
  try {
    const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
    if (error) {
      root.textContent = `Auth error: ${error.message}`;
      return;
    }
    root.textContent = 'Signed in successfully. You can close this tab.';
    setTimeout(() => window.close(), 1200);
  } catch (err) {
    root.textContent = `Unexpected error: ${err?.message ?? String(err)}`;
  }
}

completeAuth();
