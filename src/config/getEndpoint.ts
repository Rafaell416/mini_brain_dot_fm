import { getReleaseChannel } from "./getReleaseChannel";

const API_ENDPONIT_DEFAULT = 'http://localhost:3000'; //process.env.API_ENDPOINT

export function getEndpoint(): string {
  const releaseChannel: string = getReleaseChannel();

  switch (releaseChannel) {
    case 'default':
      return API_ENDPONIT_DEFAULT;
    case 'staging':
      return '';
    case 'production':
      return '';
    default:
      return API_ENDPONIT_DEFAULT;
  };
};