
import { Project } from '../types';

// Configuration for your GitHub Repository
const GITHUB_USERNAME = 'liamwoudenberg-lang';
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
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

/**
 * Fetches image files from a specific folder in the GitHub repository
 * and converts them into Project objects for the portfolio.
 */
export const fetchGitHubFolder = async (
  folder: string, 
  category: Project['category']
): Promise<Project[]> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${folder}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`GitHub folder '${folder}' not found in repo ${GITHUB_USERNAME}/${REPO_NAME}.`);
        return [];
      }
      if (response.status === 403) {
        console.warn('GitHub API rate limit exceeded. Using cached/static data only.');
        return [];
      }
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }

    const data: GitHubFile[] = await response.json();

    // Filter to ensure we only get image files
    const imageFiles = data.filter(file => 
      file.type === 'file' && 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
    );

    // Map GitHub files to your Project structure
    return imageFiles.map(file => ({
      id: `gh-${file.sha}`, // Unique ID derived from GitHub SHA
      title: formatTitle(file.name),
      category: category,
      thumbnail: file.download_url, // Use the raw download URL
      description: `Imported from GitHub /${folder}`,
      year: new Date().getFullYear().toString()
    }));

  } catch (error) {
    console.error(`Error fetching from GitHub folder '${folder}':`, error);
    return [];
  }
};

// Helper to clean up filenames (e.g., "concert_01.jpg" -> "Concert 01")
const formatTitle = (filename: string): string => {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  // Replace underscores/hyphens with spaces and capitalize words
  return nameWithoutExt
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());
};
