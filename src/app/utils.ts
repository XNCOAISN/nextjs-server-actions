import { SubmissionResult } from "@conform-to/react";
import deepmerge from "deepmerge";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const mergeSubmissionResult = (
  a: SubmissionResult<string[]> | undefined,
  b: SubmissionResult<string[]> | undefined
) => {
  if (!a || !b) {
    return a || b;
  }
  return deepmerge(a, b);
};
