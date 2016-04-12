// Create a new object based of the HTMLElement prototype
var card = Object.create(HTMLElement.prototype);

// Set up the element.
card.createdCallback = function() {
    var shadow = this.createShadowRoot();

/* create CONTAINER */
    var bigContainer = document.createElement('div');
    bigContainer.className = 'bigContainer';

    var containerRow = document.createElement('div');
    containerRow.className = 'row';

    bigContainer.appendChild(containerRow);

/* create TEXT */
    var name = this.getAttribute('data-name');
    var span = document.createElement('span');
    var text = document.createTextNode(name);
    span.appendChild(text);


/* create SWITCH */
    var _switch = document.createElement('div');
    _switch.className = 'switch';

    var _knob = document.createElement('div');
    _knob.className='knob';
    _knob.setAttribute('state','off');

    _switch.addEventListener('click', function(e) {
        if (_knob.getAttribute("state") == "off") {
            Socket.send(name);


            _knob.style.marginLeft = "31px";
            _knob.setAttribute("state", "on");
            _switch.style.background = "#75BEB8";
            _knob.style.background = "#009688";
        } else if(_knob.getAttribute("state") == "on") {
            _knob.style.marginLeft = "0px";
            _knob.setAttribute("state", "off");
            _switch.style.background = "#B0AFAF";
            _knob.style.background = "#F1F1F1";
        }

        console.log("CLICKED");
    });

    _switch.appendChild(_knob);


/* ALL TOGETHER */

    containerRow.appendChild(span);
    containerRow.appendChild(_switch);
    shadow.appendChild(bigContainer);
};

// Register the new element.
var XProduct = document.registerElement('x-product', {
    prototype: card
});