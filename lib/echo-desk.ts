/**
 * Echo Desk Webhook Integration
 * 
 * This utility handles sending contact form submissions to Echo Desk CRM
 * via webhook. Includes retry logic, error handling, and optional authentication.
 */

export interface EchoDeskPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  source: string;
  timestamp: string;
  subject?: string;
}

export interface EchoDeskResponse {
  success: boolean;
  error?: string;
  statusCode?: number;
}

/**
 * Send data to Echo Desk webhook
 * @param payload - The contact form data to send
 * @param retryCount - Current retry attempt (internal use)
 * @returns Promise<EchoDeskResponse>
 */
export async function sendToEchoDesk(
  payload: EchoDeskPayload,
  retryCount: number = 0
): Promise<EchoDeskResponse> {
  const webhookUrl = process.env.ECHO_DESK_WEBHOOK_URL;
  const apiKey = process.env.ECHO_DESK_API_KEY;
  const maxRetries = 2;

  // If webhook URL is not configured, skip silently
  if (!webhookUrl) {
    console.log('[Echo Desk] Webhook URL not configured, skipping...');
    return { success: true }; // Don't fail the form submission
  }

  try {
    console.log(`[Echo Desk] Sending data to webhook (attempt ${retryCount + 1}/${maxRetries + 1})...`);

    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add authentication if API key is provided
    if (apiKey) {
      // Echo Desk might use Bearer token, API key header, or other auth methods
      // Adjust this based on Echo Desk's actual authentication requirements
      headers['Authorization'] = `Bearer ${apiKey}`;
      // Alternative: headers['X-API-Key'] = apiKey;
    }

    // Send POST request to webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    // Check if request was successful
    if (response.ok) {
      const responseData = await response.json().catch(() => ({}));
      console.log('[Echo Desk] Webhook sent successfully:', responseData);
      return {
        success: true,
        statusCode: response.status,
      };
    } else {
      // Request failed, try to get error details
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`[Echo Desk] Webhook failed with status ${response.status}:`, errorText);

      // Retry logic for server errors (5xx) and rate limiting (429)
      if (
        retryCount < maxRetries &&
        (response.status >= 500 || response.status === 429)
      ) {
        // Exponential backoff: wait 1s, then 2s
        const delay = Math.pow(2, retryCount) * 1000;
        console.log(`[Echo Desk] Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return sendToEchoDesk(payload, retryCount + 1);
      }

      return {
        success: false,
        error: `HTTP ${response.status}: ${errorText}`,
        statusCode: response.status,
      };
    }
  } catch (error) {
    console.error('[Echo Desk] Error sending webhook:', error);

    // Retry on network errors
    if (retryCount < maxRetries) {
      const delay = Math.pow(2, retryCount) * 1000;
      console.log(`[Echo Desk] Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return sendToEchoDesk(payload, retryCount + 1);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Format contact form data for Echo Desk
 * @param formData - Raw form data from contact submission
 * @returns EchoDeskPayload
 */
export function formatEchoDeskPayload(formData: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  source?: string;
  subject?: string;
}): EchoDeskPayload {
  return {
    name: formData.name,
    email: formData.email,
    phone: formData.phone || '',
    service: formData.service || '',
    message: formData.message,
    source: formData.source || 'website',
    subject: formData.subject || '',
    timestamp: new Date().toISOString(),
  };
}
