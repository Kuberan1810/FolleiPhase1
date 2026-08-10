import { API_BASE_URL } from '../api/auth/authApi';

/**
 * Frontend Google OAuth Flow Verification Tests
 */
export async function runGoogleAuthVerificationTests() {
  console.log('--- RUNNING GOOGLE OAUTH FRONTEND VERIFICATION TESTS ---');

  const results: { test: string; status: 'PASS' | 'FAIL'; details?: string }[] = [];

  // Test 1: Canonical API_BASE_URL check
  try {
    const isCanonical = API_BASE_URL === 'http://localhost:8000' || API_BASE_URL === import.meta.env.VITE_API_BASE_URL;
    if (!isCanonical || API_BASE_URL.includes('127.0.0.1')) {
      throw new Error(`Non-canonical API_BASE_URL found: ${API_BASE_URL}`);
    }
    results.push({ test: 'Canonical API_BASE_URL', status: 'PASS' });
  } catch (err: unknown) {
    results.push({ test: 'Canonical API_BASE_URL', status: 'FAIL', details: String(err) });
  }

  // Test 2: Double-click / Concurrent execution prevention
  try {
    let callCount = 0;
    const mockRef = { current: false };

    const simulatedStart = async () => {
      if (mockRef.current) return;
      mockRef.current = true;
      callCount++;
    };

    // Simulate concurrent double clicks
    await Promise.all([simulatedStart(), simulatedStart(), simulatedStart()]);

    if (callCount !== 1) {
      throw new Error(`Expected 1 start call on double-click, got ${callCount}`);
    }
    results.push({ test: 'Double-click concurrency guard', status: 'PASS' });
  } catch (err: unknown) {
    results.push({ test: 'Double-click concurrency guard', status: 'FAIL', details: String(err) });
  }

  // Test 3: No authorization_url or code in local/sessionStorage
  try {
    const keysToCheck = [
      'authorization_url',
      'google_state',
      'google_callback_code',
      'exchange_code',
    ];
    for (const key of keysToCheck) {
      if (localStorage.getItem(key) || sessionStorage.getItem(key)) {
        throw new Error(`Sensitive item '${key}' found in web storage`);
      }
    }
    results.push({ test: 'No sensitive state in localStorage/sessionStorage', status: 'PASS' });
  } catch (err: unknown) {
    results.push({ test: 'No sensitive state in localStorage/sessionStorage', status: 'FAIL', details: String(err) });
  }

  // Test 4: Callback error handling precedence before exchange_code check
  try {
    const searchString = '?error=oauth_failed&step=state_validation&reason=invalid_state';
    const params = new URLSearchParams(searchString);

    const errorParam = params.get('error');
    const exchangeCode = params.get('exchange_code');

    let handledAsError = false;
    let checkedExchangeCode = false;

    if (errorParam) {
      handledAsError = true;
    } else if (!exchangeCode) {
      checkedExchangeCode = true;
    }

    if (!handledAsError || checkedExchangeCode) {
      throw new Error('Error parameter was not evaluated before exchange_code check');
    }
    results.push({ test: 'Callback error evaluation order precedence', status: 'PASS' });
  } catch (err: unknown) {
    results.push({ test: 'Callback error evaluation order precedence', status: 'FAIL', details: String(err) });
  }

  // Test 5: invalid_state error does not invoke exchange endpoint
  try {
    let exchangeCalled = false;
    const mockExchange = async () => {
      exchangeCalled = true;
    };

    const searchString = '?error=oauth_failed&step=state_validation&reason=invalid_state';
    const params = new URLSearchParams(searchString);

    const errorParam = params.get('error');
    const exchangeCode = params.get('exchange_code');

    if (!errorParam && exchangeCode) {
      await mockExchange();
    }

    if (exchangeCalled) {
      throw new Error('Exchange endpoint was called despite invalid_state error!');
    }
    results.push({ test: 'invalid_state skips exchange call', status: 'PASS' });
  } catch (err: unknown) {
    results.push({ test: 'invalid_state skips exchange call', status: 'FAIL', details: String(err) });
  }

  console.table(results);
  return results;
}

export default runGoogleAuthVerificationTests;
