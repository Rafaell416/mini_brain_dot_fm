import * as Updates from 'expo-updates';

export function getReleaseChannel(): string {
  return Updates.releaseChannel ?? "default";
};
