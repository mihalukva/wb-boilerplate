import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

export const requestSchema = s.object({});

export const errorResponseSchema = s.object({

});

export const positiveResponseSchema = s.object({

});

export const responseSchema = s.union([errorResponseSchema, positiveResponseSchema]);

export type Request = s.Infer<typeof requestSchema>;
export type Response = s.Infer<typeof responseSchema>;
export type PositiveResponse = s.Infer<typeof positiveResponseSchema>;

export const config: RequestConfig = {
  method: '<%=method%>',
  url: '<%=url%>',
  validationSchema: responseSchema,
};

export const call = (body: Request = {}) =>
  api.request<Response>({
    ...config,
    body: JSON.stringify(body),
  });
