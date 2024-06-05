export interface BuildArRegexOptions {
  diacs?: boolean;
  kashida?: boolean;
  alif?: boolean;
  hamza?: boolean;
}

export interface GetQueryRegexOptions {
  query: string;
  exactMatch?: boolean;
  matchWholeWord?: boolean;
  matchCase?: boolean;
  matchDiacs?: boolean;
  matchKashida?: boolean;
  matchAlif?: boolean;
  matchHamza?: boolean;
  useRegex?: boolean;
}
