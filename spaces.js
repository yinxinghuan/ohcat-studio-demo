const routes = {
  create: '创意工作台', 'planet/active': '进行中的项目', orders: '订单任务',
  'planet/cocreate': '创意共创', 'planet/projects': '我的项目',
  'planet/assets': '资产仓库', 'planet/notebooks': 'IP 目录与记事本', rewards: '日常任务',
};
const categories = ['文案制作', '创意设计', '剧本制作', '数字人制作', '绘画插画', '视频制作', '音乐制作', '游戏制作', '代码', '智能硬件', '其它'];
const communityTabs = {community:'社区', 'community/following':'关注', 'community/friends':'好友', 'community/recommended':'推荐'};
const sampleProjects = [
  {id:'lunar-post', title:'月球邮局', category:'视频制作', image:'moon.jpg', description:'一只猫邮差要在最后一班飞船起飞前，把一封寄给地球的信送到月球邮局。我们正在做一支 15 秒短片，欢迎擅长分镜和声音的创作者。', account:'山野放映员', production:1800, distribution:600, unit:20, committed:1420, backers:18, rights:'示例原创角色，由参与成员授权用于本片制作与发布。', marketShare:70, studioShare:30, producers:[{name:'山野放映员', role:'导演与分镜', share:30}], scheme:'发布后点播分润', agreement:'示例协议。以扣除发行费用后的净回款为口径，每月登记凭据并更新应分明细。', status:'拼团中'},
  {id:'cloud-herbarium', title:'云端植物图鉴', category:'绘画插画', image:'island.jpg', description:'为悬浮岛创作三种虚构植物的视觉图鉴。交付内容包括植物造型、配色设定和一张展示海报。', account:'林间工作室', production:1100, distribution:400, unit:10, committed:520, backers:11, rights:'示例原创概念，授权用于本项目的图鉴与展示。', marketShare:65, studioShare:35, producers:[{name:'林间工作室', role:'概念设定与插画', share:35}], scheme:'市场购买', agreement:'示例协议。按净回款登记发行费用和各方应分明细。', status:'拼团中'},
  {id:'forest-train', title:'松林列车角色设定', category:'创意设计', image:'train.jpg', description:'为穿行松林的猫咪列车长完成角色造型、服装和三视图，作为后续短片的制作素材。', account:'猫爪制片厂', production:1500, distribution:500, unit:20, committed:2000, backers:24, rights:'示例原创角色，授权用于短片和相关展示。', marketShare:70, studioShare:30, producers:[{name:'猫爪制片厂', role:'角色与美术', share:30}], scheme:'市场购买与点播分润', agreement:'示例协议。对发行与点播分别记录凭据，按净回款核算份额。', status:'制作中'},
];
const sampleOrders = [
  {id:'title-motion', title:'为月球短片设计片头', category:'视频制作', requirements:'制作 3 秒片头动效，交付 MP4 和可编辑源文件。', acceptance:'角色和主片色调一致，片头连续播放时无黑帧。', price:160, amount:1, unit:'套', status:'待接单'},
  {id:'city-copy', title:'为午夜面馆写故事简介', category:'文案制作', requirements:'写两版中文创意介绍，分别用于作品详情和社交平台。', acceptance:'每版 80 字以内，准确表达只在午夜营业的设定。', price:45, amount:2, unit:'版', status:'待接单'},
];
const allOrderStatuses = ['草稿', '待接单', '已分配', '执行中', '待验收', '待返工', '争议中', '已完成', '已取消'];
const routeView = get('#route-view');
const planetHome = get('#planet-home');
const integer = new Intl.NumberFormat('zh-CN');
const number = (value) => integer.format(Number(value));
const safe = escapeText;
const amountOf = (project) => project.production + project.distribution;
const ordersAll = () => [...state.orders, ...sampleOrders.map((order) => ({...order, ...state.accepted[order.id]}))];

function go(route) {
  if (location.hash === '#' + route) renderRoute();
  else location.hash = route;
}
function checkedLink(route, title, active) {
  return '<a href="#' + route + '"' + (active === route ? ' aria-current="page"' : '') + '>' + title + '</a>';
}
function workspaceNav(active) {
  return '<nav class="space-nav" aria-label="我的星球功能">' + Object.entries(routes).map(([path,title]) => checkedLink(path,title,active)).join('') + '</nav>';
}
function hallNav(active, mine = false) {
  const marketKey = mine ? 'market/mine' : 'market';
  const taskKey = mine ? 'tasks/mine' : 'tasks';
  return '<nav class="space-nav" aria-label="创意大厅功能">' + checkedLink(marketKey, '创意共创', active === 'market' ? marketKey : '') + checkedLink(taskKey, '任务大厅', active === 'tasks' ? taskKey : '') + '</nav>';
}
const scopeNav = (root, mine) => '<nav class="scope-nav" aria-label="展示范围">' + checkedLink(root, '社区公开', mine ? '' : root) + checkedLink(root + '/mine', '我参与的', mine ? root + '/mine' : '') + '</nav>';
const spaceHeading = (parent, title, description, action = '') => '<div class="space-heading"><div><p class="space-parent">' + parent + '</p><h1>' + title + '</h1><p>' + description + '</p></div>' + action + '</div>';
const empty = (text) => '<div class="empty">' + text + '</div>';
const options = (list, selected = '') => list.map((item) => '<option value="' + safe(item) + '"' + (item === selected ? ' selected' : '') + '>' + safe(item) + '</option>').join('');
const categoryOptions = () => '<option value="">全部创意分类</option>' + options(categories);
const chip = (text, special = false) => '<span class="state-chip' + (special ? ' state-active' : '') + '">' + safe(text) + '</span>';
const inputField = (label, name, value = '', attrs = '') => '<label class="field">' + label + '<input name="' + name + '" value="' + safe(value) + '" ' + attrs + '></label>';
const textField = (label, name, value = '', attrs = 'required') => '<label class="field">' + label + '<textarea name="' + name + '" rows="3" ' + attrs + '>' + safe(value) + '</textarea></label>';
const selectField = (label, name, list, value) => '<label class="field">' + label + '<select name="' + name + '">' + options(list,value) + '</select></label>';

function installFilters(form, render) {
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', () => render(new FormData(form)));
  render(new FormData(form));
}
function filtersMarkup(aria, extra = '') {
  return '<form class="space-filters" id="space-filters" aria-label="' + aria + '"><label class="space-search">' + icon('search') + '<input type="search" name="q" aria-label="' + aria + '" placeholder="' + aria + '"></label><select aria-label="创意分类" name="category">' + categoryOptions() + '</select>' + extra + '</form>';
}
function filtered(items, form) {
  const q = String(form.get('q') || '').trim().toLowerCase();
  return items.filter((item) => (!form.get('category') || item.category === form.get('category')) &&
    (!form.get('status') || item.status === form.get('status')) &&
    [item.title,item.id,item.description,item.requirements].some((field) => field && (field.toLowerCase().includes(q) || uiText(field).toLowerCase().includes(q))));
}

function renderRoute() {
  const [rawPath, query = ''] = location.hash.slice(1).split('?');
  const path = rawPath || 'create';
  const home = path === 'create' || path === 'discover' || path === 'planet';
  const community = path === 'community' || path.startsWith('community/');
  const origin = new URLSearchParams(query).get('from');
  const hall = (path.startsWith('market') && !origin?.startsWith('planet/')) || path.startsWith('tasks') || (path.startsWith('orders/detail/') && origin?.startsWith('tasks'));
  const sharedWork = path.startsWith('community/work/') ? works.find(({id}) => id === path.split('/')[2]) : null;
  closeOrbitPreview(false);
  get('#create').hidden = !home;
  const discoveryPanel = get('#discover');
  discoveryPanel.hidden = !(home || community);
  discoveryPanel.classList.toggle('is-community', community);
  discoveryPanel.classList.toggle('is-screening', path === 'community/recommended');
  discoveryPanel.classList.toggle('is-orbital', path === 'community' || path === 'community/grid' || path.startsWith('community/work/'));
  planetHome.hidden = !home;
  routeView.hidden = home || community;
  search.value = '';
  get('#search-form').hidden = true;
  get('#search-toggle').setAttribute('aria-expanded', 'false');
  category = '全部';
  for (const item of all('[data-filter]')) item.setAttribute('aria-pressed', item.dataset.filter === category);

  for (const item of all('[data-nav]')) {
    const selected = item.dataset.nav === (community ? 'community' : hall ? 'hall' : 'planet');
    if (selected) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  }
  if (home || community) {
    get('#community-nav').hidden = !community;
    get('#discover-title').textContent = path === 'community/recommended' ? '星球放映厅' : community ? '星球社区' : '发现作品';
    get('#discover-description').textContent = path === 'community/recommended' ? '来自星球创作者的短片和视觉作品。' : community ? '浏览星球故事，发现喜欢的作品与创作者。' : '看看其他创作者怎么把想法做出来。';
    const feedPath = path.startsWith('community/work/') || path === 'community/grid' ? 'community' : path;
    get('#community-nav').innerHTML = '<nav class="space-nav community-links" aria-label="星球社区分栏">' + Object.entries(communityTabs).map(([url,title]) => checkedLink(url,title,feedPath)).join('') + '</nav>';
    communityFeed = !community ? '' : {'community/recommended':'recommended', 'community/following':'following', 'community/friends':'friends'}[feedPath] || 'grid';
    recommendedIndex = 0;
    get('#gallery-end').innerHTML = home ? '<a class="secondary-button" href="#community">进入星球社区</a>' : '';
    renderGallery();
    if (home) renderPlanetHome();
    if (sharedWork) openOrbitPreview(sharedWork);
  } else if (path.startsWith('market/project/')) {
    renderProject(path.split('/')[2], origin);
  } else if (path === 'market/new') {
    renderProjectEditor({}, origin);
  } else if (path === 'market' || path === 'market/mine' || path === 'planet/cocreate') {
    renderMarket(path);
  } else if (path.startsWith('orders/detail/')) {
    renderOrder(path.split('/')[2], origin);
  } else if (path === 'orders/new') {
    renderOrderEditor();
  } else if (path === 'orders' || path === 'tasks' || path === 'tasks/mine') {
    renderTasks(path);
  } else {
    renderWorkspace(path);
  }
  if (sharedWork) requestAnimationFrame(() => {
    if (orbitWork === sharedWork) revealOrbitPreview();
  });
  else if (path === 'discover') requestAnimationFrame(() => get('#discover').scrollIntoView());
  else window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange', renderRoute);

function draftList() {
  return state.drafts.map((draft) => '<button class="project-row" type="button" data-personal-draft="' + safe(draft.id) + '">' + icon('folder') + '<div><strong data-no-translate>' + safe(draftTitle(draft)) + '</strong></div><small>' + ({canvas:'画布',agent:'创作计划',film:'分镜草稿'}[draft.mode] || '草稿') + '</small></button>').join('');
}
function bindDrafts(root) {
  for (const button of all('[data-personal-draft]', root)) button.addEventListener('click', () => showDraft(state.drafts.find(({id}) => id === button.dataset.personalDraft)));
}
function renderPlanetHome() {
  planetHome.innerHTML = '<div class="section-bar"><div><h2>创意工作台</h2><p>继续做项目，管理素材与协作。</p></div><a class="secondary-button" href="#planet/projects">我的项目</a></div>' +
    workspaceNav('create') + '<h3 class="section-label">最近项目</h3><div class="project-list">' +
    (draftList() || empty('还没有创作项目，从一个想法或一张空白画布开始。')) + '</div>';
  bindDrafts(planetHome);
}
function renderWorkspace(path) {
  const title = routes[path] || '我的星球';
  if (path === 'rewards') {
    renderRewards();
    return;
  }
  routeView.innerHTML = spaceHeading('我的星球', title, {
    'planet/projects':'管理创作草稿和收藏。',
    'planet/active':'查看正在进行的共创与订单。',
    'planet/assets':'查看可作为灵感参考的示例素材。',
    'planet/notebooks':'记录角色设定、世界观和随手灵感。',
  }[path] || '回到创意工作台继续创作。') + workspaceNav(path) + '<div id="workspace-content" class="space-content"></div>';
  const content = get('#workspace-content');
  if (path === 'planet/projects') {
    const saved = works.filter(({id}) => state.saved.includes(id));
    content.innerHTML = '<h2>创作草稿</h2><div class="project-list">' + (draftList() || empty('还没有草稿。<a href="#create">开始创作</a>')) + '</div>' +
      '<h2 class="section-label">收藏作品</h2><div class="project-list">' +
      (saved.map((work) => '<a class="project-row" href="#community/work/' + work.id + '">' + icon('bookmark') + '<strong>' + work.title + '</strong></a>').join('') || empty('还没有收藏。<a href="#community">发现作品</a>')) + '</div>';
    bindDrafts(content);
  } else if (path === 'planet/active') {
    const joined = sampleProjects.filter(({id}) => state.joined[id]);
    const activeOrders = ordersAll().filter((order) => order.status !== '草稿' && (state.orders.some(({id}) => id === order.id) || state.accepted[order.id]));
    content.innerHTML = '<h2>进行中的共创</h2><div class="hall-grid">' + (joined.map((p) => projectCard(p, 'planet/cocreate')).join('') || empty('暂无参与的共创。<a href="#market">查看公开项目</a>')) + '</div>' +
      '<h2 class="section-label">进行中的订单</h2><div class="task-list">' + (activeOrders.map((order) => orderCard(order,'orders')).join('') || empty('暂无进行中的订单。<a href="#orders">管理订单</a>')) + '</div>';
  } else if (path === 'planet/assets') {
    content.innerHTML = '<div class="work-grid">' + works.map((work) => '<a class="work-card asset-card" href="#community/work/' + work.id + '"><img src="./' + work.image + '" alt=""><strong>' + work.title + '</strong></a>').join('') + '</div>';
  } else if (path === 'planet/notebooks') {
    const entries = state.notebook.map((entry) => '<article class="task-card"><h3 data-no-translate>' + safe(entry.title) + '</h3><p data-no-translate>' + safe(entry.text) + '</p></article>').join('');
    content.innerHTML = '<form class="panel-form notebook-form" id="note-form">' + inputField('名称','title','','required maxlength="80"') + textField('设定或笔记','text','','required maxlength="1500"') + '<button class="primary-button">保存记事</button></form><div class="task-list">' + (entries || empty('还没有记事。')) + '</div>';
    get('#note-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if (![data.get('title'),data.get('text')].every((value) => value.trim())) return;
      state.notebook.unshift({title:data.get('title').trim(),text:data.get('text').trim()});
      persist();
      renderWorkspace(path);
      announce('已保存记事');
    });
  } else {
    content.innerHTML = '<a href="#create" class="primary-button">返回创意工作台</a>';
  }
}

function renderMarket(path) {
  const mine = path !== 'market';
  const personal = path === 'planet/cocreate';
  let mineFilter = 'all';
  routeView.innerHTML = spaceHeading(personal ? '我的星球' : '创意大厅', '创意共创', '浏览审核通过的项目、参与拼团，或发起自己的创意。', '<a class="primary-button" href="#market/new?from=' + encodeURIComponent(path) + '">' + icon('plus') + ' 发起项目</a>') +
    (personal ? workspaceNav(path) : hallNav('market', mine) + scopeNav('market', mine)) +
    (mine ? '<div class="scope-nav" id="co-mine-filters" aria-label="我的共创分类"><button type="button" data-mine="all" aria-pressed="true">全部共创</button><button type="button" data-mine="owned" aria-pressed="false">我发布的</button><button type="button" data-mine="joined" aria-pressed="false">我参与拼团</button></div>' : '') +
    filtersMarkup('搜索项目名称或创意内容') + '<div class="list-summary"><span id="space-count"></span><span>项目与词元均为演示数据</span></div><div class="hall-grid" id="hall-results"></div>';
  const form = get('#space-filters');
  const draw = (data) => {
    const joined = sampleProjects.filter(({id}) => state.joined[id]);
    const list = mine ? (mineFilter === 'owned' ? state.coDrafts : mineFilter === 'joined' ? joined : [...state.coDrafts, ...joined]) : sampleProjects;
    const matches = filtered(list,data);
    get('#space-count').textContent = '共 ' + matches.length + ' 个项目';
    get('#hall-results').innerHTML = matches.length ? matches.map((p) => projectCard(p,path)).join('') : empty('还没有匹配的项目。' + (mine ? '你创建的草稿与参与拼团的项目会出现在这里。' : '试试其他关键词或分类。'));
  };
  installFilters(form,draw);
  for (const button of all('[data-mine]',routeView)) button.addEventListener('click', () => {
    mineFilter = button.dataset.mine;
    for (const other of all('[data-mine]',routeView)) other.setAttribute('aria-pressed', other === button);
    draw(new FormData(form));
  });
}
function projectCard(project, from) {
  const total = amountOf(project);
  const progress = Math.min(100, Math.round((project.committed + (state.joined[project.id] || 0) * project.unit) / total * 100)) || 0;
  const label = project.status === '拼团中' ? '<div class="meter"><span style="width:' + progress + '%"></span></div><p class="project-meta">已筹 ' + progress + '% · ' + number(project.unit) + ' 词元/份</p>' : '<p class="project-meta">制作与发布预算 ' + number(total) + ' 词元</p>';
  return '<a class="hall-card" href="#market/project/' + safe(project.id) + '?from=' + encodeURIComponent(from) + '">' +
    (project.image ? '<img class="hall-cover" src="./' + project.image + '" alt="">' : '<div class="hall-cover blank-cover">' + icon('canvas') + '</div>') +
    '<div class="hall-card-body"><div class="card-row"><span>' + safe(project.category) + '</span>' + chip(project.status,project.status === '拼团中') + '</div><h2>' + safe(project.title) + '</h2><p class="card-copy">' + safe(project.description) + '</p>' + label + '</div></a>';
}
const projectOrigin = (from) => ['market','market/mine','planet/cocreate','planet/active'].includes(from) ? from : 'market';

function renderProject(id, from, editing = false) {
  const owned = state.coDrafts.find((project) => project.id === id);
  const project = owned || sampleProjects.find((entry) => entry.id === id);
  if (!project) {
    routeView.innerHTML = empty('找不到该项目。<a href="#market">返回创意共创</a>');
    return;
  }
  from = projectOrigin(from);
  if (editing && owned) {
    renderProjectEditor(project,from);
    return;
  }
  const shares = state.joined[id] || 0;
  const total = amountOf(project);
  const contributed = project.committed + shares * project.unit;
  const remaining = Math.max(0, Math.floor((total - contributed) / project.unit));
  const projectButtons = owned
    ? project.status === '草稿' ? '<button type="button" class="secondary-button" id="project-edit">编辑草稿</button><button type="button" class="primary-button" id="project-apply">申请发布</button>' : '<p>已提交演示申请，审核通过后才会进入公开列表。</p>'
    : project.status === '拼团中' && remaining > 0 ? '<form class="inline-form" id="join-form"><label>投入份数<input aria-label="投入份数" name="shares" type="number" min="1" max="' + remaining + '" value="1" required></label><button class="primary-button">参与拼团</button></form><p>演示投入，每项目最多 40 位词元投入者。</p>' : '<p>当前已结束拼团。</p>';
  routeView.innerHTML = '<a class="back-link" href="#' + from + '">返回' + (from === 'planet/active' ? '进行中的项目' : '创意共创') + '</a>' +
    spaceHeading('创意共创', safe(project.title), safe(project.category) + ' · ' + safe(project.account || '我'), chip(project.status,project.status === '拼团中')) +
    (project.image ? '<img class="detail-cover" src="./' + project.image + '" alt="">' : '') +
    '<div class="detail-grid"><div class="detail-main"><section class="detail-panel"><h2>创意与制作计划</h2><p>' + safe(project.description) + '</p><h3>权利来源与授权</h3><p>' + safe(project.rights) + '</p></section>' +
    '<section class="detail-panel"><h2>回款协议</h2><p>' + safe(project.scheme) + ' · 市场投入方 ' + project.marketShare + '% · 制作方 ' + project.studioShare + '%</p><p>' + safe(project.agreement) + '</p>' +
    '<ul>' + project.producers.map((person) => '<li>' + safe(person.name) + ' · ' + safe(person.role) + ' · 净回款 ' + person.share + '%</li>').join('') + '</ul><p>现金回款仅登记协议、凭据和应分明细。</p></section>' +
    (owned ? '' : '<section class="detail-panel discussion"><h2>项目讨论</h2><div id="project-comments"></div><form id="project-discussion"><label class="sr-only" for="project-message">参与讨论</label><input id="project-message" name="message" maxlength="300" required placeholder="聊聊对这个项目的想法"><button class="secondary-button">发表</button></form></section>') + '</div>' +
    '<aside class="detail-panel side-summary"><h2>制作与发布预算</h2><p>制作 ' + number(project.production) + ' + 发布 ' + number(project.distribution) + ' 词元</p><strong class="big-number">' + number(total) + ' <small>词元</small></strong>' +
    (owned ? '' : '<div class="meter"><span style="width:' + Math.min(100,Math.round(contributed/total*100)) + '%"></span></div><p>已筹 ' + number(contributed) + ' · ' + (project.backers + (shares ? 1 : 0)) + ' 位参与者</p>') +
    '<p>' + number(project.unit) + ' 词元／份' + (project.deadline ? ' · 截止 ' + safe(project.deadline.replace('T',' ')) : '') + '</p>' +
    (shares ? '<p class="local-feedback">你已参与 ' + shares + ' 份（演示）</p>' : '') + '<div class="detail-actions">' + projectButtons + '</div></aside></div>';
  get('#project-edit')?.addEventListener('click', () => renderProject(id,from,true));
  get('#project-apply')?.addEventListener('click', () => {
    owned.status = '待审核';
    persist();
    renderProject(id,from);
    announce('发布申请已在本机记录');
  });
  get('#join-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const count = Number(new FormData(event.currentTarget).get('shares'));
    if (!Number.isInteger(count) || count < 1 || count > remaining || (project.backers >= 40 && !shares)) return;
    state.joined[id] = shares + count;
    persist();
    renderProject(id,from);
    announce('已完成演示拼团');
  });
  const discussion = get('#project-discussion');
  if (discussion) {
    const messages = state.discussions[id] || [];
    const commentList = get('#project-comments');
    const draw = () => { commentList.innerHTML = messages.map((message) => '<p data-no-translate>' + safe(message) + '</p>').join('') || '<p>暂无讨论。</p>'; };
    discuss(discussion, messages, 'discussions', id, draw);
  }
}
function discuss(form, messages, key, id, draw) {
  draw();
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const field = form.elements.message;
    const message = field.value.trim();
    if (!message) return;
    messages.push(message);
    state[key][id] = messages;
    persist();
    field.value = '';
    draw();
  });
}

function defaultDeadline(days) {
  const today = new Date(Date.now() + (days * 24 * 60 + 480) * 60000);
  return today.toISOString().slice(0,16);
}
function renderProjectEditor(project, from) {
  from = projectOrigin(from || 'market/mine');
  routeView.innerHTML = '<a class="back-link" href="#' + from + '">返回创意共创</a>' +
    spaceHeading('创意共创', project.id ? '编辑创意项目' : '发起创意项目', '保存草稿后，在项目详情申请发布。') +
    '<form class="panel-form" id="co-form"><fieldset><legend>项目内容</legend><div class="form-grid">' +
    inputField('项目名称 *','title',project.title,'required maxlength="80"') + selectField('创意内容分类 *','category',categories,project.category) +
    selectField('创意展示海报（可选示例）','poster',['不使用海报','月球迷路指南','云上栖居','松林列车长'], {'moon.jpg':'月球迷路指南','island.jpg':'云上栖居','train.jpg':'松林列车长'}[project.image]) + '</div>' +
    textField('创意内容、制作计划与交付目标 *','description',project.description) + textField('权利来源、授权范围与期限 *','rights',project.rights) + '</fieldset>' +
    '<fieldset><legend>制作与发布预算</legend><div class="form-grid">' +
    inputField('制作预算（算力词元） *','production',project.production ?? 1000,'type="number" min="0" max="999999" required') +
    inputField('发布预算（算力词元） *','distribution',project.distribution ?? 200,'type="number" min="0" max="999999" required') +
    inputField('每份投入（算力词元） *','unit',project.unit ?? 10,'type="number" min="1" max="999999" required') +
    inputField('拼团截止（北京时间） *','deadline',project.deadline || defaultDeadline(7),'type="datetime-local" required') +
    '</div><p id="budget-total" aria-live="polite"></p></fieldset>' +
    '<fieldset><legend>回款比例与制作团队</legend><p>投入方与制作方合计 100%。逐一填写制作人份额，合计须等于制作方比例。</p><div class="form-grid">' +
    inputField('市场投入方净回款比例（%） *','marketShare',project.marketShare ?? 70,'type="number" min="1" max="99" required') +
    inputField('制作方净回款比例（%） *','studioShare',project.studioShare ?? 30,'type="number" min="1" max="99" required') +
    '</div><div id="producer-list"></div><button type="button" class="secondary-button" id="add-producer">' + icon('plus') + ' 添加制作人</button></fieldset>' +
    '<fieldset><legend>后期回款协议</legend>' +
    selectField('回款方式 *','scheme',['市场购买','发布后点播分润','市场购买与点播分润'],project.scheme || '市场购买与点播分润') +
    textField('回款净额口径、扣费项目、分配周期与贡献分配协议 *','agreement',project.agreement) +
    '<p>演示只记录表单。原版现金回款仅登记协议、凭据和应分明细。</p></fieldset>' +
    '<p class="form-error" id="form-error" role="alert"></p><button class="primary-button">保存项目草稿</button></form>';
  const form = get('#co-form');
  const crew = get('#producer-list');
  function addProducer(person = {}) {
    const row = document.createElement('div');
    row.className = 'producer-row form-grid';
    row.innerHTML = inputField('制作人','producer-name',person.name,'required maxlength="80"') + inputField('制作分工','producer-role',person.role,'required maxlength="80"') +
      inputField('占项目净回款（%）','producer-share',person.share,'type="number" min="0.01" max="99" step="0.01" required');
    if (crew.children.length) {
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'secondary-button';
      remove.textContent = '移除';
      remove.addEventListener('click', () => row.remove());
      row.append(remove);
    }
    crew.append(row);
  }
  for (const person of project.producers || [{name:uiText('我'),role:uiText('创意发起与制作')}]) addProducer(person);
  get('#add-producer').addEventListener('click', () => {
    if (crew.children.length >= 10) return;
    addProducer();
    get('input',crew.lastElementChild).focus();
  });
  function drawBudget() {
    const total = Number(form.elements.production.value) + Number(form.elements.distribution.value);
    const unit = Number(form.elements.unit.value);
    get('#budget-total').textContent = '总预算 ' + number(total) + ' 词元 · ' + (unit > 0 && total % unit === 0 ? '计划 ' + number(total / unit) + ' 份' : '总预算须为每份投入的整数倍');
  }
  drawBudget();
  form.addEventListener('input',drawBudget);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const input = (key) => String(data.get(key) || '').trim();
    const production = Number(input('production'));
    const distribution = Number(input('distribution'));
    const unit = Number(input('unit'));
    const marketShare = Number(input('marketShare'));
    const studioShare = Number(input('studioShare'));
    const producers = [...crew.children].map((row) => ({
      name: get('[name="producer-name"]',row).value.trim(),
      role: get('[name="producer-role"]',row).value.trim(),
      share: Number(get('[name="producer-share"]',row).value),
    }));
    let error = '';
    if (![input('title'),input('description'),input('rights'),input('agreement')].every(Boolean) || producers.some(({name,role}) => !name || !role)) error = '请完整填写项目、权利与制作人信息。';
    else if (production + distribution <= 0 || (production + distribution) % unit) error = '总预算须大于 0，且为每份投入的整数倍。';
    else if (marketShare + studioShare !== 100 || producers.reduce((sum,p) => sum + Math.round(p.share*100),0) !== studioShare*100) error = '请核对两方比例和每位制作人的份额合计。';
    if (error) {
      get('#form-error').textContent = error;
      return;
    }
    const record = {id:project.id || crypto.randomUUID(),title:input('title'),category:input('category'),description:input('description'),rights:input('rights'), production, distribution, unit, deadline:input('deadline'), marketShare, studioShare, producers, scheme:input('scheme'), agreement:input('agreement'), status:'草稿',
      image:{'月球迷路指南':'moon.jpg','云上栖居':'island.jpg','松林列车长':'train.jpg'}[input('poster')]};
    state.coDrafts = [record,...state.coDrafts.filter(({id}) => id !== record.id)];
    persist();
    const destination = from === 'planet/cocreate' ? from : 'market/mine';
    go('market/project/' + record.id + '?from=' + encodeURIComponent(destination));
    announce('项目草稿已保存');
  });
}

const orderOrigin = (from) => ['tasks','tasks/mine','orders'].includes(from) ? from : 'orders';
function renderTasks(path) {
  const personal = path === 'orders';
  const mine = path === 'tasks/mine';
  let orderFilter = 'owned';
  const orderTabs = {owned:'我发布的',taken:'我接受的',all:'全部关联',available:'可接任务'};
  const tabs = Object.entries(orderTabs).map(([type,title]) => '<button type="button" data-order-filter="' + type + '" aria-pressed="' + (orderFilter === type) + '">' + title + '</button>').join('');
  routeView.innerHTML = spaceHeading(personal ? '我的星球' : '创意大厅', personal ? '订单任务' : '任务大厅',
    personal ? '管理你发布和接受的创作需求。' : '浏览社区发布的创作需求，查看自己参与的任务。',
    '<a class="' + (personal ? 'primary-button' : 'secondary-button') + '" href="#' + (personal ? 'orders/new' : 'orders') + '">' + (personal ? icon('plus') + ' 创建订单' : '管理我的订单') + '</a>') +
    (personal ? workspaceNav(path) + '<div class="scope-nav" aria-label="订单范围">' + tabs + '</div>' : hallNav('tasks',mine) + scopeNav('tasks',mine)) +
    filtersMarkup(personal ? '搜索订单或编号' : '搜索大厅任务', personal ? '<select aria-label="订单状态" name="status"><option value="">全部订单状态</option>' + options(allOrderStatuses) + '</select>' : '') +
    '<div class="list-summary"><span id="space-count"></span><span>' + (personal ? '示例报价 · 内部服务词元' : '示例任务 · 确认后可在订单任务中管理') + '</span></div><div class="task-list" id="hall-results"></div>';
  const form = get('#space-filters');
  const draw = (data) => {
    const publicOrders = ordersAll().filter(({status}) => status === '待接单');
    const accepted = ordersAll().filter(({id}) => !!state.accepted[id]);
    let list = mine ? accepted : publicOrders;
    if (personal) list = {owned:state.orders,taken:accepted,all:[...state.orders,...accepted],available:publicOrders}[orderFilter];
    const matches = filtered(list,data);
    get('#space-count').textContent = '共 ' + matches.length + ' 笔' + (personal ? '订单' : '任务');
    get('#hall-results').innerHTML = matches.length ? matches.map((order) => orderCard(order,path)).join('') : empty(personal || mine ? '目前没有匹配的记录。<a href="#tasks">查看公开任务</a>' : '目前没有符合条件的公开任务。');
  };
  installFilters(form,draw);
  for (const button of all('[data-order-filter]',routeView)) button.addEventListener('click', () => {
    orderFilter = button.dataset.orderFilter;
    for (const other of all('[data-order-filter]',routeView)) other.setAttribute('aria-pressed', other === button);
    draw(new FormData(form));
  });
}
function orderCard(order, from) {
  return '<a class="task-card actionable" href="#orders/detail/' + safe(order.id) + '?from=' + encodeURIComponent(from) + '"><div><div class="card-row"><span>' + safe(order.category) + '</span>' + chip(order.status,order.status === '待接单') + '</div><h2>' + safe(order.title) + '</h2><p>' + safe(order.requirements) + '</p></div><div class="task-price"><strong>' + number(order.price * order.amount) + ' 词元</strong><span>' + number(order.price) + ' × ' + number(order.amount) + ' ' + safe(order.unit) + '</span></div></a>';
}
function renderOrderEditor() {
  routeView.innerHTML = '<a class="back-link" href="#orders">返回订单任务</a>' +
    spaceHeading('我的星球 / 订单任务','创建协作订单','先描述交付与验收要求，保存后查看并确认报价。') +
    '<form class="panel-form" id="order-form"><fieldset><legend>订单需求</legend><div class="form-grid">' +
    inputField('订单标题 *','title','','required maxlength="80"') + selectField('业务类目','category',categories) + '</div>' +
    textField('交付需求 *','requirements') + textField('验收标准 *','acceptance') + '</fieldset>' +
    '<fieldset><legend>词元报价与交付时间</legend><div class="form-grid">' +
    inputField('词元单价 *','price',10,'type="number" min="1" max="999999" required') +
    inputField('任务量 *','amount',1,'type="number" min="1" max="9999" required') +
    inputField('计量单位 *','unit',uiText('条脚本'),'required maxlength="20"') +
    inputField('交付截止（北京时间） *','deadline',defaultDeadline(1),'type="datetime-local" required') +
    '</div></fieldset><p class="form-error" id="order-error" role="alert"></p><button class="primary-button">确认保存</button></form>';
  get('#order-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input = (key) => String(data.get(key) || '').trim();
    if (![input('title'),input('requirements'),input('acceptance'),input('unit')].every(Boolean)) {
      get('#order-error').textContent = '请填写订单标题、交付要求、验收标准和计量单位。';
      return;
    }
    const order = {id:crypto.randomUUID(),title:input('title'),category:input('category'),requirements:input('requirements'),acceptance:input('acceptance'),price:Number(input('price')),amount:Number(input('amount')),unit:input('unit'),deadline:input('deadline'),status:'草稿'};
    state.orders.unshift(order);
    persist();
    go('orders/detail/' + order.id);
  });
}
function renderOrder(id, from) {
  from = orderOrigin(from);
  const ownOrder = state.orders.find((order) => order.id === id);
  const order = ordersAll().find((entry) => entry.id === id);
  if (!order) {
    routeView.innerHTML = empty('找不到这笔订单。<a href="#orders">返回订单任务</a>');
    return;
  }
  const draft = ownOrder?.status === '草稿';
  const canAccept = !ownOrder && order.status === '待接单';
  const inProgress = !ownOrder && order.status === '执行中';
  routeView.innerHTML = '<a class="back-link" href="#' + from + '">返回' + (from === 'orders' ? '订单任务' : '任务大厅') + '</a>' +
    spaceHeading(from === 'orders' ? '订单任务' : '任务大厅',safe(order.title),safe(order.category),chip(order.status,order.status === '待接单')) +
    '<div class="detail-grid"><div class="detail-main"><section class="detail-panel"><h2>交付需求</h2><p>' + safe(order.requirements) + '</p><h3>验收标准</h3><p>' + safe(order.acceptance) + '</p>' +
    (order.deadline ? '<p>交付截止（北京时间）' + safe(order.deadline.replace('T',' ')) + '</p>' : '') + '</section>' +
    (inProgress ? '<form class="detail-panel panel-form" id="deliver-order"><h2>提交交付</h2>' + textField('交付说明','delivery','','required maxlength="500"') + '<button class="primary-button">提交验收</button></form>' : '') +
    (order.delivery ? '<section class="detail-panel"><h2>已提交的交付说明</h2><p>' + safe(order.delivery) + '</p></section>' : '') + '</div><aside class="detail-panel side-summary">' +
    '<h2>' + (draft ? '确认订单报价' : '服务词元') + '</h2><strong class="big-number">' + number(order.price * order.amount) + ' <small>词元</small></strong><p>' + number(order.price) + ' × ' + number(order.amount) + ' ' + safe(order.unit) + '</p>' +
    (draft ? '<p>原版在确认时冻结预算，验收后结算。此处为演示报价。</p><button type="button" class="primary-button" id="order-publish">确认报价并发布</button>' :
      canAccept ? '<p>接单后可在「我的星球 · 订单任务」查看。</p><button type="button" class="primary-button" id="order-accept">接受任务</button>' : '<a class="secondary-button" href="#orders">管理我的订单</a>') + '</aside></div>';
  get('#order-publish')?.addEventListener('click', () => {
    ownOrder.status = '待接单';
    persist();
    renderOrder(id,from);
    announce('演示订单已进入公开任务');
  });
  get('#order-accept')?.addEventListener('click', () => {
    state.accepted[id] = {status:'执行中'};
    persist();
    go('orders/detail/' + id + '?from=orders');
    announce('已接单，可提交交付');
  });
  get('#deliver-order')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const delivery = new FormData(event.currentTarget).get('delivery').trim();
    if (!delivery) return;
    state.accepted[id] = {status:'待验收',delivery};
    persist();
    renderOrder(id,from);
    announce('交付已提交验收');
  });
}
function renderRewards() {
  const day = defaultDeadline(0).slice(0,10);
  const rewards = [
    {id:'check-in',title:'每日签到',value:20,note:'每天首次签到后可领取。',done:true},
    {id:'draft',title:'保存一份原创草案',value:80,note:'保存不少于 30 字的创意正文后领取。',done:state.drafts.some((p) => p.idea?.length >= 30),link:'create'},
    {id:'delivery',title:'完成订单并通过验收',value:50,note:'交付订单通过验收并结算后领取。',done:Object.values(state.accepted).some((o) => o.status === '已完成'),link:'orders'},
  ];
  const redeemed = (id) => state.rewards[id] === day;
  routeView.innerHTML = spaceHeading('我的星球', '日常任务', '完成任务后领取演示词元。') + workspaceNav('rewards') +
    '<div class="task-list space-content">' + rewards.map((reward) => '<article class="task-card"><div><h2>' + reward.title + '</h2><p>' + reward.note + '</p></div><div class="reward-actions"><strong>+' + reward.value + ' 词元</strong>' +
      (reward.link ? '<a class="secondary-button" href="#' + reward.link + '">去完成</a>' : '') +
      '<button class="primary-button" type="button" data-reward="' + reward.id + '"' + (redeemed(reward.id) ? ' disabled' : '') + '>' + (redeemed(reward.id) ? '今日已领取' : '核验并领取') + '</button></div></article>').join('') + '</div>';
  for (const button of all('[data-reward]',routeView)) button.addEventListener('click', () => {
    const reward = rewards.find(({id}) => id === button.dataset.reward);
    if (!reward.done) {
      announce('还未达到完成条件');
      return;
    }
    state.rewards[reward.id] = day;
    persist();
    renderRewards();
    announce('已领取 ' + reward.value + ' 演示词元');
  });
}
renderRoute();
