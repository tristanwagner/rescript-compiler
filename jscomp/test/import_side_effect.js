// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';


let a = import("./side_effect2.js").then(function (m) {
  return m.a;
});

let M = await import("./side_effect.js");

exports.a = a;
exports.M = M;
/* M Not a pure module */
