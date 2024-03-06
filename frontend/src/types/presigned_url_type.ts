export type PresignedUrlType = {
  url: string;
  fields: {
    key: string;
    acl: string;
    bucket: string;
    Policy: string;
    "X-Amz-Date": string;
    "X-Amz-Algorithm": string;
    "X-Amz-Signature": string;
    "X-Amz-Credential": string;
  };
};
