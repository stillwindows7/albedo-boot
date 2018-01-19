import {LocalStorageService} from "ngx-webstorage";

export const setActiveItemMenu = (localStorage: LocalStorageService, url?: String) => {
    let menu = mLayout.getAsideMenu();
    url = (url ? url : window.location.hash);
    let item = $(menu).find('a[href="' + url + '"]').parent('.m-menu__item');
    if(item.length>0){
        localStorage.store("activeItemMenu", url)
    }else{
        item = $(menu).find('a[href="' + localStorage.retrieve("activeItemMenu") + '"]').parent('.m-menu__item');
    }

    (<any>$(menu).data('menu')).setActiveItem(item);
}



