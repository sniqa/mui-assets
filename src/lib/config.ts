export const protocol = `${window.location.protocol}`;
export const hostname = `${window.location.hostname}`;
export const port = `${window.location.port}`;
export const baseUrl = `${protocol}//${hostname}`;
export const backendPort = "8083";
export const backendPath = "/phl";
export const backendBaseUrl = `${baseUrl}:${backendPort}`;
export const backendApiUrl = `${backendBaseUrl}${backendPath}`;
export const uploadUrl = `${backendBaseUrl}/upload`;

export const uploadDevicesUrl = `${uploadUrl}/devices`;
export const uploadUsersUrl = `${uploadUrl}/users`;
export const uploadUsbkeysUrl = `${uploadUrl}/usbkeys`;
export const uploadTelsUrl = `${uploadUrl}/tels`;
export const uploadLinersUrl = `${uploadUrl}/liners`;
