import { SandpackFile } from "@codesandbox/sandpack-react";

export async function getFiles({ id }: { id: string }) {
  const configUrl = `https://codesandbox.io/api/v1/sandboxes/${id}/sandpack`;
  const response = await fetch(configUrl);
  if (response.ok) {
    const data = await response.json();

    return updateFiles(data.files);
  }
  return {};
}

function getChallengeConfig(json: string) {
  const csb = JSON.parse(json);

  if (csb?.previewConfig) {
    return csb.previewConfig;
  }

  return {
    visibleFiles: [],
    activeFile: "/src/App.js",
  };
}

export function updateFiles(files: { [key: string]: SandpackFile }) {
  const previewConfig = getChallengeConfig(files["/package.json"].code);
  Object.keys(files).map((key) => {
    if (key === previewConfig.activeFile) {
      files[key].active = true;
    }
    if (!previewConfig.visibleFiles.includes(key)) {
      files[key].hidden = true;
    }
  });
  return files;
}
