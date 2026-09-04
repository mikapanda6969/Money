const DATA_UPDATED = '2025年8月15日';
const priceOptions = [
  { id: 'under1000', label: '1,000円未満', icon: '🌱', hint: '少額から探したい' },
  { id: '1000to3000', label: '1,000円〜3,000円くらい', icon: '☕', hint: '身近な価格帯から探す' },
  { id: '3000to5000', label: '3,000円〜5,000円くらい', icon: '👜', hint: '少し幅を広げて探す' },
  { id: 'over5000', label: '5,000円以上', icon: '✨', hint: 'じっくり選んで探す' }
];
const categoryOptions = [
  { id: 'food', label: '食品・お菓子など', icon: '🍪', hint: '自社商品、飲料、食品など' },
  { id: 'voucher', label: '商品券・お店の割引券など', icon: '🎫', hint: 'お買い物券、食事券など' },
  { id: 'other', label: 'その他の優待', icon: '🎁', hint: 'ポイント、カタログなど' }
];

// 企業公式サイトで制度の存在を確認した、動作確認用の固定サンプルです。
// 株価は更新日時点の概算であり、リアルタイム価格ではありません。
const stocks = [
  {code:'2206',name:'江崎グリコ',price:5050,min:100,category:'food',benefit:'Glicoグループ商品',month:'6月',hold:'保有期間・株数により内容が異なります',url:'https://www.glico.com/jp/company/ir/stock/benefit/'},
  {code:'2811',name:'カゴメ',price:2900,min:100,category:'food',benefit:'自社商品詰め合わせ',month:'6月',hold:'半年以上の継続保有が必要',url:'https://www.kagome.co.jp/company/ir/stock/benefit/'},
  {code:'2267',name:'ヤクルト本社',price:2450,min:100,category:'food',benefit:'自社商品など',month:'3月・9月',hold:'基準日や保有期間により内容が異なります',url:'https://www.yakult.co.jp/company/ir/stock/benefit.html'},
  {code:'2809',name:'キユーピー',price:3980,min:100,category:'food',benefit:'自社グループ商品',month:'11月',hold:'半年以上の継続保有が必要',url:'https://www.kewpie.com/ir/stock/benefit/'},
  {code:'2503',name:'キリンホールディングス',price:2200,min:100,category:'food',benefit:'自社グループ商品などから選択',month:'12月',hold:'1年以上の継続保有が必要',url:'https://www.kirinholdings.com/jp/investors/stock/benefit/'},
  {code:'2282',name:'日本ハム',price:5250,min:100,category:'food',benefit:'グループ商品',month:'3月・9月',hold:'株数・基準日により内容が異なります',url:'https://www.nipponham.co.jp/ir/stock/benefit/'},
  {code:'2871',name:'ニチレイ',price:1780,min:100,category:'food',benefit:'自社グループ商品',month:'3月',hold:'制度の詳細は公式サイトをご確認ください',url:'https://www.nichirei.co.jp/ir/stock/benefit.html'},
  {code:'3197',name:'すかいらーくホールディングス',price:3000,min:100,category:'voucher',benefit:'グループ店舗で使える株主優待カード',month:'6月・12月',hold:'保有株数により金額が異なります',url:'https://corp.skylark.co.jp/ir/stock/incentive/'},
  {code:'9861',name:'吉野家ホールディングス',price:3100,min:100,category:'voucher',benefit:'グループ店舗で使えるサービス券',month:'2月・8月',hold:'保有株数により枚数が異なります',url:'https://www.yoshinoya-holdings.com/ir/info/complimentary.html'},
  {code:'3048',name:'ビックカメラ',price:1650,min:100,category:'voucher',benefit:'店舗などで使えるお買物優待券',month:'2月・8月',hold:'長期保有による追加制度があります',url:'https://www.biccamera.co.jp/ir/service/index.html'},
  {code:'9831',name:'ヤマダホールディングス',price:480,min:100,category:'voucher',benefit:'店舗で使える株主優待券',month:'3月・9月',hold:'基準日により内容が異なります',url:'https://www.yamada-holdings.jp/ir/yutai.html'},
  {code:'3387',name:'クリエイト・レストランツHD',price:1420,min:100,category:'voucher',benefit:'グループ店舗で使えるお食事券',month:'2月・8月',hold:'保有株数・期間により金額が異なります',url:'https://www.createrestaurants.com/ir/stock/shareholder.html'},
  {code:'4661',name:'オリエンタルランド',price:3500,min:500,category:'voucher',benefit:'東京ディズニーランドまたはシーで使える株主用パスポート',month:'3月・9月',hold:'株数・保有期間・基準日により条件が異なります',url:'https://www.olc.co.jp/ja/ir/benefit.html'},
  {code:'8242',name:'エイチ・ツー・オー リテイリング',price:2100,min:100,category:'voucher',benefit:'グループ店舗で使える株主優待券など',month:'3月・9月',hold:'施設により割引内容が異なります',url:'https://www.h2o-retailing.co.jp/ja/ir/stock/benefit.html'},
  {code:'8267',name:'イオン',price:4200,min:100,category:'other',benefit:'株主さまご優待カード（オーナーズカード）',month:'2月・8月',hold:'持株数に応じた返金率などの制度があります',url:'https://www.aeon.info/ir/stock/benefit/'},
  {code:'9432',name:'日本電信電話（NTT）',price:160,min:100,category:'other',benefit:'dポイント（対象となる保有期間に応じて進呈）',month:'3月',hold:'同一株主番号で2年以上などの条件があります',url:'https://group.ntt/jp/ir/private_investor/stock/benefit.html'},
  {code:'9434',name:'ソフトバンク',price:225,min:100,category:'other',benefit:'PayPayマネーライト',month:'3月',hold:'1年以上かつ100株以上の保有などの条件があります',url:'https://www.softbank.jp/corp/ir/stock/benefit/'},
  {code:'9202',name:'ANAホールディングス',price:2900,min:100,category:'other',benefit:'国内線搭乗優待・グループ優待券',month:'3月・9月',hold:'保有株数により発行枚数が異なります',url:'https://www.ana.co.jp/group/investors/stock/benefit/'},
  {code:'9041',name:'近鉄グループホールディングス',price:3050,min:100,category:'other',benefit:'近畿日本鉄道線の招待乗車券など',month:'3月・9月',hold:'保有株数により内容が異なります',url:'https://www.kintetsu-g-hd.co.jp/ir/stockholder/benefit/'},
  {code:'9728',name:'日本管財ホールディングス',price:2750,min:100,category:'other',benefit:'カタログギフト',month:'3月・9月',hold:'3年以上の継続保有で内容が変わります',url:'https://www.nkanzaihd.co.jp/ir/stock/benefit.html'},
  {code:'8282',name:'ケーズホールディングス',price:1550,min:100,category:'voucher',benefit:'店舗で使える株主優待券',month:'3月・9月',hold:'1年以上の継続保有による追加制度があります',url:'https://www.ksdenki.co.jp/ir/stockholder.html'},
  {code:'2730',name:'エディオン',price:2000,min:100,category:'voucher',benefit:'店舗などで使えるギフトカード',month:'3月',hold:'長期保有による加算制度があります',url:'https://www.edion.co.jp/ir/stock/benefit'}
];

const state = { price: null, category: null, screen: 'priceScreen', previousScreen: 'priceScreen' };
const screens = [...document.querySelectorAll('.screen')];
const $ = (selector) => document.querySelector(selector);
const yen = new Intl.NumberFormat('ja-JP');
const getFavorites = () => { try { return JSON.parse(localStorage.getItem('yutai-favorites') || '[]'); } catch { return []; } };
const saveFavorites = (items) => { try { localStorage.setItem('yutai-favorites', JSON.stringify(items)); } catch { /* private-mode fallback */ } updateFavoriteCount(); };

function priceBand(price) {
  if (price < 1000) return 'under1000';
  if (price < 3000) return '1000to3000';
  if (price < 5000) return '3000to5000';
  return 'over5000';
}
function approximateTotal(stock) {
  const total = stock.price * stock.min;
  return total >= 10000 ? `約${(total / 10000).toLocaleString('ja-JP', { maximumFractionDigits: 1 })}万円` : `約${yen.format(total)}円`;
}
function showScreen(id, push = true) {
  screens.forEach((screen) => { const active = screen.id === id; screen.hidden = !active; screen.classList.toggle('active', active); });
  if (push && state.screen !== id) state.previousScreen = state.screen;
  state.screen = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  $('#app').focus({ preventScroll: true });
}
function choiceButton(item, type) {
  return `<button class="choice-button" type="button" data-${type}="${item.id}"><span class="choice-icon" aria-hidden="true">${item.icon}</span>${item.label}<small>${item.hint}</small><span class="arrow" aria-hidden="true">›</span></button>`;
}
function renderChoices() {
  $('#priceChoices').innerHTML = priceOptions.map((item) => choiceButton(item, 'price')).join('');
  $('#categoryChoices').innerHTML = categoryOptions.map((item) => choiceButton(item, 'category')).join('');
}
function stockCard(stock) {
  const saved = getFavorites().includes(stock.code);
  return `<article class="stock-card"><div class="card-top"><div class="company-line"><h3><span class="code">${stock.code}</span>${stock.name}</h3><button class="favorite-button ${saved ? 'saved' : ''}" type="button" data-favorite="${stock.code}" aria-pressed="${saved}">${saved ? '♥ 保存済み' : '♡ 気になる'}</button></div><div class="price-summary"><div class="price-box">1株あたり<strong>約${yen.format(stock.price)}円</strong></div><div class="price-box investment">${stock.min}株の場合<strong>${approximateTotal(stock)}</strong></div></div></div><div class="card-details"><div class="detail-row"><span class="label">最低株数</span><span>${yen.format(stock.min)}株</span></div><div class="detail-row"><span class="label">優待内容</span><span class="benefit-text">${stock.benefit}</span></div><div class="detail-row"><span class="label">権利確定月</span><span>${stock.month}予定</span></div><div class="condition"><b>保有期間など：</b>${stock.hold}</div><a class="official-link" href="${stock.url}" target="_blank" rel="noopener noreferrer">企業公式サイトで確認する ↗</a></div></article>`;
}
function renderResults() {
  const price = priceOptions.find((item) => item.id === state.price);
  const category = categoryOptions.find((item) => item.id === state.category);
  const results = stocks.filter((stock) => priceBand(stock.price) === state.price && stock.category === state.category);
  $('#conditionChips').innerHTML = `<span>${price.label}</span><span>${category.label}</span>`;
  $('#updatedDate').textContent = `データ更新日：${DATA_UPDATED}`;
  $('#resultCount').textContent = `${results.length}社の確認済みサンプルを表示しています`;
  $('#resultCards').innerHTML = results.map(stockCard).join('');
  $('#emptyState').hidden = results.length !== 0;
}
function renderFavorites() {
  const favorites = getFavorites();
  const items = favorites.map((code) => stocks.find((stock) => stock.code === code)).filter(Boolean);
  $('#favoriteCards').innerHTML = items.map(stockCard).join('');
  $('#favoriteEmpty').hidden = items.length !== 0;
}
function toggleFavorite(code) {
  const favorites = getFavorites();
  const index = favorites.indexOf(code);
  const adding = index === -1;
  if (adding) favorites.push(code); else favorites.splice(index, 1);
  saveFavorites(favorites);
  if (state.screen === 'resultsScreen') renderResults();
  if (state.screen === 'favoritesScreen') renderFavorites();
  showToast(adding ? '気になる優待に保存しました' : '保存から外しました');
}
function updateFavoriteCount() { $('#favoriteCount').textContent = getFavorites().length; }
let toastTimer;
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 1800); }

document.addEventListener('click', (event) => {
  const priceButton = event.target.closest('[data-price]');
  const categoryButton = event.target.closest('[data-category]');
  const favoriteButton = event.target.closest('[data-favorite]');
  const actionButton = event.target.closest('[data-action]');
  if (priceButton) { state.price = priceButton.dataset.price; $('#selectedPriceText').textContent = `選んだ価格：${priceOptions.find((item) => item.id === state.price).label}`; showScreen('categoryScreen'); }
  if (categoryButton) { state.category = categoryButton.dataset.category; renderResults(); showScreen('resultsScreen'); }
  if (favoriteButton) toggleFavorite(favoriteButton.dataset.favorite);
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === 'home') { state.price = null; state.category = null; showScreen('priceScreen'); }
  if (action === 'back-price') showScreen('priceScreen');
  if (action === 'favorites') { state.previousScreen = state.screen; renderFavorites(); showScreen('favoritesScreen', false); }
  if (action === 'back-from-favorites') showScreen(state.previousScreen === 'favoritesScreen' ? 'priceScreen' : state.previousScreen, false);
});

renderChoices();
updateFavoriteCount();
