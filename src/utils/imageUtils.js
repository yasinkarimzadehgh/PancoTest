const cdnServers = {
  "251": "https://fs1.panco.me/s/",
  "252": "https://fs2.panco.me/s/",
  "253": "https://fs3.panco.me/s/",
};


export const getImageUrl = (serverId, imagePath) => {
  if (!serverId || !imagePath) {
    return null;
  }

  const baseUrl = cdnServers[serverId];
  if (!baseUrl) {
    return null;
  }

  return `${baseUrl}${imagePath}`;
};