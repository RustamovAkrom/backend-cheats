// types.ts
export type Lang = "EN" | "RU";

export interface PageProps {
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
}
