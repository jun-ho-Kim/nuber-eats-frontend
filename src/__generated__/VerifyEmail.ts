/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VerifyEmailInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: VerifyEmail
// ====================================================

export interface VerifyEmail_VerifyEmail {
  __typename: "VerifyEmailOutput";
  error: string | null;
  ok: boolean;
}

export interface VerifyEmail {
  VerifyEmail: VerifyEmail_VerifyEmail;
}

export interface VerifyEmailVariables {
  input?: VerifyEmailInput | null;
}
