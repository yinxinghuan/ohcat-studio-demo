const get = (selector, root = document) => root.querySelector(selector);
const all = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = (id) => '<svg class="icon" aria-hidden="true"><use href="#' + id + '"/></svg>';
const escapeText = (text) => String(text).replace(/[&<>"']/g, (character) => (
  {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]
));
const presets = {
  film: {
    label: '开始创作',
    placeholder: '想拍什么？试试「一只猫在粉红色的月球上迷路」',
    examples: ['一只猫在粉红色的月球上迷了路，沿着月尘里的脚印寻找回家的路。', '雨夜的巷子里，有一间只在午夜开门的霓虹面馆。', '一列蓝色小火车穿过雾气，在松林深处停下。'],
  },
  canvas: {
    label: '打开画布',
    placeholder: '给画布写个起点，或者直接从空白开始。',
    examples: ['把「会发光的森林」拆成场景、角色和色彩三张灵感卡。', '收集复古未来交通工具的三种视觉方向。'],
  },
  agent: {
    label: '规划创作',
    placeholder: '告诉 Agent 你想完成什么，比如一支 15 秒的旅行短片。',
    examples: ['策划一支 15 秒的月球旅行短片，有反转结尾和三种镜头。', '把一个城市雨夜的想法拆成剧本、分镜和素材清单。'],
  },
};
const works = [
  {id:'moon', title:'月球迷路指南', type:'短片', author:'山野放映员', mark:'山', color:'#ffb6b2', image:'moon.jpg', likes:128, prompt:presets.film.examples[0], note:'在珊瑚色荒原上，一只第一次出远门的小猫把一轮粉红色的月亮当成了路标。'},
  {id:'midnight', title:'午夜面馆', type:'短片', author:'几颗像素', mark:'几', color:'#81ddd6', image:'midnight.jpg', likes:96, prompt:presets.film.examples[1], note:'用一场雨把城市变成水中的倒影。镜头从空荡的路口慢慢推向唯一亮着灯的窗。'},
  {id:'island', title:'云上栖居', type:'概念设计', author:'林间工作室', mark:'林', color:'#ffce83', image:'island.jpg', likes:74, prompt:'一座橙色现代主义建筑悬浮在群云之上，岛屿边缘有一束向下坠落的瀑布。', note:'把建筑做成远处的一小块橙色，把空间留给云、天空和往下流的水。'},
  {id:'train', title:'松林列车长', type:'角色设计', author:'猫爪制片厂', mark:'猫', color:'#d5bafa', image:'train.jpg', likes:112, prompt:presets.film.examples[2], note:'给一位绒毛列车长设计一趟清晨的旅程。青色机身和紫色雾气构成主色。'},
];
const storageKey = 'ohcat-studio-demo-v1';
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return {
      liked: Array.isArray(saved.liked) ? saved.liked : [],
      saved: Array.isArray(saved.saved) ? saved.saved : [],
      drafts: Array.isArray(saved.drafts) ? saved.drafts : [],
      following: Array.isArray(saved.following) ? saved.following : [],
      comments: saved.comments || {},
      coDrafts: Array.isArray(saved.coDrafts) ? saved.coDrafts : [],
      joined: saved.joined || {},
      discussions: saved.discussions || {},
      orders: Array.isArray(saved.orders) ? saved.orders : [],
      accepted: saved.accepted || {},
      notebook: Array.isArray(saved.notebook) ? saved.notebook : [],
      rewards: saved.rewards || {},
    };
  } catch {
    return {liked: [], saved: [], drafts: [], following: [], comments: {}, coDrafts: [], joined: {}, discussions: {}, orders: [], accepted: {}, notebook: [], rewards: {}};
  }
}
const state = loadState();
function persist() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
}
const dialog = get('#modal');
const dialogBody = get('#modal-body');
const idea = get('#idea');
const gallery = get('#work-grid');
const search = get('#work-search');
const orbitPreview = get('#orbit-preview');
let mode = 'film';
let category = '全部';
let communityFeed = '';
let recommendedIndex = 0;
let exampleIndex = 0;
let toastTimer;
let shouldRestoreFocus = true;
let orbitWork = null;
let orbitTrigger = null;

function announce(message) {
  let toast = get('#toast');
  if (dialog.open) {
    toast = get('.inside-toast', dialog);
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'sr-only inside-toast';
      toast.setAttribute('role', 'status');
      dialog.append(toast);
    }
  }
  toast.textContent = message;
  if (dialog.open) return;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2200);
}

function setMode(next) {
  mode = next;
  exampleIndex = 0;
  for (const tab of all('[data-mode]')) {
    const selected = tab.dataset.mode === mode;
    tab.setAttribute('aria-selected', selected);
    tab.tabIndex = selected ? 0 : -1;
  }
  get('#compose-panel').setAttribute('aria-labelledby', 'mode-' + mode);
  idea.placeholder = presets[mode].placeholder;
  idea.required = mode !== 'canvas';
  get('#create-label').textContent = presets[mode].label;
}
const modeTabs = all('[data-mode]');
for (const tab of modeTabs) tab.addEventListener('click', () => setMode(tab.dataset.mode));
get('.mode-tabs').addEventListener('keydown', (event) => {
  const index = modeTabs.indexOf(document.activeElement);
  const destinations = {ArrowRight:(index + 1) % modeTabs.length, ArrowLeft:(index + modeTabs.length - 1) % modeTabs.length, Home:0, End:modeTabs.length - 1};
  if (!(event.key in destinations)) return;
  event.preventDefault();
  const tab = modeTabs[destinations[event.key]];
  setMode(tab.dataset.mode);
  tab.focus();
});
get('#example').addEventListener('click', () => {
  const examples = presets[mode].examples;
  idea.value = uiText(examples[exampleIndex % examples.length]);
  exampleIndex++;
  idea.focus();
  idea.setSelectionRange(idea.value.length, idea.value.length);
});

function toggleCollection(key, id) {
  const index = state[key].indexOf(id);
  if (index === -1) state[key].push(id);
  else state[key].splice(index, 1);
  persist();
  return index === -1;
}
function workCard(work) {
  const liked = state.liked.includes(work.id);
  const orbital = communityFeed === 'grid';
  const disclosure = orbital ? ' aria-controls="orbit-preview" aria-expanded="' + (orbitWork === work) + '"' : '';
  return '<article class="work-card" data-object="' + work.id + '">' +
    '<button type="button" class="work-cover" data-work="' + work.id + '"' + disclosure + ' aria-label="' + (orbital ? '预览 ' : '查看') + work.title + '">' +
    '<img src="./' + work.image + '" alt="" width="720" height="480">' +
    '<span class="work-type">' + icon(work.type === '短片' ? 'play' : 'image') + work.type + '</span>' +
    (orbital ? '<span class="orbit-play" aria-hidden="true">' + icon('play') + '</span>' : '') + '</button>' +
    '<div class="work-info"><div><button type="button" class="work-title" data-work="' + work.id + '"' + disclosure + '>' + work.title + '</button>' +
    '<div class="work-author"><span class="avatar" style="--avatar:' + work.color + '">' + work.mark + '</span>' + work.author + '</div></div>' +
    '<button type="button" class="like-button" aria-pressed="' + liked + '" aria-label="点赞 ' + work.title + '" data-like="' + work.id + '">' + icon('heart') + '<span>' + (work.likes + Number(liked)) + '</span></button></div></article>';
}
function renderGallery() {
  const query = search.value.trim().toLowerCase();
  let visible = works.filter((work) => (
    (category === '全部' || work.type === category) &&
    [work.title, work.author, uiText(work.title), uiText(work.author)].join(' ').toLowerCase().includes(query)
  ));
  if (communityFeed === 'following') visible = visible.filter(({author}) => state.following.includes(author));
  if (communityFeed === 'friends') visible = [];
  if (orbitWork && !visible.includes(orbitWork)) closeOrbitPreview(false);
  gallery.classList.toggle('recommended-grid', communityFeed === 'recommended');
  if (communityFeed === 'recommended' && visible.length) {
    recommendedIndex = (recommendedIndex + visible.length) % visible.length;
    renderScreening(visible, recommendedIndex);
    return;
  }
  const empty = {
    following: '还没有关注的作品。打开任意作品详情就能关注创作者。',
    friends: '当前演示账号暂无好友动态。',
  }[communityFeed] || '没有找到匹配的作品。试试其他分类或关键词。';
  if (communityFeed === 'recommended') get('#gallery-end').replaceChildren();
  gallery.innerHTML = visible.length ? visible.map(workCard).join('') : '<p class="empty">' + empty + '</p>';
}
function renderScreening(selection, activeIndex) {
  const featured = selection[activeIndex];
  const cueButtons = selection.map((work, index) => (
    '<button type="button" class="cue-card" data-cue="' + index + '" aria-pressed="' + (index === activeIndex) + '">' +
    '<img src="./' + work.image + '" alt="" width="150" height="92"><span><strong>' + work.title + '</strong><small>' + work.type + '</small></span></button>'
  ));
  gallery.innerHTML = '<article class="screening" data-film="' + featured.id + '">' +
    '<div class="screen-image"><img src="./' + featured.image + '" alt="" width="920" height="613"></div>' +
    '<div class="screen-copy"><div class="screen-eyebrow"><i></i>现在放映 <span>' + featured.type + '</span></div>' +
    '<h3>' + featured.title + '</h3><p class="screen-author">' + featured.author + '</p>' +
    '<p class="screen-note">' + featured.note + '</p>' +
    '<button type="button" class="primary-button screening-action" data-work="' + featured.id + '">' +
    icon(featured.type === '短片' ? 'play' : 'image') + (featured.type === '短片' ? '观看短片' : '打开作品') + '</button></div></article>' +
    '<div class="screen-queue" aria-label="放映列表">' + cueButtons.join('') + '</div>';
  get('#gallery-end').innerHTML = '<span class="queue-progress" aria-label="放映进度">' + (activeIndex + 1) + ' / ' + selection.length + '</span>' +
    '<button type="button" class="secondary-button" data-recommend="-1">上一条</button><button type="button" class="secondary-button" data-recommend="1">下一条</button>';
}
for (const button of all('[data-filter]')) {
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    for (const filter of all('[data-filter]')) filter.setAttribute('aria-pressed', filter === button);
    renderGallery();
  });
}
gallery.addEventListener('click', (event) => {
  const cue = event.target.closest('[data-cue]');
  if (cue) {
    recommendedIndex = Number(cue.dataset.cue);
    renderGallery();
    get('[data-cue="' + recommendedIndex + '"]',gallery)?.focus({preventScroll:true});
    return;
  }
  const like = event.target.closest('[data-like]');
  const view = event.target.closest('[data-work]');
  if (like) {
    const work = works.find(({id}) => id === like.dataset.like);
    const liked = toggleCollection('liked', work.id);
    like.setAttribute('aria-pressed', liked);
    get('span', like).textContent = work.likes + Number(liked);
  }
  if (view) {
    const work = works.find(({id}) => id === view.dataset.work);
    if (communityFeed !== 'grid') showWork(work);
    else if (orbitWork === work) closeOrbitPreview();
    else openOrbitPreview(work, view);
  }
});
get('#gallery-end').addEventListener('click', (event) => {
  const button = event.target.closest('[data-recommend]');
  if (!button) return;
  recommendedIndex += Number(button.dataset.recommend);
  renderGallery();
});
get('#search-toggle').addEventListener('click', (event) => {
  const form = get('#search-form');
  form.hidden = !form.hidden;
  event.currentTarget.setAttribute('aria-expanded', !form.hidden);
  if (!form.hidden) search.focus();
  else {
    search.value = '';
    renderGallery();
  }
});
search.addEventListener('input', renderGallery);

function workVideo(work) {
  return '<video controls playsinline preload="metadata" width="960" height="540" ' +
    'aria-label="动态预览 · ' + work.title + '" poster="./' + work.image + '" src="./' + work.id + '.mp4"></video>';
}

function updateOrbitSelection() {
  for (const button of all('[aria-controls="orbit-preview"]', gallery)) {
    button.setAttribute('aria-expanded', button.dataset.work === orbitWork?.id);
  }
}

function revealOrbitPreview() {
  get('#orbit-preview-title', orbitPreview).focus({preventScroll:true});
  const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
  orbitPreview.scrollIntoView({block:'nearest', behavior});
}

function openOrbitPreview(work, trigger = null) {
  orbitWork = work;
  orbitTrigger = trigger;
  orbitPreview.innerHTML = '<div class="orbit-video">' + workVideo(work) + '</div>' +
    '<div class="orbit-preview-copy"><button class="icon-button orbit-preview-close" type="button" data-orbit-close aria-label="收起预览">' + icon('close') + '</button>' +
    '<p class="orbit-preview-label">封面动态预览</p><h3 id="orbit-preview-title" tabindex="-1">' + work.title + '</h3>' +
    '<p class="orbit-preview-credit">' + work.author + ' · ' + work.type + '</p>' +
    '<button class="secondary-button" type="button" data-orbit-details>作品详情</button></div>';
  orbitPreview.hidden = false;
  updateOrbitSelection();
  if (trigger) revealOrbitPreview();
}

function closeOrbitPreview(restoreFocus = true) {
  if (!orbitWork) return;
  const target = orbitTrigger?.isConnected ? orbitTrigger : get('.work-cover[data-work="' + orbitWork.id + '"]', gallery);
  orbitWork = null;
  orbitTrigger = null;
  orbitPreview.hidden = true;
  orbitPreview.replaceChildren();
  updateOrbitSelection();
  if (restoreFocus) target?.focus();
}

orbitPreview.addEventListener('click', (event) => {
  if (event.target.closest('[data-orbit-close]')) closeOrbitPreview();
  if (event.target.closest('[data-orbit-details]')) showWork(orbitWork);
});
get('#discover').addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && orbitWork && !document.fullscreenElement) closeOrbitPreview();
});

function showModal(content) {
  get('video', orbitPreview)?.pause();
  dialogBody.innerHTML = content;
  if (!dialog.open) dialog.showModal();
  get('#modal-close').focus({preventScroll:true});
}
get('#modal-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  if (!dialog.open) dialogBody.replaceChildren();
  if (!shouldRestoreFocus) {
    shouldRestoreFocus = true;
    idea.focus({preventScroll:true});
  }
});
const modalSection = (content) => '<section class="modal-inner">' + content + '</section>';

function showWork(work) {
  const saved = state.saved.includes(work.id);
  const video = work.type === '短片';
  const followed = state.following.includes(work.author);
  showModal('<div class="modal-visual">' + (video ? workVideo(work) :
    '<img alt="' + work.title + '" src="./' + work.image + '">') + '</div>' + modalSection(
    '<h2 id="modal-title">' + work.title + '</h2><p>' + work.author + ' · ' + work.type + (video ? ' · 示例动态预览' : ' · 示例作品') + '</p>' +
    '<p>' + work.note + '</p><p class="prompt-quote">' + work.prompt + '</p>' +
    '<div class="modal-actions"><button type="button" class="primary-button" id="try-work">' + icon('spark') + ' 用这个灵感创作</button>' +
    '<button type="button" class="secondary-button" id="save-work" aria-pressed="' + saved + '">' + icon('bookmark') + '<span>' + (saved ? '已收藏' : '收藏作品') + '</span></button>' +
    '<button type="button" class="secondary-button" id="follow-author" aria-pressed="' + followed + '">' + (followed ? '已关注作者' : '关注作者') + '</button>' +
    '<button type="button" class="secondary-button" id="share-work">复制作品链接</button></div>' +
    '<div class="discussion"><h3>评论</h3><div id="work-comments"></div><form id="work-comment"><label class="sr-only" for="work-comment-text">写评论</label><input id="work-comment-text" required maxlength="200" placeholder="写一条评论"><button type="submit" class="secondary-button">发表</button></form></div>'
  ));
  const comments = state.comments[work.id] || [];
  function renderComments() {
    get('#work-comments').innerHTML = comments.map((message) => '<p data-no-translate>' + escapeText(message) + '</p>').join('') || '<p>还没有评论。</p>';
  }
  renderComments();
  get('#work-comment').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = get('#work-comment-text');
    if (!input.value.trim()) return;
    comments.push(input.value.trim());
    state.comments[work.id] = comments;
    persist();
    input.value = '';
    renderComments();
  });
  get('#follow-author').addEventListener('click', (event) => {
    const isFollowed = toggleCollection('following', work.author);
    event.currentTarget.setAttribute('aria-pressed', isFollowed);
    event.currentTarget.textContent = isFollowed ? '已关注作者' : '关注作者';
    if (communityFeed === 'following') renderGallery();
  });
  get('#share-work').addEventListener('click', async (event) => {
    const button = event.currentTarget;
    const target = new URL('#community/work/' + work.id, location.href);
    target.searchParams.set('lang', uiLanguage());
    const link = target.href;
    try {
      await navigator.clipboard.writeText(link);
      button.textContent = '已复制链接';
    } catch {
      const input = document.createElement('input');
      input.value = link;
      input.readOnly = true;
      input.setAttribute('aria-label', '作品链接');
      button.after(input);
      input.select();
    }
  });
  get('#save-work').addEventListener('click', (event) => {
    const button = event.currentTarget;
    const isSaved = toggleCollection('saved', work.id);
    button.setAttribute('aria-pressed', isSaved);
    get('span', button).textContent = isSaved ? '已收藏' : '收藏作品';
    announce(isSaved ? '已收藏到我的项目' : '已取消收藏');
  });
  get('#try-work').addEventListener('click', () => {
    setMode('film');
    idea.value = uiText(work.prompt);
    shouldRestoreFocus = false;
    dialog.close();
    go('create');
    window.scrollTo({top: 0, behavior: 'instant'});
    announce('已把灵感放进创作框');
  });
}

function draftTitle(draft) {
  if (!draft.idea) return '未命名画布';
  return draft.idea.slice(0, 27) + (draft.idea.length > 27 ? '…' : '');
}
function saveDraft(draft) {
  const copy = {...draft, id: draft.id || crypto.randomUUID()};
  state.drafts = [copy, ...state.drafts.filter(({id}) => id !== copy.id)];
  persist();
  dialog.close();
  go('planet/projects');
  announce('草稿已保存');
}
function showDraft(draft) {
  if (draft.mode === 'canvas') {
    showCanvas(draft);
    return;
  }
  const agent = draft.mode === 'agent';
  const shots = agent ? [
    ['故事方向','确认角色、场景和观众应该记住的那一刻。'],
    ['剧本与分镜','列出开场、转折和结尾，为每段选一个关键镜头。'],
    ['制作清单','整理参考图、配乐和需要制作的素材。'],
  ] : [
    ['建立场景','用远景交代时间、地点和气氛。'],
    ['靠近主角','切到中近景，捕捉主角的动作或反应。'],
    ['保留余韵','用一个能呼应开场的画面结束。'],
  ];
  showModal(modalSection('<h2 id="modal-title">' + (agent ? 'Agent 创作计划' : '分镜草稿') + '</h2>' +
    '<p>以下为演示结构，可把创意保存到本机浏览器。</p><p class="prompt-quote" data-no-translate>' + escapeText(draft.idea) + '</p>' +
    '<div class="shots">' + shots.map(([title, copy], index) => '<div class="shot"><span>' + (agent ? '步骤 ' : '镜头 ') + (index + 1) + '</span><div><strong>' + title + '</strong><p>' + copy + '</p></div></div>').join('') + '</div>' +
    '<div class="modal-actions"><button type="button" class="primary-button" id="save-draft">' + icon('check') + ' 保存草稿</button></div>'));
  get('#save-draft').addEventListener('click', () => saveDraft(draft));
}
function showCanvas(draft) {
  showModal(modalSection('<h2 id="modal-title">灵感画布</h2><p>把场景、角色或色彩写进卡片，之后可以继续编辑。</p><div class="canvas-grid" id="canvas-grid"></div>' +
    '<div class="modal-actions"><button type="button" class="secondary-button" id="add-note">' + icon('plus') + ' 添加卡片</button><button type="button" class="primary-button" id="save-canvas">' + icon('check') + ' 保存画布</button></div>'));
  const grid = get('#canvas-grid');
  function addCard(value = '') {
    const label = document.createElement('label');
    label.textContent = '灵感 ' + (grid.children.length + 1);
    const field = document.createElement('textarea');
    field.placeholder = '写下一个画面或点子…';
    field.maxLength = 500;
    field.value = value;
    label.append(field);
    grid.append(label);
    return field;
  }
  for (const note of draft.notes?.length ? draft.notes : [draft.idea]) addCard(note);
  get('#add-note').addEventListener('click', () => addCard().focus());
  get('#save-canvas').addEventListener('click', () => {
    const notes = all('textarea', grid).map((field) => field.value.trim());
    saveDraft({...draft, idea: notes.find(Boolean) || '', notes});
  });
}
get('#composer').addEventListener('submit', (event) => {
  event.preventDefault();
  if (mode !== 'canvas' && !idea.value.trim()) {
    idea.setCustomValidity(uiText('先写下一句创意。'));
    idea.reportValidity();
    idea.setCustomValidity('');
    return;
  }
  showDraft({mode, idea:idea.value.trim()});
});
setMode('film');
renderGallery();
