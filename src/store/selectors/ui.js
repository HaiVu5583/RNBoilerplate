import { chainParse } from '~/src/utils'

export const themeSelector = (state) => state.ui.theme

export const languageSelector = (state) => state.ui.language

export const activeTabSelector = (state) => chainParse(state, ['ui', 'bottomTabs', 'activeTab']) || 1