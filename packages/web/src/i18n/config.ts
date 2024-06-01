import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// eslint-disable-next-line import/no-cycle
import th_commonNS from './th/common'
import en_commonNS from './en/common'

enum NameSpace {
  Common = 'common',
  ManageContent = 'manageContent',
  Curriculum = 'curriculum',
  MyWork = 'myWork',
  Assignment = 'assignment',
  TeachingPlan = 'teachingPlan',
  Menu = 'menu',
  Course = 'course',
  UserManagement = 'userManagement',
  Table = 'table',
  Report = 'report',
  SelfPaced = 'selfPaced',
  ManageScore = 'manageScore',
}

export const defaultNS = [NameSpace.Common]
export const resources = {
  th: {
    common: th_commonNS,
  },
  en: {
    common: en_commonNS,
  },
} as const

i18n.use(initReactI18next).init({
  lng: 'th',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  ns: defaultNS,
  resources,
})

export default i18n
