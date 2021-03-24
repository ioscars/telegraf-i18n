export declare type LanguageCode = string;
export declare type TemplateData = Record<string, unknown>;
export declare type Template = (data: Readonly<TemplateData>) => string;
export declare type RepositoryEntry = Record<string, Template>;
export declare type Repository = Record<LanguageCode, Readonly<RepositoryEntry>>;
interface Config {
  directory?: string;
  useSession?: boolean;
  sessionName?: string;
  allowMissing?: boolean;
  defaultLanguageOnMissing?: boolean;
  defaultLanguage?: string;
}

type ContextUpdate = (ctx: any, next?: (() => any) | undefined) => any;

export declare class I18nContext {
  readonly config: Config;
  readonly repository: Repository;
  readonly templateData: Readonly<TemplateData>;
  languageCode: string;
  shortLanguageCode: string;
  constructor(repository: Readonly<Repository>, config: Config, languageCode: string, templateData: Readonly<TemplateData>);
  locale(): string;
  locale(languageCode: string): void;
  getTemplate(languageCode: string, resourceKey: string): Template | undefined;
  t(resourceKey: string, templateData?: Readonly<TemplateData>): string;
}

export declare class I18n {
  repository: Repository;
  readonly config: Config;
  constructor(config?: Partial<Config>);
  loadLocales(directory: string): void;
  loadLocale(languageCode: LanguageCode, i18nData: Readonly<Record<string, unknown>>): void;
  resetLocale(languageCode?: LanguageCode): void;
  availableLocales(): LanguageCode[];
  resourceKeys(languageCode: LanguageCode): string[];
  missingKeys(languageOfInterest: LanguageCode, referenceLanguage?: string): string[];
  overspecifiedKeys(languageOfInterest: LanguageCode, referenceLanguage?: string): string[];
  translationProgress(languageOfInterest: LanguageCode, referenceLanguage?: string): number;
  createContext(languageCode: LanguageCode, templateData: Readonly<TemplateData>): I18nContext;
  middleware(): ContextUpdate;
  t(languageCode: LanguageCode, resourceKey: string, templateData?: Readonly<TemplateData>): string;
}

export declare function match(resourceKey: string, templateData?: Readonly<TemplateData>): (text: string, ctx: any) => RegExpExecArray | null;

export default I18n;
declare module 'telegraf' {
  export interface Context {
    i18n: I18nContext
  }
}
