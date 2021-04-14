/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: creaetDish
// ====================================================

export interface creaetDish_createDish {
  __typename: "CreateDishOutput";
  ok: boolean;
  error: string | null;
}

export interface creaetDish {
  createDish: creaetDish_createDish;
}

export interface creaetDishVariables {
  input: CreateDishInput;
}
