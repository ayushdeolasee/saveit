const noteInput = document.getElementById('note-input')
const saveBtn = document.getElementById('save-btn')
const statusEl = document.getElementById('status')
const recentList = document.getElementById('recent-list')

function setStatus(message, isError = false) {
  statusEl.textContent = message
  if (isError) {
    statusEl.classList.add('error')
  } else {
    statusEl.classList.remove('error')
  }
}

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab || null
}

async function loadRecent() {
  const { items = [] } = await chrome.storage.local.get(['items'])
  recentList.innerHTML = ''
  for (const item of items.slice(-5).reverse()) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = item.url
    a.textContent = item.title || item.url
    a.target = '_blank'
    li.appendChild(a)
    if (item.note) {
      const span = document.createElement('span')
      span.textContent = ` — ${item.note}`
      li.appendChild(span)
    }
    recentList.appendChild(li)
  }
}

async function saveCurrentTab() {
  try {
    setStatus('Saving…')
    const tab = await getCurrentTab()
    if (!tab?.url) {
      setStatus('No active tab to save', true)
      return
    }
    const note = String(noteInput?.value || '').trim()
    const item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      url: tab.url,
      title: tab.title || '',
      note,
      savedAt: new Date().toISOString(),
    }
    const { items = [] } = await chrome.storage.local.get(['items'])
    items.push(item)
    await chrome.storage.local.set({ items })
    setStatus('Saved!')
    noteInput.value = ''
    await loadRecent()
  } catch (err) {
    console.error(err)
    setStatus('Failed to save', true)
  }
}

saveBtn.addEventListener('click', saveCurrentTab)
loadRecent()
