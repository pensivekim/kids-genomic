export type Age = 3 | 4 | 5;
export type Role = "teacher" | "child" | "parent";
export type Competency = "Critical" | "Connect" | "Creative" | "Communicate" | "Choose";

export interface Slide {
  type: "intro" | "content" | "activity-intro";
  title: string;
  emoji: string;
  description: string;
}

export interface CardSorterActivity {
  type: "CardSorter";
  instruction: string;
  categories: string[];
  cards: Array<{
    id: string;
    emoji: string;
    label: string;
    answer: number;
  }>;
}

export interface QuizCardActivity {
  type: "QuizCard";
  instruction: string;
  questions: Array<{
    id: string;
    question: string;
    emoji: string;
    options: string[];
    answer: number;
    explanation: string;
  }>;
}

export interface StampBoardActivity {
  type: "StampBoard";
  instruction: string;
  stamp: string;
  items: Array<{
    id: string;
    emoji: string;
    label: string;
  }>;
  maxStamps: number;
  completionMessage: string;
}

export interface VoteWidgetActivity {
  type: "VoteWidget";
  instruction: string;
  options: Array<{
    id: string;
    emoji: string;
    label: string;
  }>;
}

export interface EmotionPickerActivity {
  type: "EmotionPicker";
  instruction?: string;
}

export interface DrawingCanvasActivity {
  type: "DrawingCanvas";
  instruction?: string;
}

export interface CameraCaptureActivity {
  type: "CameraCapture";
  instruction?: string;
}

export interface GalleryViewerActivity {
  type: "GalleryViewer";
  instruction?: string;
  items?: Array<{ id: string; emoji: string; label: string; description?: string }>;
}

export interface ContentPickerActivity {
  type: "ContentPicker";
  instruction?: string;
  options?: Array<{ id: string; emoji: string; label: string; description?: string }>;
  maxSelect?: number;
}

export type Activity =
  | CardSorterActivity
  | QuizCardActivity
  | StampBoardActivity
  | VoteWidgetActivity
  | EmotionPickerActivity
  | DrawingCanvasActivity
  | CameraCaptureActivity
  | GalleryViewerActivity
  | ContentPickerActivity;

export interface WeekData {
  week: number;
  age: Age;
  title: string;
  phase: number;
  competency: Competency;
  isGraduation?: boolean;
  slides: Slide[];
  activity: Activity;
  homeActivity: string;
}
