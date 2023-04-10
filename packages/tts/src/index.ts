import {
  SynthesizeRequestBody,
  SynthesizeResponseBody,
  SynthesizeResponseBodyV1Beta1,
  VoicesListResponseBody,
} from './types';

export async function synthesize(
  requestBody: SynthesizeRequestBody,
  accessToken: string,
  version?: 'v1'
): Promise<SynthesizeResponseBody>;
export async function synthesize(
  requestBody: SynthesizeRequestBody,
  accessToken: string,
  version?: 'v1beta1'
): Promise<SynthesizeResponseBodyV1Beta1>;
export async function synthesize(
  requestBody: SynthesizeRequestBody,
  accessToken: string,
  version: 'v1' | 'v1beta1' = 'v1'
): Promise<SynthesizeResponseBody | SynthesizeResponseBodyV1Beta1> {
  const response = await fetch(
    `https://texttospeech.googleapis.com/${version}/text:synthesize`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to synthesize text: ${await response.text()} (${response.status})`
    );
  }

  if (version === 'v1beta1') {
    return (await response.json()) satisfies SynthesizeResponseBodyV1Beta1;
  }
  return (await response.json()) satisfies SynthesizeResponseBody;
}

export async function listVoices(
  accessToken: string,
  version?: 'v1'
): Promise<VoicesListResponseBody> {
  const response = await fetch(
    `https://texttospeech.googleapis.com/${version}/voices`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to list voices: ${await response.text()} (${response.status})`
    );
  }

  return (await response.json()) satisfies VoicesListResponseBody;
}
