function OpacityControl(overlay){
    var el = this.el_ = document.createElement('input');
    el.type = 'range';
    el.min = 0; 
    el.max = 100; 
    el.value = 100; 
    el.style.width = '200px'; 
    el.style.margin = '20px';
    el.onchange = this.onChange_.bind(this);
    this.overlay = overlay;
}


OpacityControl.prototype.onChange_ = function () {
    this.overlay.setOpacity(this.el_.value / 100);
};

OpacityControl.prototype.getElement = function () {
    return this.el_;
};
