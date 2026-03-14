export type Step = 'pick' | 'loading' | 'story';

export interface StoryResult {
  story: string;
  character: string;
  setting: string;
  theme: string;
}
