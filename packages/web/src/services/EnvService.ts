import { z } from 'zod'

enum Service {
  SchoolWeb = 'school-web',
  SchoolCoreApi = 'school-core-api',
}

export type EnvConfig = {
  API_BASE_URL: string
  FIREBASE_API_KEY: string
  FIREBASE_AUTH_DOMAIN: string
  FIREBASE_PROJECT_ID: string
  FIREBASE_STORAGE_BUCKET: string
  FIREBASE_MESSAGING_SENDER_ID: string
  FIREBASE_APP_ID: string
  MAX_FILE_SIZE: string
  RECAPTCHA_SITE_KEY: string
}

const envConfigSchema = z.object({
  API_BASE_URL: z.string(),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_AUTH_DOMAIN: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  FIREBASE_MESSAGING_SENDER_ID: z.string(),
  FIREBASE_APP_ID: z.string(),
  MAX_FILE_SIZE: z.string(),
  RECAPTCHA_SITE_KEY: z.string(),
})

class EnvService {
  private static instance: EnvService

  private env: Record<string, string> = {}

  private localUrl: Record<Service, string> = {
    [Service.SchoolWeb]: 'http://localhost:5173',
    [Service.SchoolCoreApi]: 'http://localhost:3300',
  }

  private devUrl: Record<Service, string> = {
    [Service.SchoolWeb]: 'https://school-web-dev.skilllane.net',
    [Service.SchoolCoreApi]: 'https://school-core-api-dev.skilllane.net',
  }

  private stagingUrl: Record<Service, string> = {
    [Service.SchoolWeb]: 'https://school-web-stg.skilllane.net',
    [Service.SchoolCoreApi]: 'https://school-core-api-stg.skilllane.net',
  }

  private staging2Url: Record<Service, string> = {
    [Service.SchoolWeb]: 'https://school-web-stg-2.skilllane.net',
    [Service.SchoolCoreApi]: 'https://school-core-api-stg-2.skilllane.net',
  }

  // New QA env.
  private staging3Url: Record<Service, string> = {
    [Service.SchoolWeb]: 'https://school-web-stg-3.skilllane.net',
    [Service.SchoolCoreApi]: 'https://school-core-api-stg-3.skilllane.net',
  }

  private preDevUrl: Record<Service, string> = {
    [Service.SchoolWeb]: 'https://school-web-pre-dev.skilllane.net',
    [Service.SchoolCoreApi]: 'https://school-core-api-pre-dev.skilllane.net',
  }

  private uatUrl: Record<Service, string> = {
    [Service.SchoolWeb]: 'https://school-web-uat.skilllane.net',
    [Service.SchoolCoreApi]: 'https://school-core-api-uat.skilllane.net',
  }

  private schoolWebUrlMapApiUrl: Record<string, string> = {
    [this.localUrl['school-web']]: this.localUrl['school-core-api'],
    [this.devUrl['school-web']]: this.devUrl['school-core-api'],
    [this.stagingUrl['school-web']]: this.stagingUrl['school-core-api'],
    [this.staging2Url['school-web']]: this.staging2Url['school-core-api'],
    [this.staging3Url['school-web']]: this.staging3Url['school-core-api'],
    [this.preDevUrl['school-web']]: this.preDevUrl['school-core-api'],
    [this.uatUrl['school-web']]: this.uatUrl['school-core-api'],
  }

  private constructor() {
    if (EnvService.instance) {
      throw new Error(
        'Error: Instantiation failed: Use EnvService.getInstance() instead of new.',
      )
    }
  }

  public static getInstance(): EnvService {
    if (!EnvService.instance) {
      EnvService.instance = new EnvService()
    }

    return EnvService.instance
  }

  setEnv(data: Record<string, string>) {
    const envConfig = envConfigSchema.parse(data)

    this.env = envConfig
  }

  getEnv() {
    return this.env
  }

  getBackendUrl(): string {
    // 1. if have VITE_API_BASE_URL ,use it.
    if (import.meta.env.VITE_API_BASE_URL) {
      return import.meta.env.VITE_API_BASE_URL
    }

    // 2. if no have VITE_API_BASE_URL, use window.location.origin.
    const backendUrl = this.schoolWebUrlMapApiUrl[window.location.origin]
    if (backendUrl) {
      return backendUrl
    }

    // 3. Doesn't meet any conditions.
    return this.devUrl[Service.SchoolCoreApi]
  }
}

export const envService = EnvService.getInstance()
