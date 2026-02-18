
export const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const getYouTubeId = (url: string) => {
  if (!url) return null;
  if (url.includes('<iframe')) {
    const srcMatch = url.match(/src=["'](.*?)["']/);
    if (srcMatch) url = srcMatch[1];
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length >= 10) ? match[2] : null;
};

export const formatTitle = (filename: string): string => {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  return nameWithoutExt
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());
};
