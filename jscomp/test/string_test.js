// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

let Mt = require("./mt.js");
let List = require("../../lib/js/list.js");
let $$Array = require("../../lib/js/array.js");
let Bytes = require("../../lib/js/bytes.js");
let $$String = require("../../lib/js/string.js");
let Ext_string_test = require("./ext_string_test.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

function ff(x) {
  let a;
  switch (x) {
    case "0" :
    case "1" :
    case "2" :
      a = 3;
      break;
    case "3" :
      a = 4;
      break;
    case "4" :
      a = 6;
      break;
    case "7" :
      a = 7;
      break;
    default:
      a = 8;
  }
  return a + 3 | 0;
}

function gg(x) {
  let a;
  switch (x) {
    case 0 :
    case 1 :
    case 2 :
      a = 3;
      break;
    case 3 :
      a = 4;
      break;
    case 4 :
      a = 6;
      break;
    case 8 :
      a = 7;
      break;
    default:
      a = 8;
  }
  return a + 3 | 0;
}

function rev_split_by_char(c, s) {
  let loop = (i, l) => {
    try {
      let i$p = $$String.index_from(s, i, c);
      let s$p = $$String.sub(s, i, i$p - i | 0);
      return loop(i$p + 1 | 0, s$p === "" ? l : ({
          hd: s$p,
          tl: l
        }));
    } catch (raw_exn) {
      let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === "Not_found") {
        return {
          hd: $$String.sub(s, i, s.length - i | 0),
          tl: l
        };
      }
      throw exn;
    }
  };
  return loop(0, /* [] */0);
}

function xsplit(delim, s) {
  let len = s.length;
  if (len !== 0) {
    let _l = /* [] */0;
    let _x = len;
    while (true) {
      let x = _x;
      let l = _l;
      if (x === 0) {
        return l;
      }
      let i$p;
      try {
        i$p = $$String.rindex_from(s, x - 1 | 0, delim);
      } catch (raw_exn) {
        let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
        if (exn.RE_EXN_ID === "Not_found") {
          return {
            hd: $$String.sub(s, 0, x),
            tl: l
          };
        }
        throw exn;
      }
      let l_0 = $$String.sub(s, i$p + 1 | 0, (x - i$p | 0) - 1 | 0);
      let l$1 = {
        hd: l_0,
        tl: l
      };
      let l$2 = i$p === 0 ? ({
          hd: "",
          tl: l$1
        }) : l$1;
      _x = i$p;
      _l = l$2;
      continue;
    };
  } else {
    return /* [] */0;
  }
}

function string_of_chars(x) {
  let xs = List.map(prim => String.fromCharCode(prim), x);
  return $$Array.of_list(xs).join("");
}

Mt.from_pair_suites("String_test", {
  hd: [
    "mutliple switch",
    () => ({
      TAG: "Eq",
      _0: 9,
      _1: ff("4")
    })
  ],
  tl: {
    hd: [
      "int switch",
      () => ({
        TAG: "Eq",
        _0: 9,
        _1: gg(4)
      })
    ],
    tl: {
      hd: [
        "escape_normal",
        () => ({
          TAG: "Eq",
          _0: "haha",
          _1: $$String.escaped("haha")
        })
      ],
      tl: {
        hd: [
          "escape_bytes",
          () => ({
            TAG: "Eq",
            _0: Bytes.of_string("haha"),
            _1: Bytes.escaped(Bytes.of_string("haha"))
          })
        ],
        tl: {
          hd: [
            "escape_quote",
            () => ({
              TAG: "Eq",
              _0: "\\\"\\\"",
              _1: $$String.escaped("\"\"")
            })
          ],
          tl: {
            hd: [
              "rev_split_by_char",
              () => ({
                TAG: "Eq",
                _0: {
                  hd: "",
                  tl: {
                    hd: "bbbb",
                    tl: {
                      hd: "bbbb",
                      tl: /* [] */0
                    }
                  }
                },
                _1: rev_split_by_char(/* 'a' */97, "bbbbabbbba")
              })
            ],
            tl: {
              hd: [
                "File \"string_test.res\", line 86, characters 5-12",
                () => ({
                  TAG: "Eq",
                  _0: {
                    hd: "aaaa",
                    tl: /* [] */0
                  },
                  _1: rev_split_by_char(/* ',' */44, "aaaa")
                })
              ],
              tl: {
                hd: [
                  "xsplit",
                  () => ({
                    TAG: "Eq",
                    _0: {
                      hd: "a",
                      tl: {
                        hd: "b",
                        tl: {
                          hd: "c",
                          tl: /* [] */0
                        }
                      }
                    },
                    _1: xsplit(/* '.' */46, "a.b.c")
                  })
                ],
                tl: {
                  hd: [
                    "split_empty",
                    () => ({
                      TAG: "Eq",
                      _0: /* [] */0,
                      _1: Ext_string_test.split(undefined, "", /* '_' */95)
                    })
                  ],
                  tl: {
                    hd: [
                      "split_empty2",
                      () => ({
                        TAG: "Eq",
                        _0: {
                          hd: "test_unsafe_obj_ffi_ppx.cmi",
                          tl: /* [] */0
                        },
                        _1: Ext_string_test.split(false, " test_unsafe_obj_ffi_ppx.cmi", /* ' ' */32)
                      })
                    ],
                    tl: {
                      hd: [
                        "rfind",
                        () => ({
                          TAG: "Eq",
                          _0: 7,
                          _1: Ext_string_test.rfind("__", "__index__js")
                        })
                      ],
                      tl: {
                        hd: [
                          "rfind_2",
                          () => ({
                            TAG: "Eq",
                            _0: 0,
                            _1: Ext_string_test.rfind("__", "__index_js")
                          })
                        ],
                        tl: {
                          hd: [
                            "rfind_3",
                            () => ({
                              TAG: "Eq",
                              _0: -1,
                              _1: Ext_string_test.rfind("__", "_index_js")
                            })
                          ],
                          tl: {
                            hd: [
                              "find",
                              () => ({
                                TAG: "Eq",
                                _0: 0,
                                _1: Ext_string_test.find(undefined, "__", "__index__js")
                              })
                            ],
                            tl: {
                              hd: [
                                "find_2",
                                () => ({
                                  TAG: "Eq",
                                  _0: 6,
                                  _1: Ext_string_test.find(undefined, "__", "_index__js")
                                })
                              ],
                              tl: {
                                hd: [
                                  "find_3",
                                  () => ({
                                    TAG: "Eq",
                                    _0: -1,
                                    _1: Ext_string_test.find(undefined, "__", "_index_js")
                                  })
                                ],
                                tl: {
                                  hd: [
                                    "of_char",
                                    () => ({
                                      TAG: "Eq",
                                      _0: String.fromCharCode(/* '0' */48),
                                      _1: "0"
                                    })
                                  ],
                                  tl: {
                                    hd: [
                                      "of_chars",
                                      () => ({
                                        TAG: "Eq",
                                        _0: string_of_chars({
                                          hd: /* '0' */48,
                                          tl: {
                                            hd: /* '1' */49,
                                            tl: {
                                              hd: /* '2' */50,
                                              tl: /* [] */0
                                            }
                                          }
                                        }),
                                        _1: "012"
                                      })
                                    ],
                                    tl: /* [] */0
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});

exports.ff = ff;
exports.gg = gg;
exports.rev_split_by_char = rev_split_by_char;
exports.xsplit = xsplit;
exports.string_of_chars = string_of_chars;
/*  Not a pure module */
