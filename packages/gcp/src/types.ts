export type JWT = {
  iss: string;
  scope: string;
  aud: string;
  exp: number;
  iat: number;
  sub?: string;
};

export type ServiceAccount = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
};

export type ServiceAccountTokenRequestBody = {
  grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer';
  assertion: string;
};

export type ServiceAccountTokenResponseBody = {
  access_token: string;
  scope?: string;
  token_type: string;
  expires_in: number;
};

export type GetAccessTokenFunction = (
  serviceAccount: ServiceAccount,
  expiration?: number
) => Promise<string>;

export type DecryptServiceAccountFunction = (options: {
  iv: string;
  key: string;
  cipher: string;
}) => Promise<ServiceAccount>;
