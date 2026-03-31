// ─── Shared TypeScript types ──────────────────────────────────────────────────

export interface TeamMember {
  id:       string;
  name:     string;
  role:     string;
  bio:      string;
  avatar:   string;
  linkedin?: string;
  twitter?:  string;
}

export interface Project {
  id:          string;
  title:       string;
  description: string;
  tags:        string[];
  image:       string;
  url?:        string;
  caseStudy?:  string;
}

export interface Service {
  id:          string;
  title:       string;
  description: string;
  icon:        string;
  features:    string[];
}

export interface Testimonial {
  id:      string;
  quote:   string;
  author:  string;
  company: string;
  avatar?: string;
  rating:  number;
}

export interface ContactFormData {
  name:    string;
  email:   string;
  company?: string;
  budget?:  string;
  message: string;
}

export type ApiResponse<T = void> =
  | { success: true;  data: T }
  | { success: false; error: string };
