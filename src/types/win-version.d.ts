declare module "win-version" {
  const getWinVersion: () => {
    major: number;
    minor: number;
    build: number;
    releaseId: number;
    revision: number;
    osBuild: number;
    version: number | string;
  };
  export default getWinVersion;
}
