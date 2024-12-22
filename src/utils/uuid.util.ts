import type { Version4Options } from "uuid";
import { v4 } from "uuid";

export type UUID = string;

export const uuid = (options?: Version4Options, buf?: undefined, offset?: number): string => v4(options, buf, offset);
