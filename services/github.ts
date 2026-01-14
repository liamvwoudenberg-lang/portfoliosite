import { Project } from '../types';

const GITHUB_USERNAME = 'liamvwoudenberg-lang';
const REPO_NAME = 'portfolio';

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
}

export const fetchGitHubFolder = async (
  folder: string, 
  category: Project['category']
): Promise<Project[]> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${folder}`);
    
    if (!response.ok) {
      if (response.status === 404) return [];
      if (response.status === 403) {
        console.warn('GitHub API rate limit exceeded.');
        return [];
      }
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }

    const data: GitHubFile[] = await response.json();

    const imageFiles = data.filter(file => 
      file.type === 'file' && 
      /\.(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG)$/i.test(file.name)
    );

    // Sort files alphabetically to ensure consistent order
    imageFiles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    return imageFiles.map(file => ({
      id: `gh-${file.sha}`,
      title: formatTitle(file.name),
      category: category,
      folder: folder,
      thumbnail: file.download_url,
      description: `${formatTitle(folder)} Photography`,
      year: new Date().getFullYear().toString()
    }));

  } catch (error) {
    console.error(`Error fetching from GitHub folder '${folder}':`, error);
    return [];
  }
};

const formatTitle = (filename: string): string => {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  return nameWithoutExt
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());
};