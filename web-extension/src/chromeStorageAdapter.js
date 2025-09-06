export class ChromeStorageAdapter {
  async getItem(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => resolve(result[key] ?? null))
    })
  }
  async setItem(key, value) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => resolve())
    })
  }
  async removeItem(key) {
    return new Promise((resolve) => {
      chrome.storage.local.remove([key], () => resolve())
    })
  }
}
