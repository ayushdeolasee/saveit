export class ChromeStorageAdapter {
  async getItem(key) {
    return new Promise((resolve) => {
      try {
        chrome.storage.local.get([key], (result) => {
          resolve(result?.[key] ?? null);
        });
      } catch (_) {
        resolve(null);
      }
    });
  }

  async setItem(key, value) {
    return new Promise((resolve) => {
      try {
        chrome.storage.local.set({ [key]: value }, () => resolve());
      } catch (_) {
        resolve();
      }
    });
  }

  async removeItem(key) {
    return new Promise((resolve) => {
      try {
        chrome.storage.local.remove([key], () => resolve());
      } catch (_) {
        resolve();
      }
    });
  }
}
