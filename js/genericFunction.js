function isVisible(el) {
    if (el === document) {
        return true;
    }

    var $style = window.getComputedStyle(el, null);

    if (!el) {
        return false;
    } else if (!$style) {
        return false;
    } else if ($style.display === 'none') {
        return false;
    } else if ($style.visibility === 'hidden') {
        return false;
    } else if (+$style.opacity === 0) {
        return false;
    } else if (($style.display === 'block' || $style.display === 'inline-block') &&
        $style.height === '0px' && $style.overflow === 'hidden') {
        return false;
    } else {
        return $style.position === 'fixed' || isVisible(el.parentNode);
    }
}