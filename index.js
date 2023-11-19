"use strict"

// Access Key  UseSdOLCXk7OQFYwmOjOvyvbd8h6RMAiflEeVpBBM1w
// Secret key  jgwv1HY1ZaodKl2cnAAoPxhdC3lRR4xwEYucVIBxf38

const sectionPhoto = document.querySelector('.photos');
const inpSearch = document.querySelector('.inp');
inpSearch.focus();
const btnSearch = document.querySelector('.btn');
const btnClose = document.querySelector('.btn_close');
const url = 'https://api.unsplash.com/';

function createEl() {
    const divEl = document.createElement('div');
    divEl.classList.add('photos__cover');
    sectionPhoto.append(divEl);
    return divEl;
}

function createElError() {
    const divEl = document.createElement('div');
    divEl.classList.add('photos__cover_err');
    sectionPhoto.append(divEl);
    return divEl;
}

function displayPhotos(dataRes) {
    btnSearch.removeAttribute('disabled');
    btnClose.removeAttribute('disabled');
    for (let i = 0; i < 9; i++) {
        if (dataRes.results) {
            if (dataRes.results[i]) {
                createEl().style.backgroundImage = `url(${dataRes.results[i].urls.regular})`;
            } else {
                createElError().innerHTML = 'На Unsplash нет фотографий по вашему запросу';
                break;
            }
            
        } else if (dataRes.total == 0) {
            createElError().innerHTML = 'На Unsplash нет фотографий по вашему запросу';
        } else {
            createEl().style.backgroundImage = `url(${dataRes[i].urls.regular})`;
        }    
    }
}

// async function getListPhotos() {
//     const res = await fetch(`${url}photos`, {
//         headers: {
//             Authorization: 'Client-ID UseSdOLCXk7OQFYwmOjOvyvbd8h6RMAiflEeVpBBM1w',
//             'Accept-Version': 'v1'
//         }
//     });
//     const dataRes = await res.json();
//     displayPhotos(dataRes)
// }

async function getListPhotos(newStr) {
    sectionPhoto.innerHTML = '';
    let res;
    if (newStr) {
        console.log(`${url}search/photos?query=` + newStr);
        res = await fetch(`${url}search/photos?query=` + newStr, {
            headers: {
                Authorization: 'Client-ID UseSdOLCXk7OQFYwmOjOvyvbd8h6RMAiflEeVpBBM1w',
                'Accept-Version': 'v1'
            }
        });
    } else {
        res = await fetch(`${url}photos`, {
        headers: {
            Authorization: 'Client-ID UseSdOLCXk7OQFYwmOjOvyvbd8h6RMAiflEeVpBBM1w',
            'Accept-Version': 'v1'
        }
    });
    }
    const dataRes = await res.json();
    displayPhotos(dataRes)
    console.log(res);
    console.log(dataRes);
}


getListPhotos();


function getStrSearch() {
    return inpSearch.value.replaceAll(' ', '%20');
}

btnSearch.addEventListener('click', (e) => {
    btnSearch.setAttribute('disabled', '');
    btnClose.setAttribute('disabled', '');
    const newStr = getStrSearch();
    getListPhotos(newStr);
});

btnClose.addEventListener('click', function() {
    inpSearch.value = '';
    inpSearch.focus();
})

inpSearch.addEventListener('keyup', (e) => {
    if (e.code === "Enter") {
        const newStr = getStrSearch();
        getListPhotos(newStr);
    }
})
