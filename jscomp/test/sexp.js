'use strict';

var List = require("../../lib/js/list.js");
var Curry = require("../../lib/js/curry.js");
var Hashtbl = require("../../lib/js/hashtbl.js");
var Caml_obj = require("../../lib/js/caml_obj.js");
var Pervasives = require("../../lib/js/pervasives.js");
var Caml_format = require("../../lib/js/caml_format.js");
var Caml_option = require("../../lib/js/caml_option.js");

var equal = Caml_obj.caml_equal;

var compare = Caml_obj.caml_compare;

var hash = Hashtbl.hash;

function of_int(x) {
  return {
          HASH: "Atom",
          VAL: String(x)
        };
}

function of_float(x) {
  return {
          HASH: "Atom",
          VAL: Pervasives.string_of_float(x)
        };
}

function of_bool(x) {
  return {
          HASH: "Atom",
          VAL: x ? "true" : "false"
        };
}

function atom(x) {
  return {
          HASH: "Atom",
          VAL: x
        };
}

function of_list(l) {
  return {
          HASH: "List",
          VAL: l
        };
}

function of_rev_list(l) {
  return {
          HASH: "List",
          VAL: List.rev(l)
        };
}

function of_pair(param) {
  return {
          HASH: "List",
          VAL: {
            hd: param[0],
            tl: {
              hd: param[1],
              tl: /* [] */0
            }
          }
        };
}

function of_triple(param) {
  return {
          HASH: "List",
          VAL: {
            hd: param[0],
            tl: {
              hd: param[1],
              tl: {
                hd: param[2],
                tl: /* [] */0
              }
            }
          }
        };
}

function of_quad(param) {
  return {
          HASH: "List",
          VAL: {
            hd: param[0],
            tl: {
              hd: param[1],
              tl: {
                hd: param[2],
                tl: {
                  hd: param[3],
                  tl: /* [] */0
                }
              }
            }
          }
        };
}

function of_variant(name, args) {
  return {
          HASH: "List",
          VAL: {
            hd: {
              HASH: "Atom",
              VAL: name
            },
            tl: args
          }
        };
}

function of_field(name, t) {
  return {
          HASH: "List",
          VAL: {
            hd: {
              HASH: "Atom",
              VAL: name
            },
            tl: {
              hd: t,
              tl: /* [] */0
            }
          }
        };
}

function of_record(l) {
  return {
          HASH: "List",
          VAL: List.map((function (param) {
                  return of_field(param[0], param[1]);
                }), l)
        };
}

function $$return(x) {
  return Caml_option.some(x);
}

function $great$pipe$eq(e, f) {
  if (e !== undefined) {
    return Caml_option.some(Curry._1(f, Caml_option.valFromOption(e)));
  }
  
}

function $great$great$eq(e, f) {
  if (e !== undefined) {
    return Curry._1(f, Caml_option.valFromOption(e));
  }
  
}

function map_opt(f, l) {
  var _acc = /* [] */0;
  var _l = l;
  while(true) {
    var l$1 = _l;
    var acc = _acc;
    if (!l$1) {
      return List.rev(acc);
    }
    var y = Curry._1(f, l$1.hd);
    if (y === undefined) {
      return ;
    }
    _l = l$1.tl;
    _acc = {
      hd: Caml_option.valFromOption(y),
      tl: acc
    };
    continue ;
  };
}

function list_any(f, e) {
  if (e.HASH === "List") {
    var _l = e.VAL;
    while(true) {
      var l = _l;
      if (!l) {
        return ;
      }
      var res = Curry._1(f, l.hd);
      if (res !== undefined) {
        return res;
      }
      _l = l.tl;
      continue ;
    };
  }
  
}

function list_all(f, e) {
  if (e.HASH === "List") {
    var _acc = /* [] */0;
    var _l = e.VAL;
    while(true) {
      var l = _l;
      var acc = _acc;
      if (!l) {
        return List.rev(acc);
      }
      var tl = l.tl;
      var y = Curry._1(f, l.hd);
      if (y !== undefined) {
        _l = tl;
        _acc = {
          hd: Caml_option.valFromOption(y),
          tl: acc
        };
        continue ;
      }
      _l = tl;
      continue ;
    };
  } else {
    return /* [] */0;
  }
}

function _try_atom(e, f) {
  if (e.HASH === "List") {
    return ;
  }
  try {
    return Caml_option.some(Curry._1(f, e.VAL));
  }
  catch (exn){
    return ;
  }
}

function to_int(e) {
  return _try_atom(e, Caml_format.caml_int_of_string);
}

function to_bool(e) {
  return _try_atom(e, Pervasives.bool_of_string);
}

function to_float(e) {
  return _try_atom(e, Caml_format.caml_float_of_string);
}

function to_string(e) {
  return _try_atom(e, (function (x) {
                return x;
              }));
}

function to_pair(e) {
  if (typeof e === "string") {
    return ;
  }
  if (e.HASH !== "List") {
    return ;
  }
  var match = e.VAL;
  if (!match) {
    return ;
  }
  var match$1 = match.tl;
  if (match$1 && !match$1.tl) {
    return [
            match.hd,
            match$1.hd
          ];
  }
  
}

function to_pair_with(f1, f2, e) {
  return $great$great$eq(to_pair(e), (function (param) {
                var y = param[1];
                return $great$great$eq(Curry._1(f1, param[0]), (function (x) {
                              return $great$great$eq(Curry._1(f2, y), (function (y) {
                                            return [
                                                    x,
                                                    y
                                                  ];
                                          }));
                            }));
              }));
}

function to_triple(e) {
  if (typeof e === "string") {
    return ;
  }
  if (e.HASH !== "List") {
    return ;
  }
  var match = e.VAL;
  if (!match) {
    return ;
  }
  var match$1 = match.tl;
  if (!match$1) {
    return ;
  }
  var match$2 = match$1.tl;
  if (match$2 && !match$2.tl) {
    return [
            match.hd,
            match$1.hd,
            match$2.hd
          ];
  }
  
}

function to_triple_with(f1, f2, f3, e) {
  return $great$great$eq(to_triple(e), (function (param) {
                var z = param[2];
                var y = param[1];
                return $great$great$eq(Curry._1(f1, param[0]), (function (x) {
                              return $great$great$eq(Curry._1(f2, y), (function (y) {
                                            return $great$great$eq(Curry._1(f3, z), (function (z) {
                                                          return [
                                                                  x,
                                                                  y,
                                                                  z
                                                                ];
                                                        }));
                                          }));
                            }));
              }));
}

function to_list(e) {
  if (e.HASH === "List") {
    return Caml_option.some(e.VAL);
  }
  
}

function to_list_with(f, e) {
  if (e.HASH === "List") {
    return map_opt(f, e.VAL);
  }
  
}

function get_field(name, e) {
  if (e.HASH === "List") {
    var _l = e.VAL;
    while(true) {
      var l = _l;
      if (!l) {
        return ;
      }
      var match = l.hd;
      if (typeof match === "string") {
        _l = l.tl;
        continue ;
      }
      if (match.HASH === "List") {
        var match$1 = match.VAL;
        if (match$1) {
          var match$2 = match$1.hd;
          if (typeof match$2 === "string") {
            _l = l.tl;
            continue ;
          }
          if (match$2.HASH === "Atom") {
            var match$3 = match$1.tl;
            if (match$3) {
              if (match$3.tl) {
                _l = l.tl;
                continue ;
              }
              if (Caml_obj.caml_equal(name, match$2.VAL)) {
                return match$3.hd;
              }
              _l = l.tl;
              continue ;
            }
            _l = l.tl;
            continue ;
          }
          _l = l.tl;
          continue ;
        }
        _l = l.tl;
        continue ;
      }
      _l = l.tl;
      continue ;
    };
  }
  
}

function field(name, f, e) {
  return $great$great$eq(get_field(name, e), f);
}

function _get_field_list(name, _l) {
  while(true) {
    var l = _l;
    if (!l) {
      return ;
    }
    var match = l.hd;
    if (typeof match === "string") {
      _l = l.tl;
      continue ;
    }
    if (match.HASH === "List") {
      var match$1 = match.VAL;
      if (match$1) {
        var match$2 = match$1.hd;
        if (typeof match$2 === "string") {
          _l = l.tl;
          continue ;
        }
        if (match$2.HASH === "Atom") {
          if (Caml_obj.caml_equal(name, match$2.VAL)) {
            return match$1.tl;
          }
          _l = l.tl;
          continue ;
        }
        _l = l.tl;
        continue ;
      }
      _l = l.tl;
      continue ;
    }
    _l = l.tl;
    continue ;
  };
}

function field_list(name, f, e) {
  if (e.HASH === "List") {
    return $great$great$eq(_get_field_list(name, e.VAL), f);
  }
  
}

function _get_variant(s, args, _l) {
  while(true) {
    var l = _l;
    if (!l) {
      return ;
    }
    var match = l.hd;
    if (Caml_obj.caml_equal(s, match[0])) {
      return Curry._1(match[1], args);
    }
    _l = l.tl;
    continue ;
  };
}

function get_variant(l, e) {
  if (e.HASH !== "List") {
    return _get_variant(e.VAL, /* [] */0, l);
  }
  var match = e.VAL;
  if (!match) {
    return ;
  }
  var match$1 = match.hd;
  if (typeof match$1 === "string" || match$1.HASH !== "Atom") {
    return ;
  } else {
    return _get_variant(match$1.VAL, match.tl, l);
  }
}

function get_exn(e) {
  if (e !== undefined) {
    return Caml_option.valFromOption(e);
  }
  throw {
        RE_EXN_ID: "Failure",
        _1: "CCSexp.Traverse.get_exn",
        Error: new Error()
      };
}

var of_unit = {
  HASH: "List",
  VAL: /* [] */0
};

var Traverse = {
  map_opt: map_opt,
  list_any: list_any,
  list_all: list_all,
  to_int: to_int,
  to_string: to_string,
  to_bool: to_bool,
  to_float: to_float,
  to_list: to_list,
  to_list_with: to_list_with,
  to_pair: to_pair,
  to_pair_with: to_pair_with,
  to_triple: to_triple,
  to_triple_with: to_triple_with,
  get_field: get_field,
  field: field,
  get_variant: get_variant,
  field_list: field_list,
  $great$great$eq: $great$great$eq,
  $great$pipe$eq: $great$pipe$eq,
  $$return: $$return,
  get_exn: get_exn
};

exports.equal = equal;
exports.compare = compare;
exports.hash = hash;
exports.atom = atom;
exports.of_int = of_int;
exports.of_bool = of_bool;
exports.of_list = of_list;
exports.of_rev_list = of_rev_list;
exports.of_float = of_float;
exports.of_unit = of_unit;
exports.of_pair = of_pair;
exports.of_triple = of_triple;
exports.of_quad = of_quad;
exports.of_variant = of_variant;
exports.of_field = of_field;
exports.of_record = of_record;
exports.Traverse = Traverse;
/* No side effect */
