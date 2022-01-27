interface ReCaptchaInstance {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: ReCaptchaExecuteOptions) => Promise<string>;
}

interface ReCaptchaExecuteOptions {
  action: string;
}

declare interface Window {
  grecaptcha: ReCaptchaInstance;
}
