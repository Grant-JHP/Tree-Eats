import rawJSON from './page-content.json';

var hash, pageData;

RefreshPage();

function RefreshPage() {

  hash = location.hash.slice(1).toLowerCase();
  if (!rawJSON['valid-hashes'].includes(hash)) { console.warn('Invalid hash'); hash = 'home'; }
  console.log('Hash set to:', hash);

  pageData = rawJSON[hash];

  document.querySelector('body').style.backgroundImage = `url('${pageData['background-image']}')`;
  document.title = pageData['title'] + ' Tree-Eats';
  document.querySelector('link[rel=icon').href = `${pageData['icon']}`;

  LoadNavBar();

  LoadTitleBox();

  LoadContentBoxes();

  LoadCreditsBox();

  // location.reload();
};

function LoadNavBar() {

  var html = ``;

  for (var i = 0; i < rawJSON['valid-hashes'].length; i++) {
    var current = rawJSON['valid-hashes'][i];
    html += `<button id='${current}Btn'><a href='#${current}'>${current}</a></button>`;
  }

  document.querySelector('#navBar').innerHTML = html;

  for (var i = 0; i < rawJSON['valid-hashes'].length; i++) {
    var current = rawJSON['valid-hashes'][i];
    document.getElementById(`${current}Btn`).onclick = () => {
      setTimeout( () => { RefreshPage(); }, 0);
    };
  }
};

function LoadTitleBox() {
};

function LoadContentBoxes() {

  var html = ``;

  for (var c = 0; c < Object.keys(pageData['contents']).length; c++) {

    var pageContent = pageData['contents'][c];

    var htmlC = `<div class='contentBox'><div class='heading'>`;

    htmlC += `<h1>${pageContent[1]}</h1>`;

    htmlC += `<hr></div><div>`;

    if (pageContent[0] == 'left-img') { htmlC += `<img src='${pageContent[2]}' /><p>${pageContent[3]}</p>`; }
    else if (pageContent[0] == 'right-img') { htmlC += `<p>${pageContent[3]}</p><img src='${pageContent[2]}' />`; }
    else if (pageContent[0] == 'no-img') { htmlC += `<p>${pageContent[3]}</p>`; }
    else { console.error('Invalid page-format:', pageContent[0]); }

    html += htmlC + `</div></div>`;
  }

  document.getElementById('contentBoxes').innerHTML = html;
};

function LoadCreditsBox() {
};