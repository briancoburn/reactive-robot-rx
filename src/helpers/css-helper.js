/**
 * Created by brian on 5/31/16.
 */

export function hasClass(ele, className){
    console.log('css-helper::hasClass()==>ele:', ele);
    console.log('css-helper::hasClass()==>className:', className);
    if(ele.className.match(/(?:^|\s)className(?!\S)/)){
        return true;
    }
    return false;
}
export function removeClass(ele, className){
    console.log('css-helper::removeClass()==>ele:', ele);
    console.log('css-helper::removeClass()==>className:', className);
    ele.className.replace( /(?:^|\s)MyClass(?!\S)/g , '' );

}
export function addClass(ele, className){
    console.log('css-helper::addClass()==>ele:', ele);
    console.log('css-helper::addClass()==>className:', className);
    ele.className += ' ' + className;
}
export function changeClass(ele, classToRemove, classToAdd){
    console.log('css-helper::changeClass()==>ele:', ele);
    console.log('css-helper::changeClass()==>classToRemove:', classToRemove);
    console.log('css-helper::changeClass()==>classToAdd:', classToAdd);
    removeClass(ele, classToRemove);
    if(!hasClass(ele, classToAdd)){
        addClass(ele, classToAdd);
    }
}
