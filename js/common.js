// extensions - not in use
// get element
Array.prototype.Get = function (id) {
    return Enumerable.From(this)
            .Where(function (e) { return e.Id == id; })
            .FirstOrDefault();
}

// set element property
Array.prototype.Set = function (id, prop, val) {
    $.each(this, function (i, o) {
        if (o.Id == id) this[i][prop] = val;
    })
}

// update element 
Array.prototype.Update = function (id, obj) {
    $.each(this, function (i, o) {
        if (o.Id == id) this[i] = obj;
    })
}